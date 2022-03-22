import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import Sidebar from "../common/sidebar";
import Header from "../common/header";
import request from "../../../services/Requests";
import "./index.scss";

function CreateOffer() {
  const history = useHistory();
  const params = useParams();
  const [data, setData] = useState({});
  const [agreedPrice, setAgreedPrice] = useState('');
  const [isLoading, setisLoading] = useState(true);
  const [inputError, setinputError] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await (
        await request.get(`api/v1/admin/bid/${params?.buyer_id}/`)
      ).json();
      setData(result);
    } catch (error) {
      console.log(error);
    }
    setisLoading(false);
  };

  const onInputChange = ({ target: { name, value } }) => {
    setAgreedPrice(value);
  };

  const sendOffer = async () => {
    if (agreedPrice === undefined || agreedPrice === "null" || agreedPrice === "") {
      setinputError(true);
      // alert("Please enter agreed price!");
      return false;
    }
    try {
      const result = await request.post(
        "api/v1/admin/offer/",
        {
          bid: params?.buyer_id,
          price: agreedPrice
        },
        false
      );
      if(result.ok){
        history.push({ pathname: "/admin/offers"});
      }
      else{
        throw new Error("You can't send an offer on this for now.");
      }
    } catch (error) {
      console.log(error);
      // setinputError(true);
      alert(error);
    }
  };

  return (
    <>
      <div className="market-container">
        <Header />
        <div class="wrapper">
          <Sidebar />
          <section className="maincontent">
            <div className="tophead tophead-new">
              <h3>Create an Offer</h3>
            </div>
            {data?.land && (
            <section class="darkcards darkcards-new h-cards d-flex justify-content-around row">
              <div class="col-lg-4 col-md-4 col-sm-4" style={{ transform: "none" }}>
                <div class="media-new">
                  <div class="mr-3">
                  <img
                      src={data?.land?.image}
                      class="img-fluid"
                      alt=""
                      style={{ backgroundColor: "#26272e",
                      borderRadius: "6px",
                      padding: "10px" }}
                    />
                  </div>
                </div>
              </div>
              <div class="col-lg-8 col-md-8 col-sm-8">
                <div class="card p-cards" style={{ transform: "none", padding: "20px" }}>
                  <div class="card-body">
                    <h3 class="text-white mt-0">
                      {data?.land?.name || "No title"}
                    </h3>
                    <p class="card-text" style={{ minHeight: "80px" }}>
                      {data?.land?.description || "No description"}
                    </p>
                    <div>
                      <ul class="list-inline justify-content-start">
                        <li class="list-inline-item">
                          <span class="mr-3">
                            {data?.land?.type === 1 ? "Position" : "Center"} &nbsp; 
                            <strong class="text-white">{data?.land?.x}, {data?.land?.y}</strong>
                          </span>
                        </li>
                        <li class="list-inline-item">
                          <span class="mr-3">Type &nbsp; 
                          <strong class="text-white">
                            {data?.land?.type === 1 ? "Parcel" : "Estate"}
                          </strong></span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="card p-cards" style={{ transform: "none" }}>
                  <div class="card-body">
                    <h3 class="text-white mt-0">
                      {"Seller Details"}
                    </h3>
                    <ul class="list-inline justify-content-start" style={{ marginBottom: "15px"}}>
                      <li class="list-inline-item">
                        <span class="mr-3">
                          {"Full Name"} &nbsp; 
                          <span class="text-white">{data?.seller?.name}</span>
                        </span>
                      </li>
                      <li class="list-inline-item">
                        <span class="mr-3">
                          {"Email"} &nbsp; 
                          <span class="text-white">{data?.seller?.email}</span>
                        </span>
                      </li>
                    </ul>
                    <ul class="list-inline justify-content-start" style={{ marginBottom: "15px"}}>
                      <li class="list-inline-item">
                        <span class="mr-3">
                          {"Star Points"} &nbsp; 
                          <span class="text-white">{data?.seller?.points}</span>
                        </span>
                      </li>
                    </ul>  
                  </div>
                </div>

                <div class="card p-cards" style={{ transform: "none" }}>
                  <div class="card-body">
                    <h3 class="text-white mt-0">
                      {"Buyer Details"}
                    </h3>
                    <ul class="list-inline justify-content-start" style={{ marginBottom: "15px"}}>
                      <li class="list-inline-item">
                        <span class="mr-3">
                          {"Full Name"} &nbsp; 
                          <span class="text-white">{data?.buyer?.name}</span>
                        </span>
                      </li>
                      <li class="list-inline-item">
                        <span class="mr-3">
                          {"Email"} &nbsp; 
                          <span class="text-white">{data?.buyer?.email}</span>
                        </span>
                      </li>
                    </ul>
                    <ul class="list-inline justify-content-start" style={{ marginBottom: "15px"}}>
                      <li class="list-inline-item">
                        <span class="mr-3">
                          {"Star Points"} &nbsp; 
                          <span class="text-white">{data?.buyer?.points}</span>
                        </span>
                      </li>
                    </ul>  
                  </div>
                </div>

                <div class="card p-cards" style={{ transform: "none" }}>
                  <div class="card-body">
                    <h5 class="text-white mt-0">
                      {"Agreed Price"}
                      <input className={`price-input form-control ${inputError ? "inputError" : ""}`} 
                        type="number"
                        style={{ backgroundColor: "#202025", width: "130px",
                        height: "50px", borderRadius: "10px", textAlign: "center", 
                        margin: "0px 14px",
                        display: "inline-block",
                        border: "none",
                        color: "#F29E2A", fontWeight: "600" }}
                        onChange={onInputChange}
                        value={agreedPrice}
                      /> 
                      {"MANA"}
                    </h5>
                  </div>  
                </div> 

                <div className="d-flex justify-content-end">
                  <button 
                      className="btn offer-btn" type="button"
                      onClick={sendOffer}>Send Offer</button>
                </div>
              </div>
            </section>)}

            {isLoading && (
              <div className="loader-div">
                <div className="chat-loader h-100" id="chat-loader">
                  <div>
                    <i className="fa fa-spinner main-color fa-spin fa-5x" />
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </>
  );
}

export default CreateOffer;
