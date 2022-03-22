import React, { useState, useEffect } from "react";
import request from "../../services/Requests";
import { useHistory } from "react-router-dom";
import ArrowDownIcon from "../../assets/admin/arrowdown.svg";
import BuildingIcon from "../../assets/building-r.svg";
import MapIcon from "../../assets/admin/map.png";
import NoDataIcon from "../../assets/no-data-icon.png";
import Header from "../common/header";
import Footer from "../common/footer";
import "./offers.scss";

export default function FOffers({ setTabSelected, tabSelected }) {
  const history = useHistory();
  const [isLoading, setisLoading] = useState(true);
  const [offers, setOffers] = useState([]);
  const [paginatedOffers, setpaginatedOffers] = useState([]);
  const [selectedTabOffers, setselectedTabOffers] = useState([]);
  const [next, setNext] = useState(0);

  let $backdropContainer = null;
  const offersPerPage = 6;

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    const result = await request.get(`api/v1/my_offers/`);
    const newOffers = await result.json();
    const filteredOffers = newOffers;// newOffers.filter(
    //   (n) => !newMarketplaces.map((x) => x.offer_id).includes(n.offer_id)
    // );
    setisLoading(false);
    setOffers(() => filteredOffers);
    setselectedTabOffers(() => filteredOffers);
    handleNext(filteredOffers, true);
  };

  const loopWithSlice = (start, end, _offers = null) => {
    const slicedOffers = JSON.parse(
      JSON.stringify(_offers || selectedTabOffers)
    ).slice(start, end);
    if (start === 0) {
      setpaginatedOffers([...slicedOffers]);
    } else {
      setpaginatedOffers([...paginatedOffers, ...slicedOffers]);
    }
  };

  const handleNext = (_offers = null, force = false) => {
    let nnext = next;
    if (force) {
      nnext = 0;
    }
    loopWithSlice(
      nnext,
      nnext + offersPerPage,
      Array.isArray(_offers) ? _offers : null
    );
    setNext(nnext + offersPerPage);
  };
  const paginatedFilteredOffers = paginatedOffers;//.filter(
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
            <h1 className="bo-title">Offers</h1>
            <section className="darkcards mb-5" >
              <div
                className={`row ${
                  paginatedFilteredOffers.length ? "" : "no-data"
                }`}
              >
                {paginatedFilteredOffers.map((item, i) => (
                  <div
                    key={i}
                    className="col-lg-12"
                    // onClick={setMarketplaceModal(item)}
                    style={{zIndex:"3"}}
                    onClick={() =>
                      history.push({
                        pathname: `/offers/detail/${item?.id}`,
                      })
                    }
                  >
                    <div className="p-cards row bo-row">
                      <div className="col-lg-3 col-md-3 col-sm-3 d-flex align-items-center" style={{zIndex:"3", padding:"20px"}}>
                        {/* {!isMarketplace && (
                          <div className="already-bid">
                            <button>Bid Done Already</button>
                          </div>
                        )} */}
                        <img
                          src={item?.image}
                          // src={MapIcon}
                          className="img-fluid"
                          alt=""
                          style={{width:"90%",borderRadius:"5px"}}
                        />
                        {/* <span className="chaticon">
                          <img src={ChatIcon} alt="" />
                        </span> */}
                      </div>
                      
                      <div className="col-lg-9 col-md-9 col-sm-9 bo-detail">
                        <div>
                          <span class="text-yellow mr-3 font-weight-bold">
                            {"Offer ID"} &nbsp; 
                            <span class="text-white">
                              {item?.id}
                            </span>
                          </span>
                        </div>

                        <div>
                          <h3 className="text-white">
                            {item?.name || "No title"}
                          </h3>
                        </div>
                        <hr style={{background:"rgba(255, 255, 255, 0.32)"}} />

                        <div style={{marginTop:"20px",marginBottom:"20px"}}>
                          <span class="text-yellow padding-right-two" style={{borderRight:"1px solid rgba(255, 255, 255, 0.32)"}}>
                            {"Position"} &nbsp; &nbsp; 
                            <span class="text-white" style={{fontWeight:"600"}}>
                              {item?.x}, {item?.y}
                            </span>
                          </span>
                          <span class="text-yellow padding-right-two  padding-left-two" style={{borderRight:"1px solid rgba(255, 255, 255, 0.32)"}}>
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

                        <div style={{padding: "5px 0px"}}>
                          <div className="bo-info-badge">
                            You are {item?.user_type} on this offer
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {!isLoading && paginatedFilteredOffers.length === 0 && (
                  <div className="mt-5 text-center">
                    <img src={NoDataIcon} alt="..." />
                    <h3 className="mt-5">Oops</h3>
                    <p className="mt-4">
                      {`You don’t have any offer at the moment. We will let you know when you receive a new offer.`}
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

        {Boolean(paginatedFilteredOffers.length) && (
          <div className="loadmore" onClick={handleNext}>
            <button
              className={`btn btn-loadmore ${
                paginatedFilteredOffers.length === selectedTabOffers.length
                  ? "btn-loadmore-disabled"
                  : ""
              }`}
              {...{
                ...(paginatedFilteredOffers.length === selectedTabOffers.length && {
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
