import React, { useState, useEffect } from "react";

import Footer from "../../components/footer";
import Latestsale from "./latestsale";
import Sectionone from "../../components/sectionone";
import Header from "../../components/header";
import Ellipse from "../../assets/Ellipse 2.png";

import "./index.scss";
import "./media.scss";

function Home(props) {
  return (
    <>
      <Header />
      <div className="seller-comp">
        <Sectionone />

        <img
          src={Ellipse}
          alt=""
          style={{ position: "absolute", marginTop: "35px", left: "19px" }}
          className="bg-blur"
        />
        <div className="your-land-container container">
          <div className="sub-container">
            <h1 className="sec-color main-heading">Your Lands</h1>

            <label className="y-l-l">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id ut
              aliquam non et enim, amet nisl, non ultricies. Enim nam enim enim
              magna pellentesque aliquet proin. Dignissim ut diam in egestas
              viverra etiam. Scelerisque tortor, cum non eu, posuere. Ipsum
              faucibus vitae sed cras commodo non.
            </label>
          </div>
        </div>
        <Latestsale />
        <div className="abv-footer">
          <img
            src={Ellipse}
            alt=""
            style={{ position: "absolute", marginTop: "25px", right: "12%" }}
            className="bg-blur"
          />
        </div>

        <Footer />
      </div>
    </>
  );
}

export default Home;
