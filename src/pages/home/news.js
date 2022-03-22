import React from "react";

import article1 from "../../assets/article1.png";
import article2 from "../../assets/article2.png";
import article3 from "../../assets/article3.png";
import rightMatrix from "../../assets/right-matrix.png";
import a2t from "../../assets/a2t.png";
import a2b from "../../assets/a2b.png";

export default function News() {
  return (
    <>
      <section className="articles">
        <div className="articles-matrix">
          <img src={rightMatrix} />
        </div>
        <h1 className="bold text-center heading">
          <span className="main-color">Virtual Reality Market</span>
          <span> Statistics</span>
        </h1>
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-lg-6">
              <div className="articles-box articles-box-heading">
                <h3 className="sec-color">GLOBAL VR MARKET IS EXPANDING </h3>
                <p>
                  Global VR marekt was $3.1Bn in 2019 and is projected to reach
                  $7.88Bn by 2027. VR market size 2021 is $4.8Bn
                </p>
              </div>
            </div>
            <div className="col-sm-12 col-lg-6">
              <div className="articles-box">
                <img src={article1} className="img-fluid" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="wave">
        <img src={a2t} className="img-fluid" />
      </div>
      <section className="news">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-lg-6">
              <div className="news-box">
                <img src={article2} className="img-fluid" />
              </div>
            </div>
            <div className="col-sm-12 col-lg-6">
              <div className="news-box">
                <h3 className="main-color o-s">OUR SERVICES </h3>
                <ul>
                  <li>Advisory</li>
                  <li>Agency</li>
                  <li>
                    Consultancy
                    <p className="r-t">
                      to help you make informed decisions about your Digital
                      world!
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <div className="wave">
        <img src={a2b} className="img-fluid" />
      </div>
      <section className="post">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-lg-6">
              <div className="post-box">
                <h3 className="sec-color">
                  Rentals Industrial Suburb Home for Sale{" "}
                </h3>
                <p>
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod tempor invidunt ut labore et dolore magna
                  aliquyam erat, sed diam voluptua. At vero eos et nonumy eirmod
                  tempor invidunt ut labore et dolore magna aliquyam erat, sed
                  diam voluptua. invidunt ut labore et dolore magna aliquyam
                  erat, sed diam voluptua.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod tempor invidunt ut labore et dolore magna
                  aliquyam erat, sed diam voluptua. At vero eos et nonumy eirmod
                  tempor invidunt ut labore et dolore magna aliquyam erat, sed
                  diam voluptua. magna aliquyam erat, sed diam voluptua. At vero
                  eos et nonumy eirmod tempor invidunt.
                </p>
              </div>
            </div>
            <div className="col-sm-12 col-lg-6">
              <div className="post-box">
                <img src={article3} className="img-fluid" />
              </div>
            </div>
          </div>
        </div>
      </section>
     */}
    </>
  );
}
