import React from "react";

import map from "../../assets/map.png";

export default function Latestrent() {
  return (
    <section className="rent">
      <div className="rent-fe">
        <h1 className="text-center source-serif-font">
          Latest for <span className="bold main-color">Rent</span>
        </h1>
        <div className="container">
          <div className="row">
            <div className="col-sm-6 col-md-4 p-1">
              <div className="rent-gallery">
                <img src={map} className="img-fluid" />
                <div className="parcel">
                  <h6 className="sec-color">Parcel - 25,33</h6>
                  <ul>
                    <li>
                      <i className="fas fa-bath sec-color"></i>
                      <span style={{ fontSize: "12px" }}> 05</span>
                    </li>
                    <li>
                      <i className="fas fa-bed sec-color"></i>
                      <span style={{ fontSize: "12px" }}> 03</span>
                    </li>
                    <li>
                      <i className="fas fa-car sec-color"></i>
                      <span style={{ fontSize: "12px" }}> 02</span>
                    </li>
                  </ul>
                  <h6 className="main-color float-right">
                    <span style={{ fontSize: "12px" }}>From</span>{" "}
                    <span className="sec-color">$535.000</span>
                  </h6>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-4 p-1">
              <div className="rent-gallery">
                <img src={map} className="img-fluid" />
                <div className="parcel">
                  <h6 className="sec-color bold">parcel - 25,33</h6>
                  <ul>
                    <li>
                      <i className="fas fa-bath sec-color"></i> 05
                    </li>
                    <li>
                      <i className="fas fa-bed sec-color"></i> 03
                    </li>
                    <li>
                      <i className="fas fa-car sec-color"></i> 02
                    </li>
                  </ul>
                  <h6 className="main-color float-right">
                    From <span className="sec-color bold">$535.000</span>
                  </h6>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-4 p-1">
              <div className="rent-gallery">
                <img src={map} className="img-fluid" />
                <div className="parcel">
                  <h6 className="sec-color bold">parcel - 25,33</h6>
                  <ul>
                    <li>
                      <i className="fas fa-bath sec-color"></i> 05
                    </li>
                    <li>
                      <i className="fas fa-bed sec-color"></i> 03
                    </li>
                    <li>
                      <i className="fas fa-car sec-color"></i> 02
                    </li>
                  </ul>
                  <h6 className="main-color float-right">
                    From <span className="sec-color bold">$535.000</span>
                  </h6>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-4 p-1">
              <div className="rent-gallery">
                <img src={map} className="img-fluid" />
                <div className="parcel">
                  <h6 className="sec-color bold">parcel - 25,33</h6>
                  <ul>
                    <li>
                      <i className="fas fa-bath sec-color"></i> 05
                    </li>
                    <li>
                      <i className="fas fa-bed sec-color"></i> 03
                    </li>
                    <li>
                      <i className="fas fa-car sec-color"></i> 02
                    </li>
                  </ul>
                  <h6 className="main-color float-right">
                    From <span className="sec-color bold">$535.000</span>
                  </h6>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-4 p-1">
              <div className="rent-gallery">
                <img src={map} className="img-fluid" />
                <div className="parcel">
                  <h6 className="sec-color bold">parcel - 25,33</h6>
                  <ul>
                    <li>
                      <i className="fas fa-bath sec-color"></i> 05
                    </li>
                    <li>
                      <i className="fas fa-bed sec-color"></i> 03
                    </li>
                    <li>
                      <i className="fas fa-car sec-color"></i> 02
                    </li>
                  </ul>
                  <h6 className="main-color float-right">
                    From <span className="sec-color bold">$535.000</span>
                  </h6>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-4 p-1">
              <div className="rent-gallery">
                <img src={map} className="img-fluid" />
                <div className="parcel">
                  <h6 className="sec-color bold">parcel - 25,33</h6>
                  <ul>
                    <li>
                      <i className="fas fa-bath sec-color"></i> 05
                    </li>
                    <li>
                      <i className="fas fa-bed sec-color"></i> 03
                    </li>
                    <li>
                      <i className="fas fa-car sec-color"></i> 02
                    </li>
                  </ul>
                  <h6 className="main-color float-right">
                    From <span className="sec-color bold">$535.000</span>
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
