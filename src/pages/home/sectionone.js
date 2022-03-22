import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import AppContext from "../../context/AppContext";
import CustomSidebar from "../../components/sidebar";

import b1 from "../../assets/b-1.png";
import b2 from "../../assets/b-2.png";
import b3 from "../../assets/b-3.png";
import settingsIcon from "../../assets/Vector.png";
import headingImg from "../../assets/Group 772.png";
import logo from "../../assets/logo-white.png";

function Sectionone(props) {
  const { loginUser } = useContext(AppContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const history = useHistory();
  const isLogined = Object.keys(loginUser).length;

  const setSidebar = () => {
    const newIs = !isSidebarOpen;
    setIsSidebarOpen(newIs);
  };

  const onBuyerClick = () => {
    if (isLogined) {
      props.toggleModalSignin(null);
      history.push("/buy");
      return;
    }
    props.toggleModalSignin(true, "buy");
  };

  const sidebarItemClick = (item) => {
    if (item === "login") {
      setSidebar();
      props.toggleModalSignin(true);
    } else if (item === "signup") {
      setSidebar();
      props.toggleModalSignin(false);
    } else if (item === false || item === "logout") {
      setSidebar();
    } else if (item === "connectWallet") {
      props.toggleModalConnectWallet(true);
      setSidebar();
    } else if (item === "unconnectWallet") {
      //props.toggleModalConnectWallet(false);
      setSidebar();
    }
  };

  const onSellerClick = () => {
    if (isLogined) {
      props.toggleModalSignin(null);
      history.push("/sell");
      return;
    }
    props.toggleModalSignin(true, "sell");
  };

  return (
    <>
      <CustomSidebar
        isSidebarOpen={isSidebarOpen}
        onItemClick={sidebarItemClick}
      />
      <section className="landing">
        <div className="container">
          <nav>
            <div className="logo float-left source-serif-font">
              <span>
                <img src={logo} style={{ width: "150px" }} />
              </span>
            </div>
            <div
              className={`menu float-right ${isSidebarOpen ? "d-none" : ""}`}
              onClick={setSidebar}
            >
              <div style={{ display: "inline-flex" }}>
                <img src={settingsIcon} alt="" />
              </div>
              {loginUser && loginUser.first_name && (
                <div className="header-username">
                  <label>welcome, {loginUser.first_name}</label>
                </div>
              )}
            </div>
          </nav>
          <div className="padding" style={{ paddingTop: "6%" }}>
            <div className="sand-box text-center">
              <img src={headingImg} alt="" />
            </div>

            <div className="digital-rs text-center">
              <h1 className="bold source-serif-font">
                Digital <span className="main-color">Real Estate</span>
              </h1>
              <h6>Your access to the world of Digital Property</h6>

              <div className="row">
                <div className="col-sm-12 col-md-4">
                  <div className="digital-box">
                    <img src={b1} alt="" />
                    <h2 className="bold source-serif-font">BUYER</h2>
                    <button className="digital-box-btn" onClick={onBuyerClick}>
                      Buy Now
                    </button>
                  </div>
                </div>
                <div className="col-sm-12 col-md-4">
                  <div className="digital-box">
                    <img src={b2} alt="" />
                    <h2 className="bold source-serif-font">RENTER</h2>
                    <button className="digital-box-btn">Rent Now</button>
                  </div>
                </div>
                <div className="col-sm-12 col-md-4">
                  <div className="digital-box">
                    <img src={b3} alt="" />
                    <h2 className="bold source-serif-font">SELLER</h2>
                    <button className="digital-box-btn" onClick={onSellerClick}>
                      Sell Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="social-media">
          <ul>
            <li>
              <a href="#">
                <i className="fab fa-instagram"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fab fa-twitter"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fab fa-facebook"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <div className="vl"></div>
              </a>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}

export default Sectionone;
