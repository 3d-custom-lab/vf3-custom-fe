import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_BE_PORT,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  // Use the same key as authStore.js
  const token = localStorage.getItem("auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token invalid or expired
      console.warn("Unauthorized access - token may be invalid or expired");
      // Optionally redirect to login
      // window.location.href = '/auth';
    }
    return Promise.reject(error);
  }
);

export default api;
