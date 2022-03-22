import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Sidebar from "react-sidebar";
import Carousel from "react-multi-carousel";

import AppContext from "../../context/AppContext";
import CustomSidebar from "../../components/sidebar";

import "react-multi-carousel/lib/styles.css";

import settingsIcon from "../../assets/Vector.png";
import slider1 from "../../assets/slider1.png";
import slider2 from "../../assets/Intermediate.jpg";
import slider3 from "../../assets/beginner.jpg";
import sl from "../../assets/s-l.png";
import sr from "../../assets/s-r.png";
import logo from "../../assets/logo-white.png";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    paritialVisibilityGutter: 60,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    paritialVisibilityGutter: 50,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    paritialVisibilityGutter: 30,
  },
};

const heading = "Expert";
const text =
  "You understand everything about virtual worlds and how to create value. Click here for more details.";
const text1 = "";
const img = slider1;

const items = [
  {
    heading: "SELL PARCELS",
    text: "Our website has a growing numbers of unique visitors loading specifically to acquire digital real estates.",
    text1:
      "Our market leading platform helps you to market directly to buyers.",
    text2:
      "Individual parcels or several parcels located in different virtual worlds.",
    text3: "Click here to continue",
    img: slider1,
  },
  {
    heading: "SELL ESTATES",
    text: "We have experienced Buyers on a Market leading Client list.",
    text1:
      "We are ready to match your Estates with the best buyers in the market.",
    text2:
      "Visually higher value lot sides that reviewers market leaders to access buyers and give certainty of close.",
    img: slider1,
  },
  {
    heading: "SELL OTHERS",
    text: "Do you need help Maximising the value of your real estate?",
    text1: "If so then contact us.",
    img: slider1,
  },
];

function Sectionone(props) {
  const history = useHistory();
  const { loginUser } = useContext(AppContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const setSidebar = () => {
    const newIs = !isSidebarOpen;
    setIsSidebarOpen(newIs);
  };

  const CustomRightArrow = ({ onClick, ...rest }) => {
    const {
      onMove,
      carouselState: { currentSlide, deviceType },
    } = rest;
    // onMove means if dragging or swiping in progress.
    //return <button onClick={() => onClick()} >asdasasd</button>;
    return (
      <img
        alt=""
        src={sr}
        onClick={() => onClick()}
        style={{
          position: "absolute",
          bottom: "10px",
          right: "20px",
          width: "40px",
          cursor: "pointer",
        }}
      />
    );
  };

  const CustomLeftArrow = ({ onClick, ...rest }) => {
    const {
      onMove,
      carouselState: { currentSlide, deviceType },
    } = rest;
    // onMove means if dragging or swiping in progress.
    //return <button onClick={() => onClick()} >asdasasd</button>;
    return (
      <img
        alt=""
        src={sl}
        onClick={() => onClick()}
        style={{
          position: "absolute",
          bottom: "10px",
          right: "65px",
          width: "40px",
          cursor: "pointer",
        }}
      />
    );
  };

  const sidebarItemClick = (item) => {
    if (item === "login") {
      setSidebar();
      props.toggleModalSignin(true);
    } else if (item === "signup") {
      setSidebar();
      props.toggleModalSignin(false);
    } else if (item === false) {
      setSidebar();
    } else if (item === "logout") {
      setSidebar();
      history.push("/");
    } else if(item === 'connectWallet') {
      props.toggleModalConnectWallet(true);
      setSidebar();
    } else if(item === 'unconnectWallet') {
      //props.toggleModalConnectWallet(false);
      setSidebar();
    }
  };

  return (
    <>
      <CustomSidebar
        isSidebarOpen={isSidebarOpen}
        onItemClick={sidebarItemClick}
      />
      {/* <Sidebar
        sidebar={
          <div className="sidebar-inner">
            <ul>
              <li>
                <a href="/">Login</a>{" "}
              </li>
              <li>
                <a href="/">Signup</a>
              </li>
            </ul>
          </div>
        }
        open={isSidebarOpen}
        onSetOpen={setSidebar}
        pullRight
        sidebarClassName="sidebar-cls"
        contentClassName="sidebar-content"
        overlayClassName="sidebar-overlay"
      ></Sidebar> */}

      <section className="landing">
        <div className="container">
          <nav>
            <div className="logo float-left source-serif-font">
              <span onClick={() => history.push("/")}>
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
            <div className="sand-box text-center"></div>

            <div className="digital-rs text-center">
              <Carousel arrows itemClass="image-item" responsive={responsive}>
                {items.map((it) => {
                  return (
                    <div className="row">
                      <div
                        className="col-sm-12 col-lg-5 text-left"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          paddingBottom: "20px",
                        }}
                      >
                        <div>
                          <h3 className="sl-heading">{it.heading} </h3>
                          <div className="sl-text">
                            <p>{it.text}</p>
                            <p>{it.text1}</p>
                            <p>{it.text2}</p>
                            <p>
                              <span style={{ color: "#00D3FF" }}>click </span>
                              <span className="main-color">here </span>
                              <span style={{ color: "#00D3FF" }}>
                                to continue
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-12 col-lg-5 offset-1">
                        <img
                          alt=""
                          draggable={false}
                          style={{ width: "100%", height: "100%" }}
                          src={it.img}
                        />
                      </div>
                    </div>
                  );
                })}
              </Carousel>
              <div className="row"></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Sectionone;
