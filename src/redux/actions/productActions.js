import axios from "axios";
import { START_LOADING, STOP_LOADING } from "../constants/loadingConstants";
import {
  SHOW_ERROR_MESSAGE,
  SHOW_SUCCESS_MESSAGE,
} from "../constants/messageConstants";
import {
  CREATE_PRODUCT,
  GET_PRODUCTS,
  GET_PRODUCT,
  DELETE_PRODUCT,
} from "../constants/productConstants";

export const createProduct = (formData) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const response = await axios.post(
      `${process.env.BACKEND_URL}/api/product`,
      formData
    );
    dispatch({ type: STOP_LOADING });
    dispatch({
      type: SHOW_SUCCESS_MESSAGE,
      payload: response.data.successMessage,
    });
    dispatch({
      type: CREATE_PRODUCT,
      payload: response.data.product,
    });
  } catch (error) {
    console.log("createProduct api error :>> ", error);
    dispatch({ type: STOP_LOADING });
    dispatch({
      type: SHOW_ERROR_MESSAGE,
      payload: error.response.data.errorMessage,
    });
  }
};

export const getProducts = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const response = await axios.get(`${process.env.BACKEND_URL}/api/product`);
    dispatch({ type: STOP_LOADING });
    dispatch({
      type: GET_PRODUCTS,
      payload: response.data.products,
    });
  } catch (error) {
    console.log("getProducts api error :>> ", error);
    dispatch({ type: STOP_LOADING });
    dispatch({
      type: SHOW_ERROR_MESSAGE,
      payload: error.response.data.errorMessage,
    });
  }
};

export const getProductsByCount = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const response = await axios.get(
      `https://ecommerce-ogdd.onrender.com/api/product/count`
    );
    dispatch({ type: STOP_LOADING });
    dispatch({
      type: GET_PRODUCTS,
      payload: response.data.products,
    });
  } catch (error) {
    console.log("getProducts api error :>> ", error);
    dispatch({ type: STOP_LOADING });
    dispatch({
      type: SHOW_ERROR_MESSAGE,
      payload: error.response.data.errorMessage,
    });
  }
};

export const getProduct = (productId) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const response = await axios.get(`/api/product/${productId}`);
    dispatch({ type: STOP_LOADING });
    dispatch({
      type: GET_PRODUCT,
      payload: response.data,
    });
  } catch (error) {
    console.log("getProducts api error :>> ", error);
    dispatch({ type: STOP_LOADING });
    dispatch({
      type: SHOW_ERROR_MESSAGE,
      payload: error.response.data.errorMessage,
    });
  }
};

export const deleteProduct = (productId) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const response = await axios.delete(`/api/product/${productId}`);
    dispatch({ type: STOP_LOADING });
    dispatch({
      type: DELETE_PRODUCT,
      payload: response.data,
    });
  } catch (error) {
    console.log("deleteProducts api error :>> ", error);
    dispatch({ type: STOP_LOADING });
    dispatch({
      type: SHOW_ERROR_MESSAGE,
      payload: error.response.data.errorMessage,
    });
  }
};
