import axios from "axios";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";

import { store } from "../store";
import { setAuth } from "../slices/authSlice";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
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
      const res = await axios.get("/auth/refresh-token");
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

export default axios;
