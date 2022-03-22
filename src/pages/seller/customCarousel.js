import React from "react";
import { Carousel } from "react-bootstrap";

import "./customCarousel.scss";

function CustomCarousel() {
  return (
    <>
      <div className="container">
        <Carousel className="custom-carousel" indicators={false}>
          <Carousel.Item>
            <div className="new_html_code"></div>
            <Carousel.Caption className="custom-carousel-caption">
              <h4>Welcome To Seller Page</h4>
              <h1>Put your lands on our marketplace</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nibh
                facilisi nec tellus purus cum volutpat. Dictum malesuada nisl in
                sit odio urna velit viverra. Urna nisi, pharetra velit donec
                nisl tempor fringilla nunc nec.
              </p>
              <div className="btngroup">
                <a href="#0" className="btn btn-secondary">
                  Latest Upadtes
                </a>
                <a href="#0" className="btn btn-outline-primary">
                  Learn More
                </a>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    </>
  );
}

export default CustomCarousel;
