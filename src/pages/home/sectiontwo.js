import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import AppContext from "../../context/AppContext";

import Lmatrix from "../../assets/l-matrix.png";
import Rmatrix from "../../assets/r-matrix.png";

function Sectiontwo(props) {
  const history = useHistory();
  const { loginUser } = useContext(AppContext);
  const [formData, setFormData] = useState({ dec: "1" });

  const isLogined = Object.keys(loginUser).length;

  const submitForm = () => {
    if (isLogined) {
      history.push("/buyer", { ...formData });
    }
    props.toggleModalSignin();
  };

  const textChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <section className="form">
      <div className="top-img">
        <img src={Lmatrix} alt="" />
      </div>
      <div className="container">
        <form>
          <div className="row">
            <div className="col-lg-2">
              <select
                className="custom-select c-select"
                id="inputGroupSelect01"
              >
                <option value="1">Buy</option>
              </select>
            </div>
            <div className="col-lg-6">
              <select
                name="dec"
                className="custom-select c-select"
                id="inputGroupSelect01"
                onChange={textChange}
              >
                <option value="1">Decentraland</option>
                <option value="2">Somnium</option>
                <option value="3">Sandbox</option>
              </select>
            </div>
            <div className="col-lg-2">
              <input
                name="min_price"
                type="number"
                className="form-control search-box"
                placeholder="Min Price"
                onChange={textChange}
              />
            </div>
            <div className="col-lg-2 z-indexing">
              <input
                name="max_price"
                type="number"
                className="form-control search-box "
                placeholder="Max Price"
                onChange={textChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4">
              <input
                name="search"
                type="search"
                className="form-control search-box"
                placeholder="Near by position in (x,y) format."
                onChange={textChange}
              />
            </div>
            <div className="col-lg-4">
              <select
                name="orderBy"
                className="custom-select c-select"
                id="inputGroupSelect01"
                onChange={textChange}
                defaultValue={1}
              >
                <option value="1" disabled >
                  Sort By
                </option>
                <option value="New">New</option>
                <option value="Expensive">Expensive</option>
                <option value="Cheap">Cheap</option>
              </select>
            </div>
            <div className="col-lg-4 z-indexing">
              <button type="button" className="search" onClick={submitForm}>
                Search
              </button>
            </div>
          </div>
          {/* <span className="advanced-sh col-12">
            <a href="#">Advanced Search</a>
          </span> */}
        </form>
      </div>
      <div className="bottom-img">
        <img src={Rmatrix} className="float-right" />
      </div>
    </section>
  );
}

export default Sectiontwo;
