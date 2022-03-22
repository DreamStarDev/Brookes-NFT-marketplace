import React, { useState, useContext } from "react";
import Carousel from "react-multi-carousel";

import "react-multi-carousel/lib/styles.css";

import slider1 from "../assets/bro.png";
import slider2 from "../assets/buyer/bro1.png";
import arr_left_fill from "../assets/arr_left_fill.png";
import arr_right_empty from "../assets/arr_right_empty.png";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    paritialVisibilityGutter: 60,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    paritialVisibilityGutter: 50,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    paritialVisibilityGutter: 30,
  },
};

const heading = "Expert";
const text =
  "You understand everything about virtual worlds and how to create value. Click here for more details.";
const text1 = "";
const img = slider2;

const items = [
  {
    heading: "Sell Lands",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ultricies at varius vulputate diam. Neque consectetur bibendum turpis dictumst nec, sed. Morbi orci donec elementum viverra enim ultrices tincidunt consectetur. Venenatis morbi ipsum eu libero urna. Duis et at amet, vitae viverra ultricies commodo malesuada id. A magna nulla aenean bibendum volutpat orci elit velit nisi.",
    text1:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ultricies at varius vulputate diam. Neque consectetur bibendum turpis dictumst nec, sed. Morbi orci donec elementum viverra enim ultrices tincidunt consectetur. ",
    text3: "Click Here To Continue",
    img: slider2,
  },
  {
    heading: "SELL ESTATES",
    text: "We have experienced Buyers on a Market leading Client list.",
    text1:
      "We are ready to match your Estates with the best buyers in the market.",
    text2:
      "Visually higher value lot sides that reviewers market leaders to access buyers and give certainty of close.",
    img: slider1,
  },
  {
    heading: "SELL OTHERS",
    text: "Do you need help Maximising the value of your real estate?",
    text1: "If so then contact us.",
    img: slider1,
  },
];

function Sectionone(props) {
  const ButtonGroup = ({ next, previous, goToSlide, ...rest }) => {
    const {
      carouselState: { currentSlide },
    } = rest;
    return (
      <div className="carousel-button-group">
        <button
          className={currentSlide === 0 ? "disable" : ""}
          onClick={() => previous()}
          style={{
            transform: "translateY(-50%)",
            position: "absolute",
            top: "50%",
            border: 0,
            background: "transparent",
            left: '-30px'
          }}
        >
          <img src={arr_left_fill} alt="" />
        </button>
        <button
          onClick={() => next()}
          style={{
            transform: "translateY(-50%)",
            position: "absolute",
            top: "50%",
            border: 0,
            background: "transparent",
            right: '-30px'
          }}
        >
          <img src={arr_right_empty} alt="" />
        </button>
      </div>
    );
  };

  return (
    <>

      <section className="landing">
        <div className="container">
          <div className="slider-whole position-relative">
            <div className="sand-box text-center"></div>

            <div className="digital-rs text-center">
              <Carousel
                arrows={false}
                itemClass="image-item"
                renderButtonGroupOutside={true}
                responsive={responsive}
                customButtonGroup={<ButtonGroup />}
              >
                {items.map((it, i) => {
                  return (
                    <div key={i} className="row">
                      <div className="col-sm-12 col-lg-6">
                        <img
                          alt=""
                          draggable={false}
                          src={it.img}
                          className="car-imgs"
                          height='475px'
                        />
                      </div>
                      <div
                        className="col-sm-12 col-lg-6 text-left"
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <div className="pr-5">
                          <h3 className="sl-heading">{it.heading} </h3>
                          <div className="sl-text">
                            <p>{it.text}</p>
                            <p>{it.text1}</p>
                            <p>{it.text2}</p>
                            <p className="btn-continue">
                              <span className="main-color">Click Here To Continue</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </Carousel>
              <div className="row"></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Sectionone;
