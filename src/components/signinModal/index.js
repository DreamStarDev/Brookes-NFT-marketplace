import React, { useEffect, useState, useContext } from "react";
import Modal from "react-bootstrap/Modal";
import PhoneInput from "react-phone-input-2";
import { useHistory } from "react-router-dom";

import request from "../../services/Requests";
import AppContext from "../../context/AppContext";

import "react-phone-input-2/lib/style.css";
import "./index.scss";

export default function SigninModal({ isShow, ...props }) {
  const history = useHistory();
  const { loginUser, setLoginUser } = useContext(AppContext);
  const [show, setShow] = useState(true);
  const [isSignin, setIsSignin] = useState(props.isSignin);
  const [fd, setFd] = useState({ checkbox: false });
  const [toast, setToast] = useState({ type: null });
  const [isLoader, setIsLoader] = useState(false);

  useEffect(() => {
    if (isShow) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [isShow]);

  useEffect(() => {
    setIsSignin(props.isSignin);
  }, [props.isSignin]);

  useEffect(() => {
    if (toast.type !== null) {
      setTimeout(() => {
        setToast({ type: null });
      }, 1000);
    }
  }, [toast.type]);

  const onHide = (body = null) => {
    setShow(false);
    props.onHide(body);
    setFd({ checkbox: false });
  };

  const toggleSignin = () => {
    console.log("asdasda");
    setFd({ checkbox: false });
    setIsSignin(!isSignin);
  };

  const onInputChange = (ev) => {
    const { name, value } = ev.target;
    if (name === "checkbox") {
      setFd({ ...fd, [name]: !fd[name] });
    } else {
      setFd({ ...fd, [name]: value });
    }
  };

  const submitClick = async () => {
    console.log(fd);
    setIsLoader(true);
    if (isSignin === false) {
      try {
        const result = await request.post(
          "api/v1/user/",
          {
            username: fd.username,
            first_name: fd.first_name,
            last_name: fd.last_name,
            email: fd.email,
            password: fd.password,
            phone: fd.phone,
          },
          false
        );
        const body = await result.json();
        if (result.status !== 201) {
          throw body;
        }
        setToast({ type: "success", msg: body.message });
        toggleSignin();
      } catch (error) {
        console.log(error);
        setToast({ type: "err", msg: error.message });
      } finally {
        setIsLoader(false);
      }
    } else {
      try {
        const result = await request.post(
          "api/v1/login/",
          {
            email: fd.email,
            password: fd.password,
          },
          false
        );
        const body = await result.json();
        if (result.status !== 200) {
          throw body;
        }
        setToast({ type: "success", msg: body.message });
        window.localStorage.setItem("brookes-token", body.token);
        setLoginUser(body);
        onHide(body);
        if(body.is_administrator){
          history.push('/admin/proposals');
        }
      } catch (error) {
        console.log(error);
        setToast({ type: "err", msg: error.message });
      } finally {
        setIsLoader(false);
      }
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      dialogClassName="signin-modal"
      className="signin-modal-continer"
    >
      <Modal.Body className="p-0 signin">
        <div className="container text-center">
          {isLoader && (
            <div
              id="loader"
              style={{ ...(isSignin === false && { top: "18%" }) }}
            />
          )}
          <div className="mt-5">
            <label className="login-heading">
              {isSignin ? "Log in to" : "Create"} your account
            </label>
          </div>

          <div className={`${toast.msg ? "visible" : "invisible"}`}>
            <label
              className={`${
                toast && toast.type === "err" ? "text-danger" : "text-success"
              }`}
            >
              {toast.msg || "s"}
            </label>
          </div>

          <form>
            <div
              className="row text-center"
              style={{ justifyContent: "center" }}
            >
              {isSignin === false && (
                <>
                  <div className="col-11">
                    <input
                      value={fd.first_name || ""}
                      name="first_name"
                      type="text"
                      className="form-control input-field"
                      placeholder="First name"
                      onChange={onInputChange}
                    />
                  </div>
                  <div className="col-11 mt-3">
                    <input
                      value={fd.last_name || ""}
                      name="last_name"
                      type="text"
                      className="form-control input-field"
                      placeholder="Last name"
                      onChange={onInputChange}
                    />
                  </div>
                  <div className="col-11 mt-3">
                    <input
                      value={fd.username || ""}
                      name="username"
                      type="text"
                      className="form-control input-field"
                      placeholder="Username"
                      onChange={onInputChange}
                    />
                  </div>
                  <div className="col-11 mt-3">
                    {/* <input
                      value={fd.phone || ""}
                      name="phone"
                      type="text"
                      className="form-control input-field"
                      placeholder="Phone number"
                      onChange={onInputChange}
                    /> */}
                    <PhoneInput
                      disableSearchIcon
                      country={"us"}
                      value={fd.phone}
                      onChange={(phone) => setFd({ ...fd, phone })}
                      showDropdown={false}
                    />
                  </div>
                </>
              )}

              <div className={`col-11 ${isSignin === false ? "mt-3" : ""}`}>
                <input
                  value={fd.email || ""}
                  name="email"
                  type="email"
                  className="form-control input-field"
                  placeholder="Email"
                  onChange={onInputChange}
                />
              </div>
              <div className="col-11 mt-3">
                <input
                  value={fd.password || ""}
                  name="password"
                  type="password"
                  className="form-control input-field"
                  placeholder="Password"
                  onChange={onInputChange}
                />
              </div>
              {isSignin && (
                <div className="col-11 text-right">
                  <label className="f-p mt-3">Forgot password ?</label>
                </div>
              )}

              {isSignin === false && (
                <div className="col-11 text-left">
                  <div className="form-check mr-5 mt-3">
                    <input
                      checked={fd.checkbox === true}
                      name="checkbox"
                      className="form-check-input c-c-i"
                      type="checkbox"
                      id="flexCheckDefault"
                      style={{ height: "18px", width: "18px" }}
                      onChange={onInputChange}
                    />
                    <label
                      className="form-check-label f-p pl-3 c-c-l"
                      htmlFor="flexCheckDefault"
                    >
                      Agree to our privacy policy
                    </label>
                  </div>
                </div>
              )}

              <div className="col-11 mt-4">
                <button
                  type="button col-11"
                  className="submit"
                  type="button"
                  onClick={submitClick}
                  disabled={
                    isSignin === false ? (fd.checkbox ? false : true) : false
                  }
                >
                  {isSignin ? "Log In" : "Sign up"}
                </button>
              </div>
              <div className="mt-3 mb-5">
                <label onClick={toggleSignin}>
                  <span className="new-user">
                    {isSignin ? "Don't have an account yet ?" : "Already have an account?"}
                  </span>
                  <span
                    className="ml-2 main-color"
                    style={{ cursor: "pointer" }}
                  >
                    {isSignin ? "SIGN UP" : "LOGIN "} HERE
                  </span>
                </label>
              </div>
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
}
