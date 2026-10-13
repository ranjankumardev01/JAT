
import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const axiosService = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

// Attach JWT to every request
axiosService.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Handle API responses and authentication errors
axiosService.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const requestUrl = error.config?.url;

    console.error("API request failed:", requestUrl, status);

    if (status === 401) {
      localStorage.removeItem("token");

      const currentPath = window.location.pathname;
      const isAuthPage =
        currentPath === "/login" ||
        currentPath === "/register";

      if (!isAuthPage) {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default axiosService;
