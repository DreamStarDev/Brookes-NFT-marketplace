import React, { useState, useEffect } from "react";
import moment from "moment";
import request from "../../services/Requests";
import Websocket from "../../services/Websocket";
import { useHistory, useParams   } from "react-router-dom";
import ArrowDownIcon from "../../assets/admin/arrowdown.svg";
import BuildingIcon from "../../assets/building-r.svg";
import LeftIcon from "../../assets/left-icon.svg";
import MapIcon from "../../assets/admin/map.png";
import MapNewIcon from "../../assets/land-map.svg";
import ChatUserIcon from "../../assets/chat-user.svg";
import UserNewIcon from "../../assets/user-new.png";
import AttachIcon from "../../assets/attach.svg";
import SmileyIcon from "../../assets/smiley.svg";
import SendIcon from "../../assets/send.svg";
import LocationIcon from "../../assets/location.svg";
import NoMessageIcon from "../../assets/no-message.svg";
import Header from "../common/header";
import Footer from "../common/footer";
import "./landDetail.scss";
import Moment from 'moment';

export default function SellerLandDetail({ setTabSelected, tabSelected }) {
  const history = useHistory();
  const [isLoading, setisLoading] = useState(true);
  const [land, setLand] = useState([]);
  const [text, setText] = useState();
  const params = useParams();

  Websocket.onMessageReceived = (params) => {
    let data = JSON.parse(params.data);

      console.log(data);
    
    if (land.chatbox_id === parseInt(data.custom_data.chatbox_id)) {
      let tmp_land = JSON.parse(JSON.stringify(land));
      let chatbox_messages = JSON.parse(JSON.stringify(tmp_land.chatbox_messages));
      chatbox_messages.push({
        text: data.custom_data.text,
        created: moment(),
        is_self: false,
      });
      tmp_land.chatbox_messages = chatbox_messages;
      setLand(tmp_land);
      scrollToBottom();
    }
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
  
  useEffect(() => {
    fetchLandDetail();
  }, []);

  const fetchLandDetail = async () => {
    try {
      const result = await (
        await request.get(`api/v1/my_market_lands/${params?.land_id}/`)
      ).json();
      setLand(result);
      scrollToBottom();
    } catch (error) {
      console.log(error);
    }
    setisLoading(false);
  };

  const handleEdit = async () => {
    // try {
    //   const result = await request.post(
    //     `api/v1/my_lands/${params?.land_id}/accept/`,
    //     {},
    //     false
    //   );
    //   if(result.ok){
    //     history.push({ pathname: "/lands"});
    //   }
    //   else{
    //     throw new Error("You can't accept this for now.");
    //   }
    // } catch (error) {
    //   console.log(error);
    //   alert(error);
    // }
  };

  const handleWithdraw = async () => {
    // try {
    //   const result = await request.post(
    //     `api/v1/my_lands/${params?.land_id}/decline/`,
    //     {},
    //     false
    //   );
    //   if(result.ok){
    //     history.push({ pathname: "/lands"});
    //   }
    //   else{
    //     throw new Error("You can't decline this for now.");
    //   }
    // } catch (error) {
    //   console.log(error);
    //   alert(error);
    // }
  };
  const handleBack = async () => {
    history.push({ pathname: "/sell/2"})
  };
  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSendMessage = async () => {
    try {
      await request.post(
        `api/v1/send_message/`,
        {
          chatbox_id: land.chatbox_id,
          text: text
        },
        false
      );

      let tmp_land = JSON.parse(JSON.stringify(land));
      let chatbox_messages = JSON.parse(JSON.stringify(tmp_land.chatbox_messages));
      chatbox_messages.push({
        text: text,
        created: moment(),
        is_self: true,
      });
      tmp_land.chatbox_messages = chatbox_messages;
      setLand(tmp_land);

      setText("");

    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return (
    <>
      <div className="seller-container">
        <Header />
        <section className="sellerinner" style={{paddingBottom:"0px"}}>
          <div className="circleleftop" />
          <img src={BuildingIcon} className="buildingtl" alt=".." />
          <div className="container mt-5" style={{zIndex: "3",position: "relative"}}>
            <div className="topaction" onClick={handleBack}>
              <img src={LeftIcon} alt="" />
              <strong>Back To Market lands</strong>
            </div>
            <section className="ld-card darkcards">
              <div>
                  {land.id && (
                  <div
                    className="col-lg-12"
                    style={{zIndex:"3"}}
                  >
                    <div className="row">
                      <div className="col-lg-4 col-md-4 col-sm-4" 
                        style={{zIndex:"3",padding: "0px"}}>
                          <img
                            src={land?.image}
                            className="img-fluid"
                            alt=""
                            style={{borderRadius: "6px"}}
                          />
                      </div>
                      
                      <div className="col-lg-8 col-md-8 col-sm-8 land-detail">
                        <div>
                          <h3 className="ld-title text-white mt-3">
                            {/* <img
                              src={land?.user_avatar || UserNewIcon}
                              className="ld-user-img img-fluid"
                              alt=""
                            /> */}
                            {land?.name || "No title"}
                            {/* <img
                              src={land?.location_img || LocationIcon}
                              className="img-fluid float-right"
                              alt=""
                            /> */}
                          </h3>
                        </div>
                        <div style={{minHeight:"60px"}}>
                          <div className="ld-b-desc">
                            {land?.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nibh facilisi nec tellus purus cum volutpat. Dictum malesuada nisl in sit odio urna velit viverra. Urna nisi, pharetra velit donec nisl tempor fringilla nunc nec. Vestibulum quis in pellentesque aliquet elementum consectetur."}
                          </div>
                        </div>
                        <div className="mt-4 mb-1 d-flex align-items-center">
                          <span className="padding-right-two">
                            <span className="text-label">{"Price range"}</span>
                              {/* ${inputError ? "inputError" : ""} */}
                          </span>
                            <div className="input-group mb-2" style={{width:"auto"}}>
                              <input className={`ld-input form-control `} 
                                type="number"
                                style={{ backgroundColor: "#425876", width: "140px",
                                height: "62px", borderRadius: "6px 0px 0px 6px", 
                                // textAlign: "center", 
                                // margin: "0px 15px",
                                display: "inline-block",
                                border: "none",
                                color: "#D8D8D8", fontWeight: "500" }}
                                // onChange={onInputChange}
                                // value={agreedPrice}
                                value={land?.min_price}
                                readOnly
                              /> 
                              <div className="input-group-append">
                                <span className="ld-input-suffix input-group-text" id="basic-addon2">Min</span>
                              </div>
                            </div>
                            <span className="ld-hypen ml-3 mr-3">{"-"}</span>
                            <div className="input-group mb-2" style={{width:"auto"}}>
                              <input className={`ld-input form-control `} 
                                type="number"
                                style={{ backgroundColor: "#425876", width: "140px",
                                height: "62px", borderRadius: "6px 0px 0px 6px", 
                                // textAlign: "center", 
                                // margin: "0px 15px",
                                display: "inline-block",
                                border: "none",
                                color: "#D8D8D8", fontWeight: "500" }}
                                // onChange={onInputChange}
                                // value={agreedPrice}
                                value={land?.max_price}
                                readOnly
                              /> 
                              <div className="input-group-append">
                                <span className="ld-input-suffix input-group-text" id="basic-addon2">Max</span>
                              </div>
                            </div>
                            <span className="ld-price-text ml-3">{"MANA"}</span>
                        </div>
                        <hr style={{background:"rgba(255, 255, 255, 0.32)"}} />
                        <div className="mt-4 mb-4">
                          <span className="text-label text-yellow padding-right-one borderRight">
                            {"Position"} &nbsp; &nbsp; 
                            <span className="text-white" style={{fontWeight:"600"}}>
                              {land?.x || ""}, {land?.y || ""}
                            </span>
                          </span>
                          <span className="text-label text-yellow padding-right-one  padding-left-one">
                            {"Type"} &nbsp; &nbsp;
                            <span className="text-white" style={{fontWeight:"600"}}>
                              {land?.land_type === 1 ? "Parcel" : "Estate"}
                            </span>
                          </span>
                          {/* <span className="padding-left-two">
                            <button className="btn btn-save mr-3" type="button" onClick={handleEdit}>{"Edit & Save"}</button>
                            <button className="btn btn-remove" type="button" onClick={handleWithdraw}>{"Withdraw land"}</button>
                          </span> */}
                        </div>
                      </div>
                    </div>
                  </div>
                  )}
                {isLoading && (
                  <div className="loader-div" style={{textAlign:"center",minHeight:"250px"}}>
                    <div className="chat-loader h-100" id="chat-loader">
                      <div>
                        <i className="fa fa-spinner main-color fa-spin fa-5x" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <hr style={{background:"rgba(255, 255, 255, 0.32)"}} />
              
              {/* Chat section */}
              {/* <div className="ld-no-message">
                <img src={NoMessageIcon} alt="" />
                <p className="ld-no-message-text mt-3">You don't have any message. Lorem Ipsum has been the industry's standard <br/> dummy text ever since the 1500s, when an unknown printer took.</p>
              </div> */}
              {land?.chatbox_id ? (
              <div className="container ld-chat-container mt-5" style={{width:"80%", marginBottom:"100px"}}>
                <div className="ld-chat-header">
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center">
                        <img className="ld-chat-img mr-3" src={ChatUserIcon} alt=""/>
                        <div>
                          <h2 className="ld-chat-title mb-0">
                            {"Administrator"}
                          </h2>
                          {/* <span className="ld-chat-status mr-3">Offline</span>
                          <span className="mr-3 dot"></span>
                          <span className="ld-chat-last-seen">Last seen 3 hours ago</span> */}
                        </div>
                      </div>
                      {/* <div>
                        <span className="ld-chat-options">{"..."}</span>
                      </div> */}
                    </div>
                </div>
                <div className="ld-chat-body  chat-body slimscroll">
                  {land?.chatbox_messages?.map((item, i) => (
                    <div className={`${item.is_self ? "rhs-message":"lhs-message"}`}>
                      <div className={`ld-chat-message ${item.is_self ? "receive":"send"}`}>
                        {item?.text}
                        <div className="ld-chat-time mt-2">
                        {Moment(item?.created).format('hh:mm a') || ""}
                        </div>
                      </div>
                    </div>
                  ))}
                  {/* <div className="lhs-message">
                    <div className="ld-chat-message send">
                      {"Hi Admin ! What’s Up?"}
                      <div className="ld-chat-time mt-2">{"12:15 pm"}</div>
                    </div>
                  </div>
                  <div className="rhs-message">
                    <div className="ld-chat-message receive">
                      {"Lorem ipsum dolor sit amet elit. Est eleifend vitae ultricies consectetur venenatis."}
                      <div className="ld-chat-time mt-2">{"12:15 pm"}</div>
                    </div>  
                  </div>
                  <div className="lhs-message">
                    <div className="ld-chat-message send">
                      {"Lorem ipsum dolor sit amet elit. Est eleifend vitae ultricies consectetur venenatis."}
                      <div className="ld-chat-time mt-2">{"12:15 pm"}</div>
                    </div>
                  </div>
                  <div className="lhs-message">
                    <div className="ld-chat-message send">
                      {"Hi Admin ! What’s Up?"}
                      <div className="ld-chat-time mt-2">{"12:15 pm"}</div>
                    </div>
                  </div>
                  <div className="rhs-message">
                    <div className="ld-chat-message receive">
                      {"Lorem ipsum dolor sit amet elit. Est eleifend vitae ultricies consectetur venenatis."}
                      <div className="ld-chat-time mt-2">{"12:15 pm"}</div>
                    </div>  
                  </div>
                  <div className="rhs-message">
                    <div className="ld-chat-message receive">
                      {"Hi Aliya ! What’s Up?"}
                      <div className="ld-chat-time mt-2">{"12:15 pm"}</div>
                    </div>  
                  </div> */}
                </div>
                <div className="ld-chat-footer">
                  <div className="ld-chat-input-box">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text ld-chat-input-prefix" id="basic-addon1">
                        {/* <img className="ml-5" src={AttachIcon} alt=""/> */}
                      </span>
                    </div>
                    <input type="text" onChange={handleChange} value={text}
                      className="ld-chat-input form-control" 
                      placeholder="Type a message here" aria-label="Username" aria-describedby="basic-addon1" />
                    <div className="input-group-append">
                      <span className="input-group-text ld-chat-input-suffix" id="basic-addon1">
                          {/* <img  className="mr-4" src={SmileyIcon} alt=""/> */}
                          <button style={{background: "#0e2440", border: "none"}} type="button" onClick={handleSendMessage}>
                          <img  className="mr-5" src={SendIcon} alt=""/></button>
                        </span>
                    </div>
                  </div>
                  </div>
                </div>
              </div>) : (<div className="ld-no-message">
                <img src={NoMessageIcon} alt="" />
                <p className="ld-no-message-text mt-3">You don't have any message. Lorem Ipsum has been the industry's standard <br/> dummy text ever since the 1500s, when an unknown printer took.</p>
              </div>)
              }
            </section>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}
