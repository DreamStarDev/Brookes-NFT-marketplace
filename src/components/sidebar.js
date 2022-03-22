import React, { useEffect, useState, useContext, useRef } from "react";
import AppContext from "../context/AppContext";
import Sidebar from "react-sidebar";
import copy from "copy-to-clipboard";
import Modal from "react-bootstrap/Modal";
import { Overlay, Tooltip } from "react-bootstrap";
import NumberFormat from "react-number-format";
import { useHistory } from "react-router-dom";

import VEY from "../assets/vey.png";
import ETH from "../assets/eth.png";
import SHIB from "../assets/shib.png";

import "./sidebar.scss";

export default function CustomSidebar(props) {
  const { loginUser, setLoginUser, metaMask, setmetaMask } =
    useContext(AppContext);
  const history = useHistory();
  const [isSidebarOpen, setIsSidebarOpen] = useState(props.isSidebarOpen);
  const [show, setShow] = useState(false);
  const [tooltipShow, setTooltipShow] = useState(false);
  const target = useRef(null);

  const isLogined = Object.keys(loginUser).length;
  console.log(loginUser);

  useEffect(() => {
    setIsSidebarOpen(props.isSidebarOpen);
  }, [props.isSidebarOpen]);

  useEffect(() => {
    if (tooltipShow) {
      setTimeout(() => {
        setTooltipShow(false);
      }, 1000);
    }
  }, [tooltipShow]);

  const loginClick = () => {
    props.onItemClick("login");
  };

  const signupClick = () => {
    props.onItemClick("signup");
  };

  const logoutClick = () => {
    window.localStorage.removeItem("brookes-token");
    window.localStorage.removeItem("brooke-metamask");
    setLoginUser({});
    props.onItemClick("logout");
  };

  const connectWallet = () => {
    props.onItemClick("connectWallet");
  };

  const unconnectWallet = () => {
    //setmetaMask({}, true);
    props.onItemClick("unconnectWallet");
    setShow(true);
  };

  const smartTrim = (string, maxLength) => {
    if (!string) return string;
    if (maxLength < 1) return string;
    if (string.length <= maxLength) return string;
    if (maxLength == 1) return string.substring(0, 1) + "...";

    var midpoint = Math.ceil(string.length / 2);
    var toremove = string.length - maxLength;
    var lstrip = Math.ceil(toremove / 2);
    var rstrip = toremove - lstrip;
    return (
      string.substring(0, midpoint - lstrip) +
      "..." +
      string.substring(midpoint + rstrip)
    );
  };

  const onHide = (body = null) => {
    setShow(false);
    if (props.onHide) {
      props.onHide(body);
    }
  };

  const copyAddressClick = () => {
    setTooltipShow(true);
    copy(metaMask?.account);
  };

  const renderMetaMaskModal = () => {
    return (
      <Modal
        show={show}
        onHide={onHide}
        size="md"
        dialogClassName="your-wallet-modal"
        className="your-wallet-modal-container"
      >
        <Modal.Header closeButton>
          <Modal.Title className="bold">Your wallet</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0 your-wallet cw-mb">
          <div className="container text-start">
            <form>
              <div className="row">
                <div className="col-12 mt-4 mb-2">
                  <label className="bold">{metaMask?.account}</label>
                </div>
                <div className="col-12 mb-5" style={{ display: "flex" }}>
                  <a
                    target="_blank"
                    rel="noreferrer noopener"
                    href={`https://bscscan.com/address/${metaMask?.account}`}
                    color="primary"
                    className="sc-gsDJrp sc-hiCivh fdNrZr iUXnyj"
                  >
                    View on BscScan
                    <svg
                      viewBox="0 0 24 24"
                      color="primary"
                      width="20px"
                      xmlns="http://www.w3.org/2000/svg"
                      className="sc-bdvvaa ffCyIq"
                    >
                      <path d="M18 19H6C5.45 19 5 18.55 5 18V6C5 5.45 5.45 5 6 5H11C11.55 5 12 4.55 12 4C12 3.45 11.55 3 11 3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V13C21 12.45 20.55 12 20 12C19.45 12 19 12.45 19 13V18C19 18.55 18.55 19 18 19ZM14 4C14 4.55 14.45 5 15 5H17.59L8.46 14.13C8.07 14.52 8.07 15.15 8.46 15.54C8.85 15.93 9.48 15.93 9.87 15.54L19 6.41V9C19 9.55 19.45 10 20 10C20.55 10 21 9.55 21 9V4C21 3.45 20.55 3 20 3H15C14.45 3 14 3.45 14 4Z"></path>
                    </svg>
                  </a>
                  <div
                    color="text"
                    role="button"
                    className="sc-gsDJrp sc-ilftOa bikzk cCINkC"
                    onClick={copyAddressClick}
                    ref={target}
                  >
                    Copy Address
                    <svg
                      viewBox="0 0 24 24"
                      width="20px"
                      color="primary"
                      xmlns="http://www.w3.org/2000/svg"
                      className="sc-bdvvaa ffCyIq"
                    >
                      <path d="M15 1H4C2.9 1 2 1.9 2 3V16C2 16.55 2.45 17 3 17C3.55 17 4 16.55 4 16V4C4 3.45 4.45 3 5 3H15C15.55 3 16 2.55 16 2C16 1.45 15.55 1 15 1ZM19 5H8C6.9 5 6 5.9 6 7V21C6 22.1 6.9 23 8 23H19C20.1 23 21 22.1 21 21V7C21 5.9 20.1 5 19 5ZM18 21H9C8.45 21 8 20.55 8 20V8C8 7.45 8.45 7 9 7H18C18.55 7 19 7.45 19 8V20C19 20.55 18.55 21 18 21Z"></path>
                    </svg>
                  </div>
                  <Overlay
                    target={target.current}
                    show={tooltipShow}
                    placement="bottom"
                  >
                    {(props) => (
                      <Tooltip id="overlay-example" {...props}>
                        Copied
                      </Tooltip>
                    )}
                  </Overlay>
                </div>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    );
  };

  const getTokenValue = (token) => {
    const value = metaMask?.tokens?.find((t) => t.name === token)?.value;
    if (value == 0) {
      return 0;
    }
    return Number.isInteger(value) ? value : parseFloat(value).toFixed(2);
  };

  const UsersClick = () => {
    history.push('admin/users');
  }

  return (
    <>
      {renderMetaMaskModal()}
      <Sidebar
        sidebar={
          <div className="sidebar-inner">
            <ul>
              {!isLogined && (
                <>
                  <li>
                    <a onClick={loginClick}>Login</a>{" "}
                  </li>
                  <li>
                    <a onClick={signupClick}>Signup</a>
                  </li>
                </>
              )}
              {Boolean(isLogined) && (
                <>
                  {loginUser?.is_administrator !== true && (
                    <li
                      style={{
                        ...(metaMask?.account && {
                          maxWidth: "200px",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "flex",
                          flexDirection: "column",
                        }),
                      }}
                    >
                      {!metaMask?.account && (
                        <a onClick={connectWallet}>Connect wallet</a>
                      )}
                      {metaMask?.account && (
                        <>
                          <a onClick={unconnectWallet}>
                            {smartTrim(metaMask.account, 12)}
                          </a>
                          <label>
                            <img src={ETH} width="24" />
                            <span className="ml-3">
                              <NumberFormat
                                value={getTokenValue("ETH")}
                                displayType={"text"}
                                thousandSeparator={true}
                              />
                            </span>
                          </label>
                          <label>
                            <img src={VEY} width="24" />
                            <span className="ml-3">
                              <NumberFormat
                                value={getTokenValue("VEY")}
                                displayType={"text"}
                                thousandSeparator={true}
                              />
                            </span>
                          </label>
                          <label>
                            <img src={SHIB} width="24" />
                            <span className="ml-3">
                              <NumberFormat
                                value={getTokenValue("SHIB")}
                                displayType={"text"}
                                thousandSeparator={true}
                              />
                            </span>
                          </label>
                        </>
                      )}
                    </li>
                  )}
                  {loginUser?.is_administrator && <li>
                    <a onClick={UsersClick}>Users</a>{" "}
                  </li>}
                  <li>
                    <a onClick={logoutClick}>Logout</a>{" "}
                  </li>
                </>
              )}
            </ul>
          </div>
        }
        open={props.isSidebarOpen}
        onSetOpen={props.onItemClick}
        pullRight
        sidebarClassName="sidebar-cls"
        contentClassName="sidebar-content"
        overlayClassName="sidebar-overlay"
        children={<></>}
      />
    </>
  );
}
