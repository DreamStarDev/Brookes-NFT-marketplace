import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import Sidebar from "../common/sidebar";
import Header from "../common/header";
import request from "../../../services/Requests";
import MapImg from "../../../assets/admin/map.png";
import ArrowDownIcon from "../../../assets/admin/arrowdown.svg";
import "./index.scss";
import Moment from 'moment';

function Contracts() {
  const history = useHistory();
  const [openfilter, setopenfilter] = useState(false);
  const [contracts, setContracts] = useState([]);
  const [paginatedContracts, setpaginatedContracts] = useState([]);
  const [next, setNext] = useState(0);
  const [isLoading, setisLoading] = useState(true);
  const contractsPerPage = 8;

  useEffect(() => {
    fetchContracts();
  }, []);

  const fetchContracts = async (filter = "") => {
    try {
      const result = await (
        await request.get(`api/v1/admin/contract/?${filter}`)
      ).json();
      setContracts(result);
      handleNext(result, true);
    } catch (error) {
      console.log(error);
    }
    setisLoading(false);
  };

  const loopWithSlice = (start, end, _contracts = null) => {
    const slicedPosts = JSON.parse(
      JSON.stringify(_contracts || contracts)
    ).slice(start, end);
    if (start === 0) {
      setpaginatedContracts([...slicedPosts]);
    } else {
      setpaginatedContracts([...paginatedContracts, ...slicedPosts]);
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

  return (
    <>
      <div className="market-container">
        <Header />
        <div className="wrapper">
          <Sidebar />
          <section className="maincontent">
            <div className="tophead" style={{margin:"50px 3% 20px"}}>
              <h3>Contracts</h3>
            </div>
            <section className="darkcards mb-5" style={{margin:"10px 3% 40px"}}>
              <div className="row sm-row">
              {paginatedContracts.map((item, i) => (
                <div
                    key={i}
                    className="col-lg-12 col-md-12 col-sm-12 card-container-new"
                    onClick={() =>
                      history.push({
                        pathname: `/admin/contracts/detail/${item?.id}`,
                      })
                    }
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
                          <div class="col-md-4">
                            <label>Contract id</label>
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
                        </div>

                        <div className="d-flex align-items-center justify-content-between margin-bottom-one">
                          <div class="col-md-4">
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
                        </div>
                
                        <div className="d-flex align-items-center justify-content-between margin-bottom-one">
                          <div class="col-md-4">
                            <label>Contract Sent Date</label>
                            <div>{Moment(item?.created).format('YYYY-MM-DD')}</div>
                          </div>
                          <div class="col-md-8">
                            <label>Contract Status</label>
                            <div className="d-flex align-items-center justify-content-start">
                              <span className="orange-dot margin-right-half"></span>
                              {item?.status}
                              {/* <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" className="custom-control-input" 
                                checked={item?.status==="Started"}
                                />
                                <label for="inlineRadio1" className="custom-control-label" style={{opacity:"1"}}>Starting</label>
                              </div>
                              <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" className="custom-control-input" />
                                <label for="inlineRadio2" className="custom-control-label" style={{opacity:"1"}}>Buyer deposited the crypto</label>
                              </div>
                              <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3" className="custom-control-input" />
                                <label for="inlineRadio3" className="custom-control-label" style={{opacity:"1"}}>Seller transferred the land to buyer</label>
                              </div> */}
                            </div>
                          </div>  
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

            {contracts.length && (
              <div className="loadmore mb-5" onClick={handleNext}>
                <button
                  className={`btn btn-loadmore ${
                    paginatedContracts.length === contracts.length
                      ? "btn-loadmore-disabled"
                      : ""
                  }`}
                  {...{
                    ...(paginatedContracts.length === contracts.length && {
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

export default Contracts;
