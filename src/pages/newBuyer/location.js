import React, { useEffect, useState } from "react";
import { Atlas } from "decentraland-ui/dist/components/Atlas/Atlas.js";
import Switch from "react-switch";

import request from "../../services/Requests";
import ParcelModal from "../../components/buyerParcelModal";

import MarketplaceLogo from "../../assets/buyer/marketplace.svg";

function useForceUpdate() {
  const [, setValue] = useState(0); // integer state
  return () => setValue((value) => value + 1); // update the state to force render
}

let selected = [];
export default function Location({}) {
  const forceUpdate = useForceUpdate();
  const [tiles, setTiles] = useState({});
  const [axises, setAxises] = useState({ x: 0, y: 0 });
  const [fd, setFd] = useState({ x: 0, y: 0 });
  const [parcel, setParcel] = useState(null);
  const [toggle, setToggle] = useState(true);
  const [isBuyer, setisBuyer] = useState(true);
  const [parcels, setParcels] = useState([]);
  const handleShow = (p) => setParcel(p);

  useEffect(() => {
    getParcels(isBuyer);
  }, [isBuyer]);

  const getParcels = async (cond = null) => {
    try {
      const url = `api/v1/${cond ? "selling_parcels" : "selling_estates"}/`;
      const result = await (await request.get(url)).json();
      if (cond) {
        selected = result.map((r) => ({ x: parseInt(r.x), y: parseInt(r.y) }));
      } else {
        selected = result
          .map((r) => r.estate_parcels)
          .flat(1)
          .map((r) => ({ x: parseInt(r.x), y: parseInt(r.y) }));
      }
      setParcels(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    Atlas.fetchTiles().then((_tiles) => {
      setTiles(_tiles);
      setToggle(!toggle);
    });
    
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

  const handleClick = async (x, y, ...args) => {
    let isExist = null;
    if (isBuyer) {
      isExist = parcels.find((s) => s.x === x && s.y === y);
    } else {
      isExist = parcels.find((s) =>
        Boolean(
          s.estate_parcels.find(
            (z) => parseInt(z.x) === x && parseInt(z.y) === y
          )
        )
      );
    }
    if (!isExist) {
      return;
    }
    handleShow(isExist);
    console.log(isExist);
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

  const switchPage = () => {
    const newValue = !isBuyer;
    setisBuyer(newValue);
  };

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
      <div className="messaging-div mr-3">
        <div className="">
          <Switch
            checked={isBuyer}
            onChange={switchPage}
            handleDiameter={33}
            offColor="#ff8a00"
            onColor="#ff8a00"
            offHandleColor="#003774"
            onHandleColor="#003774"
            height={40}
            width={100}
            borderRadius={25}
            activeBoxShadow="0px 0px 0px 0px #003774"
            color="#fff"
            uncheckedIcon={<div className="unchecked-icon-custom">Estate</div>}
            checkedIcon={<div className="checked-icon-custom">Parcel</div>}
            uncheckedHandleIcon={
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  fontSize: 20,
                }}
              ></div>
            }
            className="react-switch"
            id="small-radius-switch"
          />
        </div>
      </div>
      <div className="location-section mt-5">
        <header class="location-mainheader">
          <div class="container">
            <nav class="navbar navbar-expand-lg">
              <a class="navbar-brand" href="#">
                <img src={MarketplaceLogo} alt="" />
              </a>
              <button
                class="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span class="navbar-toggler-icon"></span>
              </button>

              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                  <li class="nav-item active">
                    <a class="nav-link" href="#">
                      Marketplace <span class="sr-only">(current)</span>
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </header>
        <section
          className="location"
          style={{height: "300px" }}
        >
          <div className="location-box-first" style={{ width: "100%" }}>
            <Atlas
              layers={[selectedStrokeLayer]}
              onClick={handleClick}
              width={window.innerWidth - 20}
              height={300}
              {...(toggle === false && { zoom: 0 })}
            />
          </div>
        </section>
        <footer class="footer1">
          <div class="container">
          </div>
        </footer>
      </div>
    </>
  );
}
