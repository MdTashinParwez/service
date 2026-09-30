import { apiClient } from "./apiClient";


export const getAllServices = async ({
  page = 1,
  limit = 6,
  search = "",
  category = "",
  provider = "",
  city = "",
  serviceType = "",
  minPrice = "",
  maxPrice = "",
  sort = "newest",
}) => {
  const params = new URLSearchParams();

  params.set("page", page);
  params.set("limit", limit);

  if (search.trim()) {
    params.set("search", search.trim());
  }

  if (category) {
    params.set("category", category);
  }

  if (provider.trim()) {
    params.set("provider", provider.trim());
  }

  if (city.trim()) {
    params.set("city", city.trim());
  }

  if (serviceType) {
    params.set("serviceType", serviceType);
  }

  if (minPrice !== "") {
    params.set("minPrice", minPrice);
  }

  if (maxPrice !== "") {
    params.set("maxPrice", maxPrice);
  }

  if (sort) {
    params.set("sort", sort);
  }

  return apiClient(`/services/all?${params.toString()}`, {
    method: "GET",
  });
};
export const getServiceById = async (id) => {
  return apiClient(`/services/${id}`, {
    method: "GET",
  });
};




// provider services

export const getMyServices = async () => {
  return apiClient("/services/my-services", {
    method: "GET",
  });
};

export const createService = async (formData) => {
  return apiClient("/services", {
    method: "POST",
    body: formData,
  });
};

export const updateService = async (id, formData) => {
  return apiClient(`/services/${id}`, {
    method: "PATCH",
    body: formData,
  });
};

export const deleteService = async (id) => {
  return apiClient(`/services/${id}`, {
    method: "DELETE",
  });
};