import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ADD_TO_CART } from "../redux/constants/cartConstants";
import { deleteFromCart } from "../redux/actions/cartActions";
import { isAuthenticated } from "../helpers/auth";

const Cart = () => {
  const { cart } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleQuantityChange = (e, product) => {
    const cart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];

    cart.forEach((cartItem) => {
      if (cartItem._id === product._id) {
        cartItem.count = e.target.value;
      }
    });

    localStorage.setItem("cart", JSON.stringify(cart));

    dispatch({
      type: ADD_TO_CART,
      payload: cart,
    });
  };

  const handleCheckout = (e) => {
    if (isAuthenticated()) {
      navigate("/shipping");
    } else {
      navigate("/signin?redirect=shipping");
    }
  };

  return (
    <section className="cart-page p-4">
      {cart.length <= 0 ? (
        <div className="p-5 bg-secondary text-white text-center rounded">
          <h1 className="display-4 my-auto">
            Your Cart is EMPTY
            <button
              className="btn btn-light text-primary ms-3"
              onClick={handleGoBack}
            >
              Go Back
            </button>
          </h1>
        </div>
      ) : (
        <>
          <div className="p-5 bg-secondary text-white text-center rounded">
            <h1 className="display-4">Cart</h1>
          </div>
          <div className="row">
            <div className="col-md-8 my-2">
              <table className="table">
                <thead>
                  <tr className="text-center">
                    <th scope="col"></th>
                    <th scope="col">Product</th>
                    <th scope="col">Price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Remove</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {cart.map((product) => (
                    <tr key={product._id}>
                      <th scope="row">
                        <img
                          style={{ maxWidth: "110px" }}
                          src={`https://ecommerce-ogdd.onrender.com/uploads/${product.fileName}`}
                          alt="product"
                        />
                      </th>
                      <td>
                        <Link
                          className="text-decoration-none"
                          to={`/product/${product._id}`}
                        >
                          {product.productName}
                        </Link>
                      </td>
                      <td>
                        {product.productPrice.toLocaleString("en-us", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </td>
                      <td className="text-center">
                        <input
                          type="number"
                          min="1"
                          max={product.productQuantity}
                          value={product.count}
                          onChange={(e) => handleQuantityChange(e, product)}
                        />
                      </td>
                      <td>
                        <button
                          // onClick={() => dispatch(deleteProduct(product._id))}
                          type="button"
                          className="btn btn-danger btn-sm my-1 mx-1"
                          onClick={() => dispatch(deleteFromCart(product))}
                        >
                          <i className="far fa-trash-alt"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="col-md-4 border-start my-2 ps-4">
              <h2>Cart Summary</h2>
              <p className="fw-light text-muted border-bottom">
                {cart.length === 1 ? "(1) Item" : `(${cart.length}) Items`}
              </p>
              <p className="fw-bold">
                Total: $
                {cart
                  .reduce(
                    (currentSum, currentCartItem) =>
                      currentSum +
                      currentCartItem.count * currentCartItem.productPrice,
                    0
                  )
                  .toFixed(2)}
              </p>
              <button
                className="btn btn-danger w-100 py-2"
                onClick={handleCheckout}
              >
                CheckOut
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default Cart;
