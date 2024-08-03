import axios from "axios";

const baseURL = "http://localhost:5000/auth";

const httpAuth = axios.create({
  baseURL,
});

httpAuth.interceptors.request.use(
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

const authService = {
  signIn: async (arg) => {
    try {
      const { data } = await httpAuth.post("/signIn", arg);

      return data;
    } catch (error) {
      console.log(error);
    }
  },
  fetchMe: async () => {
    try {
      const { data } = await httpAuth.get("/me");
      return data;
    } catch (error) {
      console.log(error);
    }
  },
};

export default authService;
