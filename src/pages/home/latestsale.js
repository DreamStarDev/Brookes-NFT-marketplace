import React, { useEffect, useState } from "react";
import NumberFormat from "react-number-format";

import CustomSlider from "../../components/customSlider";
import ParcelModal from "../../components/parcelModal";
import request from "../../services/Requests";
import wave1 from "../../assets/wave-1.png";

export default function Latestsale() {
  const [parcels, setParcels] = useState([]);
  const [show, setShow] = useState(false);
  const [parcel, setParcel] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = (p) => () => {
    const newParcel = JSON.parse(JSON.stringify(p));
    newParcel.order_price = p.price;
    setParcel(newParcel);
    setShow(true);
  };

  useEffect(() => {
    (async () => {
      try {
        const result = await (await request.get("legacy_api/parcel/sold/?count=10")).json();

        setParcels(result);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <>
      {parcel && (
        <ParcelModal parcel={parcel} onMHide={() => setParcel(null)} />
      )}
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
                      <span className="main-color">Price: </span>
                      <span className="sec-color">
                        <NumberFormat
                          value={parcel.price || 0}
                          displayType={"text"}
                          thousandSeparator={true}
                        />
                      </span>
                    </p>
                    <p>
                      <span className="main-color">Seller: </span>
                      <span className="sec-color">{parcel.seller}</span>
                    </p>
                    <p>
                      <span className="main-color">Bidder: </span>
                      <span className="sec-color"> {parcel.bidder}</span>
                    </p>
                    <p>
                      <span className="main-color">Position: </span>
                      <span className="sec-color">
                        {" "}
                        {parcel.x}, {parcel.y}
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
      <div className="wave">
        <img src={wave1} className="img-fluid" />
      </div>
      <section className="sale">
        <div className="container">
          <h1 className="text-center source-serif-font">
            Latest for <span className="main-color bold">Sale</span>
          </h1>
          <div className="row">
          <CustomSlider parcels={parcels} isBuyer from="home" />
            {/* {parcels.map((p) => (
              <div className="col-sm-12 col-md-4" onClick={handleShow(p)}>
                <div className="sale-box">
                  <img src={p.image} className="img-fluid" />
                  <div className="sale-box-info">
                    <p>
                      <label className="main-color">Position</label>
                      <span style={{ marginLeft: "9px" }}>
                        {" "}
                        {p.x}, {p.y}
                      </span>
                    </p>
                    <p>
                      <label
                        className="main-color "
                        style={{ marginRight: "34px" }}
                      >
                        Price
                      </label>
                      <NumberFormat
                        value={p.price || 0}
                        displayType={"text"}
                        thousandSeparator={true}
                      />{" "}
                      MANA
                    </p>
                    <p>
                      <label className="main-color">Date</label>{" "}
                      <span style={{ marginLeft: "34px" }}>
                        {(p.sold_date || "").substr(0, 10)}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            ))} */}
          </div>
        </div>
      </section>
    </>
  );
}
