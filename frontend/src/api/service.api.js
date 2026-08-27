import { apiClient } from "./apiClient";

export const getAllServices = async (
  page = 1,
  limit = 6,
  search = ""
) => {
  return apiClient(
    `/services/all?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`,
    {
      method: "GET",
    }
  );
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