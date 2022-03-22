import React from "react";
import LogoAdmin from "../../assets/logoadmin.png";
import MailIcon from "../../assets/mail.svg";
import MapPinIcon from "../../assets/map-pin.svg";
import CallIcon from "../../assets/call.svg";

export default function Footer() {
  return (
    <>
      <footer className="footer2">
        <div className="container">
          <div className="footerlogo">
            <img src={LogoAdmin} alt="" />
          </div>
          <div className="footertext">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nibh
            facilisi nec tellus purus cum volutpat. Dictum malesuada nisl in sit
            odio urna velit viverra. Urna nisi, pharetra velit donec nisl tempor
            fringilla nunc nec. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Nibh facilisi nec tellus purus cum volutpat.
          </div>
          <div className="row">
            <div className="col-md-4">
              <div className="d-flex flex-media">
                <div className="flex-shrink-0">
                  <img src={CallIcon} className="mx-3" alt="" />
                </div>
                <div className="flex-grow-1 ms-3">
                  <p>Call</p>
                  <h6>+ 123-123-1234</h6>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="d-flex flex-media">
                <div className="flex-shrink-0">
                  <img src={MailIcon} className="mx-3" alt="" />
                </div>
                <div className="flex-grow-1 ms-3">
                  <p>Mail</p>
                  <h6> youremail@gmail.com</h6>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="d-flex flex-media">
                <div className="flex-shrink-0">
                  <img src={MapPinIcon} className="mx-3" alt="" />
                </div>
                <div className="flex-grow-1 ms-3">
                  <p>Address</p>
                  <h6>Put your 123 address here</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="copyright">
          <p className="m-0">Copyright © 2021. All Rights Reserved</p>
        </div>
      </footer>
    </>
  );
}
