import React, { useEffect, useContext, useState, useRef } from "react";
import { useLocation, useHistory } from "react-router-dom";

import AppContext from "../../context/AppContext";

import LogoAdmin from "../../assets/logoadmin.png";
import UserIcon from "../../assets/admin/user.png";
import BellIcon from "../../assets/admin/bell.svg";
import logoutBg from "../../assets/logout-bg.svg";
import settingsIcon from "../../assets/admin/settings-icon.svg";
import logoutIcon from "../../assets/admin/logout-icon.svg";
import UserNewIcon from "../../assets/user-new.png";
import ConnectWalletModal from "../../components/connectWalletModal/index";

export default function Header() {
  const { loginUser, setLoginUser, metaMask, setmetaMask } = useContext(AppContext);
  const history = useHistory();
  const ref = useRef();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const [isConnectShow, setisConnectShow] = useState(false);
  const connectWallet = () => setisConnectShow(true);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (isMenuOpen && ref.current && !ref.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isMenuOpen]);

  const btnLogout = () => {
    window.localStorage.removeItem("brookes-token");
    window.localStorage.removeItem("brooke-metamask");
    setLoginUser({});
    history.push("/");
  };

  return (
    <>
      <ConnectWalletModal
          isShow={isConnectShow}
          onHide={() => setisConnectShow(false)}
        />
      <header className="header2">
        <nav className="navbar navbar-expand-lg">
          <div className="container p-0">
            {/* <a className="navbar-brand pagelogomobile" href="#">
              <img src={LogoAdmin} className="img-fluid logodeskt" alt="" />
            </a>

            <span
              className="menutoggle collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i></i>
              <i></i>
              <i></i>
            </span> */}
            <div
              className="collapse navbar-collapse justify-content-between"
              id="navbarSupportedContent"
            >
              <a className="navbar-brand pagelogodesk " href="/">
                <img src={LogoAdmin} className="img-fluid logodeskt" alt="" />
              </a>
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item menu-item">
                  <a
                    aria-current="page"
                    href="/buy"
                    className={`nav-link ${
                      pathname === "/buy" || pathname.includes("/buy")
                        ? "active"
                        : ""
                    }`}
                  >
                    Buy
                  </a>
                </li>
                <li className="nav-item menu-item">
                  <a
                    className={`nav-link ${
                      pathname === "/sell" || pathname.includes("/sell")
                        ? "active"
                        : ""
                    }`}
                    aria-current="page"
                    href="/sell"
                  >
                    Sell
                  </a>
                </li>
                <li className="nav-item menu-item">
                  <a
                    className={`nav-link ${
                      pathname === "/offers" ||
                      pathname.includes("/offers/detail")
                        ? "active"
                        : ""
                    }`}
                    aria-current="page"
                    href="/offers"
                  >
                    Offers
                  </a>
                </li>
                <li className="nav-item menu-item">
                  <a className={`nav-link ${
                      pathname === "/contracts" ||
                      pathname.includes("/contracts/detail")
                        ? "active"
                        : ""
                    }`} aria-current="page" href="/contracts">
                    Contracts
                  </a>
                </li>
                <li className="nav-item menu-item ">
                  <a className="nav-link" aria-current="page" href="#">
                    About Us
                  </a>
                </li>

                {/* <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    About Us
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link ">Services</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link ">Support</a>
                </li> */}
              </ul>
              <nav className="navbar adminmenu">
                <ul className="navbar-nav">
                  <li className="nav-item notification">
                    <a href="" className="nav-link">
                      <img src={BellIcon} alt="" />
                      {/* <span className="count">2</span> */}
                    </a>
                  </li>
                  <li className="nav-item dropdown userdd mr-3">
                    <div className="dropdown">
                      <span
                        className="dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton1"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        ref={ref}
                        onClick={() => setIsMenuOpen((oldState) => !oldState)}
                      >
                        <img src={UserNewIcon} alt="" className="mr-3" />
                        <span className="d-none d-sm-inline">
                          {loginUser?.first_name}
                        </span>
                        {isMenuOpen && (
                          <ul className="user-drop"
                            style={{
                              listStyle: "none",
                              background: "#30496ac4",
                              position: "absolute",
                              right: "0px",
                              paddingInlineStart: "0px",
                              borderRadius: "8px 0px 8px 8px"
                            }}
                          >
                            {!metaMask?.account && (
                              <>
                              <li style={{ margin: "20px 20px 15px" }}>
                                <a onClick={connectWallet} style={{ color: "white", opacity: "0.5" }} >
                                  {/* <img style={{ marginRight: "10px" }} src={settingsIcon} /> */}
                                  {" "}Connect a Wallet{" "}
                                </a>
                              </li>
                              <hr style={{ margin: "0px" }} />
                              </>
                            )}
                            <li style={{ margin: "20px 20px 15px" }}>
                              <a
                                href="javascript:void(0)"
                                style={{ color: "white", opacity: "0.5" }}
                              >
                                <img
                                  style={{ marginRight: "10px" }}
                                  src={settingsIcon}
                                />{" "}
                                Setting{" "}
                              </a>
                            </li>
                            <hr style={{ margin: "0px" }} />
                            <li style={{ margin: "15px 20px" }}>
                              <a
                                href="javascript:void(0)"
                                onClick={btnLogout}
                                style={{ color: "white", opacity: "0.5" }}
                              >
                                <img
                                  style={{ marginRight: "10px" }}
                                  src={logoutIcon}
                                />{" "}
                                Log out
                              </a>
                            </li>
                          </ul>
                        )}
                      </span>
                    </div>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
