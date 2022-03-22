import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import AppContext from "../../context/AppContext";
import CustomSidebar from "../../components/sidebar";

import settingsIcon from "../../assets/Vector.png";
import logo from "../../assets/logo-white.png";
import Users from "./users";

function Sectionone(props) {
  const { loginUser } = useContext(AppContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const history = useHistory();
  const isLogined = Object.keys(loginUser).length;

  const setSidebar = () => {
    const newIs = !isSidebarOpen;
    setIsSidebarOpen(newIs);
  };

  const sidebarItemClick = (item) => {
    if (item === "login") {
      setSidebar();
      props.toggleModalSignin(true);
    } else if (item === "signup") {
      setSidebar();
      props.toggleModalSignin(false);
    } else if (item === false || item === "logout") {
      setSidebar();
    }
  };

  return (
    <>
      <CustomSidebar
        isSidebarOpen={isSidebarOpen}
        onItemClick={sidebarItemClick}
      />
      <section className="admin-users">
        <div className="container">
          <nav>
            <div className="logo float-left source-serif-font">
              <span onClick={() => history.push("/")}>
                <img src={logo} style={{ width: "150px" }} />
              </span>
            </div>
            <div
              className={`menu float-right ${isSidebarOpen ? "d-none" : ""}`}
              onClick={setSidebar}
            >
              <div style={{ display: "inline-flex" }}>
                <img src={settingsIcon} alt="" />
              </div>
              {loginUser && loginUser.first_name && (
                <div className="header-username">
                  <label>welcome, {loginUser.first_name}</label>
                </div>
              )}
            </div>
          </nav>
          <div className="padding">
            <Users users={props.users} />
          </div>
        </div>
      </section>
    </>
  );
}

export default Sectionone;
