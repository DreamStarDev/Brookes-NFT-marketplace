import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import request from "../../services/Requests";

import CloseBtu from "../../assets/close-btn-white.svg";

import "./main.scss";
import "./media.css";

export default function MarketLandBidModal({
  onMHide,
  parcel: p = {},
  onFilterSubmit,
}) {
  const parcel = JSON.parse(JSON.stringify(p));
  const [show, setShow] = useState(false);
  const [fd, setFd] = useState(() => ({
    land_id: parcel.land_id,
    min_price: "",
    max_price: "",
  }));
  const [errorObj, setError] = useState({});

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

  const addBtn = async () => {
    try {
      const errors = validation();
      if (Object.keys(errors).length) {
        setError(errors);
        return;
      }
      const payload = {
        land: parcel.id,
        min_price: fd.min_price || null,
        max_price: fd.max_price || null,
      };
      await request.post(`api/v1/my_bids/`, payload, false);
      onFilterSubmit(payload);
    } catch (error) {
      console.log(error);
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
    delete newErrorObj[name];
    setError(newErrorObj);
    setFd({ ...fd, [name]: value });
  };

  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        size="lg"
        className="marketplace-modal"
      >
        <div class="close-dcl text-center"></div>
        <Modal.Body className="p-0">
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
                <div class="col-lg-10 offset-1">
                  <div class="inner-dcl">
                    <div class="price-range">
                      <div class="row">
                        <div class="col">
                          <h5 class="dcl-opacity">Price</h5>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col">
                          <input
                            value={fd.min_price}
                            type="number"
                            name="min_price"
                            onChange={onInputChange}
                            placeholder="Min"
                            style={{
                              ...(errorObj.min_price && {
                                border: "1px solid red",
                              }),
                            }}
                          />
                        </div>
                        <div class="col">
                          <input
                            value={fd.max_price}
                            type="number"
                            name="max_price"
                            onChange={onInputChange}
                            placeholder="Max"
                            style={{
                              ...(errorObj.max_price && {
                                border: "1px solid red",
                              }),
                            }}
                          />
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-6 offset-3">
                          <button
                            class="btn btn-warning update"
                            onClick={addBtn}
                            type="button"
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Modal.Body>
      </Modal>
    </>
  );
}
