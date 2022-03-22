import React from "react";
import Header from "../common/header";
import Footer from "../common/footer";
import MainContent from "./seller";
import CustomCarousel from "./customCarousel";
import BuildingIcon from "../../assets/building.svg";

import "./index.scss";
export default function Seller() {
  return (
    <>
      <div className="seller-container">
        <Header />
        <section className="sellerinner">
          <div className="circleleftop" />
          <img src={BuildingIcon} className="buildingtl" alt=".." />
          <div className="slidermain mt-5">
            <CustomCarousel />
            <MainContent />
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}
