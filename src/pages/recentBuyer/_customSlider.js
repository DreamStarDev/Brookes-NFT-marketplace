import React, { useRef, useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import NumberFormat from "react-number-format";

import request from "../../services/Requests";

import "react-multi-carousel/lib/styles.css";

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
        activeEle[2].classList.add("active-ele");
      }
    }
  };

  const beforeChange = (currentSlide, obj) => {
    const activeEle = document.getElementsByClassName(
      "react-multi-carousel-item--active"
    );
    if (activeEle.length) {
      if (activeEle[1]) {
        activeEle[1].classList.add("active-ele");
      }
    }
  };

  return (
    <>
      <div className="location-section">
        <div className="source-serif-font text-center">
          <div className="sec-color sec-heading">
            <h5 className="fz-40">
              Latest Sold{" "}
              <span className="main-color bold">
                {props.isBuyer ? "Parcels" : "Estates"}
              </span>
            </h5>
          </div>
        </div>
      </div>
      <div className="col-10 offset-1 mt-5 p-0">
        <div className="lsp-container" style={{ padding: 0 }}>
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
                <div className="p-1 rent-gallery" key={i}>
                  <div
                    style={{ backgroundImage: `url(${p.image})` }}
                    className="image"
                  />

                  {Object.keys(p).length > 1 && (
                    <div className="parcel">
                      <p className="m-0">
                        <label class="col-6 p-0 pr-2 m-0">
                          <span style={{ fontSize: "15px" }}>
                            {props.isBuyer ? "Position" : "Center"}:{" "}
                          </span>
                          <span
                            class="main-color"
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
                          <label class="col-6 p-0 pl-2 m-0">
                            <span style={{ fontSize: "15px" }}>Price: </span>
                            <span
                              class="main-color"
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
                          <label class="col-6 p-0 pl-2 m-0">
                            <span style={{ fontSize: "15px" }}>Size: </span>
                            <span
                              class="main-color"
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
                          <label class="col-6 p-0 pl-2 m-0">
                            <span style={{ fontSize: "15px" }}>Price: </span>
                            <span
                              class="main-color"
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
