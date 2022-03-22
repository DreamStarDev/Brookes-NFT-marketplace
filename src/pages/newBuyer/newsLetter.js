import React, { useState } from "react";
import Request from "../../services/Requests";

import RealEstate from "../../assets/buyer/real-estate.png";

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
      const result = await Request.post('api/v1/user_land_find_request/', fd, false);
    } catch (error) {
      console.log(error)
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
    <section class="newsletter mt-5">
      <div class="mask">
        <div class="maskinner"></div>
      </div>
      <div class="topicon">
        <figure class="topicon circle">
          <img src={RealEstate} alt="" />
        </figure>
      </div>
      <div class="container">
        <article>
          <h4>Don’t see the land that you want?</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Euismod
            proin diam, id vulputate egestas est etiam consequat a. Faucibus
            quis eget faucibus massa sed ut. Augue dolor ultricies enim gravida
            et, et eu morbi.
          </p>
        </article>
        <div class="row justify-content-center">
          <div class="col-md-6 ">
            <form>
              <div class="mb-3">
                <label for="">Land Type</label>
                <select
                  name="type"
                  class="form-control"
                  onChange={onChange}
                  value={fd.type}
                  style={{
                        ...(errorObj.type && { borderColor: "red" }),
                      }}
                >
                  <option value="null" disabled></option>
                  <option value="1">Parcel</option>
                  <option value="2">Estate</option>
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
                    <p>To</p>
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
              <div class="w-75 m-auto">
                <button
                  class="btn btn-primary btn-block btn-round"
                  onClick={onSubmit}
                >
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
