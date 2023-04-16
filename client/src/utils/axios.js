import axios from "axios";
export const instance = axios.create({
  baseURL: "https://mern-todo-backend-w1eq.onrender.com",
  withCredentials: true,
});
