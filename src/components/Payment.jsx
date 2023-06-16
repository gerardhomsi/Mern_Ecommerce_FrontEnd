import React, { useState, useEffect } from "react";
import ProgressBar from "./ProgressBar";
import { savePaymentMethod } from "../redux/actions/orderActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { paymentMethod } = useSelector((state) => state.order);
  const [paymentType, setPaymentType] = useState("stripe");

  const handleChange = (e) => {
    setPaymentType(e.target.value);
    dispatch(savePaymentMethod(e.target.value));
  };

  useEffect(() => {
    if (paymentMethod) {
      setPaymentType(paymentMethod);
    }
  }, [setPaymentType, paymentMethod]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentType));
    navigate("/placeorder");
  };

  return (
    <section className="m-3">
      <div className="p-2 bg-secondary text-white rounded">
        <h5 className="display-6 ">
          <ProgressBar step1 step2 />
        </h5>
      </div>
      <div className="container border py-4 my-4">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <h6 className="fw-bold mb-4">Payment Information</h6>

            <form onSubmit={handleSubmit}>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="paymentMethod"
                  value="paypal"
                  onChange={handleChange}
                  checked={paymentType === "paypal"}
                />
                <label className="form-check-label">PayPal</label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="paymentMethod"
                  value="stripe"
                  onChange={handleChange}
                  checked={paymentType === "stripe"}
                />
                <label className="form-check-label">Stripe</label>
              </div>
              <button className="btn btn-primary mt-3">Continue</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Payment;
