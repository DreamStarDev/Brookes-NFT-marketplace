import React, { useState, useContext } from "react";
import { Navbar, Nav, NavDropdown, Image } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import ConnectWalletModal from "./connectWalletModal/index";
import AppContext from "../context/AppContext";

import logo from "../assets/logo-white.png";
import user from "../assets/user.png";
import "./header.scss";

function Header(params) {
  const history = useHistory();
  const { loginUser, setLoginUser } = useContext(AppContext);
  const [isConnectShow, setisConnectShow] = useState(false);

  const homeClick = () => {
    history.push("/");
  };

  const connectWallet = () => setisConnectShow(true);

  const logoutClick = () => {
    window.localStorage.removeItem("brookes-token");
    window.localStorage.removeItem("brooke-metamask");
    setLoginUser({});
    history.push("/");
  };

  return (
    <>
      <ConnectWalletModal
        isShow={isConnectShow}
        onHide={() => setisConnectShow(false)}
      />
      <div className="top-header">
        <Navbar className=" container" expand="lg">
          <Navbar.Brand onClick={homeClick} className="home-btn-style">
            <img src={logo} width={125} />
          </Navbar.Brand>
          {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav
              className="mr-auto"
              style={{ justifyContent: "center", flex: "auto" }}
            >
              <Nav.Link href="#link" style={{ paddingRight: "3rem" }} />
              <Nav.Link href="#link" style={{ paddingRight: "3rem" }} />
              <Nav.Link href="#home" style={{ paddingRight: "3rem" }}>
                Home
              </Nav.Link>
              <Nav.Link href="#link" style={{ paddingRight: "3rem" }}>
                About us
              </Nav.Link>
              <Nav.Link href="#home" style={{ paddingRight: "3rem" }}>
                Service
              </Nav.Link>
              <Nav.Link href="#link" style={{ paddingRight: "3rem" }}>
                Support
              </Nav.Link>
              <Nav.Link href="#link" style={{ paddingRight: "3rem" }}>
                Blog
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse className=""></Navbar.Collapse>
          <Navbar.Collapse className="">
            <NavDropdown title={<Image src={user} roundedCircle width={50} />}>
              <NavDropdown.Item className="username-style">
                {loginUser.first_name}
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item className="n-dd-style" onClick={connectWallet}>
                Connect Wallet
              </NavDropdown.Item>
              <NavDropdown.Item className="n-dd-style">
                Land Listing
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item className="n-dd-logout" onClick={logoutClick}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </>
  );
}

export default Header;
