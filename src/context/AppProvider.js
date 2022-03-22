import React, { useState } from "react";
import AppContext from "./AppContext";

const AppProvider = (props) => {
  const [loginUser, setLoginUser] = useState({});
  const [othersData, setOthersData] = useState({});
  const [metaMask, setmetaMask] = useState({});

  const initialValues = {
    loginUser,
    setLoginUser,
    othersData,
    setOthersData,
    metaMask,
    setmetaMask: (newMetaMask, force = false) =>
      setmetaMask({ ...(force === false && { ...metaMask }), ...newMetaMask }),
  };

  return (
    <AppContext.Provider value={initialValues}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppProvider;
