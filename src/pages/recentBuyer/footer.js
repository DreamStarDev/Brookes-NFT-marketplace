import React from "react";

import vector1 from "../../assets/Vector (1).png";
import vector2 from "../../assets/Vector (2).png";

export default function Footer() {
  return (
    <>
      <section className="leasing-prop">
        <div className="leasing-prop-sec">
        <div className="container">
          <div className="leasing-text">
            <div className="border-bg"></div>
            <h1>
              Selling or{" "}
              <span className="main-color bold">Leasing a Property ?</span>
            </h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo
              dolor sunt amet assumenda voluptatem aspernatur! In magnam
              consequatur id illo totam eveniet pariatur voluptates amet.
              Voluptatibus non accusantium quasi vel.
            </p>
            <h4>Free Appraisal</h4>
          </div>
        </div>
        </div>
      </section>
      <footer>
        <div className="footer-bg">
          <img src={vector1} className="img-fluid" />
          <img src={vector2} className="img-fluid float-right" />
        </div>
        <div className="container ft-cont">
          <div className="row">
            <div className="col-sm-6 col-lg-3">
              <div className="footer-box address">
                <ul>
                  <li>
                    <i className="fas fa-phone-alt main-color fa-1x"></i> +
                    123-123-1234
                  </li>
                  <li>
                    <i className="fas fa-envelope main-color fa-1x"></i>{" "}
                    youremail@gmail.com
                  </li>
                  <li>
                    <i className="fas fa-map-marker-alt main-color fa-1x"></i> Put
                    your 123 address here{" "}
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3">
              <div className="footer-box prop">
                <h6 className="main-color bold">Our Properties</h6>
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
                <h6 className="main-color bold">About Us</h6>
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
            <div className="col-sm-6 col-lg-3">
              <div className="footer-box prop about">
                <h6 className="main-color bold">Our Locations</h6>
                <ul className="list">
                  <li>Location North</li>
                  <li>Location South</li>
                  <li>Location West</li>
                </ul>
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
