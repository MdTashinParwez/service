import { apiClient } from "./apiClient";

export const getAllCategories = async () => {
  return apiClient("/categories", {
    method: "GET",
  });
};