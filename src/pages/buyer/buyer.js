import React, { useState, useEffect } from "react";
import request from "../../services/Requests";
import Location from "./location";
import { useLocation, useHistory, useParams } from "react-router-dom";

import { nFormatter } from "../../pages/newBuyer/utils";

import UserIcon from "../../assets/admin/user1.png";
import FilterIcon from "../../assets/filtericon.svg";
import FilterBlackIcon from "../../assets/filter-black.svg";
import CrossIcon from "../../assets/admin/cross.svg";
import ArrowDownIcon from "../../assets/admin/arrowdown.svg";
import BuildingIcon from "../../assets/building-r.svg";
import NoDataIcon from "../../assets/no-data-icon.png";
import ResetIcon from "../../assets/admin/reset.svg";
import SellerLandsIcon from "../../assets/line-market.svg";
import SellerMarketIcon from "../../assets/line-bids.svg";
import EstateGolden from "../../assets/estate-golden.png";
import ParcelGolden from "../../assets/parcel-golden.png";

import MarketplaceModal from "../../components/marketLandBidModal";

export default function MainContent({ setTabSelected, tabSelected }) {
  const history = useHistory();

  const [isLoading, setisLoading] = useState(true);
  const [openfilter, setopenfilter] = useState(false);
  /* const [isMarketplace, setisMarketplace] = useState(false); */
  const [lands, setlands] = useState([]);
  const [marketplaces, setmarketplaces] = useState([]);
  const [innerfd, setInnerFd] = useState({ seller_type: 0 });
  const [fd, setFd] = useState({ seller_type: 0 });
  const [isMarketplaceModal, setIsMarketplaceModal] = useState(false);
  const [paginatedLands, setpaginatedLands] = useState([]);
  const [selectedTabLands, setselectedTabLands] = useState([]);
  const [next, setNext] = useState(0);
  const params = useParams();

  let $backdropContainer = null;
  const landsPerPage = 6;

  useEffect(() => {
    $backdropContainer = document.getElementById("backdrop-container");
    $backdropContainer.onclick = function () {
      this.classList.remove("active");
      closeFilter();
    };
    if(params.active_tab === "2"){
      setTabSelected(2);
      fetchMyBids();
    }else{
      fetchLands();
    }
  }, []);

  const fetchMyBids = async () => {
    setisLoading(true);
    if (paginatedLands.length) {
      setpaginatedLands(() => []);
    }
    const result1 = await request.get(`api/v1/my_bids/`);
    let newMarketplaces = await result1.json();
    newMarketplaces = newMarketplaces.map((l) => ({ ...l, type: l.land_type }));
    setmarketplaces(() => newMarketplaces);
    setselectedTabLands(() => newMarketplaces);
    handleNext(newMarketplaces, true);
    setisLoading(false);
  };

  const fetchLands = async () => {
    setisLoading(true);
    if (paginatedLands.length) {
      setpaginatedLands(() => []);
    }
    const result = await request.get(`api/v1/market_lands/`);
    const newLands = await result.json();
    const filteredLands = newLands;
    setlands(() => filteredLands);
    setselectedTabLands(() => filteredLands);
    handleNext(filteredLands, true);
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
    setInnerFd({ min_price: "", max_price: "", seller_type: 0 });
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
    if (innerfd.min_price !== "" && innerfd.min_price) {
      newSelectedTabLands = newSelectedTabLands.filter(
        (l) => l.min_price >= innerfd.min_price
      );
    }
    if (innerfd.max_price !== "" && innerfd.max_price) {
      newSelectedTabLands = newSelectedTabLands.filter(
        (l) => l.max_price <= innerfd.max_price
      );
    }
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
    setTabSelected(_isMarketplace === false ? 1 : 2);
  };

  const onFilterSubmit = ({ land }) => {
    const newLands = JSON.parse(JSON.stringify(lands));
    const resultLand = newLands.find((l) => l.id == land);
    if (resultLand) {
      resultLand.already_bid = true;
      setlands(() => newLands);
    }
    const newSelectedTabLands = JSON.parse(JSON.stringify(selectedTabLands));
    const resultSelectedTabLand = newSelectedTabLands.find((l) => l.id == land);
    if (resultSelectedTabLand) {
      resultSelectedTabLand.already_bid = true;
      setselectedTabLands(() => newSelectedTabLands);
    }

    const newPaginatedLands = JSON.parse(JSON.stringify(paginatedLands));
    const resultPaginatedLand = newPaginatedLands.find((l) => l.id == land);
    if (resultPaginatedLand) {
      resultPaginatedLand.already_bid = true;
      setpaginatedLands(() => newPaginatedLands);
    }
    setIsMarketplaceModal(false);
  };

  const paginatedFilteredLands = paginatedLands.filter(
    (l) => l.type === fd.seller_type || fd?.seller_type == 0
  );

  const setMarketplaceModal = (item) => () => {
    if (item.already_bid) {
      return;
    }
    if (!isMarketplace) {
      setIsMarketplaceModal(item);
    }
    if (isMarketplace) {
      history.push({
        pathname: `/buy/bid/${item?.id}`,
      });
    }
  };

  const isMarketplace = tabSelected === 1 ? false : true;

  return (
    <>
      {isMarketplaceModal && (
        <MarketplaceModal
          parcel={isMarketplaceModal}
          onMHide={() => setIsMarketplaceModal(null)}
          onFilterSubmit={onFilterSubmit}
        />
      )}
      <div className="tabsmain">
        <div className="circleleftop" />
        <img src={BuildingIcon} className="buildingtr" alt="..." />

        {/* {paginatedFilteredLands.length > 3 && (
          <>
            <div className="circleleftop" />
            <img
              src={BuildingIcon}
              className="buildingtl buildingtl-inner"
              alt="..."
            />
          </>
        )} */}

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
                  className={`nav-link nav-link-1 ${
                    isMarketplace === false ? "active" : ""
                  }`}
                  type="button"
                  role="tab"
                  onClick={changeTab(false)}
                >
                  Market Lands
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className={`nav-link nav-link-2 ${
                    isMarketplace ? "active" : ""
                  }`}
                  type="button"
                  role="tab"
                  onClick={changeTab(true)}
                >
                  My Bids
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="">
          <div className="tab-content" id="myTabContent">
            <div
              className="tab-pane fade show active"
              id="home"
              role="tabpanel"
              aria-labelledby="home-tab"
            >
              {tabSelected === 1 && (
                <>
                  <div className="container">
                    <div className="walk-around-container">
                      <div className="walk-around-div col-9">
                        <h3>
                          Walk around the Decentraland map to see lands that are
                          on marketplace currently
                        </h3>
                      </div>
                      <div className="walk-around-p col-11">
                        <p className="">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Id ut aliquam non et enim, amet nisl, non
                          ultricies. Enim nam enim enim magna pellentesque
                          aliquet proin. Dignissim ut diam in egestas viverra
                          etiam. Scelerisque tortor, cum non eu, posuere. Ipsum
                          faucibus vitae sed cras commodo non.
                        </p>
                        <div className="d-flex justify-content-between circle-container estates-parcels">
                          <div>
                            <div className="parcel-godlen">
                              <img src={EstateGolden} alt="..." />
                              <p className="estate-text">
                                Estates{" "}
                                {lands?.filter((l) => l.type === 2).length}
                              </p>
                            </div>
                          </div>
                          <div className="ml-5">
                            <div className="estate-godlen">
                              <img src={ParcelGolden} alt="..." />
                              <p className="parcel-text">
                                Parcels{" "}
                                {lands?.filter((l) => l.type === 1).length}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Location isBuyer={false} marketLands={lands} />
                </>
              )}
              <div className="container">
                <div
                  className={`row search-filter search-filter-${
                    tabSelected === 1 ? "land" : "bid"
                  } d-flex`}
                >
                  <div className="col-12 text-right">
                    <div className="rightbtns d-flex">
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
                    <div
                      className={`filterdd d-none ${
                        openfilter ? "active" : ""
                      }`}
                    >
                      <h2>Filter</h2>
                      <div className="mb-5">
                        <label className="type">Land type</label>
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

                        {!isMarketplace && (
                          <>
                            <label className="type mt-4">Price</label>
                            <div class="marketland-filter">
                              <div class="dcl">
                                <div class="inner-dcl">
                                  <div class="price-range">
                                    <div class="row m-0">
                                      <div class="col pl-0">
                                        <input
                                          value={fd.min_price}
                                          type="number"
                                          name="min_price"
                                          onChange={onInputChange}
                                          placeholder="Min"
                                        />
                                      </div>
                                      <div class="col pr-0">
                                        <input
                                          value={fd.max_price}
                                          type="number"
                                          name="max_price"
                                          onChange={onInputChange}
                                          placeholder="Max"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                      </div>

                      <div className="mb-3 filterbuttons">
                        <button
                          className="btn btn-warning"
                          onClick={applyFilter}
                        >
                          <img src={FilterBlackIcon} alt="" /> Apply Filter
                        </button>
                        <button className="btn btn-white" onClick={resetFilter}>
                          <img src={ResetIcon} alt="" /> Reset Filter
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

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
                            {!isMarketplace && item.already_bid && (
                              <>
                                <button className="already-bid-btn">
                                  Bid Done Already
                                </button>
                                <div className="already-bid"></div>
                              </>
                            )}
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

                            <div
                              className={`innerinfo innerinfo-${
                                isMarketplace ? "market" : "land"
                              }`}
                            >
                              <h3 className="text-white">
                                {item.name || "No title"}
                              </h3>
                            </div>
                            <div
                              className={`priceinfo d-flex ${
                                !isMarketplace ? "border-bottom-px" : ""
                              } priceinfo-${isMarketplace ? "market" : "land"}`}
                            >
                              <div className="txt">
                                <label className="heading">Price Range </label>
                                <label className="description pl-3">
                                  {nFormatter(item?.seller_min_price)} -{" "}
                                  {nFormatter(item?.seller_max_price)} MANA
                                </label>
                              </div>
                              {!isMarketplace && !item?.already_bid && (
                                <div>
                                  <button className="place-bid">
                                    Place Bid
                                  </button>
                                </div>
                              )}
                            </div>
                            {isMarketplace && (
                              <div className="bidinfo">
                                <label className="heading">Bid Range</label>
                                <label className="description pl-3">
                                  {nFormatter(item?.min_price)} -{" "}
                                  {nFormatter(item?.max_price)} MANA
                                </label>
                              </div>
                            )}
                            <ul className="list-inline bottom-list-inline">
                              <li className="list-inline-item">
                                <p className="card-text">
                                  <span className="text-primary">Type </span>
                                  {item?.type === 1 ? "Parcels" : "Estates"}
                                </p>
                              </li>

                              <li className="list-inline-item"></li>
                              <li className="list-inline-item">
                                <p className="card-text">
                                  <span className="text-primary">
                                    Position{" "}
                                  </span>
                                  {!item?.center
                                    ? `${item?.x}, ${item?.y}`
                                    : `${item?.center?.join(", ")}`}
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
                            ? `We don't have any lands meet the condition at the moment.`
                            : `There isn't any bid in the condition at the moment. Place bids to buy lands.`}
                        </p>
                        {/* <div className="btngroup">
                          {!isMarketplace && (
                            <>
                              <a href="#0" className="btn btn-secondary">
                                Connect a Wallet
                              </a>
                              <a href="#0" className="btn btn-outline-primary">
                                Learn More
                              </a>
                            </>
                          )}
                        </div> */}
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
