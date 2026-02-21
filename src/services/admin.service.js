import api from "./api";

const BASE_URL = "/admin/users";

export const getAllUsers = () => {
  return api.get(BASE_URL);
};

export const getUserById = (userId) => {
  return api.get(`${BASE_URL}/${userId}`);
};

export const updateUserRole = (userId, role) => {
  return api.patch(`${BASE_URL}/${userId}/role`, { role });
};

export const deactivateUser = (userId) => {
  return api.patch(`${BASE_URL}/${userId}/deactivate`);
};

export const activateUser = (userId) => {
  return api.patch(`${BASE_URL}/${userId}/activate`);
};

export const deleteUser = (id) => api.delete(`${BASE_URL}/${id}`);

export const getActivities = (page = 1, limit = 10) => {
  return api.get(`${BASE_URL}/activities?page=${page}&limit=${limit}`);
};
