import { setCookie, getCookie, removeCookie } from "./cookies";
import {
  setLocalStorage,
  getLocalStorage,
  deleteLocalStorage,
} from "./localstorage";

export const setAuthentication = (token, user) => {
  setCookie("token", token);
  setLocalStorage("user", user);
};

export const isAuthenticated = () => {
  if (getCookie("token") && getLocalStorage("user")) {
    return getLocalStorage("user");
  } else {
    return false;
  }
};

export const logout = (next) => {
  removeCookie("token");
  deleteLocalStorage("user");
  next();
};
