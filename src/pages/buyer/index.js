import React, { useState } from "react";
import Header from "../common/header";
import Footer from "../common/footer";
import MainContent from "./buyer";
import CustomCarousel from "./customCarousel";
import NewsLetter from "./newsLetter";

import BuildingIcon from "../../assets/building.svg";

import "./index.scss";
export default function Buyer() {
  const [tabSelected, setTabSelected] = useState(1);

  return (
    <>
      <div className="buyer-container">
        <Header />
        <section className="buyerinner">
          <div className="circleleftop" />
          <img src={BuildingIcon} className="buildingtl" alt=".." />
          <div className="slidermain mt-5">
            <CustomCarousel />
            <MainContent
              setTabSelected={setTabSelected}
              tabSelected={tabSelected}
            />
            {tabSelected === 1 && <NewsLetter />}
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}
