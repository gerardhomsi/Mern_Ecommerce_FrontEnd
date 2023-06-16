import React, { useState, useEffect } from "react";
import ProgressBar from "./ProgressBar";
import usaStates from "../data/usaStates";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../redux/actions/orderActions";
import { useNavigate } from "react-router-dom";

const Shipping = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shippingAddress } = useSelector((state) => state.order);

  const [address, setAddress] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");

  useEffect(() => {
    shippingAddress.address
      ? setAddress(shippingAddress.address)
      : setAddress("");
    shippingAddress.address2
      ? setAddress2(shippingAddress.address2)
      : setAddress2("");
    shippingAddress.city ? setCity(shippingAddress.city) : setCity("");
    shippingAddress.state ? setState(shippingAddress.state) : setState("");
    shippingAddress.zip ? setZip(shippingAddress.zip) : setZip("");
  }, [shippingAddress]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const shippingData = {
      address,
      address2,
      city,
      state,
      zip,
    };
    dispatch(saveShippingAddress(shippingData));
    navigate("/payment");
  };

  return (
    <section className="m-3">
      <div className="p-2 bg-secondary text-white rounded">
        <h5 className="display-6 ">
          <ProgressBar step1 />
        </h5>
      </div>

      <div className="container border py-4 mt-4">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <h6 className="fw-bold mb-4">Shipping Details</h6>

            <form onSubmit={handleSubmit}>
              <div className="form-group mb-3">
                <label className="mb-1" htmlFor="inputAddress">
                  Address
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <div className="form-group mb-3">
                <label className="mb-1" htmlFor="inputAddress2">
                  Address 2
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Apartment #, Suite, Unit..."
                  value={address2}
                  onChange={(e) => setAddress2(e.target.value)}
                />
              </div>

              <div className="row">
                <div className="form-group col-md-6">
                  <label className="mb-1" htmlFor="inputCity">
                    City
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
                <div className="form-group col-md-4">
                  <label className="mb-1" htmlFor="inputState">
                    State
                  </label>
                  <select
                    type="text"
                    className="form-control"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  >
                    <option>Choose</option>
                    {usaStates.map((s) => (
                      <option key={s.abbreviation} value={s.abbreviation}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group col-md-2">
                  <label className="mb-1" htmlFor="inputZip">
                    Zip
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                  />
                </div>
              </div>
              <button className="btn btn-primary mt-3" type="submit">
                Continue
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Shipping;
