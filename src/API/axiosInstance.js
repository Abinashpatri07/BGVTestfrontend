import axios from "axios";
import { API_BASE_URL } from "./config.js";
import {
  ensureAdminSession,
  DEFAULT_ADMIN_TOKEN,
  isTokenExpired,
} from "../utils/sessionManager.js";

// Determine base URL depending on env (runtime config → build-time env → localhost fallback)
const BASE_URL = API_BASE_URL || "http://localhost:5000";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Attach valid token
axiosInstance.interceptors.request.use(
  (config) => {
    ensureAdminSession();
    let token =
      localStorage.getItem("accessToken") ||
      localStorage.getItem("vendorToken") ||
      localStorage.getItem("candidateToken") ||
      DEFAULT_ADMIN_TOKEN;

    if (isTokenExpired(token)) {
      token = DEFAULT_ADMIN_TOKEN;
      localStorage.setItem("accessToken", DEFAULT_ADMIN_TOKEN);
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // If request payload is FormData, remove default application/json so browser sets multipart/form-data boundary
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle 401 Unauthorized by resetting token without redirecting
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      ensureAdminSession(true);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
