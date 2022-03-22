import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import Sidebar from "../common/sidebar";
import Header from "../common/header";
import request from "../../../services/Requests";
import { nFormatter } from "../../../pages/newBuyer/utils";

import LeftIcon from "../../../assets/admin/lefticon.svg";
import MapIcon from "../../../assets/admin/map.png";
import Main1Icon from "../../../assets/admin/main1.png";
import User1Icon from "../../../assets/admin/user1.png";
import User3Icon from "../../../assets/admin/user3.png";
import User4Icon from "../../../assets/admin/user4.png";
import User5Icon from "../../../assets/admin/user5.png";
import User6Icon from "../../../assets/admin/user6.png";
import User7Icon from "../../../assets/admin/user7.png";
import DefaultUserIcon from "../../../assets/admin/user0-1.png";

import ChatIcon from "../../../assets/admin/chat.svg";
import ArrowDownIcon from "../../../assets/admin/arrowdown.svg";

import "../market/index.scss";

function LandDetail() {
  const history = useHistory();
  const params = useParams();
  const [land, setLand] = useState({});
  const [paginatedBids, setpaginatedBids] = useState([]);
  const [next, setNext] = useState(0);
  const bidsPerPage = 5;

  useEffect(() => {
    fetchLand();
  }, []);

  const fetchLand = async () => {
    try {
      const result = await (
        await request.get(`api/v1/admin/proposal/${params?.land_id}/`)
      ).json();
      setLand(result);
      handleNext(result?.bids, true);
    } catch (error) {
      console.log(error);
    }
  };

  const loopWithSlice = (start, end, _bids = null) => {
    const slicedPosts = JSON.parse(JSON.stringify(_bids || land.bids)).slice(
      start,
      end
    );
    if (start === 0) {
      setpaginatedBids([...slicedPosts]);
    } else {
      setpaginatedBids([...paginatedBids, ...slicedPosts]);
    }
  };

  const handleNext = (_bids = null, force = false) => {
    let nnext = next;
    if (force) {
      nnext = 0;
    }
    loopWithSlice(
      nnext,
      nnext + bidsPerPage,
      Array.isArray(_bids) ? _bids : null
    );
    setNext(nnext + bidsPerPage);
  };

  const onSellerChatClick = () => async () => {
    if (land.seller_chatbox) {
      // if the land has already seller chatbox
      history.push({ pathname: "/chats", state: { id: land.seller_chatbox } });
      return;
    } else {
      // create seller chatbox first and redirect
      try {
        const result = await (
          await request.post(`api/v1/admin/chatbox/`, { land: land.id }, false)
        ).json();
        history.push({ pathname: "/chats", state: { id: result?.id } });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const onChatClick = (item) => async () => {
    if (item.chatbox) {
      history.push({ pathname: "/chats", state: { id: item.chatbox } });
      return;
    }
    try {
      const result = await (
        await request.post(`api/v1/admin/chatbox/`, { bid: item.id }, false)
      ).json();
      history.push({ pathname: "/chats", state: { id: result?.id } });
    } catch (error) {
      console.log(error);
    }
  };

  const onOfferClick = (item) => async () => {
    history.push({ pathname: "/admin/offers/create/"+item.id});
  };

  return (
    <>
      <div className="market-container">
        <Header />
        <div class="wrapper">
          <Sidebar />
          <section class="maincontent">
            <div class="topaction" onClick={() => history.push("/admin/proposals")}>
              <img src={LeftIcon} alt="" />
              <strong>Back To Proposals</strong>
            </div>
            <section class="darkcards h-cards">
              <div class="card p-cards" style={{ transform: "none" }}>
                <div class="media">
                  <figure class="mr-3">
                    <img
                      src={land.image}
                      class="img-fluid"
                      alt=""
                      style={{ height: "320px", width: "320px" }}
                    />
                  </figure>
                  <div class="media-body">
                    <div class="card-body">
                      <h3 class="text-white mt-0">
                        {land?.name || "No title"}
                      </h3>
                      <p class="card-text" style={{ height: "180px" }}>
                        {land?.description || "No description"}
                      </p>
                      <hr />
                      <div style={{ width: "65%" }}>
                        <ul class="list-inline">
                          <li class="list-inline-item">
                            <span class="mr-3">Price Range </span>
                            <strong class="text-white">
                              {nFormatter(land.min_price, 3)}&nbsp;-&nbsp;
                              {nFormatter(land.max_price, 3)} Mana
                            </strong>
                          </li>
                          <li class="list-inline-item">
                            <span class="mr-3">
                              {land.type === 1 ? "Position" : "Center"}{" "}
                            </span>
                            <strong class="text-white">
                              {land?.x}, {land?.y}
                            </strong>
                          </li>
                          <li class="list-inline-item">
                            <span class="mr-3">Type </span>
                            <strong class="text-white">
                              {land.type === 1 ? "Parcel" : "Estate"}
                            </strong>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card p-cards" style={{ transform: "none" }}>
                <div class="media">
                  <figure class="mr-3">
                    <img src={Main1Icon} class="img-fluid" alt="" />
                  </figure>
                  <div class="media-body">
                    <div class="card-body">
                      <h3 class="text-white mt-0">{land?.user_full_name}</h3>
                      <p>
                        <span class="text-primary">{land?.user_points}</span>
                        <span class="text-white"> Stars</span>
                      </p>
                      <p class="card-text" style={{ height: "100px" }}>
                        No description
                      </p>
                      <hr />
                      <ul class="list-inline">
                        <li class="list-inline-item">
                          <span class="mr-3">Email </span>
                          <strong class="text-white">{land?.user_email}</strong>
                        </li>
                        <li>
                          <div 
                            class="badge-holder chaticonb cursor-pointer"
                            onClick={onSellerChatClick()}
                          >
                            <span class={`badge badge-primary default`}>
                              <img src={ChatIcon} alt="" /> Chat
                            </span>
                          </div>
                        </li>                        
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section class="table-section">
              <div class="table-responsive mb-5">
                <table class="table table-dark">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Stars</th>
                      <th>Min</th>
                      <th>Max</th>
                      <th style={{ width: "150px" }}>Negotiation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedBids?.map((item, i) => (
                      <tr key={i}>
                        <td>
                          <a className="text-white">
                            <img
                              src={item.user_avatar || User1Icon}
                              alt=""
                              className="mr-3"
                            />
                            {item.user_full_name}
                          </a>
                        </td>
                        <td>{item.user_email}</td>
                        <td>
                          <span class="text-yellow">{item.user_points}</span>
                        </td>
                        <td>{nFormatter(item.min_price, 3)} Mana</td>
                        <td>{nFormatter(item.max_price, 3)} Mana</td>
                        <td style={{ width: "150px" }}>
                          <div
                            class="badge-holder chaticonb cursor-pointer"
                            onClick={onChatClick(item)}
                          >
                            <span
                              class={`badge badge-primary ${
                                item.cnt_unread_msg ? "" : "default"
                              }`}
                            >
                              <img src={ChatIcon} alt="" /> Chat
                            </span>
                            {Boolean(item.cnt_unread_msg) && (
                              <span class="status status-danger">
                                {item.cnt_unread_msg}
                              </span>
                            )}
                          </div>
                          <div
                            class="badge-holder chaticonb cursor-pointer"
                            onClick={onOfferClick(item)}
                            style={{marginTop: "10px"}}
                          >
                            <span class={`badge badge-primary default`}>
                              Offer
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {land?.bids?.length && (
                <div className="loadmore mb-5" onClick={handleNext}>
                  <button
                    className={`btn btn-loadmore ${
                      paginatedBids.length === land?.bids?.length
                        ? "btn-loadmore-disabled"
                        : ""
                    }`}
                    {...{
                      ...(paginatedBids.length === land?.bids?.length && {
                        disabled: true,
                      }),
                    }}
                  >
                    <span className="loadicon">
                      <img src={ArrowDownIcon} alt="" />
                    </span>
                    <span>Load More</span>
                  </button>
                </div>
              )}
            </section>
          </section>
        </div>
      </div>
    </>
  );
}

export default LandDetail;
