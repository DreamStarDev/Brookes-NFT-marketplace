import React, { useContext, useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";

import AppContext from "../context/AppContext";
import request from "../services/Requests";
import Websocket from "../services/Websocket";

const layout = (props, rest, Component) => (
  <React.Fragment>
    <Route {...rest} component={Component} />
  </React.Fragment>
);

const ProtectedRoute = (props) => {
  const { loginUser, setLoginUser } = useContext(AppContext);
  const [tokenReqState, settokenReqState] = useState("pending");
  const { component: Component, ...rest } = props;

  const configWebsocket = () => {
    Websocket.setup();
  };

  useEffect(() => {
    console.log("protected-layout");
    if (isEmpty(loginUser)) {
      setLoader(true);
      checkToken();
    } else {
      settokenReqState(true);
    }
    configWebsocket();
  }, []);

  const setLoader = (el = false) => {
    const loader = document.getElementById("loader");
    if (el) {
      loader.style.display = "block";
      return;
    }
    loader.style.display = "none";
  };

  const checkToken = async () => {
    const token = localStorage.getItem("brookes-token");
    if (token === null || token === undefined) {
      settokenReqState(false);
      setLoader(false);
      return;
    }

    try {
      const result = await request.post("api/v1/check_token/", { token }, false);
      const body = await result.json();
      if (result.status !== 200) {
        throw body;
      }
      setLoader(false);
      setLoginUser(body);
      settokenReqState(true);
    } catch (err) {
      console.log(err);
      localStorage.removeItem('brookes-token');
      localStorage.removeItem('brooke-metamask');
      setLoader(false);
      settokenReqState(false);
    } finally {
      
    }
  };

  if (tokenReqState === false) {
    return <Redirect to={{ pathname: "/" }} />;
  } else if (tokenReqState === true) {
    return layout(props, rest, Component);
  } else {
    return <></>;
  }
};

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

export default ProtectedRoute;
