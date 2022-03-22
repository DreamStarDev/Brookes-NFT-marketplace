import React, { useEffect, useState } from "react";
import NumberFormat from "react-number-format";

import request from "../../services/Requests";

import left from "../../assets/left.png";
import right from "../../assets/right.png";
import pt from "../../assets/price-t.png";
import pb from "../../assets/price-b.png";

export default function Chat({ isBuyer }) {
  const [stats, setStats] = useState({
    avg: 0,
    highest: 0,
  });

  /* useEffect(() => {
    fetchStats();
  }, []); */

  useEffect(() => {
    fetchStats();
  }, [isBuyer]);

  const fetchStats = async () => {
    try {
      let avg = 0;
      let highest = 0
      if (isBuyer) {
        let {
          avg_price_in_latest_50_parcels,
          highest_price_in_latest_50_parcels,
        } = await (await request.get("legacy_api/parcel/sold_statistics/")).json();
        avg = avg_price_in_latest_50_parcels;
        highest = highest_price_in_latest_50_parcels
      } else {
        let {
          avg_price_in_latest_50_estates,
          highest_price_in_latest_50_estates,
        } = await (await request.get("legacy_api/estate/sold_statistics/")).json();
        avg = avg_price_in_latest_50_estates;
        highest = highest_price_in_latest_50_estates
      }
      setStats({ avg, highest });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="wave" style={{ position: "relative" }}>
        <img alt="" src={pt} style={{ width: "100%" }} />
      </div>
      <section className="price">
        <div className="container">
          <div className="price-grid">
            <div className="price-box text-center">
              <div className="price-box-cont">
                <h6>Average Price For</h6>
                <h5 className="main1-color bold">the latest</h5>
                <h5 className="main1-color bold">
                  50 bought {isBuyer ? "parcels" : "estates"}
                </h5>
              </div>
              <div className="mana">
                <span className="bold sec-color">
                  <NumberFormat
                    value={stats.avg || 0}
                    displayType={"text"}
                    thousandSeparator={true}
                  />
                </span>{" "}
                <span className="sec-color">Mana</span>
              </div>
            </div>

            <div className="price-box text-center">
              <h6>Highest Price For</h6>
              <h5 className="main1-color bold">the latest</h5>
              <h5 className="main1-color bold">
                50 bought {isBuyer ? "parcels" : "estates"}
              </h5>
              <div className="mana">
                <span className="bold sec-color">
                  <NumberFormat
                    value={stats.highest || 0}
                    displayType={"text"}
                    thousandSeparator={true}
                  />
                </span>{" "}
                <span className="sec-color">Mana</span>
              </div>
            </div>
          </div>
        </div>
        <div className="back-img-price-right">
          <img src={right} alt="" />
        </div>
        <div className="back-img-price-left">
          <img src={left} alt="" />
        </div>
      </section>
      <div className="wave">
        <img alt="" src={pb} style={{ width: "100%" }} />
      </div>
    </>
  );
}
