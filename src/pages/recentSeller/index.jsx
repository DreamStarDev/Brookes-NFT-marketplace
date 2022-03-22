import React, { useState, useEffect } from "react";
import Switch from "react-switch";

import Footer from "./footer";
import News from "./news";
import Latestsale from "./latestsale";
import Sectionone from "./sectionone";
import Sectiontwo from "./sectiontwo";
import Price from "./price";
import CustomSlider from "../../components/customSlider";
import request from "../../services/Requests";
import ConnectWalletModal from "../../components/connectWalletModal/index";
import messaging from "../../assets/messaging.png";

import "./index.scss";
import "./media.scss";

function Home(props) {
  const [formData, setformData] = useState({});

  const [parcels, setParcels] = useState([]);
  const [isBuyer, setisBuyer] = useState(true);
  const [isConnectShow, setisConnectShow] = useState(false);

  /* useEffect(() => {
    getSoldParcels();
  }, []); */

  useEffect(() => {
    if (isBuyer) {
      getSoldParcels();
    } else {
      getSoldEstates();
    }
  }, [isBuyer]);

  const getSoldParcels = async () => {
    try {
      const result = await (await request.get("legacy_api/parcel/sold/?count=50")).json();
      setParcels([...result]);
    } catch (error) {
      console.log(error);
    }
  };

  const getSoldEstates = async () => {
    try {
      const result = await (await request.get("legacy_api/estate/sold/?count=50")).json();
      setParcels([...result]);
    } catch (error) {
      console.log(error);
    }
  };

  const switchPage = () => {
    const newValue = !isBuyer;
    setisBuyer(newValue);
    /* const newValue = !aa;
    setaa(newValue); */
  };

  const toggleModalConnectWallet = (param = true) => {
    setisConnectShow(param);
  }

  return (
    <div className="seller-comp">
      <ConnectWalletModal isShow={isConnectShow} onHide={() => setisConnectShow(false)} />
      <Sectionone toggleModalConnectWallet={toggleModalConnectWallet} />
      <div className="source-serif-font text-center mt-5">
        <h1 className="sec-color main-heading">
          Browse all assets on your account
        </h1>
      </div>

      <Sectiontwo onChange={(fd) => setformData(fd)} isBuyer={isBuyer} />
      <Latestsale formData={formData} isBuyer={isBuyer} />
      <Price isBuyer={isBuyer} />
      <div className="location-section">
        <div className="source-serif-font text-center">
          <div className="sec-color sec-heading">
            <h5 className="fz-40">
              Latest Sold{" "}
              <span className="main-color bold">
                {isBuyer ? "Parcels" : "Estates"}
              </span>
            </h5>
          </div>
        </div>
      </div>
      <div className="col-10 offset-1">
        <CustomSlider parcels={parcels} isBuyer={isBuyer} from="buyer" />
      </div>
      <News />
      <Footer />
      <div className="messaging">
        <img alt="" src={messaging} />
      </div>
      <div className="messaging" style={{ bottom: "100px", right: "50px" }}>
        <Switch
          checked={isBuyer}
          onChange={switchPage}
          handleDiameter={33}
          offColor="#dca85e"
          onColor="#dca85e"
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
  );
}

export default Home;
