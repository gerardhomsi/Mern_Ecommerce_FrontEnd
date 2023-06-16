import axios from "axios";

export const createCategory = async (formData) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await axios.post(
    `${process.env.BACKEND_URL}/category`,
    formData,
    config
  );

  return response;
};

export const getCategories = async (formData) => {
  const response = await axios.get(`${process.env.BACKEND_URL}/api/category`);

  return response;
};
