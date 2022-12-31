import axios from "axios";

axios.defaults.baseURL = "http://localhost:4500/auth";

export const register = async (form) => {
  try {
    return await axios.post("/register", form);
  } catch (error) {
    return error;
  }
};
