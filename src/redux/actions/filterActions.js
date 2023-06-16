import axios from "axios";
import { START_LOADING, STOP_LOADING } from "../constants/loadingConstants";
import { SHOW_ERROR_MESSAGE } from "../constants/messageConstants";
import { GET_NEW_ARRIVALS } from "../constants/filterConstants";
import { GET_PRODUCTS } from "../constants/productConstants";

export const getNewArrivals =
  (sortBy = "desc", limit = 3) =>
  async (dispatch) => {
    try {
      dispatch({ type: START_LOADING });
      const response = await axios.get(
        `${process.env.BACKEND_URL}/api/filter?sortBy=${sortBy}&limit=${limit}`
      );
      dispatch({ type: STOP_LOADING });
      dispatch({
        type: GET_NEW_ARRIVALS,
        payload: response.data.newArrivals,
      });
    } catch (error) {
      console.log("getNewArrivals api error :>> ", error);
      dispatch({ type: STOP_LOADING });
      dispatch({
        type: SHOW_ERROR_MESSAGE,
        payload: error.response.data.errorMessage,
      });
    }
  };

export const getProductsByFilter = (arg) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${process.env.BACKEND_URL}/api/filter/search`,
      arg
    );

    dispatch({
      type: GET_PRODUCTS,
      payload: response.data.products,
    });
  } catch (error) {
    console.log("getProductsByFilter api error :>> ", error);
    dispatch({ type: STOP_LOADING });
    dispatch({
      type: SHOW_ERROR_MESSAGE,
      payload: error.response.data.errorMessage,
    });
  }
};
