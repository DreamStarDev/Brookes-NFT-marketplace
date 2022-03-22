import React from "react";

import Home from "../../assets/buyer/home.png";
import Parcel from "../../assets/buyer/parcel.png";

import "./index.css";
export default function Service({
  count: { parcels: parcelsCount, estates: estatesCount },
}) {
  return (
    <section class="services">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-11">
            <article>
              <h2>
                <span>Walk around</span> the whole <span>Decentraland</span> map
                to <span>See lands </span>
                that are <span>On-Sale </span> currently
              </h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id ut
                aliquam non et enim, amet nisl, non ultricies. Enim nam enim
                enim magna pellentesque aliquet proin. Dignissim ut diam in
                egestas viverra etiam. Scelerisque tortor, cum non eu, posuere.
                Ipsum faucibus vitae sed cras commodo non.
              </p>
            </article>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-lg-5">
            <div class="card">
              <div class="card-body">
                <figure class="circle">
                  <img src={Home} alt="" />
                </figure>
                <h3>Estates : {estatesCount}</h3>
              </div>
            </div>
          </div>
          <div class="col-lg-5">
            <div class="card">
              <div class="card-body">
                <figure class="circle">
                  <img src={Parcel} alt="" />
                </figure>
                <h3>Parcels : {parcelsCount}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
