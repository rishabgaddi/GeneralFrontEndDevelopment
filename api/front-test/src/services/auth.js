import axios from "axios";

axios.defaults.baseURL = `${import.meta.env.VITE_API_URL}/auth`;
axios.defaults.withCredentials = true;

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

export const getMe = async () => {
  try {
    return await axios.get("/me");
  } catch (error) {
    return error.response;
  }
};
