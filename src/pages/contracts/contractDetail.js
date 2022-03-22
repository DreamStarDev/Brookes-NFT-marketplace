import React, { useState, useEffect } from "react";
import request from "../../services/Requests";
import { useHistory, useParams   } from "react-router-dom";
import ArrowDownIcon from "../../assets/admin/arrowdown.svg";
import BuildingIcon from "../../assets/building-r.svg";
import LeftIcon from "../../assets/left-icon.svg";
import MapIcon from "../../assets/admin/map.png";
import ContractDetailMapIcon from "../../assets/contract-detail.svg";
import Header from "../common/header";
import Footer from "../common/footer";
import "./contracts.scss";
import Moment from 'moment';

export default function FContractDetail({ setTabSelected, tabSelected }) {
  const history = useHistory();
  const [isLoading, setisLoading] = useState(true);
  const [contract, setContract] = useState([]);
  const [landTransactionID, setLandTransactionID] = useState('');
  const [ethAddress, setEthAddress] = useState('');
  const [inputError, setinputError] = useState(false);
  const [inputAddressError, setinputAddressError] = useState(false);
  const [inputBuyerAddressError, setinputBuyerAddressError] = useState(false);
  const [buyerEthAddress, setBuyerEthAddress] = useState('');
  const params = useParams();
  const [disableBInput, setDisableBInput] = useState(false);
  const [disableSInput, setDisableSInput] = useState(false);
  const [disableLInput, setDisableLInput] = useState(false);

  useEffect(() => {
    fetchContractDetail();
  }, []);

  const fetchContractDetail = async () => {
    try {
      const result = await (
        await request.get(`api/v1/my_contracts/${params?.contract_id}/`)
      ).json();
      setContract(result);
      // setContract({ ...contract, ['status']: 3 });
    } catch (error) {
      console.log(error);
    }
    setisLoading(false);
  };

  const handleTransfer = async () => {
    try {
      const result =  await request.post(
        `api/v1/my_contracts/${params?.contract_id}/buyer_deposit_crypto/`,
        {},
        false
      );
      if(result.ok){
        setDisableLInput(true);
        setContract({ ...contract, ['status']: 3 });
        //history.push({ pathname: "/contracts"});
      }
      else if(!result.ok) { 
        let jsonResponse = await (result).json()
        throw new Error(jsonResponse.error);
      }
      else{
        throw new Error("Sorry, something went wrong.");
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  const handleChange = (e) => {
    setLandTransactionID(e.target.value);
    // setContract({ ...contract, ['land_transaction_id']: e.target.value });
  };
  
  const handleAddressChange = (e) => {
    setEthAddress(e.target.value);
    // setContract({ ...contract, ['seller_eth_address']: e.target.value });
  };

  const handleBuyerAddressChange = (e) => {
    setBuyerEthAddress(e.target.value);
    // setContract({ ...contract, ['seller_eth_address']: e.target.value });
  };

  const handleSellerTransfer = async () => {
    if (landTransactionID === undefined || landTransactionID === "null" || landTransactionID === "") {
      setinputError(true);
      return false;
    }
    try {
      const result =  await request.post(
        `api/v1/my_contracts/${params?.contract_id}/seller_transfer_land/`,
        {
          land_transaction_id: landTransactionID
        },
        false
      );
      if(result.ok){
        setContract({ ...contract, ['status']: 4 });
        //history.push({ pathname: "/contracts"});
      }
      else if(!result.ok) { 
        let jsonResponse = await (result).json()
        throw new Error(jsonResponse.error);
      }
      else{
        throw new Error("Sorry, something went wrong.");
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  const handleAddressSet = async () => {
    if (ethAddress === undefined || ethAddress === "null" || ethAddress === "") {
      setinputAddressError(true);
      return false;
    }
    try {
      const result =  await request.post(
        `api/v1/my_contracts/${params?.contract_id}/seller_set_eth_address/`,
        {
          eth_address: ethAddress
        },
        false
      );
      if(result.ok){
        setDisableSInput(true);
        alert("Ethereum address is set");
        // setContract({ ...contract, ['status']: 4 });
        //history.push({ pathname: "/contracts"});
      }
      else if(!result.ok) { 
        let jsonResponse = await (result).json()
        throw new Error(jsonResponse.error);
      }
      else{
        throw new Error("Sorry, something went wrong.");
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  const handleBuyerAddressSet = async () => {
    if (buyerEthAddress === undefined || buyerEthAddress === "null" || buyerEthAddress === "") {
      setinputBuyerAddressError(true);
      return false;
    }
    try {
      const result =  await request.post(
        `api/v1/my_contracts/${params?.contract_id}/buyer_set_eth_address/`,
        {
          eth_address: buyerEthAddress
        },
        false
      );
      if(result.ok){
        setDisableBInput(true);
        alert("Ethereum address is set");
        // setContract({ ...contract, ['status']: 4 });
        //history.push({ pathname: "/contracts"});
      }
      else if(!result.ok) { 
        let jsonResponse = await (result).json()
        throw new Error(jsonResponse.error);
      }
      else{
        throw new Error("Sorry, something went wrong.");
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  const handleBuyerReceived = async () => {
    try {
      const result =  await request.post(
        `api/v1/my_contracts/${params?.contract_id}/buyer_receive_land/`,
        {},
        false
      );
      if(result.ok){
        setContract({ ...contract, ['status']: 5 });
      }
      else if(!result.ok) { 
        let jsonResponse = await (result).json()
        throw new Error(jsonResponse.error);
      }
      else{
        throw new Error("Sorry, something went wrong.");
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };
  const handleSellerReceived = async () => {
    try {
      const result =  await request.post(
        `api/v1/my_contracts/${params?.contract_id}/seller_receive_crypto/`,
        {},
        false
      );
      if(result.ok){
        setContract({ ...contract, ['status']: 7 });
      }
      else if(!result.ok) { 
        let jsonResponse = await (result).json()
        throw new Error(jsonResponse.error);
      }
      else{
        throw new Error("Sorry, something went wrong.");
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
            <div className="topaction">
              <div className="bo-title"> 
                <img src={LeftIcon} alt="" style={{zIndex:"4"}} onClick={() => history.push("/contracts")} /> 
                <h1 style={{ margin: "0px 25px", fontWeight: "600"}}> Contract ID 
                  <span className="text-yellow ml-3 font-weight-bold">{contract?.id || "01G5H122"}</span> 
                </h1>
              </div>
            </div>
            {/* <h1 className="bo-title">Contracts ID </h1> */}
            <section className="darkcards mb-5">
              <div>
                  {contract.id && (
                  <div
                    className="col-lg-12"
                    style={{zIndex:"3"}}
                  >
                    <div className="row">
                      <div className="col-lg-4 col-md-4 col-sm-4 d-flex align-items-center justify-content-center" 
                        style={{zIndex:"3", borderRight: "1px solid rgb(185 185 185 / 32%)", paddingRight: "30px"}}>
                        <img
                          src={contract?.image || ContractDetailMapIcon}
                          // src={MapIcon}
                          className="img-fluid"
                          alt=""
                          style={{borderRadius:"15px"}}
                        />
                      </div>
                      <div className="col-lg-8 col-md-8 col-sm-8 bo-detail bo-detail-padding">
                        <div>
                          <h3 className="text-white">
                            {contract?.name || ""}
                          </h3>
                        </div>
                        <div style={{minHeight:"60px"}}>
                          <div className="text-white">
                            {contract?.description || ""}
                          </div>
                        </div>
                        <div className="mt-5 mb-1">
                          <span className="text-yellow padding-right-two borderRight">
                            {"Position"} &nbsp; &nbsp; 
                            <span className="text-white" style={{fontWeight:"600"}}>
                              {contract?.x || "-113.5"}, {contract?.y || "-30.5"}
                            </span>
                          </span>
                          <span className="text-yellow padding-right-two  padding-left-two borderRight">
                            {"Type"} &nbsp; &nbsp;
                            <span className="text-white" style={{fontWeight:"600"}}>
                              {contract.land_type === 1 ? "Parcel" : "Estate"}
                            </span>
                          </span>
                          <span className="text-yellow padding-left-two">
                            {"Price agreed"} &nbsp; &nbsp;
                            <span className="text-white" style={{fontWeight:"600"}}>
                              {contract?.price} MANA
                            </span>
                          </span>
                        </div>
                        <hr style={{background:"rgba(255, 255, 255, 0.32)"}} />
                        <div className="d-flex align-items-center">
                          <span className="text-yellow padding-right-two borderRight">
                            {"Contract start date"} &nbsp; &nbsp; 
                            <span className="text-white" style={{fontWeight:"600"}}>
                              {Moment(contract?.created).format('YYYY-MM-DD') || "21st Dec 2021"}
                            </span>
                          </span>
                          <span className="padding-left-two">
                            <div className="bo-info-badge">
                              You are {contract?.user_type || "---"} on this contract
                            </div>
                          </span>
                        </div>
                        <hr style={{background:"rgba(255, 255, 255, 0.32)"}} />
                        <div className="margin-top-three">
                          <h2 className="status-heading"> {"Status"} </h2>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-4 col-md-4 col-sm-4"></div>
                      <div className="col-lg-8 col-md-8 col-sm-8">
                      <ul className="events">
                        <li>
                          <div className={`step ${contract?.status == 1 ? "current" : "" } ${contract?.status >= 1 ? "activated" : "" }`}>01</div> 
                          <span className={`${contract?.status >= 1 ? "activated" : "" }`}><strong>{"Starting"}</strong></span></li>
                        <li>
                          <div className={`step ${contract?.status == 2 ? "current" : "" } ${contract?.status >= 2 ? "activated" : "" }`}>02</div> 
                          <span className={`${contract?.status > 2 ? "activated" : "" } ${contract?.status == 2 ? "current" : "" }`}><strong>{"Buyer deposits the crypto"}</strong>
                          {contract?.user_type == "buyer" && (
                          <div>
                            {/* <span className="status-inner-text" style={{whiteSpace: "nowrap", display:"inline-block",marginBottom:"15px",padding:"0px"}}>{"Address "}
                              <span className="status-inner-text text-white ml-3" style={{background:"#071A34", borderRadius:"5px", padding:"8px"}}>{contract?.buyer_eth_address}
                              </span>
                            </span> */}
                            <span className="status-inner-text mt-3" style={{whiteSpace: "nowrap", display:"inline-block",marginBottom:"15px",padding:"0px"}}>
                                {"Deposit ethereum address "}
                              <span className="status-inner-text text-white ml-3" style={{background:"#071A34", borderRadius:"5px", padding:"8px"}}>
                                {contract?.buyer_deposit_eth_address}
                              </span>
                            </span>
                            <span className="status-inner-text" style={{whiteSpace: "nowrap", display:"inline-block",marginBottom:"15px",padding:"0px"}}>
                                {"MANA amount "}
                              <span className="status-inner-text text-white ml-3" style={{background:"#071A34", borderRadius:"5px", padding:"8px"}}>
                                {contract?.buyer_deposit_mana}
                              </span>
                            </span><br/>
                            <span className="status-inner-text" style={{whiteSpace: "nowrap", display:"inline-block",marginBottom:"15px",padding:"0px"}}>
                                {"Ethereum amount (for gas fee) "}
                              <span className="status-inner-text text-white ml-3" style={{background:"#071A34", borderRadius:"5px", padding:"8px"}}>
                                {contract?.buyer_deposit_eth}
                              </span>
                            </span>
                          
                            <div>
                            <button className="btn btn-save" style={{height:"30px",lineHeight:"12px"}}onClick={handleTransfer}
                            disabled={contract?.status != 2}
                            >Transferred</button>
                            </div>
                          </div>
                          )}
                          </span></li>
                        <li>
                          <div className={`step ${contract?.status == 3 ? "current" : "" } ${contract?.status >= 3 ? "activated" : "" }`}>03</div> 
                          <span className={`${contract?.status > 3 ? "activated" : "" } ${contract?.status == 3 ? "current" : "" }`}>
                            <strong>{"Seller transfers the land"}</strong> 
                            {contract?.user_type == "buyer" && (
                            <div>
                            <span className="status-inner-text" style={{whiteSpace: "nowrap",padding:"0px"}}><span className="text-yellow">{"Address "}</span> 
                              <input name="a" type="text" className={`status-inner-text  ml-3 ${inputBuyerAddressError ? "inputBuyerAddressError" : ""}`} style={{background:"#071A34", borderRadius:"5px", padding:"8px", height:"35px",border: "none",color: "white",width: "100%"}}
                              value={contract?.buyer_eth_address || buyerEthAddress} 
                              disabled={contract?.buyer_eth_address || disableBInput || contract?.status != 3}
                              onChange={handleBuyerAddressChange} maxLength="100" />
                              <div>
                                <button className="btn btn-save mt-3 mb-3" style={{height:"30px",lineHeight:"12px"}} onClick={handleBuyerAddressSet} 
                                disabled={contract?.buyer_eth_address || disableBInput || contract?.status != 3}>Set</button>
                              </div>
                            </span>
                            </div>)}
                            {contract?.user_type == "seller" && (
                            <div>
                            <span className="status-inner-text" style={{whiteSpace: "nowrap", display:"inline-block",marginBottom:"15px",padding:"0px"}}>
                              <div className="mb-3">
                                <span className="text-yellow">{"Buyer Address "}</span> 
                                <span className="status-inner-text text-white ml-3" 
                                  style={{background:"#071A34", borderRadius:"5px", padding:"8px"}}>
                                    {contract?.buyer_eth_address}
                                </span>
                              </div>
                              <span className="text-yellow">{"Land transaction id "}</span>
                              <input name="land_transaction_id" type="text" className={`status-inner-text  ml-3 ${inputError ? "inputError" : ""}`} style={{background:"#071A34", borderRadius:"5px", padding:"8px", height:"35px",border: "none",color: "white",width: "100%"}}
                              value={contract?.land_transaction_id || landTransactionID} 
                              disabled={disableLInput || contract?.land_transaction_id || contract?.status != 3} 
                              onChange={handleChange} maxLength="80" />
                              {/* <span>  
                                {contract?.land_transaction_id || ""}
                              </span> */}
                            </span>
                            <div>
                            <button className="btn btn-save" style={{height:"30px",lineHeight:"12px"}}onClick={handleSellerTransfer}
                            disabled={contract?.land_transaction_id || disableLInput || contract?.status != 3}
                            >Transferred</button>
                            </div>
                            </div>
                            )}
                          </span></li>
                        
                        <li>
                          <div className={`step ${contract?.status == 4 ? "current" : "" } ${contract?.status >= 4 ? "activated" : "" }`}>04</div> 
                          <span className={`${contract?.status > 4 ? "activated" : "" } ${contract?.status == 4 ? "current" : "" }`}><strong>{"Buyer receives the land"}</strong>
                          {contract?.user_type == "buyer" && (<button className="btn btn-save" style={{height:"30px",lineHeight:"12px"}} onClick={handleBuyerReceived}
                          disabled={contract?.status != 4}
                          >Received</button>)}
                          </span></li>
                        
                        <li>
                          <div className={`step ${contract?.status == 5 ? "current" : "" } ${contract?.status >= 5 ? "activated" : "" }`}>05</div>
                          <span className={`${contract?.status > 5 ? "activated" : "" } ${contract?.status == 5 ? "current" : "" }`}>
                            <strong style={{whiteSpace: "nowrap"}}>
                              {"Platform sends the crypto to the seller"}
                            </strong> 
                            {contract?.user_type == "seller" && (
                            <div>
                              <span className="status-inner-text" style={{whiteSpace: "nowrap",padding:"0px"}}><span className="text-yellow">{"Address "}</span> 
                              <input name="a" type="text" className={`status-inner-text  ml-3 ${inputAddressError ? "inputAddressError" : ""}`} style={{background:"#071A34", borderRadius:"5px", padding:"8px", height:"35px",border: "none",color: "white",width: "100%"}}
                              value={contract?.seller_eth_address || ethAddress} 
                              disabled={contract?.seller_eth_address || disableSInput || contract?.status != 5}
                              onChange={handleAddressChange} maxLength="100" />
                            <div>
                              <button className="btn btn-save mt-3 mb-3" style={{height:"30px",lineHeight:"12px"}} onClick={handleAddressSet}
                              disabled={contract?.seller_eth_address || disableSInput || contract?.status != 5}
                              >Set</button>
                            </div>
                            <span className="text-yellow">{"MANA amount "}</span> 
                              <span className="status-inner-text text-white ml-3" 
                                style={{background:"#071A34", borderRadius:"5px", padding:"8px"}}>
                                  {contract?.seller_mana}
                              </span>
                            </span>
                            
                            {/* <span className="status-inner-text" style={{whiteSpace: "nowrap",padding:"0px"}}><span className="text-yellow">{"Transaction id "}</span> 
                            <span className="status-inner-text text-white ml-3" style={{padding:"0px"}}>{contract?.crypto_transaction_id} </span></span> */}
                            </div>)}
                          </span></li>
                        
                        <li>
                          <div className={`step ${contract?.status == 6 ? "current" : "" } ${contract?.status >= 6 ? "activated" : "" }`}>06</div>
                          <span className={`${contract?.status > 6 ? "activated" : "" } ${contract?.status == 6 ? "current" : "" }`}><strong>{"Seller receives the crypto"}</strong> 
                          {contract?.user_type == "seller" && (<button className="btn btn-save" style={{height:"30px",lineHeight:"12px"}} onClick={handleSellerReceived}
                          disabled={contract?.status != 6}
                          >Received</button>)}
                          </span></li>
                        
                        <li>
                          <div className={`step ${contract?.status == 7 ? "current" : "" } ${contract?.status >= 7 ? "activated" : "" }`}  >07</div>
                          <span className={`lastStep ${contract?.status == 7 ? "activated" : "" } ${contract?.status == 7 ? "current" : "" }`}><strong>{"Finished"}</strong></span></li>
                      </ul>
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
            </section>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}
