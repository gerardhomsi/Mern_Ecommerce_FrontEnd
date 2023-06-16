import React from "react";
import { Link } from "react-router-dom";

const ProgressBar = ({ step1, step2, step3 }) => {
  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb justify-content-evenly">
          {step1 ? (
            <li className="breadcrumb-item active" aria-current="page">
              <Link
                // className="text-decoration-none"
                to="/shipping"
                style={{ color: "blue", textDecoration: "none" }}
                onMouseEnter={(e) => {
                  e.target.style.textDecoration = "underline darkBlue";
                  e.target.style.color = "darkblue";
                }}
                onMouseLeave={(e) => {
                  e.target.style.textDecoration = "none";
                  e.target.style.color = "blue";
                }}
              >
                Shipping
              </Link>
            </li>
          ) : (
            <li className="breadcrumb-item" aria-current="page">
              <Link
                to="/#"
                onClick={(evt) => evt.preventDefault()}
                style={{
                  cursor: "not-allowed",
                }}
                className="text-muted text-decoration-none"
              >
                Shipping
              </Link>
            </li>
          )}

          {step2 ? (
            <li className="breadcrumb-item active" aria-current="page">
              <Link
                to="/payment"
                style={{ color: "blue", textDecoration: "none" }}
                onMouseEnter={(e) => {
                  e.target.style.textDecoration = "underline darkBlue";
                  e.target.style.color = "darkblue";
                }}
                onMouseLeave={(e) => {
                  e.target.style.textDecoration = "none";
                  e.target.style.color = "blue";
                }}
              >
                Payments
              </Link>
            </li>
          ) : (
            <li className="breadcrumb-item" aria-current="page">
              <Link
                to="/#"
                onClick={(evt) => evt.preventDefault()}
                style={{
                  textDecoration: "none",
                  cursor: "not-allowed",
                }}
                className="text-muted"
              >
                Payment
              </Link>
            </li>
          )}

          {step3 ? (
            <li className="breadcrumb-item active" aria-current="page">
              <Link
                to="/placeorder"
                style={{ color: "blue", textDecoration: "none" }}
                onMouseEnter={(e) => {
                  e.target.style.textDecoration = "underline darkBlue";
                  e.target.style.color = "darkblue";
                }}
                onMouseLeave={(e) => {
                  e.target.style.textDecoration = "none";
                  e.target.style.color = "blue";
                }}
              >
                Place Order
              </Link>
            </li>
          ) : (
            <li className="breadcrumb-item" aria-current="page">
              <Link
                to="/#"
                onClick={(evt) => evt.preventDefault()}
                style={{
                  textDecoration: "none",
                  cursor: "not-allowed",
                }}
                className="text-muted"
              >
                Place Order
              </Link>
            </li>
          )}
        </ol>
      </nav>
    </>
  );
};

export default ProgressBar;
