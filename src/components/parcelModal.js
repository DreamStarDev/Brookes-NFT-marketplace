import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import NumberFormat from "react-number-format";
import Switch from "react-switch";

import request from "../services/Requests";

import popwave from "../assets/popwave.png";

export default function ParcelModal({
  parcel: p,
  onMHide,
  isBuyer: isparcel,
  from = null,
}) {
  const parcel = JSON.parse(JSON.stringify(p));
  const [show, setShow] = useState(false);
  const [onSaleChecked, setonSaleChecked] = useState(parcel.on_sale);
  const [fd, setFd] = useState({
    ...(from === "seller" && "price" in parcel && { price: parcel.price }),
  });

  useEffect(() => {
    if (parcel === null) {
      setShow(false);
    }
    setShow(true);
  }, [parcel]);

  const getDate = (d = null) => {
    if (d === null) {
      return "";
    }
    let nd = new Date(d);

    const dd = nd.getDate();
    const mm = (nd.getMonth() + 1).toString().padStart(2, "0");
    const yy = nd.getFullYear();
    return `${dd}/${mm}/${yy}`;
  };

  const onHide = (param = null) => {
    setShow(false);
    if (param && "obj" in param) {
      onMHide(param);
    } else {
      onMHide();
    }
  };

  const onSaleChange = () => {
    const newValue = !onSaleChecked;
    setonSaleChecked(newValue);
  };

  const onConfirm = async () => {
    const body = {
      on_sale: onSaleChecked ? 1 : 0,
      price: fd.price,
      ...(isparcel && {
        x: parcel.x,
        y: parcel.y,
      }),
      ...(!isparcel && {
        id: parcel.id,
      }),
    };

    try {
      const result = await request.post(
        `account/${parcel.formData.address}/${isparcel ? "parcel" : "estate"}/`,
        body,
        false
      );
      if (result.status !== 200) {
        throw result;
      }
      onHide({ ...body, obj: true });
      console.log(result);
    } catch (error) {
      console.log(error);
      onHide();
    }
  };

  const handleChange = (e) => {
    setFd({ ...fd, [e.target.name]: e.target.value });
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <button type="button" className="btn-close-d p-0" onClick={onHide}>
        <span aria-hidden="true">Close</span>
        <span className="sr-only">Close</span>
      </button>
      <Modal.Body className="p-0">
        <div className={` location-box-secon-${from} location-box-secon`}>
          {parcel.image && <img src={parcel.image} alt="" />}
          {!("image" in parcel) && (
            <img
              src={`https://api.decentraland.org/v1/parcels/${
                parcel.x || parcel.center_x
              }/${parcel.y || parcel.center_y}/map.png`}
              alt=""
            />
          )}
          <div className="sec mt-1">
            <div className="col-12 head">
              <div
                className={`${
                  from === "seller" ? "col-12" : "col-7"
                } text-truncate p-0`}
              >
                {parcel.name}
              </div>
              {from !== "seller" && (
                <div
                  className="col-5 pr-0"
                  style={{ display: "block", textAlign: "end" }}
                >
                  <div
                    className="text-center"
                    style={{ borderRadius: "50px", background: "#ffffff44" }}
                  >
                    <label className="main-color m-0 py-1">
                      <NumberFormat
                        value={parcel.order_price}
                        displayType={"text"}
                        thousandSeparator={true}
                      />
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="info mt-3 mb-5">
            <div className={`row ${from === "seller" ? "p-0 m-0" : ""}`}>
              <div className={`col-sm-6 ${from === "seller" ? "pl-0" : ""}`}>
                <div className="position-relative info-icon">
                  <div className="d-inline info-cont">
                    <label
                      className={`col-6 m-0 ${from === "seller" ? "" : "p-0"}`}
                    >
                      {isparcel ? "Position" : "Center"}
                    </label>
                    <label className="main-color m-0 bold col-6 dbr pr-0">
                      {!(!isparcel && from === "seller") && (
                        <span>
                          {parcel.x}, {parcel.y}
                        </span>
                      )}
                      {!isparcel && from === "seller" && (
                        <span>
                          {parcel.center_x}, {parcel.center_y}
                        </span>
                      )}
                    </label>
                  </div>
                </div>
              </div>
              {("cnt_bids" in parcel || "estate_id" in parcel) && (
                <div className="col-sm-6 p-0">
                  <div className="position-relative info-icon">
                    <div className="d-inline info-cont">
                      <label className="col-6 m-0">
                        {!("cnt_bids" in parcel) ? "Estate id" : "Bids"}
                      </label>
                      <label className="main-color m-0 bold col-6  dbr">
                        {parcel.estate_id || parcel.cnt_bids}
                      </label>
                    </div>
                  </div>
                </div>
              )}
              {"avg_bid_price" in parcel && (
                <div className="col-sm-6">
                  <div className="position-relative info-icon">
                    <div className="d-inline info-cont">
                      <label className="col-6 m-0 p-0">Average Bid</label>
                      <label className="main-color m-0 bold col-6 dbr m-0">
                        <NumberFormat
                          value={parcel.avg_bid_price}
                          displayType={"text"}
                          thousandSeparator={true}
                        />
                        <span style={{ visibility: "hidden" }}>a</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}
              {from === "seller" && "recommend_price" in parcel && (
                <div className="col-sm-6 p-0">
                  <div className="position-relative info-icon">
                    <div className="d-inline info-cont">
                      <label className="col-6 m-0 p-0">Recommended Price</label>
                      <label className="main-color m-0 bold col-6 dbr m-0">
                        <NumberFormat
                          value={parcel.recommend_price}
                          displayType={"text"}
                          thousandSeparator={true}
                        />
                        <span style={{ visibility: "hidden" }}>a</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}
              {/* <div className="col-sm-6">
                <div className="position-relative info-icon">
                  <div className="d-inline info-cont">
                    <label className="col-6 m-0 p-0">it is on sale</label>
                    <label className="main-color m-0 bold col-6 dbr">
                      {parcel.on_sale ? "YES" : "NO"}
                    </label>
                  </div>
                </div>
              </div> */}
              {/* <div className="col-sm-6 p-0">
                <div className="position-relative info-icon">
                  <div className="d-inline info-cont">
                    <label className="col-6 m-0">Average Bid</label>
                    <label className="main-color m-0 bold col-6  dbr m-0 ">
                      <NumberFormat
                        value={parcel.avg_bid_price || 0}
                        displayType={"text"}
                        thousandSeparator={true}
                      />
                    </label>
                  </div>
                </div>
              </div> */}
              {"order_created" in parcel && (
                <div className="col-sm-6">
                  <div className="position-relative info-icon">
                    <div className="d-inline info-cont">
                      <label
                        className="col-6 m-0 p-0"
                        style={{ lineHeight: "40px" }}
                      >
                        Created on
                      </label>
                      <label className="main-color m-0 bold col-6 pr-0">
                        {getDate(parcel.order_created)}
                        <span style={{ visibility: "hidden" }}>a</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}
              {"order_expires" in parcel && (
                <div className="col-sm-6">
                  <div className="position-relative info-icon">
                    <div className="d-inline info-cont">
                      <label
                        className="col-6 m-0 p-0"
                        style={{ lineHeight: "40px" }}
                      >
                        Expiray
                      </label>
                      <label className="main-color m-0 bold col-6  pr-0">
                        {getDate(parcel.order_expires)}
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {from === "seller" && (
                <>
                  <div className="col-sm-6 pl-0">
                    <div className="position-relative info-icon">
                      <div className="d-inline info-cont">
                        <label
                          className={`col-6 m-0 ${
                            from === "seller" ? "" : "p-0"
                          }`}
                        >
                          it is on sale
                        </label>
                        <label
                          className={`main-color m-0 bold col-6 dbr pr-0 ${
                            from === "seller" ? "p-0" : ""
                          }`}
                        >
                          <span>
                            <Switch
                              checked={!onSaleChecked}
                              onChange={onSaleChange}
                              handleDiameter={33}
                              offColor="#dca85e"
                              onColor="#dca85e"
                              offHandleColor="#003774"
                              onHandleColor="#003774"
                              height={40}
                              width={100}
                              borderRadius={25}
                              activeBoxShadow="0px 0px 0px 0px #003774"
                              color="#fff"
                              uncheckedIcon={
                                <div className="unchecked-icon-custom">Yes</div>
                              }
                              checkedIcon={
                                <div className="checked-icon-custom">No</div>
                              }
                              uncheckedHandleIcon={
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    height: "100%",
                                    fontSize: 20,
                                  }}
                                ></div>
                              }
                              className="react-switch"
                              id="small-radius-switch"
                            />
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 p-0">
                    <div className="position-relative info-icon">
                      <div className="d-inline info-cont">
                        <label className="col-6 m-0 p-0">Your price</label>
                        <label className="main-color m-0 bold col-6 dbr">
                          <input
                            value={fd.price || ""}
                            name="price"
                            type="text"
                            className="form-control input-field"
                            onChange={handleChange}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          {from === "seller" && (
            <div className="text-center col-12">
              <button
                type="button"
                className="p-modal-confirm-btn col-4"
                onClick={onConfirm}
                disabled={!fd.price}
              >
                Confirm
              </button>
            </div>
          )}

          <div className="address text-truncate">
            {parcel.owner_address || parcel.contractAddress}
          </div>
          <p className="mb-5"></p>
        </div>
        <div>
          <img src={popwave} alt="" width="100%" />
        </div>
      </Modal.Body>
    </Modal>
  );
}
