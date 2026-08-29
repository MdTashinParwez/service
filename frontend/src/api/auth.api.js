import { apiClient } from "./apiClient";

export const registerUser = async (formData) => {
  return apiClient("/users/register", {
    method: "POST",
    body: formData,
  });
};

export const loginUser = async (credentials) => {
  return apiClient("/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
};

export const getCurrentUser = async () => {
  return apiClient("/users/current-user", {
    method: "POST",
  });
};

export const logoutUser = async () => {
  return apiClient("/users/logout", {
    method: "POST",
  });
};

export const updateProfileDetails = async (data) => {
  return apiClient("/users/update-account", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};
export const updateUserAvatar = async (formData) => {
  return apiClient("/users/avatar", {
    method: "PATCH",
    body: formData,
  });
};
export const changeCurrentPassword = async (data) => {
  return apiClient("/users/change-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};