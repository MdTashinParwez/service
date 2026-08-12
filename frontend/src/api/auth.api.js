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