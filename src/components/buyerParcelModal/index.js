import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Request from "../../services/Requests";
import CloseBtu from "../../assets/close_btu-1.png";
import FrameIcon from "../../assets/buyer/frame.png";
import Line2Icon from "../../assets/buyer/line2.png";
import MonoCloseIcon from "../../assets/buyer/mono-icons_close.png";
import IconIcon from "../../assets/buyer/icon.png";

import { nFormatter, getType } from "../../pages/newBuyer/utils";

import "./main.scss";
import "./media.css";

export default function ParcelModal({ onMHide, parcel: p = {}, onAddToSale }) {
  const [show, setShow] = useState(false);
  const [isSubmitted, setisSubmitted] = useState(false);
  const [fd, setFd] = useState(() => ({
    min_price: p.min_price || "",
    max_price: p.max_price || "",
  }));
  const [errorObj, setError] = useState({});
  const parcel = JSON.parse(JSON.stringify(p));

  useEffect(() => {
    if (parcel === null) {
      setShow(false);
    }
    setShow(true);
  }, [parcel]);

  const onHide = (param = null) => {
    setShow(false);
    if (param && "obj" in param) {
      onMHide(param);
    } else {
      onMHide();
    }
  };

  const addToSale = async () => {
    const errors = validation();
    console.log(errors);
    if (Object.keys(errors).length) {
      setError(errors);
      return;
    }

    const payload = {
      id: parcel.id,
      land: parcel.land_id,
      min_price: fd.min_price || 0,
      max_price: fd.max_price || 0,
    };
    try {
      const result = await (
        await Request.post("api/v1/user_bid/", payload, false)
      ).json();
      console.log(result);
      onAddToSale({ ...result, id: parcel.id, selling_id: result.id });
      setisSubmitted(true);
      /* onHide(); */
    } catch (error) {
      console.log(error);
      setisSubmitted(true);
    }
  };

  const validation = () => {
    const errors = {};
    if (!fd.min_price || fd.min_price === "") {
      errors.min_price = true;
    }
    if (!fd.max_price || fd.max_price === "" || fd.max_price < 0) {
      errors.max_price = true;
    }
    return errors;
  };

  const onInputChange = ({ target: { name, value } }) => {
    const newErrorObj = JSON.parse(JSON.stringify(errorObj));
    delete errorObj[name];
    setError(newErrorObj);
    setFd({ ...fd, [name]: value });
  };

  const renderThanksBiding = () => {
    return (
      <section class="popups">
        <header>
          <img src={Line2Icon} class="lines img-fluid" alt="" />
          <button class="closebtn" onClick={onHide}>
            <img src={MonoCloseIcon} alt="" width="38px" />
          </button>
        </header>
        <div class="modal-body text-center">
          <img src={IconIcon} class="checkicon" alt="" />
          <h2>
            Thanks For <span>Your Bidding.</span>{" "}
          </h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Euismod
            proin diam, id vulputate egestas est etiam consequat a. Faucibus
            quis eget faucibus massa sed ut. Augue dolor ultricies enim gravida
            et, et eu morbi.{" "}
          </p>
          <h4>We will get back to you asap</h4>
          <img src={FrameIcon} class="frame" alt="" />
        </div>
      </section>
    );
  };

  const renderParcel = () => {
    return (
      <>
        <section class="dcl">
          <div class="modal-body">
            <h2>Place a bid to buy this Land</h2>
            <div class="close-dcl text-right">
              <img
                src={CloseBtu}
                class="img-fluid"
                onClick={onHide}
                alt="close"
              />
            </div>
            <div class="row mt-4">
              <div class="col-lg-6 p-1">
                <div class="inner-dcl">
                  <img src={parcel.image} class="img-fluid" alt="parcel" />
                </div>
              </div>
              <div class="col-lg-6">
                <div class="inner-dcl">
                  <div class="dcl-content">
                    <h2>{parcel.name || "No title"}</h2>
                    <p>{parcel.description || "No description"}</p>
                  </div>

                  <div class="dcl-price">
                    <div class="row">
                      <div
                        class="col-5"
                        style={{ padding: "0 5px", paddingLeft: "15px" }}
                      >
                        <h5 class="dcl-opacity">Center</h5>
                        <h4 class="font-weight-bold">
                          {parcel?.x}, {parcel?.y}
                        </h4>
                      </div>
                      <div class="col-2">
                        <h5 class="dcl-opacity">Size:</h5>
                        <h4 class="font-weight-bold">4</h4>
                      </div>

                      <div className={`col-5`}>
                        <div>
                          <h5 class="dcl-opacity">Price Range</h5>
                          <h4 class="font-weight-bold">
                            {nFormatter(parcel?.min_price)} -{" "}
                            {nFormatter(parcel?.max_price)}
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="price-range">
                    <h5 class="dcl-opacity">Enter Your Price Range</h5>
                    <div class="row">
                      <div class="col">
                        <input
                          value={fd.min_price}
                          type="number"
                          name="min_price"
                          onChange={onInputChange}
                          style={{
                            ...(errorObj.min_price && {
                              borderColor: "red",
                            }),
                          }}
                        />
                      </div>
                      <span class="to">to</span>
                      <div class="col">
                        <input
                          value={fd.max_price}
                          type="number"
                          name="max_price"
                          onChange={onInputChange}
                          style={{
                            ...(errorObj.max_price && {
                              borderColor: "red",
                            }),
                          }}
                        />
                      </div>
                    </div>

                    <div class="row">
                      <div class="col">
                        <button
                          class="btn btn-warning update"
                          onClick={addToSale}
                        >
                          Place a Bid
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  };

  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        size="lg"
        className="buyer-parcel-modal"
      >
        <Modal.Body className="p-0">
          {isSubmitted && renderThanksBiding()}
          {!isSubmitted && renderParcel()}
        </Modal.Body>
      </Modal>
    </>
  );
}
