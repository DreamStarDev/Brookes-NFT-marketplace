import React, { useEffect, useState } from "react";

import { nFormatter, getType } from "./utils";
import request from "../../services/Requests";
import ParcelModal from "../../components/buyerParcelModal";

export default function RecentlySelling() {
  const [parcels, setParcels] = useState([]);
  const [isParcelModal, setIsParcelModal] = useState(false);

  useEffect(() => {
    getRecentlySelling();
  }, []);

  const getRecentlySelling = async () => {
    try {
      const result = await (
        await request.get("api/v1/latest_selling_lands/")
      ).json();
      setParcels(result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleShow = (p) => () => {
    const newParcel = JSON.parse(JSON.stringify(p));
    setIsParcelModal(newParcel);
  };

  return (
    <>
      {isParcelModal && (
        <ParcelModal
          onMHide={() => setIsParcelModal(null)}
          parcel={isParcelModal}
        />
      )}
      <section class="horizontal-cards">
        <div class="container container-xxl">
          <div class="row align-items-center mb-5">
            <div class="col-8">
              <article class="">
                <h2>Recently Listed for Selling</h2>
                <p>
                  <a href="">Available to buy</a>{" "}
                </p>
              </article>
            </div>
            {/* <div class="col-4 text-right" style={{ height: "102px" }}>
            <button class="btn btn-primary filterbtn" onClick={() => {}}>
              View all
            </button>
          </div> */}
          </div>
          <div class="row">
            {parcels?.map((item) => (
              <div key={item.id} class="col-lg-6" onClick={handleShow(item)} style={{cursor: 'pointer'}}>
                <div class="card p-cards">
                  <figure>
                    <img src={item.image} class="img-fluid" alt="" />
                  </figure>
                  <div class="card-body">
                    <span class="badge badge-wlight">FOR BUY</span>
                    <h3>{item.name}</h3>
                    <p class="card-text">{item.description}</p>
                    <ul class="list-inline">
                      <li class="list-inline-item">
                        <span>Center</span>
                        <p>
                          {item.x}, {item.y}
                        </p>
                      </li>
                      <li class="list-inline-item">
                        <span>Type</span>
                        <p>{getType(item.type)}</p>
                      </li>
                      <li class="list-inline-item">
                        <span>Price Range</span>
                        <p>
                          {nFormatter(item.min_price, 3)} -{" "}
                          {nFormatter(item.max_price, 3)} Mana
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
