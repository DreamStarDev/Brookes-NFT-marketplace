import React, { useEffect,useContext,useState,useRef } from "react";
import { useHistory, useLocation } from "react-router-dom";

import AppContext from "../../../context/AppContext";

import SearchIcon from "../../../assets/admin/search.svg";
import UserIcon from "../../../assets/admin/user-new.png";
import BellIcon from "../../../assets/admin/bell.svg";
import logo from "../../../assets/logo-white.png";
import logosm from "../../../assets/admin/logosm.png";
import logoutBg from "../../../assets/admin/logout-bg.svg";
import settingsIcon from "../../../assets/admin/settings-icon.svg";
import logoutIcon from "../../../assets/admin/logout-icon.svg";

export default function Header() {
  const { loginUser, setLoginUser } = useContext(AppContext);
  const history = useHistory();
  const location = useLocation();
  const ref = useRef()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const checkIfClickedOutside = e => {
      // If the menu is open and the clicked target is not within the menu, then close the menu
      if (isMenuOpen && ref.current && !ref.current.contains(e.target)) {
        setIsMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", checkIfClickedOutside)
    
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside)
    }
  }, [isMenuOpen])
  
  const btnLogout = () => {
    window.localStorage.removeItem("brookes-token");
    window.localStorage.removeItem("brooke-metamask");
    setLoginUser({});
    history.push("/");
  };

  return (
    <>
      <header class="header1">
        <div class="logomain" onClick={() => history.push("/admin/proposals")}>
          <img src={logo} class="img-fluid logodeskt" alt="" />
          {location?.pathname === "/chats" && (
            <img src={logosm} class="img-fluid logosm" alt="" />
          )}
        </div>

        <span
          class="menutoggle"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i></i>
          <i></i>
          <i></i>
        </span>
        <div class="searchholder">
          <form action="">
            <img src={SearchIcon} class="searchicon" alt="" />
            <input
              type="text"
              class="form-control"
              name=""
              id=""
              placeholder="Search"
            />
          </form>
        </div>

        <nav class="navbar adminmenu">
          <ul class="navbar-nav">
            <li class="nav-item notification">
              <a href="" class="nav-link">
                <img src={BellIcon} alt="" />
                <span class="count">2</span>
              </a>
            </li>
            <li class="nav-item dropdown userdd mr-3">
              <div class="dropdown">
                <span
                  class="dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  ref={ref}
                  onClick={() => setIsMenuOpen(oldState => !oldState)}
                >
                  <img src={UserIcon} alt="" class="mr-3" />{" "}
                  <span class="d-none d-sm-inline">
                    {loginUser.first_name}
                  </span>
                  {isMenuOpen && (<ul style={{ listStyle: 'none', backgroundImage:`url(${logoutBg})`, position:"absolute",
                  width:"132px", height:"122px", right: "0px"}}>
                    <li style={{margin:"30px 20px 15px"}}> 
                      <a href="javascript:void(0)" style={{color:"white", opacity: "0.5"}}><img style={{marginRight:"10px"}} src={settingsIcon} />  Setting </a>
                    </li>
                    <hr style={{margin:"0px"}}/>
                    <li style={{margin:"15px 20px"}}> 
                      <a href="javascript:void(0)" onClick={btnLogout} style={{color:"white", opacity: "0.5"}}>
                        <img style={{marginRight:"10px"}} src={logoutIcon} /> Log out 
                      </a>
                    </li>
                  </ul>)}
                </span>
              </div>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
