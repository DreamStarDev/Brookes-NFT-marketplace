import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import Lmatrix from "../../assets/l-matrix.png";
import Rmatrix from "../../assets/right-matrix.png";

function Sectiontwo(props) {
  const { state = {} } = useLocation();
  const [formData, setFormData] = useState(state);

  useEffect(() => {
    if (Object.keys(formData).length) {
      document.getElementById("form").scrollIntoView({ behavior: "smooth" });
      props.onChange(formData);
    }
  }, []);

  const submitForm = async () => {
    try {
      props.onChange(formData);
    } catch (error) {
      console.log(error);
    }
  };

  const textChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <section className="form" id="form">
      <div className="top-img">
        <img src={Lmatrix} alt="" />
      </div>
      <div className="container">
        <form>
          <div className="row">
            <div className="col-lg-6">
              <select
                name="dec"
                className="custom-select c-select"
                id="inputGroupSelect01"
                onChange={textChange}
                value={formData.dec}
              >
                <option value="1">Decentraland</option>
                <option value="2">Somnium</option>
                <option value="3">Sandbox</option>
              </select>
            </div>
            <div className="col-lg-3">
              <input
                value={formData.min_price}
                name="min_price"
                type="number"
                className="form-control search-box"
                placeholder="Min Price"
                onChange={textChange}
              />
            </div>
            <div className="col-lg-3 z-indexing">
              <input
                value={formData.max_price}
                name="max_price"
                type="number"
                className="form-control search-box "
                placeholder="Max Price"
                onChange={textChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <input
                name="search"
                value={formData.search}
                type="search"
                className="form-control search-box"
                placeholder="Near by position in (x,y) format."
                onChange={textChange}
                disabled={!props.isBuyer}
              />
            </div>

            <div className="col-lg-3">
              <select
                name="orderBy"
                value={formData.orderBy}
                className="custom-select c-select"
                id="inputGroupSelect01"
                onChange={textChange}
              >
                <option value="1" disabled selected>
                  Sort By
                </option>
                <option value="New">New</option>
                <option value="Expensive">Expensive</option>
                <option value="Cheap">Cheap</option>
              </select>
            </div>

            <div className="col-lg-3 z-indexing">
              <button type="button" className="search " onClick={submitForm}>
                Search
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="bottom-img">
        <img src={Rmatrix} className="float-right" />
      </div>
    </section>
  );
}

export default Sectiontwo;
