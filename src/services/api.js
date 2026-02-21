import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5500";

const api = axios.create({
  baseURL: `${API_BASE}/api/v1`,
  withCredentials: true,
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      error.isUnauthorized = true;
    }

    return Promise.reject(error);
  },
);

export default api;
