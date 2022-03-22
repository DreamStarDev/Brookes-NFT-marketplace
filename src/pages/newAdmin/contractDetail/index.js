import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import Sidebar from "../common/sidebar";
import Header from "../common/header";
import request from "../../../services/Requests";
import MapImg from "../../../assets/admin/map.png";
import LeftIcon from "../../../assets/admin/lefticon.svg";
// import "./index.scss";

function ContractDetail() {
  const history = useHistory();
  const params = useParams();
  const [contract, setContract] = useState({});
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    fetchContract();
  }, []);

  const fetchContract = async () => {
    try {
      const result = await (
        await request.get(`api/v1/admin/contract/${params?.contract_id}/`)
      ).json();
      setContract(result);
    } catch (error) {
      console.log(error);
    }
    setisLoading(false);
  };


  return (
    <>
      <div className="market-container">
        <Header />
        <div class="wrapper">
          <Sidebar />
          <section className="maincontent">
            <div class="topaction" onClick={() => history.push("/admin/contracts")}>
              <img src={LeftIcon} alt="" />
              <strong>Back To Contracts</strong>
            </div>
            {contract?.id && (
            <div> 
              <div className="tophead"  style={{margin:"0px 3% 20px"}}>
                <h3>Contract ID &nbsp;<span className="orange-text">{contract?.id}</span></h3>
              </div>
              <section class="darkcards h-cards"  style={{margin:"10px 3% 40px"}}>
              <div className="row">
                <div class="col-lg-4 col-md-4 col-sm-4" style={{ transform: "none" }}>
                  <div class="media-new">
                    <div class="mr-3">
                      <img
                        src={contract.image}
                        // src={MapImg}
                        class="img-fluid"
                        alt=""
                        style={{ backgroundColor: "#26272e",
                        borderRadius: "6px",
                        padding: "10px", width:"95%"}}
                      />
                    </div>
                  </div>
                </div>
                
                <div class="col-lg-8 col-md-8 col-sm-8">
                  <div class="card p-cards" style={{ transform: "none", padding: "20px",marginBottom: "40px" }}>
                    <div class="card-body">
                      <h3 class="text-white mt-0">
                        {contract?.name || "No title"}
                      </h3>
                      <p class="card-text" style={{ minHeight: "80px" }}>
                        {contract?.description || "No description"}
                      </p>
                      <div>
                        <ul class="list-inline justify-content-start">
                          <li class="list-inline-item">
                            <span class="mr-3">
                              {contract.land_type === 1 ? "Position" : "Center"}  &nbsp; 
                              <strong class="text-white">{contract?.x}, {contract?.y}</strong>
                            </span>
                          </li>
                          <li class="list-inline-item">
                            <span class="mr-3">Type  &nbsp; 
                            <strong class="text-white">
                              {contract.land_type === 1 ? "Parcel" : "Estate"}
                            </strong></span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div class="card p-cards" style={{ transform: "none",marginBottom: "40px" }}>
                    <div class="card-body">
                      <h3 class="text-white mt-0">
                        {"Buyer Details"}
                      </h3>
                      <ul class="list-inline justify-content-start" style={{ marginBottom: "15px"}}>
                        <li class="list-inline-item">
                          <span class="mr-3">
                            {"Name"} &nbsp; 
                            <span class="text-white">
                              {contract?.buyer_name}
                            </span>
                          </span>
                        </li>
                        <li class="list-inline-item">
                          <span class="mr-3">
                            {"Email"} &nbsp; 
                            <span class="text-white">{contract?.buyer_email}</span>
                          </span>
                        </li>
                      </ul>
                      {/* <ul class="list-inline justify-content-start" style={{ marginBottom: "15px"}}>
                        <li class="list-inline-item">
                          <span class="mr-3">
                            {"Star Points : "}
                            <span class="text-white">{buyer?.user_points}</span>
                          </span>
                        </li>
                      </ul>   */}
                    </div>
                  </div>

                  <div class="card p-cards" style={{ transform: "none",marginBottom: "40px" }}>
                    <div class="card-body">
                      <h3 class="text-white mt-0">
                        {"Seller Details"}
                      </h3>
                      <ul class="list-inline justify-content-start" style={{ marginBottom: "15px"}}>
                        <li class="list-inline-item">
                          <span class="mr-3">
                            {"Name"} &nbsp; 
                            <span class="text-white">
                              {contract?.seller_name}
                            </span>
                          </span>
                        </li>
                        <li class="list-inline-item">
                          <span class="mr-3">
                            {"Email"} &nbsp; 
                            <span class="text-white">{contract?.seller_email}</span>
                          </span>
                        </li>
                      </ul>
                      {/* <ul class="list-inline justify-content-start" style={{ marginBottom: "15px"}}>
                        <li class="list-inline-item">
                          <span class="mr-3">
                            {"Star Points : "}
                            <span class="text-white">{contract?.user_points}</span>
                          </span>
                        </li>
                      </ul>   */}
                    </div>
                  </div>

                  <div class="card p-cards" style={{ transform: "none",marginBottom: "40px" }}>
                    <div class="card-body">
                      <h3 class="text-white mt-0">
                        {"Contract Status"}
                      </h3>
                      <div className="d-flex align-items-center justify-content-start">
                        <span className="orange-dot margin-right-half"></span>
                        {contract?.status}
                        {/* <div className="custom-control custom-radio custom-control-inline">
                          <input type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" className="custom-control-input" />
                          <label for="inlineRadio1" className="custom-control-label" style={{opacity:"1"}}>Starting</label>
                        </div>
                        <div className="custom-control custom-radio custom-control-inline">
                          <input type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" className="custom-control-input" checked/>
                          <label for="inlineRadio2" className="custom-control-label" style={{opacity:"1"}}>Buyer deposited the crypto</label>
                        </div>
                        <div className="custom-control custom-radio custom-control-inline">
                          <input type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3" className="custom-control-input" />
                          <label for="inlineRadio3" className="custom-control-label" style={{opacity:"1"}}>Seller transferred the land to buyer</label>
                        </div> */}
                      </div>
                    </div>
                  </div>

                  <div class="card p-cards" style={{ transform: "none",marginBottom: "30px" }}>
                    <div class="card-body">
                      <h3 class="text-white mt-0">
                        {"Details"}
                      </h3>
                      <div class="table-responsive mr-3">
                        <table class="table table-dark" style={{backgroundColor:"#26272e", width:"80%", fontWeight: 500}}>
                          <tbody>
                          <tr>
                            <td style={{border:"none"}}>Agreed Price</td>
                            <td style={{border:"none", float:"right", fontWeight: 600}}>
                              <span style={{color:"#F29E2A"}}>
                                {contract?.price} </span> MANA
                            </td>
                          </tr>
                          <tr>
                            <td style={{border:"none"}}>Ethereum address for Buyer deposit</td>
                            <td style={{border:"none", float:"right", fontWeight: 600}}>
                              <span style={{color:"#F29E2A"}}>
                              {contract?.buyer_eth_address} </span>
                            </td>
                          </tr>
                          <tr>
                            <td style={{border:"none"}}>MANA amount for buyer deposit</td>
                            <td style={{border:"none", float:"right", fontWeight: 600}}>
                              <span style={{color:"#F29E2A"}}>
                              {contract?.buyer_deposit_mana} </span> MANA
                            </td>
                          </tr>
                          <tr>
                            <td style={{border:"none"}}>Ethereum amount for buyer deposit</td>
                            <td style={{border:"none", float:"right", fontWeight: 600}}>
                              <span style={{color:"#F29E2A"}}>
                              {contract?.buyer_deposit_eth} </span> ETH
                            </td>
                          </tr>
                          <tr>
                            <td style={{border:"none"}}>Ethereum address for Seller receive</td>
                            <td style={{border:"none", float:"right", fontWeight: 600}}>
                              <span style={{color:"#F29E2A"}}>
                              {contract?.seller_eth_address}</span>
                            </td>
                          </tr>
                          <tr>
                            <td style={{border:"none"}}>MANA amount for Seller Receive</td>
                            <td style={{border:"none", float:"right", fontWeight: 600}}>
                              <span style={{color:"#F29E2A"}}>
                              {contract?.seller_mana} </span> MANA
                            </td>
                          </tr>
                          </tbody>
                        </table>
                      </div>  
                    </div>
                  </div>
                  {/* <div className="d-flex justify-content-end">
                    <button className="btn offer-btn">Transfer Land</button>
                  </div> */}
                </div>
              </div>  
              </section>
            </div>
            )}

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

export default ContractDetail;
