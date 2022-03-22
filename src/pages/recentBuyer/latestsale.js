import React, { useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import ParcelModal from "../../components/parcelModal";

import request from "../../services/Requests";

export default function Latestsale({ formData, isBuyer }) {
  const [parcels, setParcels] = useState([]);
  const [parcel, setParcel] = useState(null);
  const [pageIndex, setpageIndex] = useState(0);
  const [isLoader, setIsLoader] = useState(false);

  const handleShow = (p) => () => {
    const newParcel = JSON.parse(JSON.stringify(p));
    if(!isBuyer) {
      newParcel.x = newParcel.center_x;
      newParcel.y = newParcel.center_y;
      newParcel.order_created = newParcel.created_at;
      newParcel.order_expires = newParcel.expires_at;
    }
    if(!('order_created' in newParcel)) {
      newParcel.order_created = newParcel.created_at;
    }
    if(!('order_expires' in newParcel)) {
      newParcel.order_expires = newParcel.expires_at;
    }
    console.log(newParcel)
    setParcel(newParcel);
  };

  useEffect(() => {
    if (Object.keys(formData).length) {
      loadMore(true);
    }
    if (Object.keys(formData).length === 0) {
      loadMore(true, true);
    }
  }, [JSON.stringify(formData), isBuyer]);

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

  const loadMore = async (force = false, fromLandingPage = false) => {
    setIsLoader(true);
    let currentIndex = pageIndex;
    let newParcels = JSON.parse(JSON.stringify(parcels));
    if (force) {
      currentIndex = 0;
      newParcels = [];
    }
    let orderBy = `${formData.orderBy ? `&orderBy=${formData.orderBy}` : ""}`;
    if (fromLandingPage) {
      orderBy = "&orderBy=New";
    }
    const minPrice = `${
      formData.min_price ? `&minPrice=${formData.min_price}` : ""
    }`;
    const maxPrice = `${
      formData.max_price ? `&maxPrice=${formData.max_price}` : ""
    }`;
    const search = `${formData.search ? `&nearBy=${formData.search}` : ""}`;

    const url = `legacy_api/${
      isBuyer ? "parcel" : "estate"
    }/on_sale/?count=6&index=${currentIndex}${orderBy}${minPrice}${maxPrice}${
      isBuyer ? search : ""
    }`;

    try {
      const result = await (await request.get(url)).json();
      setpageIndex(result.index);
      setParcels([...newParcels, ...(result.parcels || result.estates)]);
    } catch (error) {
      console.log(error);
      if (pageIndex === 0) {
        setParcels([]);
      }
    } finally {
      setIsLoader(false);
    }
  };

  return (
    <>
      {/* {parcel && (
        <Modal show={show} onHide={handleClose} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Property Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="container">
              <div className="row">
                <div className="col-sm-12 col-lg-6">
                  <div className="modal-parcel-box">
                    <img src={parcel.image} className="img-fluid" />
                  </div>
                </div>
                <div className="col-sm-12 col-lg-6">
                  <div className="modal-parcel-box modal-parcel-box-heading">
                    <p>
                      <span className="main-color">Name: </span>
                      <span className="sec-color">{parcel.name}</span>
                    </p>
                    <p>
                      <span className="main-color">Price: </span>
                      <span className="sec-color">
                        <NumberFormat
                          value={parcel.order_price || 0}
                          displayType={"text"}
                          thousandSeparator={true}
                        />
                      </span>
                    </p>
                    <p>
                      <span className="main-color">Bids: </span>
                      <span className="sec-color">
                        <NumberFormat
                          value={parcel.cnt_bids || 0}
                          displayType={"text"}
                          thousandSeparator={true}
                        />
                      </span>
                    </p>
                    <p>
                      <span className="main-color">Avg Bid Price: </span>
                      <span className="sec-color">
                        {" "}
                        <NumberFormat
                          value={parcel.avg_bid_price || 0}
                          displayType={"text"}
                          thousandSeparator={true}
                        />
                      </span>
                    </p>
                    <p>
                      <span className="main-color">Position: </span>
                      <span className="sec-color">
                        {" "}
                        ({parcel.x}, {parcel.y})
                      </span>
                    </p>
                    <p>
                      <span className="main-color">Address: </span>
                      <span className="sec-color">
                        {parcel.contractAddress}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )} */}

      {parcel && (
        <ParcelModal
          parcel={parcel}
          onMHide={() => setParcel(null)}
          isBuyer={isBuyer}
          from="buyer"
        />
      )}
      <section
        className="sale"
        style={{ ...(parcels.length === 0 && { marginBottom: "100px" }) }}
      >
        <div className="container">
          <div className="row">
            {(parcels || []).map((p) => (
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
                          className={`${isBuyer ? 'col-6' : 'col-8'} main-color text-truncate  p-0 text-right`}
                          style={{ float: "right", fontSize: "18px" }}
                        >
                          {isBuyer
                            ? `${p.x}, ${p.y}`
                            : `${p.center_x}, ${p.center_y}`}
                        </span>
                      </label>
                      <label className="col-6 p-0 pl-2">
                        <span
                          className="col-4 p-0"
                          style={{ fontSize: "15px" }}
                        >
                          Bids{" "}
                        </span>
                        <span
                          className="main-color text-truncate col-6 p-0 text-right"
                          style={{ float: "right", fontSize: "18px" }}
                        >
                          <NumberFormat
                            value={p.cnt_bids || 0}
                            displayType={"text"}
                            thousandSeparator={true}
                          />
                        </span>
                      </label>
                    </p>
                    <p>
                      <label className="col-6 p-0">
                        <span
                          className="col-4 p-0"
                          style={{ fontSize: "15px" }}
                        >
                          Price{" "}
                        </span>
                        <span
                          className="main-color text-truncate col-8 p-0 text-right"
                          style={{ float: "right", fontSize: "18px" }}
                        >
                          <NumberFormat
                            value={p.order_price || 0}
                            displayType={"text"}
                            thousandSeparator={true}
                          />
                        </span>
                      </label>
                      <label className="col-6 p-0 pl-2">
                        <span
                          className="col-4 p-0"
                          style={{ fontSize: "15px" }}
                        >
                          Avg Bid{" "}
                        </span>
                        <span
                          className="main-color text-truncate col-6 p-0 text-right"
                          style={{ float: "right", fontSize: "18px" }}
                        >
                          <NumberFormat
                            value={p.avg_bid_price || 0}
                            displayType={"text"}
                            thousandSeparator={true}
                          />
                        </span>
                      </label>
                    </p>
                    <p>
                      <label
                        className={`${isBuyer ? "col-12": "col-9"} p-0 text-truncate p-n-c`}
                        style={{
                          ...([null, ""].includes(p.name) && {
                            color: "#f7f7f7",
                          }),
                        }}
                      >
                        {p.name || "name"}
                      </label>
                      {!isBuyer && <label className="col-3 p-0 p-n-c-s text-center">
                        Size : <span className="main-color">{p.size}</span>
                      </label>}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {Boolean(parcels.length) && (
            <div className="text-center pt-3">
              <label
                className="main-color source-serif-font bold"
                onClick={() => loadMore()}
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
