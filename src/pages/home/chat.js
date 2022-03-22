import React from "react";

import a2t from "../../assets/a2t.png";
import chat from "../../assets/chat.jpg";

export default function Chat() {
  return (
    <>
      {/* <div className="wave">
        <img src={a2t} className="img-fluid" />
      </div> */}
      <section className="chat">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-md-6">
              <div className="chat-box">
                <img src={chat} className="img-fluid" />
              </div>
            </div>
            <div className="col-sm-12 col-md-6">
              <div className="chat-box-content">
                <h2 className="sec-color source-serif-font">We're</h2>
                <h2 className="sec-color source-serif-font">
                  One <span className="main-color bold">Call Away</span>
                </h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque
                  repellat commodi ipsam reprehenderit ipsum maxime labore
                  placeat quam ab amet saepe suscipit, natus error voluptatem
                  enim, earum cumque sunt dignissimos.
                </p>
                <h4 className="sec-color source-serif-font">
                  <i className="fas fa-phone-alt main-color fa-2x"></i> +56 96585
                  69563
                </h4>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
