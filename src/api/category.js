import axios from "axios";

export const createCategory = async (formData) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await axios.post(
    `https://ecommerce-ogdd.onrender.com/category`,
    formData,
    config
  );

  return response;
};

export const getCategories = async (formData) => {
  const response = await axios.get(
    `https://ecommerce-ogdd.onrender.com/api/category`
  );

  return response;
};
