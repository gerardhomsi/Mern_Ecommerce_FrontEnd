import React, { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const PlaceOrder = () => {
  const [clientSecret, setClientSecret] = useState("");

  const calculateCartTotal = () => {
    const cart = JSON.parse(localStorage.getItem("cart"));

    let cartTotal = cart.reduce((currentSum, currentCartItem) => {
      return currentSum + currentCartItem.count * currentCartItem.productPrice;
    }, 0);
    cartTotal = cartTotal.toFixed(2) * 100;
    return cartTotal;
  };

  const getPaymentIntent = async () => {
    const cartTotal = calculateCartTotal();

    const response = await axios.post("/api/payment/payment-intent", {
      total: cartTotal,
    });

    setClientSecret(response.data.clientSecret);
  };

  useEffect(() => {
    getPaymentIntent();
    // eslint-disable-next-line
  }, []);

  const options = {
    // passing the client secret obtained from the server
    clientSecret,
    appearance: {
      theme: "stripe",
    },
  };

  return (
    <section className="m-3">
      <div className="p-2 bg-secondary text-white rounded">
        <h5 className="display-6 ">
          <ProgressBar step1 step2 step3 />
        </h5>
      </div>
      <div className="container border py-4 my-4">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <h6 className="fw-bold mb-4">Place Order</h6>
            {clientSecret && (
              <Elements stripe={stripePromise} options={options}>
                <CheckoutForm />
              </Elements>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlaceOrder;
