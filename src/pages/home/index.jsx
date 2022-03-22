import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import AppContext from "../../context/AppContext";
import Footer from "./footer";
import News from "./news";
import Latestrent from "./latestrent";
import Latestsale from "./latestsale";
import Sectionone from "./sectionone";
import Sectiontwo from "./sectiontwo";
import Chat from "./chat";
import SigninModal from "../../components/signinModal/index";
import ConnectWalletModal from "../../components/connectWalletModal/index";
import request from "../../services/Requests";

import "./index.scss";
import "./media.scss";

function Home(props) {
  const history = useHistory();
  const { loginUser, setLoginUser } = useContext(AppContext);

  const [isSignin, setisSignin] = useState(false);
  const [isShow, setisShow] = useState(false);
  const [clickFrom, setclickFrom] = useState(null);
  const [isConnectShow, setisConnectShow] = useState(false);

  useEffect(() => {
    if (Object.keys(loginUser).length === 0) {
      checkToken();
    }
  }, []);

  const checkToken = async () => {
    const token = localStorage.getItem("brookes-token");
    if (token === null || token === undefined) {
      return;
    }

    try {
      const result = await request.post("api/v1/check_token/", { token }, false);
      const body = await result.json();
      if (result.status !== 200) {
        throw body;
      }
      setLoginUser(body);
      if(body.is_administrator) {
        history.push('/admin/proposals');
      }
    } catch (err) {
      console.log(err);
      localStorage.removeItem('brookes-token');
      localStorage.removeItem('brooke-metamask');
    }
  };

  const toggleModalSignin = (param = true, from = null) => {
    setclickFrom(from);
    setisSignin(param);
    setisShow(true);
  };

  const onHide = (body = null) => {
    console.log(clickFrom, body);

    setisSignin(null);
    setisShow(false);
    if (body && clickFrom) {
      history.push(clickFrom);
    }
  };

  const toggleModalConnectWallet = (param = true) => {
    setisConnectShow(param);
  }

  return (
    <div className="home-comp">
      <SigninModal isShow={isShow} onHide={onHide} isSignin={isSignin} />
      <ConnectWalletModal isShow={isConnectShow} onHide={() => setisConnectShow(false)} />
      <Sectionone toggleModalSignin={toggleModalSignin} toggleModalConnectWallet={toggleModalConnectWallet} />
      <Sectiontwo toggleModalSignin={toggleModalSignin} toggleModalConnectWallet={toggleModalConnectWallet} />
      <Latestsale />
      <Latestrent />
      <News />
      <Chat />
      <Footer />
    </div>
  );
}

export default Home;
