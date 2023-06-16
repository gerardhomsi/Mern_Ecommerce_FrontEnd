import {
  ADD_TO_CART,
  DELETE_FROM_CART,
  CLEAR_CART,
} from "../constants/cartConstants";

export const addToCart = (product) => async (dispatch) => {
  const cart = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];

  const duplicates = cart.filter((cartItem) => cartItem._id === product._id);

  if (duplicates.length === 0) {
    const productToAdd = {
      ...product,
      count: 1,
    };
    cart.push(productToAdd);

    localStorage.setItem("cart", JSON.stringify(cart));

    dispatch({
      type: ADD_TO_CART,
      payload: cart,
    });
  }
};

export const deleteFromCart = (product) => async (dispatch) => {
  const cart = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];

  const updatedCart = cart.filter((cartItem) => cartItem._id !== product._id);

  localStorage.setItem("cart", JSON.stringify(updatedCart));

  dispatch({
    type: DELETE_FROM_CART,
    payload: updatedCart,
  });
};

export const clearCart = () => async (dispatch) => {
  dispatch({
    type: CLEAR_CART,
  });
};
