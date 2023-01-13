import axios from "axios";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";

import { store } from "../store";

axios.defaults.baseURL = `${import.meta.env.VITE_API_URL}/auth`;
axios.defaults.withCredentials = true;

axios.interceptors.request.use(async (request) => {
  try {
    const token =
      request.headers.Authorization &&
      request.headers.Authorization.split(" ")[1];
    if (!token || token === "null") return request;
    const decoded = jwt_decode(token);
    if (decoded) {
      if (dayjs.unix(decoded.exp).diff(dayjs()) > 1) {
        return request;
      }
      const res = await axios.get("/refresh-token");
      request.headers.Authorization = `Bearer ${res.data.token}`;
      localStorage.setItem("token", res.data.token);
      store.dispatch(setAuth(res.data));
      return request;
    }
    return request;
  } catch (error) {
    console.log(error);
  }
});

export const register = async (form) => {
  try {
    return await axios.post("/register", form);
  } catch (error) {
    return error;
  }
};

export const login = async (form) => {
  try {
    return await axios.post("/login", form);
  } catch (error) {
    return error;
  }
};

export const getMe = async (token) => {
  try {
    return await axios.get("/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    return error.response;
  }
};

export const logout = async () => {
  try {
    return await axios.post("/logout");
  } catch (error) {
    return error.response;
  }
};
