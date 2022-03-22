import React, { useRef, useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import NumberFormat from "react-number-format";

import "react-multi-carousel/lib/styles.css";
import "./customSlider.scss";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    paritialVisibilityGutter: 600,
    partialVisibilityGutter: 600,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
    paritialVisibilityGutter: 50,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 3,
    paritialVisibilityGutter: 30,
  },
};

// Because this is an inframe, so the SSR mode doesn't not do well here.
// It will work on real devices.
const CustomSlider = (props) => {
  let carousel = useRef(null);
  /* 
  useEffect(() => {
    getSoldParcels();
    carousel.goToSlide(1);
  }, []);

  const getSoldParcels = async () => {
    try {
      const result = await (await request.get("parcel/sold/?count=50")).json();
      setParcels([...result]);
      
      console.log('there1')
    } catch (error) {
      console.log(error);
    }
  }; */

  useEffect(() => {
    if (carousel) {
      window.ll = carousel;

      const newCarousel = carousel;
      setTimeout(() => {
        newCarousel.goToSlide(1);
      }, 500);
      setTimeout(() => {
        if (newCarousel.state.currentSlide !== 1) {
          newCarousel.goToSlide(1);
        }
      }, 1000);
    }
  }, [carousel, props.parcels]);

  const afterChange = (currentSlide, obj) => {
    const activeEle = document.getElementsByClassName(
      "react-multi-carousel-item--active"
    );
    if (activeEle.length) {
      for (const it of activeEle) {
        it.classList.remove("active-ele");
      }
      if (activeEle[2]) {
        const ele = props.from === "home" ? 1 : 2;
        activeEle[ele].classList.add("active-ele");
      }
    }
  };

  const beforeChange = (currentSlide, obj) => {
    const activeEle = document.getElementsByClassName(
      "react-multi-carousel-item--active"
    );
    if (activeEle.length) {
      if (activeEle[1]) {
        //activeEle[1].classList.add("active-ele");
      }
    }
  };

  return (
    <>
      <div className="col-12 mt-5 p-0">
        <div className="img-slider-container" style={{ padding: 0 }}>
          <Carousel
            additionalTransfrom={2}
            arrows
            className=""
            containerClass="container-with-dots"
            dotListClass=""
            draggable
            focusOnSelect={false}
            infinite={false}
            itemClass=""
            keyBoardControl
            responsive={responsive}
            showDots={false}
            sliderClass=""
            slidesToSlide={1}
            ref={(el) => (carousel = el)}
            afterChange={afterChange}
            beforeChange={beforeChange}
          >
            {props.parcels.map((p, i) => {
              return (
                <div className="p-1 img-slider" key={i}>
                  <div
                    style={{ backgroundImage: `url(${p.image})` }}
                    className="image"
                  />

                  {Object.keys(p).length > 1 && (
                    <div
                      className="parcel"
                      style={{
                        background: props.from === "home" ? "#f7f7f7" : "#fff",
                      }}
                    >
                      <p className="m-0">
                        <label className="col-6 p-0 pr-2 m-0">
                          <span style={{ fontSize: "15px" }}>
                            {props.isBuyer ? "Position" : "Center"}:{" "}
                          </span>
                          <span
                            className="main-color"
                            style={{
                              fontSize: "18px",
                              position: "absolute",
                              right: "5px",
                            }}
                          >
                            {props.isBuyer
                              ? `${p.x}, ${p.y}`
                              : `${p.center_x}, ${p.center_y}`}
                          </span>
                        </label>
                        {props.isBuyer && (
                          <label className="col-6 p-0 pl-2 m-0">
                            <span style={{ fontSize: "15px" }}>Price: </span>
                            <span
                              className="main-color"
                              style={{
                                fontSize: "18px",
                                position: "absolute",
                                right: "5px",
                              }}
                            >
                              <NumberFormat
                                value={p.price || 0}
                                displayType={"text"}
                                thousandSeparator={true}
                              />
                            </span>
                          </label>
                        )}
                        {!props.isBuyer && (
                          <label className="col-6 p-0 pl-2 m-0">
                            <span style={{ fontSize: "15px" }}>Size: </span>
                            <span
                              className="main-color"
                              style={{
                                fontSize: "18px",
                                position: "absolute",
                                right: "5px",
                              }}
                            >
                              {p.size}
                            </span>
                          </label>
                        )}
                      </p>

                      <p className="m-0">
                        <label className="col-6 p-0 pr-2 m-0">
                          <span style={{ fontSize: "15px" }}>Date: </span>
                          <span
                            className="main-color"
                            style={{
                              fontSize: "18px",
                              position: "absolute",
                              right: "5px",
                            }}
                          >
                            {Boolean(p.sold_date) &&
                              p.sold_date.substring(0, 10)}
                          </span>
                        </label>
                        {!props.isBuyer && (
                          <label className="col-6 p-0 pl-2 m-0">
                            <span style={{ fontSize: "15px" }}>Price: </span>
                            <span
                              className="main-color"
                              style={{
                                fontSize: "18px",
                                position: "absolute",
                                right: "5px",
                              }}
                            >
                              <NumberFormat
                                value={p.price || 0}
                                displayType={"text"}
                                thousandSeparator={true}
                              />
                            </span>
                          </label>
                        )}
                      </p>
                      <h6 className="sec-color bold mt-1 mb-0">{p.name}</h6>
                    </div>
                  )}
                </div>
              );
            })}
          </Carousel>
        </div>
      </div>
    </>
  );
};

export default CustomSlider;
