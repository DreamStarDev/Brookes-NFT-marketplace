import React from "react";

import callRound from "../../assets/call-round.png";
import envelopeRound from "../../assets/envelope-round.png";
import locationRound from "../../assets/location-round.png";
import logo from "../../assets/logo-white.png";

import "./index.scss"

export default function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="ct-cont">
            <div className="row">
              <div className="col-12">
                <div className="footer-box-contact">
                  <label className="contact-lab">
                    <img src={callRound} alt="" />
                    <div>
                      <label className="header">Call</label>
                      <label className="val">+123-123-1234</label>
                    </div>
                  </label>
                  <label className="contact-lab">
                    <img src={envelopeRound} alt="" />
                    <div>
                      <label className="header">Mail</label>
                      <label className="val">youremail@gmail.com</label>
                    </div>
                  </label>
                  <label className="contact-lab">
                    <img src={locationRound} alt="" />
                    <div>
                      <label className="header">Address</label>
                      <label className="val">Put your 123 address here </label>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="ft-cont">
            <div className="row">
              <div className="col-sm-6 col-lg-4">
                <img src={logo} style={{ width: "200px" }} />
                <div className="footer-box address">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Rhoncus cursus augue id erat ac proin urna. Vulputate
                  tincidunt tristique diam sed gravida enim et. Aenean at
                  adipiscing non nunc. Aliquam diam purus sollicitudin etiam
                  adipiscing turpis suscipit a, sed. Tempus ligula risus et
                  donec. Lacus orci sapien ut vitae ac vitae feugiat faucibus
                  duis.
                </div>
              </div>
              <div className="col-sm-6 col-lg-3">
                <div className="footer-box prop">
                  <h6 className="bold">Our Properties</h6>
                  <ul className="list">
                    <li>Selling</li>
                    <li>Renting</li>
                    <li>Buying</li>
                    <li>Property Mangement</li>
                    <li>Property Appraisal</li>
                    <li>Selling Your Property</li>
                  </ul>
                </div>
              </div>
              <div className="col-sm-6 col-lg-3">
                <div className="footer-box prop about">
                  <h6 className="bold">About Us</h6>
                  <ul className="list">
                    <li>About Us</li>
                    <li>Client Experience</li>
                    <li>Our People</li>
                    <li>Let's Talk</li>
                    <li>In tha Loop</li>
                    <li>Work with Us</li>
                  </ul>
                </div>
              </div>
              <div className="col-sm-6 col-lg-2">
                <div className="footer-box prop about">
                  <h6 className="bold">Our Locations</h6>
                  <ul className="list">
                    <li>Location North</li>
                    <li>Location South</li>
                    <li>Location West</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="copyright text-center">
          <p>Copyright &copy; 2021. All Rights Reserved </p>
        </div>
      </footer>
    </>
  );
}
