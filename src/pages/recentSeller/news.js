import React from "react";

import a2t from "../../assets/a2t.png";
import art2 from "../../assets/art-2.png";

export default function News() {
  return (
    <>
      <div className="news-section">
        <div className="wave">
          <img src={a2t} className="img-fluid" />
        </div>
        <section className="news">
          <div className="container">
            <div className="row">
              <div className="col-sm-12 col-lg-6">
                <div className="news-box">
                  <img src={art2} className="img-fluid" />
                </div>
              </div>
              <div className="col-sm-12 col-lg-6">
                <div className="news-box-cont">
                  <h3 className="sec-color">Modern apartment adjacent </h3>
                  <p>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                    diam nonumy eirmod tempor invidunt ut labore et dolore magna
                    aliquyam erat, sed diam voluptua. At vero eos et nonumy
                    eirmod tempor invidunt ut labore et dolore magna aliquyam
                    erat, sed diam voluptua. invidunt ut labore et dolore magna
                    aliquyam erat, sed diam voluptua.
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                    diam nonumy eirmod tempor invidunt ut labore et dolore magna
                    aliquyam erat, sed diam voluptua. At vero eos et nonumy
                    eirmod tempor invidunt ut labore et dolore magna aliquyam
                    erat, sed diam voluptua. magna aliquyam erat, sed diam
                    voluptua. At vero eos et nonumy eirmod tempor invidunt.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
