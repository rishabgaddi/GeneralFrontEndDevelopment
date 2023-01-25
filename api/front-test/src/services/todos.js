import axios from "./axios";

export const getTodos = async (token) => {
  try {
    return await axios.get("/todos", {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    return error.response;
  }
};

export const postTodos = async (token, todo) => {
  try {
    return await axios.post("/todos", todo, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    return error.response;
  }
};
