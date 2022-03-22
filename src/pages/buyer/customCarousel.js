import React from "react";
import { Carousel } from "react-bootstrap";

import GoldenLineIcon from "../../assets/goldenLine.png";
import "./customCarousel.scss";

function CustomCarousel() {
  return (
    <>
      <div className="container">
        <Carousel className="custom-carousel" indicators={false}>
          <Carousel.Item>
            <div className="new_html_code"></div>
            <Carousel.Caption className="custom-carousel-caption">
              <h4>Buy Lands</h4>
              <h1>Welcome To Brookes</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nibh
                facilisi nec tellus purus cum volutpat. Dictum malesuada nisl in
                sit odio urna velit viverra. Urna nisi, pharetra velit donec
                nisl tempor fringilla nunc nec.
              </p>
              <div className="btngroup">
                <a href="#0" className="btn btn-secondary">
                  Get Started
                </a>
                <a href="#0" className="btn btn-outline-primary">
                  Learn More
                </a>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        <img src={GoldenLineIcon} alt="..." />
      </div>
    </>
  );
}

export default CustomCarousel;
