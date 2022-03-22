import React, { useEffect, useState } from "react";

import { getType, nFormatter } from "./utils";
import FilterModal from "../../components/buyerFilterModal";
import ParcelModal from "../../components/buyerParcelModal";

import FilterSvg from "../../assets/buyer/filter.svg";

export default function LandSale({ parcels, onFilterSubmit }) {
  const [isFilterModal, setIsFilterModal] = useState(false);
  const [isParcelModal, setIsParcelModal] = useState(false);
  const [filterData, setfilterData] = useState({
    type: 0,
    min_price: null,
    max_price: null,
  });

  const handleShow = (p) => () => {
    const newParcel = JSON.parse(JSON.stringify(p));
    setIsParcelModal(newParcel);
  };

  useEffect(() => {
    if (isFilterModal) {
      setIsFilterModal(false);
    }
  }, [parcels]);

  const onFilterSubmitMiddleware = (data) => {
    setfilterData(data);
    onFilterSubmit(data);
  };

  return (
    <>
      {isFilterModal && (
        <FilterModal
          onMHide={() => setIsFilterModal(null)}
          onFilterSubmit={onFilterSubmitMiddleware}
          filterData={filterData}
        />
      )}
      {isParcelModal && (
        <ParcelModal
          onMHide={() => setIsParcelModal(null)}
          parcel={isParcelModal}
        />
      )}
      <section class="cardsview">
        <div class="container container-xxl">
          <div class="row align-items-center mb-5">
            <div class="col-8">
              <article class="">
                <h2>Decentral Land</h2>
                <p>
                  <a href="">Available to buy</a>{" "}
                </p>
              </article>
            </div>
            <div class="col-4 text-right" style={{ height: "102px" }}>
              <button
                class="btn btn-primary filterbtn"
                onClick={() => setIsFilterModal(true)}
              >
                Filter <img src={FilterSvg} alt="" />
              </button>
            </div>
          </div>
          <div class="row">
            {parcels?.map((item) => (
              <div
                class="col-lg-4"
                onClick={handleShow(item)}
                style={{ cursor: "pointer" }}
                key={item.id}
              >
                <div class="card p-cards">
                  <figure>
                    <img src={item.image} class="img-fluid" alt="" />
                  </figure>
                  <div class="card-body">
                    <span class="badge badge-wlight">FOR BUY</span>
                    <h3 className="text-truncate">{item.name ?? 'No title'}</h3>
                    <p class="card-text">{item.description ?? 'No description'}</p>
                    <ul class="list-inline">
                      <li class="list-inline-item">
                        <span>
                          {getType(item.type) === "Parcel"
                            ? "Position"
                            : "Center"}
                        </span>
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
