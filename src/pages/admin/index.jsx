import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import AppContext from "../../context/AppContext";
import Sectionone from "./sectionone";
import SigninModal from "../../components/signinModal/index";
import request from "../../services/Requests";

import "./index.scss";

function Home(props) {
  const history = useHistory();
  const { loginUser, setLoginUser } = useContext(AppContext);

  const [isSignin, setisSignin] = useState(false);
  const [isShow, setisShow] = useState(false);
  const [clickFrom, setclickFrom] = useState(null);
  const [isConnectShow, setisConnectShow] = useState(false);
  const [users, setusers] = useState([]);

  useEffect(() => {
    if (Object.keys(loginUser).length === 0) {
      checkToken();
    }
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const result = await (await request.get("admin/users/")).json();
    console.log(result);
    setusers(result);
  };

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
  };

  return (
    <div className="home-comp">
      <SigninModal isShow={isShow} onHide={onHide} isSignin={isSignin} />
      <Sectionone
        toggleModalSignin={toggleModalSignin}
        toggleModalConnectWallet={toggleModalConnectWallet}
        users={users}
      />
    </div>
  );
}

export default Home;
