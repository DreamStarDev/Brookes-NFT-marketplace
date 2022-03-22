import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Request from "../../services/Requests";
import CloseBtu from "../../assets/close_btu-1.png";

import "./main.scss";
import "./media.css";

export default function ParcelModal({
  onMHide,
  parcel: p,
  onRemove,
  onAddToSale,
  onUpdateSale,
}) {
  const [show, setShow] = useState(false);
  const [fd, setFd] = useState(() => ({
    min_price: p.min_price || "",
    max_price: p.max_price || "",
    note: p.note || "",
  }));
  const [errorObj, setError] = useState({});
  const parcel = JSON.parse(JSON.stringify(p));

  console.log(parcel);

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

  const addToSale = async () => {
    const errors = validation();
    console.log(errors);
    if (Object.keys(errors).length) {
      setError(errors);
      return;
    }

    const payload = {
      type: parcel.type,
      land_id: parcel.id,
      min_price: fd.min_price || 0,
      max_price: fd.max_price || 0,
      note: fd.note || "",
    };
    try {
      const result = await (
        await Request.post("api/v1/selling_land/", payload, false)
      ).json();
      console.log(result);
      onAddToSale({ ...result, id: parcel.id, selling_id: result.id });
      onHide();
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
    if (!fd.note || fd.note === "") {
      errors.note = true;
    }
    return errors;
  };

  const updateSale = async () => {
    const errors = validation();
    if (Object.keys(errors).length) {
      setError(errors);
      return;
    }

    const payload = {
      type: parcel.type,
      land_id: parcel.id,
      min_price: fd.min_price || 0,
      max_price: fd.max_price || 0,
      note: fd.note || "",
    };
    try {
      const result = await (await Request.put(
        `api/v1/selling_land/${parcel.selling_id}/`,
        payload,
        false
      )).json();
      console.log(result);
      onUpdateSale({ ...result, id: parcel.id });
      onHide();
    } catch (error) {
      console.log(error);
    }
  };

  const removeSale = async () => {
    console.log("remove sale");
    try {
      const result = await Request.delete(
        `api/v1/selling_land/${parcel.selling_id}/`
      );
      console.log(result);
      onRemove(parcel);
      onHide();
    } catch (error) {
      console.log(error);
    }
  };

  const onInputChange = ({ target: { name, value } }) => {
    const newErrorObj = JSON.parse(JSON.stringify(errorObj));
    delete errorObj[name];
    setError(newErrorObj);
    setFd({ ...fd, [name]: value });
  };

  return (
    <>
      <Modal show={show} onHide={onHide} size="lg" className="parcel-modal-new">
        <Modal.Body className="p-0">
          <section class="dcl">
            <div class="modal-body">
              <h2>Add land to "Sale" list </h2>
              <div class="close-dcl text-right">
                <img src={CloseBtu} class="img-fluid" onClick={onHide} />
              </div>
              <div class="row mt-4">
                <div class="col-lg-6 p-1">
                  <div class="inner-dcl">
                    <img src={parcel.image} class="img-fluid" />
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="inner-dcl">
                    <div class="dcl-content">
                      <h2>{parcel.name || "No title"}</h2>
                      <p>{parcel.description || "No description"}</p>
                    </div>

                    <div class="dcl-price">
                      <div class="row">
                        <div
                          class="col-4"
                          style={{ padding: "0 5px", paddingLeft: "15px" }}
                        >
                          <h5 class="dcl-opacity">
                            {parcel.type === 1 ? "Position" : "Center"}
                          </h5>
                          <h4 class="font-weight-bold">
                            {parcel.type === 1 && (
                              <>
                                <span> {parcel.x} </span>
                                {parcel.x && ","}
                                <span> {parcel.y} </span>
                              </>
                            )}
                            {parcel.type === 2 &&
                              parcel.center.map((c, i) => (
                                <>
                                  <span> {c} </span>
                                  {i !== 1 && ", "}
                                </>
                              ))}
                          </h4>
                        </div>
                        {parcel.type === 2 && (
                          <div class="col-2">
                            <h5 class="dcl-opacity">Size:</h5>
                            <h4 class="font-weight-bold">4</h4>
                          </div>
                        )}
                        {parcel.type === 1 && <div className="col-2"></div>}
                        <div className={`col-6`}>
                          <div>
                            <h5 class="dcl-opacity">Recommended Price</h5>
                            <h4 class="font-weight-bold">-----</h4>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="price-range">
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

                      <h5 class="dcl-opacity">Note</h5>
                      <div class="row">
                        <div class="col">
                          <input
                            value={fd.note}
                            type="text"
                            name="note"
                            onChange={onInputChange}
                            style={{
                              ...(errorObj.note && { borderColor: "red" }),
                            }}
                          />
                        </div>
                      </div>

                      {parcel.on_sale && (
                        <div class="row">
                          <div class="col">
                            <button
                              class="btn btn-warning update"
                              onClick={updateSale}
                            >
                              Update
                            </button>
                          </div>
                          <span class="to"></span>
                          <div class="col">
                            <button
                              class="btn btn-danger remove"
                              onClick={removeSale}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      )}
                      {parcel.on_sale === false && (
                        <div class="row">
                          <div class="col">
                            <button
                              class="btn btn-warning update"
                              onClick={addToSale}
                            >
                              Add To Sale
                            </button>
                          </div>
                        </div>
                      )}
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
