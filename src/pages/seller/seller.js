import React, { useState, useEffect, useContext } from "react";
import request from "../../services/Requests";
import { useLocation, useHistory, useParams } from "react-router-dom";

import UserIcon from "../../assets/admin/user1.png";
import FilterIcon from "../../assets/filtericon.svg";
import FilterBlackIcon from "../../assets/filter-black.svg";
import FlagIcon from "../../assets/flagicon.svg";
import CrossIcon from "../../assets/admin/cross.svg";
import ArrowDownIcon from "../../assets/admin/arrowdown.svg";
import BuildingIcon from "../../assets/building.svg";
import NoDataIcon from "../../assets/no-data-icon.png";
import ChatIcon from "../../assets/admin/chat.svg";
import ResetIcon from "../../assets/admin/reset.svg";
import SellerLandsIcon from "../../assets/seller-lands-line.svg";
import SellerMarketIcon from "../../assets/seller-market-line.svg";

import MarketplaceModal from "../../components/marketplaceModal";
import AppContext from "../../context/AppContext";
import ConnectWalletModal from "../../components/connectWalletModal/index";


export default function MainContent() {
  const history = useHistory();
  const params = useParams();

  const [isLoading, setisLoading] = useState(true);
  const [openfilter, setopenfilter] = useState(false);
  const [isMarketplace, setisMarketplace] = useState(false);
  const [lands, setlands] = useState([]);
  const [marketplaces, setmarketplaces] = useState([]);
  const [innerfd, setInnerFd] = useState({ seller_type: 0 });
  const [fd, setFd] = useState({ seller_type: 0 });
  const [isMarketplaceModal, setIsMarketplaceModal] = useState(false);
  const [paginatedLands, setpaginatedLands] = useState([]);
  const [selectedTabLands, setselectedTabLands] = useState([]);
  const [next, setNext] = useState(0);
  const { metaMask, setmetaMask } = useContext(AppContext);
  const [isConnectShow, setisConnectShow] = useState(false);
  const connectWallet = () => setisConnectShow(true);

  let $backdropContainer = null;
  const landsPerPage = 6;

  useEffect(() => {
    $backdropContainer = document.getElementById("backdrop-container");
    $backdropContainer.onclick = function () {
      this.classList.remove("active");
      closeFilter();
    };
    if(params.active_tab === "2"){
      setisMarketplace(true);
      fetchMyBids();
    }else{
      setisMarketplace(false);
      fetchLands();
    }
    
  }, []);

  const fetchLands = async () => {
    setisLoading(true);
    if (paginatedLands.length) {
      setpaginatedLands(() => []);
    }
    const result = await request.get(`api/v1/my_lands/`);
    const result1 = await request.get(`api/v1/my_market_lands/`);
    const newLands = await result.json();
    const newMarketplaces = await result1.json();
    const filteredLands = newLands.filter(
      (n) => !newMarketplaces.map((x) => x.land_id).includes(n.land_id)
    );
    setlands(() => filteredLands);
    setmarketplaces(() => newMarketplaces);
    setselectedTabLands(() => filteredLands);
    handleNext(filteredLands, true);
    setisLoading(false);
  };

  const fetchMyBids = async () => {
    setisLoading(true);
    if (paginatedLands.length) {
      setpaginatedLands(() => []);
    }
    const result1 = await request.get(`api/v1/my_market_lands/`);
    let newMarketplaces = await result1.json();
    // newMarketplaces = newMarketplaces.map((l) => ({ ...l, type: l.land_type }));
    setmarketplaces(() => newMarketplaces);
    setselectedTabLands(() => newMarketplaces);
    handleNext(newMarketplaces, true);
    setisLoading(false);
  };
  
  const loopWithSlice = (start, end, _lands = null) => {
    const slicedLands = JSON.parse(
      JSON.stringify(_lands || selectedTabLands)
    ).slice(start, end);
    if (start === 0) {
      setpaginatedLands([...slicedLands]);
    } else {
      setpaginatedLands([...paginatedLands, ...slicedLands]);
    }
  };

  const handleNext = (_lands = null, force = false) => {
    let nnext = next;
    if (force) {
      nnext = 0;
    }
    loopWithSlice(
      nnext,
      nnext + landsPerPage,
      Array.isArray(_lands) ? _lands : null
    );
    setNext(nnext + landsPerPage);
  };

  const openFilter = () => {
    document.getElementById("backdrop-container").classList.add("active");
    setopenfilter(true);
  };
  const closeFilter = () => {
    setopenfilter(false);
    document.getElementById("backdrop-container").classList.remove("active");
  };

  const onInputChange = ({ target: { name, value } }) => {
    setInnerFd({ ...innerfd, [name]: parseInt(value) });
  };

  const calculateFilterAndCall = ({ seller = true }) => {
    const newLands = isMarketplace ? marketplaces : lands;
    let newSelectedTabLands = newLands;
    if (seller) {
      newSelectedTabLands = newLands.filter(
        (l) => l.type === innerfd.seller_type || innerfd?.seller_type == 0
      );
    }
    console.log(innerfd.seller_type, seller, newSelectedTabLands);
    setselectedTabLands(() => newSelectedTabLands);
    handleNext(newSelectedTabLands, true);
  };

  const applyFilter = () => {
    setFd({ ...innerfd });
    calculateFilterAndCall({ seller: true });
    closeFilter();
  };

  const resetFilter = () => {
    setFd({ seller_type: 0 });
    setInnerFd({ seller_type: 0 });
    calculateFilterAndCall({ seller: false });
    closeFilter();
  };

  const changeTab = (_isMarketplace) => () => {
    resetFilter();
    if (_isMarketplace) {
      fetchMyBids();
    } else {
      fetchLands();
    }
    // const newSelectedTabLands = _isMarketplace ? marketplaces : lands;
    // setselectedTabLands(newSelectedTabLands);
    // handleNext(newSelectedTabLands, true);
    setisMarketplace(_isMarketplace);
  };

  const onFilterSubmit = ({ land_id }) => {
    const removedLand = lands.find((l) => l.land_id === land_id);
    setlands(() => lands.filter((l) => l.land_id !== land_id));
    setselectedTabLands(() =>
      selectedTabLands.filter((l) => l.land_id !== land_id)
    );
    setpaginatedLands(() =>
      paginatedLands.filter((l) => l.land_id !== land_id)
    );
    const newMarketplaces = JSON.parse(JSON.stringify(marketplaces));
    newMarketplaces.push(removedLand);
    setmarketplaces(() => newMarketplaces);
    setIsMarketplaceModal(false);
  };

  const paginatedFilteredLands = paginatedLands.filter(
    (l) => l.type === fd.seller_type || fd?.seller_type == 0
  );

  const setMarketplaceModal = (item) => () => {
    console.log('item',item);
    if (!isMarketplace) {
      setIsMarketplaceModal(item);
    }
    if (isMarketplace) {
      history.push({
        pathname: `/sell/market_land/${item?.id}`,
      });
    }
  };

  return (
    <>
      <ConnectWalletModal
          isShow={isConnectShow}
          onHide={() => setisConnectShow(false)}
        />
      {isMarketplaceModal && (
        <MarketplaceModal
          parcel={isMarketplaceModal}
          onMHide={() => setIsMarketplaceModal(null)}
          onFilterSubmit={onFilterSubmit}
        />
      )}
      <div className={`tabsmain ${openfilter ? "active-filter" : ""}`}>
        <div className="circleleftop" />
        <img src={BuildingIcon} className="buildingtr" alt="..." />

        {paginatedFilteredLands.length > 3 && (
          <>
            <div className="circleleftop" />
            <img
              src={BuildingIcon}
              className="buildingtl buildingtl-inner"
              alt="..."
            />
          </>
        )}

        <div className="container">
          <div className="tophead d-flex align-items-center">
            <ul className="nav nav-tabs" id="myTab" role="tablist">
              <img
                src={SellerLandsIcon}
                alt="..."
                style={{
                  visibility: "hidden",
                  ...(!isMarketplace && {
                    visibility: "visible",
                    position: "relative",
                    top: "50px",
                  }),
                }}
              />

              <img
                src={SellerMarketIcon}
                alt="..."
                style={{
                  visibility: "hidden",
                  ...(isMarketplace && {
                    position: "relative",
                    visibility: "visible",
                  }),
                }}
              />

              <li className="nav-item" role="presentation">
                <button
                  className={`nav-link ${
                    isMarketplace === false ? "active" : ""
                  }`}
                  type="button"
                  role="tab"
                  onClick={changeTab(false)}
                >
                  Your Lands
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className={`nav-link nav-link-market ${
                    isMarketplace ? "active" : ""
                  }`}
                  type="button"
                  role="tab"
                  onClick={changeTab(true)}
                >
                  Marketplace
                </button>
              </li>
            </ul>
            <div className="rightbtns">
              {fd?.seller_type === 1 && (
                <button
                  className="btn btn-warning btn-round btn-icon-right "
                  onClick={resetFilter}
                >
                  Parcels <img src={CrossIcon} alt="..." />
                </button>
              )}
              {fd?.seller_type === 2 && (
                <button
                  className="btn btn-warning btn-round btn-icon-right "
                  onClick={resetFilter}
                >
                  Estates <img src={CrossIcon} alt="..." />
                </button>
              )}
              <button className="filterbtn" onClick={openFilter}>
                Filter <img src={FilterIcon} alt="" />
              </button>
            </div>
            <div className={`filterdd d-none ${openfilter ? "active" : ""}`}>
              <h2>Filter</h2>
              <div className="mb-5">
                <label className="type">Type</label>
                <select
                  name="seller_type"
                  className="form-control"
                  onChange={onInputChange}
                  value={innerfd?.seller_type}
                >
                  <option value="0">All</option>
                  <option value="1">Parcels</option>
                  <option value="2">Estates</option>
                </select>
              </div>
              <div className="mb-3 filterbuttons">
                <button className="btn btn-warning" onClick={applyFilter}>
                  <img src={FilterBlackIcon} alt="" /> Apply Filter
                </button>
                <button className="btn btn-white" onClick={resetFilter}>
                  <img src={ResetIcon} alt="" /> Reset Filter
                </button>
              </div>
            </div>
          </div>

          <div className="tab-content" id="myTabContent">
            <div
              className="tab-pane fade show active"
              id="home"
              role="tabpanel"
              aria-labelledby="home-tab"
            >
              <section className="darkcards mb-5" style={{zIndex:"3"}}>
                <div
                  className={`row ${
                    paginatedFilteredLands.length ? "" : "no-data"
                  }`}
                >
                  {paginatedFilteredLands.map((item, i) => (
                    <div
                      key={i}
                      className="col-lg-4"
                      onClick={setMarketplaceModal(item)}
                    >
                      <div className="card p-cards">
                        <figure>
                          <img
                            src={item.image}
                            className="img-fluid"
                            alt=""
                            style={{ minHeight: "380px" }}
                          />
                          {/* <span className="chaticon">
                            <img src={ChatIcon} alt="" />
                          </span> */}
                        </figure>

                        <div className="card-body">
                          <div className="d-flex align-items-center justify-content-between">
                            <img
                              src={UserIcon}
                              className="img-fluid  user-image"
                              alt=""
                            />
                            {/* <button className="btn btn-light">
                              <img src={FlagIcon} alt="" />
                            </button> */}
                          </div>

                          <div className="innerinfo">
                            <h3 className="text-white">
                              {item.name || "No title"}
                            </h3>
                          </div>
                          <ul className="list-inline">
                            <li className="list-inline-item">
                              <p className="card-text">
                                <span className="text-primary">
                                  {item?.type === 1 ? "Position" : "Center"}:{" "}
                                </span>
                                {!item?.center
                                  ? `${item?.x}, ${item?.y}`
                                  : `${item?.center?.join(", ")}`}
                              </p>
                            </li>
                            <li className="list-inline-item"></li>
                            <li className="list-inline-item">
                              <p className="card-text">
                                <span className="text-primary">Type: </span>
                                {item?.type === 1 ? "Parcels" : "Estates"}
                              </p>
                            </li>
                          </ul>
                        </div>
                        <div className="circleleftop" />
                      </div>
                    </div>
                  ))}

                  {!isLoading && paginatedFilteredLands.length === 0 && (
                    <div className="mt-5">
                      <img src={NoDataIcon} alt="..." />
                      <h3 className="mt-5">Oops</h3>
                      <p className="mt-4">
                        {!isMarketplace
                          ? `You don't have any land meet the condition. Connect wallets with lands.`
                          : `You don't have any land meet the condition on the marketplace. Put lands on marketplace that you want to sell.`}
                      </p>
                      <div className="btngroup">
                        {(!isMarketplace && !metaMask?.account) && (
                          <a onClick={connectWallet} className="btn btn-secondary">
                            Connect a Wallet
                          </a>
                        )}
                        {/* <a href="#0" className="btn btn-outline-primary">
                          Learn More
                        </a> */}
                      </div>
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
                </div>
              </section>
            </div>
            <div
              className="tab-pane fade"
              id="profile"
              role="tabpanel"
              aria-labelledby="profile-tab"
            >
              ...
            </div>
          </div>
        </div>
      </div>
      {Boolean(paginatedFilteredLands.length) && (
        <div className="loadmore" onClick={handleNext}>
          <button
            className={`btn btn-loadmore ${
              paginatedFilteredLands.length === selectedTabLands.length
                ? "btn-loadmore-disabled"
                : ""
            }`}
            {...{
              ...(paginatedFilteredLands.length === selectedTabLands.length && {
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
    </>
  );
}
