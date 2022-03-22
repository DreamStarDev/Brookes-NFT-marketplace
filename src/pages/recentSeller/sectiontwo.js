import React, { useState, useEffect } from "react";
/* import { useLocation } from "react-router-dom"; */

function Sectiontwo(props) {
  /* const { state = {} } = useLocation(); */
  const buyerAddress = "0xa01424b7540adbb792375dcf97b733a5d68ad347";
  const estateAddress = "0x301edf6987550361ab22d3f9fd3898d58cec595a";
  const [formData, setFormData] = useState({
    ...(props.isBuyer && { address: buyerAddress }),
    ...(!props.isBuyer && { address: estateAddress }),
  });

  useEffect(() => {
    if (Object.keys(formData).length) {
      props.onChange(formData);
    }
  }, []);

  useEffect(() => {
    const newState = {
      ...formData,
      ...(props.isBuyer && { address: buyerAddress }),
      ...(!props.isBuyer && { address: estateAddress }),
    };
    setFormData(newState);
    props.onChange(newState);
  }, [props.isBuyer]);

  const submitForm = async () => {
    try {
      props.onChange(formData);
    } catch (error) {
      console.log(error);
    }
  };

  const textChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <section className="form" id="form">
      <div className="container mt-5">
        <form>
          <div className="row">
            <div className="col-lg-9">
              <input
                name="address"
                value={formData.address}
                type="search"
                className="form-control search-box"
                placeholder="Please enter your address to browse all parcels on your account."
                onChange={textChange}
              />
            </div>

            <div className="col-lg-3 z-indexing">
              <button type="button" className="search " onClick={submitForm}>
                Search
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Sectiontwo;
