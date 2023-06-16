import axios from "axios";

export const createProduct = async (data) => {
  const response = await axios.post(
    `https://ecommerce-ogdd.onrender.com/api/product`,
    data
  );
  return response;
};
