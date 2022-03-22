import React, { useState, useEffect } from "react";

import request from "../../services/Requests";
import Footer from "../../components/footer";
import RecentlySelling from "./recentlySelling";
import LandSale from "./landSale";
import Location from "../newBuyer/location";
import Service from "./services";
import Sectionone from "../../components/sectionone";
import Header from "../../components/header";
import NewsLetter from "./newsLetter";

import { TYPES } from "./utils";

import "./index.scss";
import "./media.scss";
import "./newBuyer.scss";

function Home(props) {
  const [parcels, setParcels] = useState([]);
  const [allParcelsCount, setAllParcelsCount] = useState({
    estates: 0,
    parcels: 0,
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = async (cond = null) => {
    try {
      const result = await (
        await request.get(`api/v1/selling_lands/?${cond ? cond : ""}`)
      ).json();
      setParcels([...result]);
      if (cond === null) {
        setAllParcelsCount({
          estates: result.filter(({ type }) => type === TYPES.ESTATE).length,
          parcels: result.filter(({ type }) => type === TYPES.PARCEL).length,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onFilterSubmit = ({ type, min_price, max_price }) => {
    let cond = ``;
    if (+type !== 0) {
      cond += `type=${type}`;
    }
    if (min_price !== null) {
      cond += `&min_price=${min_price}`;
    }
    if (max_price !== null) {
      cond += `&max_price=${max_price}`;
    }
    getData(cond);
  };

  return (
    <>
      <Header />
      <div className="seller-comp buyer-container">
        <Sectionone />
        <Service count={allParcelsCount} />
        <Location />
        <LandSale parcels={parcels} onFilterSubmit={onFilterSubmit} />
        <RecentlySelling />
        <NewsLetter />

        <Footer />
      </div>
    </>
  );
}

export default Home;
