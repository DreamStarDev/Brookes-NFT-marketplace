import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import Sidebar from "../common/sidebar";
import Header from "../common/header";

import request from "../../../services/Requests";
import { nFormatter } from "../../../pages/newBuyer/utils";

import User2Icon from "../../../assets/admin/user2.png";
import ChatIcon from "../../../assets/admin/chat.svg";
import ArrowDownIcon from "../../../assets/admin/arrowdown.svg";
import FilterIcon from "../../../assets/admin/filtericon.svg";
import CrossIcon from "../../../assets/admin/cross.svg";
import ResetIcon from "../../../assets/admin/reset.svg";

import "./index.scss";

function Market() {
  const history = useHistory();
  const [openfilter, setopenfilter] = useState(false);
  const [proposals, setProposals] = useState([]);
  const [fd, setFd] = useState({ negotiation: false });
  const [innerfd, setInnerFd] = useState({ negotiation: false });
  const [paginatedProposals, setpaginatedProposals] = useState([]);
  const [next, setNext] = useState(0);
  let $backdropContainer = null;

  const proposalsPerPage = 8;

  useEffect(() => {
    $backdropContainer = document.getElementById("backdrop-container");
    $backdropContainer.onclick = function () {
      this.classList.remove("active");
      closeFilter();
    };
    fetchProposals();
  }, []);

  const fetchProposals = async (filter = "") => {
    try {
      const result = await (
        await request.get(`api/v1/admin/proposals/?${filter}`)
      ).json();
      setProposals(result);
      handleNext(result, true);
    } catch (error) {
      console.log(error);
    }
  };

  const openFilter = () => {
    document.getElementById("backdrop-container").classList.add("active");
    setopenfilter(true);
  };
  const closeFilter = () => {
    setopenfilter(false);
    document.getElementById("backdrop-container").classList.remove("active");
  };

  const calculateFilterAndCall = ({ negotiation = true, seller = true }) => {
    let filter = `${
      negotiation && innerfd.negotiation ? "negotiation=1&" : ""
    }${
      seller && innerfd.seller_type ? `seller_type=${innerfd.seller_type}` : ""
    }`;
    fetchProposals(filter);
  };

  const applyFilter = () => {
    setFd({ ...innerfd });
    calculateFilterAndCall({ negotiation: true, seller: true });
    closeFilter();
  };

  const resetFilter = () => {
    setFd({ negotiation: false, seller_type: "0" });
    setInnerFd({ negotiation: false, seller_type: "0" });
    calculateFilterAndCall({ negotiation: false, seller: false });
    closeFilter();
  };

  const onInputChange = ({ target: { name, value } }) => {
    setInnerFd({ ...innerfd, [name]: value });
  };

  const onCheckBoxChange = (ev) => {
    const { name } = ev.target;
    setInnerFd({ ...innerfd, [name]: !innerfd[name] });
  };

  const removeSeller = () => {
    const newFd = JSON.parse(JSON.stringify(fd));
    const newInnerFd = JSON.parse(JSON.stringify(innerfd));
    newFd.seller_type = 0;
    newInnerFd.seller_type = 0;
    setFd(newFd);
    setInnerFd(newInnerFd);
    calculateFilterAndCall({ seller: false });
  };

  const removeNegotiation = () => {
    const newFd = JSON.parse(JSON.stringify(fd));
    const newInnerFd = JSON.parse(JSON.stringify(innerfd));
    delete newFd.negotiation;
    delete newInnerFd.negotiation;
    setFd(newFd);
    setInnerFd(newInnerFd);
    calculateFilterAndCall({ negotiation: false });
  };

  const loopWithSlice = (start, end, _proporsals = null) => {
    const slicedPosts = JSON.parse(
      JSON.stringify(_proporsals || proposals)
    ).slice(start, end);
    if (start === 0) {
      setpaginatedProposals([...slicedPosts]);
    } else {
      setpaginatedProposals([...paginatedProposals, ...slicedPosts]);
    }
  };

  const handleNext = (_proporsals = null, force = false) => {
    let nnext = next;
    if (force) {
      nnext = 0;
    }
    loopWithSlice(
      nnext,
      nnext + proposalsPerPage,
      Array.isArray(_proporsals) ? _proporsals : null
    );
    setNext(nnext + proposalsPerPage);
  };

  return (
    <>
      <div className="market-container">
        <Header />
        <div className="wrapper">
          <Sidebar />
          <section className="maincontent">
            <div className="mainheader">
              <h2>
                Welcome To <br /> Admin Profile
              </h2>
              <a className="btn btn-white" alt="">
                Latest Upadtes
              </a>
            </div>
            <div className="tophead">
              <h3>Proposals</h3>
              <div className="rightbtns">
                {fd.seller_type == 1 && (
                  <button
                    className="btn btn-warning btn-round btn-icon-right "
                    onClick={removeSeller}
                  >
                    New Seller <img src={CrossIcon} className="ml-2" alt="" />
                  </button>
                )}
                {fd.seller_type == 2 && (
                  <button
                    className="btn btn-warning btn-round btn-icon-right "
                    onClick={removeSeller}
                  >
                    Exp Seller <img src={CrossIcon} className="ml-2" alt="" />
                  </button>
                )}
                {fd?.negotiation && (
                  <button
                    className="btn btn-warning btn-round btn-icon-right "
                    onClick={removeNegotiation}
                  >
                    Not In Negotiation
                    <img src={CrossIcon} className="ml-2" alt="" />
                  </button>
                )}
                <button className="filterbtn" onClick={openFilter}>
                  Filter <img src={FilterIcon} alt="" />
                </button>
              </div>

              <div className={`filterdd d-none ${openfilter ? "active" : ""}`}>
                <h2>Filter</h2>
                <div className="mb-4">
                  <div className="custom-control custom-checkbox">
                    <input
                      name="negotiation"
                      type="checkbox"
                      className="custom-control-input mr-2"
                      id="hotbids"
                      onChange={onCheckBoxChange}
                      checked={innerfd.negotiation}
                    />
                    <label className="custom-control-label" for="hotbids">
                      In Negotiation
                    </label>
                  </div>
                </div>
                <div className="mb-5">
                  <label>Seller Type</label>
                  <select
                    name="seller_type"
                    className="form-control"
                    onChange={onInputChange}
                    value={innerfd.seller_type}
                  >
                    <option value="0">All</option>
                    <option value="2">Exp Seller</option>
                    <option value="1">New Seller</option>
                  </select>
                </div>
                <div className="mb-3 filterbuttons">
                  <button className="btn btn-warning" onClick={applyFilter}>
                    <img src={FilterIcon} alt="" /> Apply Filter
                  </button>
                  <button className="btn btn-white" onClick={resetFilter}>
                    <img src={ResetIcon} alt="" /> Reset Filter
                  </button>
                </div>
              </div>
            </div>
            <section className="darkcards mb-5">
              <div className="row sm-row">
                {paginatedProposals.map((item, i) => (
                  <div
                    key={i}
                    className="col-lg-4 col-md-4 col-sm-6 card-container"
                    onClick={() =>
                      history.push({
                        pathname: `/admin/proposals/detail/${item.m_land_id}`,
                      })
                    }
                  >
                    <div className="card p-cards">
                      <figure>
                        <img
                          src={item.image}
                          className="img-fluid"
                          alt=""
                          style={{ minHeight: "200px" }}
                        />
                        {item.has_unread_msg && (
                          <span className="chaticon">
                            <img src={ChatIcon} alt="" />
                          </span>
                        )}
                      </figure>
                      <div className="card-body">
                        <div className="d-flex align-items-center justify-content-between">
                          <img
                            src={item.user_avatar || User2Icon}
                            className="img-fluid"
                            alt=""
                          />
                          <p className="text-white m-0">
                            <span className="text-yellow">
                              {item.user_points}
                            </span>{" "}
                            Stars
                          </p>
                        </div>
                        <div className="d-flex align-items-center justify-content-between">
                          <div
                            className="innerinfo"
                            style={{ maxWidth: "250px" }}
                          >
                            <h3 className="text-white truncate">
                              {item.name ?? "No title"}
                            </h3>
                            <p className="card-text">
                              <span className="text-primary mr-2">
                                Price Range
                              </span>
                              {nFormatter(item.min_price, 3)}&nbsp;-&nbsp;
                              {nFormatter(item.max_price, 3)} MANA
                            </p>
                          </div>
                          <div className="badge-holder">
                            <span className="badge badge-primary">
                              {item.cnt_bid} Bids
                            </span>
                            {item.has_unread_msg && (
                              <span className="status status-danger"></span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {proposals.length && (
              <div className="loadmore mb-5" onClick={handleNext}>
                <button
                  className={`btn btn-loadmore ${
                    paginatedProposals.length === proposals.length
                      ? "btn-loadmore-disabled"
                      : ""
                  }`}
                  {...{
                    ...(paginatedProposals.length === proposals.length && {
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
        </div>
      </div>
    </>
  );
}

export default Market;
