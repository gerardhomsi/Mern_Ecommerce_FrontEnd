import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../redux/actions/productActions";
import { addToCart } from "../redux/actions/cartActions";

const Product = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  useEffect(() => {
    dispatch(getProduct(productId));
  }, [dispatch, productId]);

  const { product } = useSelector((state) => state.products);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <section className="product-page m-4">
      <button
        className="btn btn-light text-primary mb-4"
        onClick={handleGoBack}
      >
        Go Back
      </button>
      {product && (
        <div className="row">
          <div className="col-md-6">
            <img
              className="w-100 p-0"
              src={`../uploads/${product.fileName}`}
              alt="product"
            />
          </div>
          <div className="col-md-5">
            <h3 className="mb-4">{product.productName}</h3>
            <p className="text-muted border-top py-2">
              Price:{" "}
              {product.productPrice.toLocaleString("en-us", {
                style: "currency",
                currency: "USD",
              })}
            </p>
            <p className="text-muted border-top py-2">
              Status:{" "}
              {product.productQuantity <= 0 ? "Out of Stock" : "In Stock"}
            </p>
            <p className="text-muted border-top py-2">
              Description: {product.productDescription}
            </p>
            <button
              className="btn btn-dark w-100 py-2"
              disabled={product.productQuantity <= 0}
              onClick={handleAddToCart}
            >
              Add To Cart
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Product;
