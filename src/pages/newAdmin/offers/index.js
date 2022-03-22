import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import Sidebar from "../common/sidebar";
import Header from "../common/header";

import request from "../../../services/Requests";
import { nFormatter } from "../../newBuyer/utils";

import MapImg from "../../../assets/admin/map.png";
import User2Icon from "../../../assets/admin/user2.png";
import ChatIcon from "../../../assets/admin/chat.svg";
import ArrowDownIcon from "../../../assets/admin/arrowdown.svg";
import FilterIcon from "../../../assets/admin/filtericon.svg";
import CrossIcon from "../../../assets/admin/cross.svg";
import ResetIcon from "../../../assets/admin/reset.svg";
import "./index.scss";
import Moment from 'moment';

function Offers() {
  const history = useHistory();
  const [openfilter, setopenfilter] = useState(false);
  const [offers, setOffers] = useState([]);
  const [paginatedOffers, setpaginatedOffers] = useState([]);
  const [next, setNext] = useState(0);
  const [isLoading, setisLoading] = useState(true);
  const offersPerPage = 3;

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async (filter = "") => {
    try {
      const result = await (
        await request.get(`api/v1/admin/offer/?${filter}`)
      ).json();
      setOffers(result);
      handleNext(result, true);
    } catch (error) {
      console.log(error);
    }
    setisLoading(false);
  };

  // const openFilter = () => {
  //   document.getElementById("backdrop-container").classList.add("active");
  //   setopenfilter(true);
  // };
  // const closeFilter = () => {
  //   setopenfilter(false);
  //   document.getElementById("backdrop-container").classList.remove("active");
  // };

  // const calculateFilterAndCall = ({ negotiation = true, seller = true }) => {
  //   let filter = `${
  //     negotiation && innerfd.negotiation ? "negotiation=1&" : ""
  //   }${
  //     seller && innerfd.seller_type ? `seller_type=${innerfd.seller_type}` : ""
  //   }`;
  //   fetchProposals(filter);
  // };

  // const applyFilter = () => {
  //   setFd({ ...innerfd });
  //   calculateFilterAndCall({ negotiation: true, seller: true });
  //   closeFilter();
  // };

  // const resetFilter = () => {
  //   setFd({ negotiation: false, seller_type: "0" });
  //   setInnerFd({ negotiation: false, seller_type: "0" });
  //   calculateFilterAndCall({ negotiation: false, seller: false });
  //   closeFilter();
  // };

  // const onInputChange = ({ target: { name, value } }) => {
  //   setInnerFd({ ...innerfd, [name]: value });
  // };

  // const onCheckBoxChange = (ev) => {
  //   const { name } = ev.target;
  //   setInnerFd({ ...innerfd, [name]: !innerfd[name] });
  // };

  // const removeSeller = () => {
  //   const newFd = JSON.parse(JSON.stringify(fd));
  //   const newInnerFd = JSON.parse(JSON.stringify(innerfd));
  //   newFd.seller_type = 0;
  //   newInnerFd.seller_type = 0;
  //   setFd(newFd);
  //   setInnerFd(newInnerFd);
  //   calculateFilterAndCall({ seller: false });
  // };

  // const removeNegotiation = () => {
  //   const newFd = JSON.parse(JSON.stringify(fd));
  //   const newInnerFd = JSON.parse(JSON.stringify(innerfd));
  //   delete newFd.negotiation;
  //   delete newInnerFd.negotiation;
  //   setFd(newFd);
  //   setInnerFd(newInnerFd);
  //   calculateFilterAndCall({ negotiation: false });
  // };

  const loopWithSlice = (start, end, _offers = null) => {
    const slicedPosts = JSON.parse(
      JSON.stringify(_offers || offers)
    ).slice(start, end);
    if (start === 0) {
      setpaginatedOffers([...slicedPosts]);
    } else {
      setpaginatedOffers([...paginatedOffers, ...slicedPosts]);
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

  return (
    <>
      <div className="market-container">
        <Header />
        <div className="wrapper">
          <Sidebar />
          <section className="maincontent">
            {/* <div className="mainheader">
              <h2>
                Welcome To <br /> Admin Profile
              </h2>
              <a className="btn btn-white" alt="">
                Latest Upadtes
              </a>
            </div> */}
            <div className="tophead" style={{margin:"50px 3% 20px"}}>
              <h3>Offers</h3>
            </div>
            <section className="darkcards mb-5" style={{margin:"10px 3% 40px"}}>
              <div className="row sm-row">
                {paginatedOffers.map((item, i) => (
                  <div
                    key={i}
                    className="col-lg-12 col-md-12 col-sm-12 card-container-new"
                    // onClick={() =>
                    //   history.push({
                    //     pathname: `/offers/detail/1`,
                    //   })
                    // }
                  >
                    <div className="p-cards d-flex align-items-center justify-content-between margin-bottom-one row" style={{padding:"10px", marginBottom: "30px"}}>
                      <div className="col-lg-3 col-md-3 col-sm-3">
                        <img
                          src={item?.image}
                          className="offer-img img-fluid"
                          alt=""
                        />
                      </div>
                      <div className="col-lg-9 col-md-9 col-sm-9 details">
                        <div className="d-flex align-items-center justify-content-between margin-bottom-one">
                          <div class="col-md-3">
                            <label>Offer id</label>
                            <div>{item?.id}</div>
                          </div>
                          <div class="col-md-4">
                            <label>Land Type</label>
                            <div>{item?.land_type === 1 ? "Parcel" : "Estate"}</div>
                          </div>
                          <div class="col-md-4">
                            <label>Position</label>
                            <div>{item?.x}, {item?.y}</div>
                          </div>
                          <div class="col-md-1"></div>
                        </div>

                        <div className="d-flex align-items-center justify-content-between margin-bottom-one">
                          <div class="col-md-3">
                            <label>Seller</label>
                            <div>{item?.seller_name}</div>
                          </div>
                          <div class="col-md-4">
                            <label>Buyer</label>
                            <div>{item?.buyer_name}</div>
                          </div>
                          <div class="col-md-4">
                            <label>Price Agreed</label>
                            <div>{item?.price} MANA</div>
                          </div>
                          <div class="col-md-1"></div>
                        </div>
                
                        <div className="d-flex align-items-center justify-content-between margin-bottom-one">
                          <div class="col-md-3">
                            <label>Offer Sent Date</label>
                            <div>{Moment(item?.created).format('YYYY-MM-DD')}</div>
                            {/* .format('dS mmmm yyyy' */}
                          </div>
                          <div class="col-md-4">
                            {/*  form-group */}
                            <label for="buyer-status">Acceptance Status (Buyer)</label>
                            <div>{item?.buyer_accept === false ? "No" : "Yes"}</div>
                            {/* <input type="text" class="form-control buyer-status" value="Status goes here" /> */}
                          </div>
                          <div class="col-md-4">
                            <label for="seller-status">Acceptance Status (Seller)</label>
                            <div>{item?.seller_accept === false ? "No" : "Yes"}</div>
                            {/* <input type="text" class="form-control seller-status " value="Status goes here" /> */}
                          </div>
                          <div class="col-md-1"></div>
                        </div>

                        {/* <div className="d-flex align-items-center justify-content-end margin-bottom-half">
                          <button className="btn update-btn">Update</button>
                          <button className="btn remove-btn">Remove</button>
                        </div> */}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {offers.length && (
              <div className="loadmore mb-5" onClick={handleNext}>
                <button
                  className={`btn btn-loadmore ${
                    paginatedOffers.length === offers.length
                      ? "btn-loadmore-disabled"
                      : ""
                  }`}
                  {...{
                    ...(paginatedOffers.length === offers.length && {
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

export default Offers;
