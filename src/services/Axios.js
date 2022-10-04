import axios from "axios";
const Axios = axios.create({
  baseURL: "http://localhost:5000/api",
});

Axios.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("jwt");
    config.headers.withCredentials = true;
    config.headers.put["Content-Type"] = "application/json";
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default Axios;
