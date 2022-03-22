import React, { useEffect, useState } from "react";
import Frame from "../../assets/Frame.png";
import ParcelModal from "../../components/buyerFilterModal";
/* import {data} from './data'; */

import request from "../../services/Requests";

const landType = {
  PARCEL: 1,
  ESTATE: 2,
};

export default function Latestsale({}) {
  const [parcels, setParcels] = useState([]);
  const [isLoader, setIsLoader] = useState(false);
  const [parcel, setParcel] = useState(null);
  const [paginatedParcels, setpaginatedParcels] = useState([]);
  const [next, setNext] = useState(0);

  const parcelsPerPage = 6;

  useEffect(() => {
    setParcels(parcels);
    return () => {};
  }, [parcels]);

  useEffect(() => {
    initailLoad();
  }, []);

  useEffect(() => {
    try {
      setLoader(isLoader);
    } catch (error) {}
  }, [isLoader]);

  const loopWithSlice = (start, end, _parcels = null) => {
    const slicedPosts = JSON.parse(JSON.stringify(_parcels || parcels)).slice(
      start,
      end
    );
    if (start === 0) {
      setpaginatedParcels([...slicedPosts]);
    } else {
      setpaginatedParcels([...paginatedParcels, ...slicedPosts]);
    }
  };

  const handleNext = (_parcels = null, force = false) => {
    let nnext = next;
    if (force) {
      nnext = 0;
    }
    loopWithSlice(
      nnext,
      nnext + parcelsPerPage,
      Array.isArray(_parcels) ? _parcels : null
    );
    setNext(nnext + parcelsPerPage);
  };

  const setLoader = (el = false) => {
    const loader = document.getElementById("loader");
    if (el) {
      loader.style.display = "block";
      return;
    }
    loader.style.display = "none";
  };

  const initailLoad = async () => {
    setIsLoader(true);
    const url = `api/v1/user_land/`;

    try {
      let result = await (await request.get(url)).json();
      /* let result = data; */
      setParcels(result);
      handleNext(result, true);
    } catch (error) {
      console.log(error);
      setParcels([]);
    } finally {
      setIsLoader(false);
    }
  };

  const handleShow = (p) => () => {
    const newParcel = JSON.parse(JSON.stringify(p));
    setParcel(newParcel);
  };

  const onRemove = (obj) => {
    const newpaginatedParcels = JSON.parse(JSON.stringify(paginatedParcels));
    const newParcels = JSON.parse(JSON.stringify(parcels));
    let newpaginatedParcel = newpaginatedParcels.find((p) => p.id === obj.id);
    let newparcel = newParcels.find((p) => p.id === obj.id);

    newpaginatedParcel.on_sale = false;
    delete newpaginatedParcel.max_price;
    delete newpaginatedParcel.min_price;
    delete newpaginatedParcel.note;
    delete newpaginatedParcel.selling_id;

    newparcel.on_sale = false;
    delete newparcel.max_price;
    delete newparcel.min_price;
    delete newparcel.note;
    delete newparcel.selling_id;

    setParcels(newParcels);
    setpaginatedParcels(newpaginatedParcels);
  };

  const onAddToSale = (obj) => {
    const newpaginatedParcels = JSON.parse(JSON.stringify(paginatedParcels));
    const newParcels = JSON.parse(JSON.stringify(parcels));
    let newpaginatedParcel = newpaginatedParcels.find((p) => p.id === obj.id);
    let newparcel = newParcels.find((p) => p.id === obj.id);

    newpaginatedParcel.on_sale = true;
    newpaginatedParcel.max_price = obj.max_price;
    newpaginatedParcel.min_price = obj.min_price;
    newpaginatedParcel.note = obj.note;
    newpaginatedParcel.selling_id = obj.selling_id;

    newparcel.on_sale = true;
    newparcel.max_price = obj.max_price;
    newparcel.min_price = obj.min_price;
    newparcel.note = obj.note;
    newparcel.selling_id = obj.selling_id;

    setParcels(newParcels);
    setpaginatedParcels(newpaginatedParcels);
  };

  const onUpdateSale = (obj) => {
    const newpaginatedParcels = JSON.parse(JSON.stringify(paginatedParcels));
    const newParcels = JSON.parse(JSON.stringify(parcels));
    let newpaginatedParcel = newpaginatedParcels.find((p) => p.id === obj.id);
    let newparcel = newParcels.find((p) => p.id === obj.id);

    newpaginatedParcel.max_price = obj.max_price;
    newpaginatedParcel.min_price = obj.min_price;
    newpaginatedParcel.note = obj.note;

    newparcel.max_price = obj.max_price;
    newparcel.min_price = obj.min_price;
    newparcel.note = obj.note;

    console.log(newpaginatedParcels);
    setParcels(newParcels);
    setpaginatedParcels(newpaginatedParcels);
  };

  return (
    <>
      {parcel && (
        <ParcelModal
          parcel={parcel}
          onMHide={() => setParcel(null)}
          onRemove={onRemove}
          onAddToSale={onAddToSale}
          onUpdateSale={onUpdateSale}
        />
      )}
      <section
        className="sale mb-5"
        style={{
          ...(parcels.length === 0 && { marginBottom: "100px" }),
        }}
      >
        <div className="container">
          <img
            src={Frame}
            alt=""
            style={{ position: "absolute", right: 0, top: "125px" }}
            className="bg-blur"
          />
          <div className="row" style={{ width: "128%", marginLeft: "-15%" }}>
            {(paginatedParcels || []).map((p, i) => (
              <div
                key={i}
                className="col-sm-12 col-md-4 mt-5"
                onClick={handleShow(p)}
              >
                <div className="sale-box">
                  {p.on_sale && (
                    <div className="on-sale-div">
                      <label>On Sale</label>
                    </div>
                  )}
                  <img src={p.image} className="img-fluid d-img" alt="" />
                  <div className="sale-box-info">
                    <label className={`col-12 p-0 text-truncate p-n-c`}>
                      {p.name && p.name !== "" ? p.name : "No title"}
                    </label>
                    <p>
                      <label className={`p-0 subtitle-heding`}>
                        {p.description || "No description"}
                      </label>
                    </p>

                    <div
                      className="mt-3"
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <p>
                        <label
                          className="p-0 pr "
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <span className="p-0 label-options">
                            {p.type === landType.PARCEL ? "Position" : "Center"}
                          </span>
                          <span
                            className={` text-truncate  p-0 label-options-value pt-2`}
                          >
                            {p.type === landType.PARCEL
                              ? `${p.x}, ${p.y}`
                              : p.center.join(", ")}
                          </span>
                        </label>
                      </p>
                      {p.type === landType.ESTATE && (
                        <p>
                          <label
                            className="p-0 pr text-truncate"
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <span className="p-0 label-options">Size</span>
                            <span
                              className={`text-truncate  p-0 label-options-value pt-2`}
                            >
                              {p.size}
                            </span>
                          </label>
                        </p>
                      )}
                      <p>
                        <label
                          className="p-0 pr text-truncate"
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <span className="p-0 label-options">Type</span>
                          <span
                            className={`text-truncate  p-0 label-options-value pt-2`}
                          >
                            {p.type === landType.ESTATE ? "Estate" : "Parcel"}
                          </span>
                        </label>
                      </p>
                      <p></p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {paginatedParcels.length !== parcels.length && (
            <div className="text-center pt-3">
              <label
                className="main-color source-serif-font bold"
                onClick={handleNext}
                style={{ cursor: "pointer" }}
              >
                Load more...
              </label>
            </div>
          )}
          {Boolean(parcels.length) === false && (
            <div className="text-center mb-5 mt-5">
              <label className="main-color source-serif-font bold h2">
                No land found on your account. Did you connect your metamask
                accounts at least once?
              </label>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
