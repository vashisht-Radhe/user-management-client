import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5500/api/v1",
  withCredentials: true,
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      const isAuthEndpoint =
        error.config?.url?.includes("/auth/login") ||
        error.config?.url?.includes("/auth/register") ||
        error.config?.url?.includes("/auth/verify-otp");

      if (!isAuthEndpoint && window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  },
);

export default api;
