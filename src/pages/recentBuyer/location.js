import React, { useEffect, useState } from "react";
import { Atlas } from "decentraland-ui/dist/components/Atlas/Atlas.js";
import request from "../../services/Requests";
import ParcelModal from "../../components/parcelModal";

export default function Location({ isBuyer }) {
  const [tiles, setTiles] = useState({});
  const [axises, setAxises] = useState({ x: 0, y: 0 });
  const [fd, setFd] = useState({ x: 0, y: 0 });
  const [parcel, setParcel] = useState(null);
  const [toggle, setToggle] = useState(false);
  let selected = [];

  const handleShow = (p) => {
    setParcel(p);
  };

  useEffect(() => {
    console.log("-----------------------------------");
    Atlas.fetchTiles().then((_tiles) => {
      setTiles(_tiles);
    });
    setToggle(!toggle);
  }, []);

  const forSaleLayer = (x, y) => {
    const key = x + "," + y;
    let parcelEstate = (k) => {
      if (isBuyer) {
        return !("estate_id" in tiles[k]);
      }
      return "estate_id" in tiles[k];
    };
    if (tiles && tiles[key] && "price" in tiles[key] && parcelEstate(key)) {
      return { color: "#00d3ff" };
    }
    return null;
  };

  const handleClick = async (x, y) => {
    const currentTile = tiles[`${x},${y}`];
    if (
      isBuyer &&
      (!currentTile ||
        (currentTile && !("price" in currentTile)) ||
        (currentTile && "estate_id" in currentTile))
    ) {
      return;
    }

    if (
      !isBuyer &&
      (!currentTile ||
        (currentTile && !("price" in currentTile)) ||
        (currentTile && !("estate_id" in currentTile)))
    ) {
      return;
    }

    /* if (isSelected(x, y)) {
      selected = selected.filter((coord) => coord.x !== x || coord.y !== y);
    } else {
      selected.push({ x, y });
    } */

    let result = {...currentTile, owner_address: currentTile.owner, order_price: currentTile.price};
    if (isBuyer) {
      result = await (await request.get(`legacy_api/parcel/${x}/${y}/`)).json();
    }
    handleShow(result);
    console.log(result);
  };

  const onCenterClick = () => {
    console.log(axises, fd);
    setAxises({ ...fd });
  };

  const onAxisChange = (ev) => {
    const { name, value } = ev.target;
    setFd({ ...fd, [name]: value });
  };

  const selectedStrokeLayer = (x, y) => {
    return isSelected(x, y) ? { color: "#ff0044", scale: 1.4 } : null;
  };

  const selectedFillLayer = (x, y) => {
    return isSelected(x, y) ? { color: "#ff9990", scale: 1.2 } : null;
  };

  function isSelected(x, y) {
    return selected.some((coord) => coord.x === x && coord.y === y);
  }

  return (
    <>
      {parcel && (
        <ParcelModal
          parcel={parcel}
          onMHide={() => setParcel(null)}
          isBuyer={isBuyer}
          from="buyer"
        />
      )}
      <div className="location-section mt-5">
        <div className="source-serif-font text-center">
          <h1 className="bold sec-color main-heading">VIRTUAL TOUR</h1>
          <div className="sec-color sec-heading">
            <h5 className="fz-34">
              Walk around the <span className="main-color">World</span>
            </h5>
            <h5 className="fz-34">
              and see{" "}
              <span className="main-color">
                {isBuyer ? "Parcels" : "Estates"}
              </span>{" "}
              information to buy
            </h5>
          </div>
        </div>
        <section
          className="location"
          style={{ width: "100%", height: "800px" }}
        >
          <div className="location-box-first" style={{ width: "100%" }}>
            <Atlas
              layers={[forSaleLayer]}
              onClick={handleClick}
              width={window.innerWidth - 20}
              height={800}
              {...(toggle === false && { zoom: 0 })}
            />
            {/* <div className="center text-center d-inline">
              <form className="d-inline">
                <label for="x">X&nbsp;: &nbsp;</label>
                <input
                  type="number"
                  id="x"
                  name="x"
                  placeholder="0.0"
                  onChange={onAxisChange}
                />
                &nbsp;&nbsp;
                <label for="y">Y&nbsp;:&nbsp; </label>
                <input
                  type="number"
                  id="y"
                  name="y"
                  placeholder="0.0"
                  onChange={onAxisChange}
                />
                <input type="button" value="Center" onClick={onCenterClick} />
              </form>
            </div>
           */}
          </div>
          {/* <div className="location-box-sec">
            <h6>Selected parcel Details</h6>
            <img src={loc2} />
            <div className="info">
              <h4>Information</h4>
              <div className="row">
                <div className="col-sm-6">
                  <div className="inner-info">
                    <div className="position-relative info-icon">
                      <span>
                        <i className="fas fa-map-marker-alt fa-1x"></i>
                      </span>
                      <div className="d-inline info-cont">
                        <h3>Position</h3>
                        <h5 className="main-color bold">535</h5>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="inner-info">
                    <div className="position-relative info-icon">
                      <span>
                        <i className="fas fa-map-marker-alt fa-1x"></i>
                      </span>
                      <div className="d-inline info-cont">
                        <h3>On Sale</h3>
                        <h5 className="main-color bold">535</h5>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="inner-info">
                    <div className="position-relative info-icon">
                      <span>
                        <i className="fas fa-map-marker-alt fa-1x"></i>
                      </span>
                      <div className="d-inline info-cont">
                        <h3>Bids</h3>
                        <h5 className="main-color bold">535</h5>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="inner-info">
                    <div className="position-relative info-icon">
                      <span>
                        <i className="fas fa-map-marker-alt fa-1x"></i>
                      </span>
                      <div className="d-inline info-cont">
                        <h3>Average Bids</h3>
                        <h5 className="main-color bold">535</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero
            </p>
          </div> */}
        </section>
      </div>
    </>
  );
}
