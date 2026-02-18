import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5500/api/v1",
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
