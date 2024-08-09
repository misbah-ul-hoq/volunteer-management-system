import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:3000",
  baseURL: "https://volunteer-management-system-api.vercel.app",
  withCredentials: false,
});

export default api;
