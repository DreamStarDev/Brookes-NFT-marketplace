import React, { useState } from "react";
import Request from "../../services/Requests";

import BuildingIcon from "../../assets/n-building.svg";

export default function NewsLetter() {
  const [fd, setFd] = useState({ type: 1 });
  const [errorObj, setError] = useState({});

  const onSubmit = async (ev) => {
    ev.preventDefault();
    const errors = validation();
    if (Object.keys(errors).length) {
      setError(errors);
      return;
    }
    try {
      const result = await Request.post("api/v1/land_find_request/", fd, false);
      setFd({ type: 1, x: "", y: "", min_price: "", max_price: "" });
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = ({ target: { value, name } }) => {
    const newErrorObj = JSON.parse(JSON.stringify(errorObj));
    delete newErrorObj[name];
    setError(newErrorObj);
    setFd({ ...fd, [name]: value });
  };

  const validation = () => {
    const errors = {};
    if (fd.type === undefined || fd.type === "null") {
      errors.type = true;
    }
    if (!fd.min_price || fd.min_price === "") {
      errors.min_price = true;
    }
    if (!fd.max_price || fd.max_price === "" || +fd.max_price < 0) {
      errors.max_price = true;
    }
    if (!fd.x || fd.x === "") {
      errors.x = true;
    }
    if (!fd.y || fd.y === "") {
      errors.y = true;
    }
    return errors;
  };

  return (
    <section class="newsletter">
      <div class="container">
        <article>
          <h4>Don’t see the land that you want?</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Euismod
            proin diam, id vulputate egestas est etiam conse a. Faucibus quis
            eget faucibus massa sed ut. Augue dolor ultricies enim gravida et,
            et eu morbi.
          </p>
        </article>
        <div class="row justify-content-center">
          <div class="col-md-8">
            <form>
              <div class="mb-3">
                <label for="">Land Type</label>
                <select
                  name="type"
                  class="form-control select-f-c"
                  onChange={onChange}
                  value={fd.type}
                  style={{
                    ...(errorObj.type && { borderColor: "red" }),
                  }}
                >
                  <option value="null" disabled className="text-black"></option>
                  <option value="1" className="text-black">
                    Parcel
                  </option>
                  <option value="2" className="text-black">
                    Estate
                  </option>
                </select>
              </div>
              <div class="row">
                <div class="col-lg-6">
                  <div class="mb-3">
                    <label for="">Around Position</label>
                    <input
                      type="text"
                      class="form-control"
                      name="x"
                      value={fd.x}
                      onChange={onChange}
                      placeholder="X"
                      style={{
                        ...(errorObj.x && { borderColor: "red" }),
                      }}
                    />
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="mb-3">
                    <label for="" class="d-md-block">
                      &nbsp;
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      name="y"
                      value={fd.y}
                      onChange={onChange}
                      placeholder="Y"
                      style={{
                        ...(errorObj.y && { borderColor: "red" }),
                      }}
                    />
                  </div>
                </div>
              </div>
              <div class="row mb-5">
                <div class="col">
                  <div class="mb-3">
                    <label for="">Enter Your Price Range</label>
                    <input
                      type="number"
                      class="form-control"
                      name="min_price"
                      placeholder="Min Price"
                      value={fd.min_price}
                      onChange={onChange}
                      style={{
                        ...(errorObj.min_price && { borderColor: "red" }),
                      }}
                    />
                  </div>
                </div>
                <div class="col-1">
                  <div class="mb-3">
                    <label for="" class="d-md-block">
                      &nbsp;
                    </label>
                    <p className="text-white to-text">to</p>
                  </div>
                </div>
                <div class="col">
                  <div class="mb-3">
                    <label for="" class="d-md-block">
                      &nbsp;
                    </label>
                    <input
                      type="number"
                      class="form-control"
                      name="max_price"
                      placeholder="Max Price"
                      value={fd.max_price}
                      onChange={onChange}
                      style={{
                        ...(errorObj.max_price && { borderColor: "red" }),
                      }}
                    />
                  </div>
                </div>
              </div>
              <div class="w-25 m-auto">
                <button
                  class="btn btn-primary btn-block btn-round nl-btn"
                  onClick={onSubmit}
                >
                  Submit Now
                </button>
              </div>
            </form>
            <div>
              <img src={BuildingIcon} className="newsletter-building" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
