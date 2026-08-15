import { apiClient } from "./apiClient";

export const getAllProviders = async (
  page = 1,
  limit = 6,
  search = "",
  category = ""
) => {
  const params = new URLSearchParams({
    page,
    limit,
  });

  if (search.trim()) {
    params.append("search", search.trim());
  }

  if (category) {
    params.append("category", category);
  }

  return apiClient(`/providers/all?${params.toString()}`, {
    method: "GET",
  });
};

export const getProviderById = async (id) => {
  return apiClient(`/providers/${id}`, {
    method: "GET",
  });
};

export const getCurrentProvider = async () => {
  return apiClient("/providers/me", {
    method: "GET",
  });
};