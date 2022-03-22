import React, { useState, useEffect } from "react";
import request from "../../services/Requests";
import { useHistory } from "react-router-dom";
import ArrowDownIcon from "../../assets/admin/arrowdown.svg";
import BuildingIcon from "../../assets/building-r.svg";
import MapIcon from "../../assets/admin/map.png";
import NoDataIcon from "../../assets/no-data-icon.png";
import ContractMapIcon from "../../assets/contract-map.svg";
import Header from "../common/header";
import Footer from "../common/footer";
import "./contracts.scss";

export default function FContracts({ setTabSelected, tabSelected }) {
  const history = useHistory();
  const [isLoading, setisLoading] = useState(true);
  const [contracts, setContracts] = useState([]);
  const [paginatedContracts, setpaginatedContracts] = useState([]);
  const [selectedTabContracts, setselectedTabContracts] = useState([]);
  const [next, setNext] = useState(0);

  let $backdropContainer = null;
  const contractsPerPage = 6;

  useEffect(() => {
    fetchContracts();
  }, []);

  const fetchContracts = async () => {
    const result = await request.get(`api/v1/my_contracts/`);
    const newContracts = await result.json();
    const filteredContracts = newContracts;// newContracts.filter(
    //   (n) => !newMarketplaces.map((x) => x.contract_id).includes(n.contract_id)
    // );
    setisLoading(false);
    setContracts(() => filteredContracts);
    setselectedTabContracts(() => filteredContracts);
    handleNext(filteredContracts, true);
  };

  const loopWithSlice = (start, end, _contracts = null) => {
    const slicedContracts = JSON.parse(
      JSON.stringify(_contracts || selectedTabContracts)
    ).slice(start, end);
    if (start === 0) {
      setpaginatedContracts([...slicedContracts]);
    } else {
      setpaginatedContracts([...paginatedContracts, ...slicedContracts]);
    }
  };

  const handleNext = (_contracts = null, force = false) => {
    let nnext = next;
    if (force) {
      nnext = 0;
    }
    loopWithSlice(
      nnext,
      nnext + contractsPerPage,
      Array.isArray(_contracts) ? _contracts : null
    );
    setNext(nnext + contractsPerPage);
  };
  const paginatedFilteredContracts = paginatedContracts;//.filter(
  //   (l) => l.type === fd.seller_type || fd?.seller_type == 0
  // );

  return (
    <>
      <div className="buyer-container">
        <Header />
        <section className="buyerinner">
          <div className="circleleftop" />
          <img src={BuildingIcon} className="buildingtl" alt=".." />
          <div className="container mt-5">
            <h1 className="bo-title">Contracts</h1>
            <section className="darkcards mb-5" >
              <div
                className={`row ${
                  paginatedFilteredContracts.length ? "" : "no-data"
                }`}
              >
                {paginatedFilteredContracts.map((item, i) => (
                  <div
                    key={i}
                    className="col-lg-12"
                    // onClick={setMarketplaceModal(item)}
                    style={{zIndex:"3"}}
                    onClick={() =>
                      history.push({
                        pathname: `/contracts/detail/${item?.id}`
                      })
                    }
                  >
                    <div className="p-cards row bo-row">
                      <div className="col-lg-3 col-md-3 col-sm-3 d-flex" style={{zIndex:"3"}}>
                        {/* {!isMarketplace && (
                          <div className="already-bid">
                            <button>Bid Done Already</button>
                          </div>
                        )} */}
                        <img
                          src={item?.image || ContractMapIcon}
                          className="img-fluid"
                          alt=""
                          style={{width:"90%",borderRadius:"5px",padding: "10px 0px"}}
                        />
                        {/* <span className="chaticon">
                          <img src={ChatIcon} alt="" />
                        </span> */}
                      </div>
                      
                      <div className="col-lg-9 col-md-9 col-sm-9 bo-detail">
                        <div>
                          <span class="text-yellow mr-3 font-weight-bold">
                            {"Contract ID"} &nbsp; 
                            <span class="text-white">
                              {item?.id || "03H6H121"}
                            </span>
                          </span>
                        </div>

                        <div>
                          <h3 className="text-white">
                            {item?.name || "Land Name Goes Here"}
                          </h3>
                        </div>
                        <hr style={{background:"rgba(255, 255, 255, 0.32)"}} />

                        <div style={{marginTop:"20px",marginBottom:"20px"}}>
                          <span class="text-yellow padding-right-two borderRight">
                            {"Position"} &nbsp; &nbsp; 
                            <span class="text-white" style={{fontWeight:"600"}}>
                              {item?.x || "-113.5"}, {item?.y || "-30.5"}
                            </span>
                          </span>
                          <span class="text-yellow padding-right-two  padding-left-two borderRight">
                            {"Type"} &nbsp; &nbsp; 
                            <span class="text-white" style={{fontWeight:"600"}}>
                              {item?.land_type === 1 ? "Parcel" : "Estate"}
                            </span>
                          </span>
                          <span class="text-yellow padding-left-two">
                            {"Price Agreed"} &nbsp; &nbsp; 
                            <span class="text-white" style={{fontWeight:"600"}}>
                              {item?.price} MANA
                            </span>
                          </span>
                        </div>
                        <hr style={{background:"rgba(255, 255, 255, 0.32)"}} />
                        <div>
                          <span class="text-yellow padding-right-two">
                            {"Contract status"} &nbsp; &nbsp; 
                            <span className="orange-dot mr-3"></span>
                            <span className="text-white">{item?.status || "Starting"}</span>
                          </span>
                        </div>  
                        <hr style={{background:"rgba(255, 255, 255, 0.32)"}} />
                        <div style={{padding: "5px 0px"}}>
                          <div className="bo-info-badge">
                            You are {item?.user_type || "---"} on this contract
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {!isLoading && paginatedFilteredContracts.length === 0 && (
                  <div className="mt-5 text-center">
                    <img src={NoDataIcon} alt="..." />
                    <h3 className="mt-5">Oops</h3>
                    <p className="mt-4">
                      {`You don’t have any contract at the moment. We will let you know when you receive a new contract.`}
                    </p>
                  </div>
                )}

                {isLoading && (
                  <div className="loader-div" style={{minHeight:"200px"}}>
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

          {/* {isLoading && (
            <div className="loader-div">
              <div className="chat-loader h-100" id="chat-loader">
                <div>
                  <i className="fa fa-spinner main-color fa-spin fa-5x" />
                </div>
              </div>
            </div>
          )} */}

        {Boolean(paginatedFilteredContracts.length) && (
          <div className="loadmore" onClick={handleNext}>
            <button
              className={`btn btn-loadmore ${
                paginatedFilteredContracts.length === selectedTabContracts.length
                  ? "btn-loadmore-disabled"
                  : ""
              }`}
              {...{
                ...(paginatedFilteredContracts.length === selectedTabContracts.length && {
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
        <Footer />
      </div>
    </>
  );
}
