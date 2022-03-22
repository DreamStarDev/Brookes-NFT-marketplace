import React, { useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import ParcelModal from "../../components/parcelModal";

import request from "../../services/Requests";

export default function Latestsale({ formData, isBuyer }) {
  const [parcels, setParcels] = useState([]);
  const [parcel, setParcel] = useState(null);
  const [isLoader, setIsLoader] = useState(false);
  const [paginatedParcels, setpaginatedParcels] = useState([]);
  const [next, setNext] = useState(0);

  const parcelsPerPage = 6;

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

  const handleShow = (p) => () => {
    const newParcel = p;
    setParcel(newParcel);
  };

  useEffect(() => {
    if (Object.keys(formData).length && formData.address !== undefined) {
      initailLoad();
    }
  }, [JSON.stringify(formData)]);

  const setLoader = (el = false) => {
    const loader = document.getElementById("loader");
    if (el) {
      loader.style.display = "block";
      return;
    }
    loader.style.display = "none";
  };

  useEffect(() => {
    try {
      setLoader(isLoader);
    } catch (error) {}
  }, [isLoader]);

  const initailLoad = async () => {
    setIsLoader(true);
    const parcelAddress = formData.address;
    const url = `account/${parcelAddress}/${isBuyer ? "parcel" : "estate"}`;

    try {
      const result = await (await request.get(url)).json();
      setParcels(result);
      handleNext(result, true);
    } catch (error) {
      console.log(error);
      setParcels([]);
    } finally {
      setIsLoader(false);
    }
  };

  const onModelHide = (param) => {
    console.log(param);
    if (param && "on_sale" in param) {
      parcel.on_sale = param.on_sale;
    }
    if (param && "price" in param) {
      parcel.price = param.price;
    }
    setParcel(null);
  };

  return (
    <>
      {parcel && (
        <ParcelModal
          parcel={{ ...parcel, formData }}
          onMHide={onModelHide}
          isBuyer={isBuyer}
          from="seller"
        />
      )}
      <section
        className="sale"
        style={{
          ...(parcels.length === 0 && { marginBottom: "100px" }),
        }}
      >
        <div className="container">
          <div className="row">
            {(paginatedParcels || []).map((p) => (
              <div className="col-sm-12 col-md-4 mt-5" onClick={handleShow(p)}>
                <div className="sale-box">
                  <img src={p.image} className="img-fluid" />
                  <div className="sale-box-info">
                    <p>
                      <label className="col-6 p-0 pr">
                        <span
                          className="col-4 p-0"
                          style={{ fontSize: "15px" }}
                        >
                          {isBuyer ? "Position" : "Center"}
                        </span>
                        <span
                          className={`${
                            isBuyer ? "col-6" : "col-8"
                          } main-color text-truncate  p-0 text-right`}
                          style={{ float: "right", fontSize: "18px" }}
                        >
                          {isBuyer
                            ? `${p.x}, ${p.y}`
                            : `${p.center_x}, ${p.center_y}`}
                        </span>
                      </label>
                      {p.on_sale && (
                        <label className="col-6 p-0 pl-2">
                          <span
                            className="col-4 p-0"
                            style={{ fontSize: "15px", visibility: "hidden" }}
                          >
                            A
                          </span>
                          <span
                            className="main-color text-truncate col-6 p-0 text-right bold"
                            style={{
                              float: "right",
                              fontSize: "18px",
                              color: "#DC5E5E",
                            }}
                          >
                            ON SALE
                          </span>
                        </label>
                      )}
                    </p>
                    <p className="mt-3">
                      <label
                        className={`${
                          isBuyer ? "col-12" : "col-9"
                        } p-0 text-truncate p-n-c`}
                        style={{
                          ...([null, ""].includes(p.name) && {
                            color: "#f7f7f7",
                          }),
                        }}
                      >
                        {p.name || "name"}
                      </label>
                      {!isBuyer && (
                        <label className="col-3 p-0 p-n-c-s text-center">
                          Size : <span className="main-color">{p.size}</span>
                        </label>
                      )}
                    </p>
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
            <div className="text-center mb-5">
              <label className="main-color source-serif-font bold h2">
                No result found
              </label>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
