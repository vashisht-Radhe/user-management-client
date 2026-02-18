import api from "./api";

const BASE_URL = "/user/me";

export const getProfile = async () => {
  const response = await api.get(BASE_URL);
  return response.data.data;
};

export const updateProfile = async (data) => {
  const response = await api.patch(BASE_URL, data);
  return response.data;
};

export const updateProfilePic = async (file) => {
  const formData = new FormData();
  formData.append("avatar", file);

  const response = await api.patch(`${BASE_URL}/avatar`, formData);

  return response.data;
};

export const changePassword = async (data) => {
  const response = await api.patch(`${BASE_URL}/change-password`, data);
  return response.data;
};

export const deactivateAccount = async () => {
  const response = await api.patch(`${BASE_URL}/deactivate`);
  return response.data;
};

export const deleteAccount = async (data) => {
  const response = await api.delete(BASE_URL, { data });
  return response.data;
};
