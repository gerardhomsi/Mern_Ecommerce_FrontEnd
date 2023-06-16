import axios from "axios";

export const signup = async (data) => {
  const config = {
    header: {
      "Content-Type": "application/json",
    },
  };

  const response = await axios.post(
    `https://ecommerce-ogdd.onrender.com/api/auth/signup`,
    data,
    config
  );

  return response;
};

export const signin = async (data) => {
  const config = {
    header: {
      "Content-Type": "application/json",
    },
  };

  const response = await axios.post(
    `https://ecommerce-ogdd.onrender.com/api/auth/signin`,
    data,
    config
  );

  return response;
};
