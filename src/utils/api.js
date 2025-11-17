import axios from "axios";
import { getCookie } from "./cookieUtils";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_BE_PORT,
  headers: { "Content-Type": "application/json" },
});

// Request interceptor - Add JWT token from cookie to all requests
api.interceptors.request.use((config) => {
  const token = getCookie("auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor - Handle unauthorized errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized access - token may be invalid or expired");
      // Optionally redirect to login or dispatch logout action
    }
    return Promise.reject(error);
  }
);

export default api;
