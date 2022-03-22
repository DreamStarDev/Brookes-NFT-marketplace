import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import moment from "moment";

import Sidebar from "../common/sidebar";
import Header from "../common/header";
import request from "../../../services/Requests";
import { nFormatter } from "../../newBuyer/utils";
import Websocket from "../../../services/Websocket";

import MapIcon from "../../../assets/admin/map.png";
import User4Icon from "../../../assets/admin/user4.png";
import AttachmentIcon from "../../../assets/admin/attachment.svg";
import SendIcon from "../../../assets/admin/send.svg";
import SmileyIcon from "../../../assets/admin/smiley.svg";
import DotsIcon from "../../../assets/admin/dots.svg";

import "../market/index.scss";

function Chats() {
  const [chatbox, setChatbox] = useState([]);
  const [selectedChatbox, setselectedChatbox] = useState(null);
  const [fd, setfd] = useState({ msg: "" });
  const messagesEndRef = useRef(null);
  const location = useLocation();
  const abortController = React.useRef();

  useEffect(() => {
    fetchChatbox();
  }, []);

  Websocket.onMessageReceived = (params) => {
    let data = JSON.parse(params.data);
    //console.log(data);
    
    if (parseInt(data.custom_data.chatbox_id) === selectedChatbox.id) {
      const updateselectedChatbox = JSON.parse(JSON.stringify(selectedChatbox));
      updateselectedChatbox.messages.push({
        text: data.custom_data.text,
        created: moment(),
        is_self: false,
      });
      setselectedChatbox(updateselectedChatbox);
      setfd({ ...fd, msg: "" });
      scrollToBottom();
    }    
  };

  const fetchChatbox = async () => {
    try {
      const result = await (await request.get(`api/v1/admin/chatbox/`)).json();
      setChatbox(result);
      if (result.length) {
        if (location?.state?.id) {
          getChatboxData(location?.state?.id, true)();
          return;
        }
        getChatboxData(result[0]?.id, true)();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getChatboxData =
    (id, initial = false) =>
    async (ev) => {
      try {
        if (abortController.current) {
          abortController.current.abort();
        }
        abortController.current = new AbortController();
        const { signal } = abortController.current;

        setselectedChatbox({ id });
        fetch(`${request.appEndpoint}api/v1/admin/chatbox/${id}/`, {
          signal,
          headers: { ...request.getAuth() },
        })
          .then((response) => response.json())
          .then((result) => {
            setselectedChatbox(result);
            if (initial) {
              const $activeUser = document.getElementById(
                "active-user-select-auto"
              );
              $activeUser.scrollIntoView();
            }

            scrollToBottom();
          })
          .catch((error) => {
            throw error;
          });
      } catch (error) {
        console.log(error);
      }
    };

  const onSend = async () => {
    if (!fd.msg || fd.msg === "") {
      return;
    }

    try {
      await request.post(
        `api/v1/admin/chatbox/${selectedChatbox?.id}/send_message/`,
        { text: fd?.msg },
        false
      );
      const updateselectedChatbox = JSON.parse(JSON.stringify(selectedChatbox));
      updateselectedChatbox.messages.push({
        text: fd.msg,
        created: moment(),
        is_self: true,
      });
      setselectedChatbox(updateselectedChatbox);
      setfd({ ...fd, msg: "" });
      scrollToBottom();
    } catch (error) {}
  };

  const scrollToBottom = () => {
    try {
      if (document.getElementsByClassName("chat-body")) {
        document
          .getElementsByClassName("chat-body")[0]
          .scroll(
            0,
            document.getElementsByClassName("chat-body")[0].scrollHeight
          );
      }
    } catch (error) {
      console.log(error);
    }
  };

  window.messagesEndRef = messagesEndRef;

  return (
    <>
      <div className="market-container">
        <main className="side-active">
          <Header />
          <div class="wrapper">
            <Sidebar />
            <section class="maincontent chatmain">
              <aside class="chatlist">
                <header>
                  <div class="h-title">
                    <h2>Inbox</h2>
                    {/* <span class="badge badge-primary ml-3">5 New</span> */}
                    <div class="d-flex ml-auto align-items-center">
                      <label for="">Sort By :</label>
                      <select name="" id="" class="form-control">
                        <option value="">Latest First</option>
                      </select>
                    </div>
                  </div>
                  {/* <form action="">
                    <div class="searchholder">
                      <form action="">
                        <img src={SearchIcon} class="searchicon" alt="" />
                        <input
                          type="text"
                          class="form-control"
                          name=""
                          id=""
                          placeholder="Search"
                        />
                      </form>
                    </div>
                  </form> */}
                </header>
                <ul class="chat-user-list slimscroll">
                  {chatbox?.map((u, i) => (
                    <li
                      key={i}
                      id={`${
                        selectedChatbox?.id === u.id
                          ? "active-user-select-auto"
                          : ""
                      }`}
                      class={`${
                        selectedChatbox?.id === u.id ? "active" : ""
                      } user-select-auto`}
                      onClick={getChatboxData(u.id)}
                    >
                      <div class="media user-card">
                        <img
                          src={u.user_avatar || User4Icon}
                          class="mr-3 userimg"
                          alt=""
                        />
                        <div class="media-body">
                          <h4 className="user-name m-0">{u.user_full_name}</h4>
                          <p class="text-muted m-0">
                            {u.is_online ? "Online" : "Offline"}
                          </p>
                        </div>
                        <span class="time text-muted">{u.last_seen}</span>
                      </div>
                      <div class="msgdisplay ml-3">
                        {/* <p>{u.last_message}</p> */}
                        {Boolean(u.cnt_unread_msg) && (
                          <span class="badge count">{u.cnt_unread_msg}</span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </aside>
              <section class="chatbox">
                <header>
                  <div class="media user-card">
                    <img src={User4Icon} class="mr-3 userimg" alt="" />
                    <div class="media-body">
                      <h4 className="text-white">
                        {selectedChatbox?.user_full_name}
                      </h4>

                      <p class="text-muted m-0">
                        {selectedChatbox?.is_online ? "Online" : "Offline"}
                        {selectedChatbox?.last_seen
                          ? `. Last seen ${selectedChatbox?.last_seen}`
                          : ""}
                      </p>
                    </div>
                    <span class="time text-muted">
                      <img src={DotsIcon} alt="" />
                    </span>
                  </div>
                </header>
                <div class="chat-body slimscroll h-100" ref={messagesEndRef}>
                  {(!selectedChatbox || !selectedChatbox.messages) && (
                    <div className="chat-loader h-100" id="chat-loader">
                      <div>
                        <i className="fa fa-spinner main-color fa-spin fa-5x" />
                      </div>
                    </div>
                  )}
                  {selectedChatbox?.messages?.map((c, i) => (
                    <div key={i} class={`chat-message ${c.is_self ? `self` : ''}`}>
                      <div class="chat-content">
                        <p>{c.text}</p>
                        <div class="chat-message-date">
                          {moment(c.created).format("hh:mm")}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div class="chat-footer">
                  <div class="chat-send">
                    {/* <button type="button" class="attachmentbtn">
                      <img src={AttachmentIcon} alt="" />
                    </button> */}
                    <input
                      value={fd.msg}
                      name="msg"
                      type="text"
                      class="form-control"
                      placeholder="Type a message here"
                      onChange={({ target: { name, value } }) =>
                        setfd({ ...fd, [name]: value })
                      }
                    />
                    {/* <button type="button" class="smileybtn">
                      <img src={SmileyIcon} alt="" />
                    </button> */}
                    <button type="button" class="sendbtn" onClick={onSend}>
                      <img src={SendIcon} alt="" />
                    </button>
                  </div>
                </div>
              </section>
              <div class="chataside">
                <section class="darkcards">
                  <div class="card p-cards">
                    <figure>
                      <img
                        src={selectedChatbox?.land_image || MapIcon}
                        class="img-fluid"
                        alt=""
                      />
                    </figure>
                    <div class="card-body">
                      <div class="d-flex align-items-center justify-content-between">
                        <img src={User4Icon} class="img-fluid" alt="" />
                      </div>
                      <div class="innerinfo mb-2">
                        <h3 class="text-white truncate">
                          {selectedChatbox?.land_name || "No title"}
                        </h3>
                        <p class="m-0 truncate">
                          {selectedChatbox?.land_description || "No description"}
                        </p>
                      </div>
                      <div class="d-flex align-items-center justify-content-between">
                        <p class="card-text mb-0">
                          <span class="text-primary">Price Range :</span>{" "}
                          {nFormatter(selectedChatbox?.seller_min_price, 3)} -
                          {nFormatter(selectedChatbox?.seller_max_price, 3)} MANA
                        </p>
                        <div class="badge-holder">
                          <span class="badge badge-primary">
                            {selectedChatbox?.cnt_bids} Bids
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  );
}

export default Chats;
