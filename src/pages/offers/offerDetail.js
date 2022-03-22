import React, { useState, useEffect } from "react";
import request from "../../services/Requests";
import { useHistory, useParams   } from "react-router-dom";
import ArrowDownIcon from "../../assets/admin/arrowdown.svg";
import BuildingIcon from "../../assets/building-r.svg";
import LeftIcon from "../../assets/left-icon.svg";
import MapIcon from "../../assets/admin/map.png";
import Header from "../common/header";
import Footer from "../common/footer";
import "./offers.scss";
import Moment from 'moment';

export default function OfferDetail({ setTabSelected, tabSelected }) {
  const history = useHistory();
  const [isLoading, setisLoading] = useState(true);
  const [offer, setOffer] = useState([]);
  const params = useParams();

  useEffect(() => {
    fetchOfferDetail();
  }, []);

  const fetchOfferDetail = async () => {
    try {
      const result = await (
        await request.get(`api/v1/my_offers/${params?.offer_id}/`)
      ).json();
      setOffer(result);
    } catch (error) {
      console.log(error);
    }
    setisLoading(false);
  };

  const handleAccept = async () => {
    try {
      const result = await request.post(
        `api/v1/my_offers/${params?.offer_id}/accept/`,
        {},
        false
      );
      if(result.ok){
        history.push({ pathname: "/offers"});
      }
      else{
        throw new Error("You can't accept this for now.");
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  const handleDecline = async () => {
    try {
      const result = await request.post(
        `api/v1/my_offers/${params?.offer_id}/decline/`,
        {},
        false
      );
      if(result.ok){
        history.push({ pathname: "/offers"});
      }
      else{
        throw new Error("You can't decline this for now.");
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return (
    <>
      <div className="buyer-container">
        <Header />
        <section className="buyerinner">
          <div className="circleleftop" />
          <img src={BuildingIcon} className="buildingtl" alt=".." />
          <div className="container mt-5">
            <div class="topaction">
              <div className="bo-title"> 
                <img src={LeftIcon} alt="" style={{zIndex:"4"}} onClick={() => history.push("/offers")} /> 
                <h1 style={{ margin: "0px 25px", fontWeight: "600"}}> Offer ID 
                  <span className="text-yellow ml-3 font-weight-bold">{offer?.id}</span> 
                </h1>
              </div>
            </div>
            {/* <h1 className="bo-title">Offers ID </h1> */}
            <section className="darkcards mb-5">
              <div>
                  {offer.id && (
                  <div
                    className="col-lg-12"
                    style={{zIndex:"3"}}
                  >
                    <div className="row">
                      <div className="col-lg-4 col-md-4 col-sm-4 d-flex align-items-center justify-content-center" 
                        style={{zIndex:"3", borderRight: "1px solid rgb(185 185 185 / 32%)", paddingRight: "30px"}}>
                        <img
                          src={offer?.image}
                          // src={MapIcon}
                          className="img-fluid"
                          alt=""
                          style={{borderRadius:"15px"}}
                        />
                      </div>
                      
                      <div className="col-lg-8 col-md-8 col-sm-8 bo-detail bo-detail-padding">
                        <div>
                          <h3 className="text-white">
                            {offer?.name || "No title"}
                          </h3>
                        </div>
                        <div style={{minHeight:"60px"}}>
                          <div className="text-white">
                            {offer?.description}
                          </div>
                        </div>
                        <div className="mt-5 mb-1">
                          <span class="text-yellow padding-right-two borderRight">
                            {"Position"} &nbsp; &nbsp; 
                            <span class="text-white" style={{fontWeight:"600"}}>
                              {offer?.x}, {offer?.y}
                            </span>
                          </span>
                          <span class="text-yellow padding-right-two  padding-left-two borderRight">
                            {"Type"} &nbsp; &nbsp;
                            <span class="text-white" style={{fontWeight:"600"}}>
                              {offer.land_type === 1 ? "Parcel" : "Estate"}
                            </span>
                          </span>
                          <span class="text-yellow padding-left-two">
                            {"Price agreed"} &nbsp; &nbsp;
                            <span class="text-white" style={{fontWeight:"600"}}>
                              {offer?.price} MANA
                            </span>
                          </span>
                        </div>
                        <hr style={{background:"rgba(255, 255, 255, 0.32)"}} />

                        <div className="mt-4 mb-4">
                          <span class="text-yellow padding-right-two">
                            {"Offer sent date "} &nbsp; &nbsp; 
                            <span class="text-white" style={{fontWeight:"600"}}>
                              {Moment(offer?.created).format('YYYY-MM-DD')}
                            </span>
                          </span>
                          {/* <span class="text-yellow padding-left-two">
                            {"Amount to be recieved"} &nbsp; &nbsp; 
                            <span class="text-white" style={{fontWeight:"600"}}>
                              11,985 MANA
                            </span>
                          </span> */}
                        </div>
                        <hr style={{background:"rgba(255, 255, 255, 0.32)"}} />

                        <div className="d-flex align-items-center">
                          {/* <span class="text-yellow padding-right-two borderRight">
                            {"Etherium amount to be recieved"} &nbsp; 
                            <span class="text-white" style={{fontWeight:"600"}}>
                              0.00125 ETH
                            </span>
                          </span> */}
                          <span className="">
                            <div className="bo-info-badge">
                              You are {offer?.user_type} on this offer
                            </div>
                          </span>
                        </div>
                      </div>
                      <div className="bo-btns">
                          <button className="btn btn-accept" type="button" onClick={handleAccept}>Accept</button>
                          <button className="btn btn-decline" type="button" onClick={handleDecline}>Decline</button>
                        </div>
                      {/* <div className="circleleftop" /> */}
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
            </section>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}
