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


// Create Provider

export const createProvider = async (formData) => {
  return apiClient("/providers", {
    method: "POST",
    body: formData,
  });
};

export const getProviderStatus = async () => {
  return apiClient("/providers/status", {
    method: "GET",
  });
};

export const updateProviderDetail = async (data) => {
  return apiClient("/providers/profile", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const updateProviderDocument = async (formData) => {
  return apiClient("/providers/documents", {
    method: "PATCH",
    body: formData,
  });
};