import React from "react";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../redux/actions/productActions";
import { addToCart } from "../redux/actions/cartActions";
import { Link } from "react-router-dom";

const Card = ({ product, adminPage = false, homePage = false }) => {
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className="col-sm-4 my-3">
      <div className="card h-100 d-flex flex-column">
        <a
          href="#!"
          style={{ textDecoration: "none", color: "black", cursor: "text" }}
        >
          {" "}
        </a>
        <img
          className="w-100 p-0"
          src={`../uploads/${product.fileName}`}
          alt="product"
        />
        <div className="card-body text-center d-flex flex-column">
          <h5 className="text-dark ">{product.productName}</h5>
          <hr />
          <h6 className="mb-3">
            <span className="text-secondary mr-2 ">
              {product.productPrice.toLocaleString("en-us", {
                style: "currency",
                currency: "USD",
              })}
            </span>
          </h6>
          <p className="text-muted">
            {product.productQuantity <= 0 ? "Out of Stock" : "In Stock"}
          </p>
          <p>
            {product.productDescription.length > 40
              ? product.productDescription.substring(0, 40) + "..."
              : product.productDescription.substring(0, 40)}
          </p>
          {adminPage && (
            <div className="d-flex justify-content-center">
              <Link
                to={`/admin/edit/product/${product._id}`}
                type="button"
                className="btn btn-secondary btn-sm my-1 mx-1 "
              >
                <i className="fas fa-edit pr-1 "></i>
                Edit
              </Link>
              <button
                onClick={() => dispatch(deleteProduct(product._id))}
                type="button"
                className="btn btn-danger btn-sm my-1 mx-1"
              >
                <i className="far fa-trash-alt"></i>
                Delete
              </button>
            </div>
          )}

          {homePage && (
            <div className="d-flex justify-content-center">
              <Link
                to={`/product/${product._id}`}
                type="button"
                className="btn btn-primary btn-sm my-1 mx-1 "
              >
                View Product
              </Link>
              <button
                // onClick={() => dispatch(deleteProduct(product._id))}
                type="button"
                className="btn btn-warning btn-sm my-1 mx-1"
                disabled={product.productQuantity <= 0}
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
