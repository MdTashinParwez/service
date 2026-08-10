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