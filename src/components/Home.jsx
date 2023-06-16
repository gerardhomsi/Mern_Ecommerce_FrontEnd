import React, { useEffect, useState } from "react";
import { getNewArrivals } from "../redux/actions/filterActions";
import { getProductsByCount } from "../redux/actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import Card from "./Card";
import { showLoading } from "../helpers/loading";
import { useLocation } from "react-router-dom";
import { clearCart } from "../redux/actions/cartActions";
import { clearOrder } from "../redux/actions/orderActions";
import { clearCartLocalStorage } from "../helpers/localstorage";

const Home = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (
      location.state &&
      location.state.result.paymentIntent.status === "succeeded"
    ) {
      dispatch(clearCart());
      dispatch(clearOrder());
      clearCartLocalStorage(() => {
        setSuccessMessage("Your Payment Was Successful");
        setTimeout(() => {
          setSuccessMessage("");
        }, 2000);
      });
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    dispatch(getNewArrivals());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getProductsByCount());
  }, [dispatch]);

  const [successMessage, setSuccessMessage] = useState("");
  const { newArrivals } = useSelector((state) => state.filters);
  const { products } = useSelector((state) => state.products);
  const { loading } = useSelector((state) => state.loading);

  return (
    <section className="home-page">
      <div className="banner-image"></div>
      {loading ? (
        <div className="text-center">{showLoading()}</div>
      ) : (
        <>
          <div className="container">
            <hr className="py-4" />
            {location.state &&
              location.state.result.paymentIntent.status === "succeeded" &&
              successMessage && (
                <div className="alert alert-success text-center" role="alert">
                  {successMessage}
                </div>
              )}
            <h3 className="pt-4 text-center">New Arrivals</h3>
            <div className="row">
              {newArrivals &&
                newArrivals.map((newArrival) => (
                  <Card
                    key={newArrival._id}
                    product={newArrival}
                    homePage={true}
                  />
                ))}
            </div>
            <hr className="py-4" />
            <h3 className="pt-4 text-center">Menu</h3>
            <div className="row">
              {products &&
                products.map((product) => (
                  <Card key={product._id} product={product} homePage={true} />
                ))}
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default Home;
