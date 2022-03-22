import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import FilterIcon from "../../assets/filter-modal.png";

import "./main.scss";
import "./media.css";

export default function BuyerFilterModal({
  onMHide,
  parcel: p = {},
  onFilterSubmit,
  filterData
}) {
  const [show, setShow] = useState(false);
  const [fd, setFd] = useState(() => ({
    min_price: filterData.min_price || "",
    max_price: filterData.max_price || "",
    type: filterData.type,
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

  const searchBtn = async () => {
    const errors = validation();
    if (Object.keys(errors).length) {
      setError(errors);
      return;
    }
    const payload = {
      type: +fd.type,
      min_price: fd.min_price || null,
      max_price: fd.max_price || null,
    };
    onFilterSubmit(payload);
  };

  const validation = () => {
    const errors = {};
    if (fd.type === undefined || fd.type === "null" || fd.type === "") {
      errors.type = true;
    }
    return errors;
  };

  const onInputChange = ({ target: { name, value } }) => {
    const newErrorObj = JSON.parse(JSON.stringify(errorObj));
    delete errorObj[name];
    setError(newErrorObj);
    setFd({ ...fd, [name]: value });
  };

  return (
    <>
      <Modal show={show} onHide={onHide} size="lg" className="filter-modal">
        <div class="close-dcl text-center">
          <img
            src={FilterIcon}
            class="img-fluid"
            onClick={onHide}
            style={{ position: "absolute", top: "-50px" }}
            alt=""
          />
        </div>
        <Modal.Body className="p-0">
          <section class="dcl">
            <div class="modal-body">
              <h2>Filter</h2>
              <p className="text-center mt-5">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Euismod
                proin diam, id vulputate egestas est etiam consequat a. Faucibus
                quis eget faucibus massa sed ut. Augue dolor ultricies enim
                gravida et, et eu morbi. Nisl consectetur neque condimentum leo
                neque. Diam habitasse donec placerat donec viverra nunc nec.
                Aliquet viverra mattis eros, tristique aliquet ultrices ac
                augue.{" "}
              </p>

              <div class="row mt-4">
                <div className="line-break col-10 offset-1" />
                <div class="col-lg-10 offset-1">
                  <div class="inner-dcl">
                    <div class="price-range">
                      <div class="row">
                        <div class="col">
                          <h5 class="dcl-opacity">Land Type</h5>
                        </div>
                        <span class="to invisible">to</span>
                        <div class="col">
                          <h5 class="dcl-opacity invisible">Position</h5>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col">
                          <select
                            name="type"
                            className="custom-select c-select"
                            id="inputGroupSelect01"
                            value={fd.type}
                            onChange={onInputChange}
                          >
                            <option value="0">All</option>
                            <option value="1">Parcel</option>
                            <option value="2">Estate</option>
                          </select>
                        </div>
                        <span class="to invisible">to</span>
                        <div class="col invisible">
                          <input
                            value={fd.max_price}
                            type="text"
                            name="max_price"
                            onChange={onInputChange}
                            placeholder="Near by position in (x,y)formet."
                            style={{
                              ...(errorObj.max_price && { borderColor: "red" }),
                            }}
                          />
                        </div>
                      </div>

                      <h5 class="dcl-opacity">Enter Your Price Range</h5>
                      <div class="row">
                        <div class="col">
                          <input
                            value={fd.min_price}
                            type="number"
                            name="min_price"
                            onChange={onInputChange}
                            style={{
                              ...(errorObj.min_price && { borderColor: "red" }),
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
                              ...(errorObj.max_price && { borderColor: "red" }),
                            }}
                          />
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-6 offset-3">
                          <button
                            class="btn btn-warning update"
                            onClick={searchBtn}
                            type="button"
                          >
                            Search
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
