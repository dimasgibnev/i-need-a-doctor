/* eslint-disable no-unused-vars */
import axios from "axios";

const baseURL = "http://localhost:5000";

const http = axios.create({
  baseURL,
});

http.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const httpClient = {
  get: http.get,
  post: http.post,
  put: http.put,
  delete: http.delete,
  patch: http.patch,
};

export default httpClient;
