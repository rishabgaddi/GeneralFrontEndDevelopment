import axios from "axios";

axios.defaults.baseURL = "http://localhost:4500/auth";

export const register = async (form) => {
  const res = await axios.post("/register", form);
  return res;
};
