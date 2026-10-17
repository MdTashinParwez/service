import { apiClient } from "./apiClient.js";

// ==========================================
// 1. DASHBOARD & STATS
// ==========================================

export const getDashboardStats = async () => {
  return apiClient("/admin/dashboard/stats", {
    method: "GET",
  });
};

// ==========================================
// 2. PROVIDER MANAGEMENT
// ==========================================

export const getProviderApplications = async ({
  page = 1,
  limit = 10,
  status = "",
  search = "",
  category = "",
  isVerified = undefined,
} = {}) => {
  const params = new URLSearchParams();

  params.set("page", page);
  params.set("limit", limit);

  if (status) params.set("status", status);
  if (search?.trim()) params.set("search", search.trim());
  if (category) params.set("category", category);

  if (isVerified !== undefined && isVerified !== "") {
    params.set("isVerified", String(isVerified));
  }

  return apiClient(`/admin/providers/applications?${params.toString()}`, {
    method: "GET",
  });
};

export const getProviderDetailsAdmin = async (id) => {
  return apiClient(`/admin/providers/${id}`, {
    method: "GET",
  });
};

export const approveProvider = async (
  id,
  { verifyIdentity = true, note = "" } = {}
) => {
  return apiClient(`/admin/providers/${id}/approve`, {
    method: "PATCH",
    body: JSON.stringify({
      verifyIdentity,
      note,
    }),
  });
};

export const rejectProvider = async (
  id,
  { rejectionReason = "" } = {}
) => {
  return apiClient(`/admin/providers/${id}/reject`, {
    method: "PATCH",
    body: JSON.stringify({
      rejectionReason,
    }),
  });
};

export const toggleProviderStatus = async (
  id,
  { reason = "" } = {}
) => {
  return apiClient(`/admin/providers/${id}/toggle-status`, {
    method: "PATCH",
    body: JSON.stringify({
      reason,
    }),
  });
};

// ==========================================
// 3. USER MANAGEMENT
// ==========================================

export const getAllUsersAdmin = async ({
  page = 1,
  limit = 10,
  role = "",
  search = "",
  isVerified = undefined,
} = {}) => {
  const params = new URLSearchParams();

  params.set("page", page);
  params.set("limit", limit);

  if (role) params.set("role", role);
  if (search?.trim()) params.set("search", search.trim());

  if (isVerified !== undefined && isVerified !== "") {
    params.set("isVerified", String(isVerified));
  }

  return apiClient(`/admin/users?${params.toString()}`, {
    method: "GET",
  });
};

export const getUserDetailsAdmin = async (id) => {
  return apiClient(`/admin/users/${id}`, {
    method: "GET",
  });
};

export const updateUserRoleAdmin = async (
  id,
  { role, reason = "" }
) => {
  return apiClient(`/admin/users/${id}/role`, {
    method: "PATCH",
    body: JSON.stringify({
      role,
      reason,
    }),
  });
};

export const deleteUserAdmin = async (
  id,
  { reason = "" } = {}
) => {
  return apiClient(`/admin/users/${id}`, {
    method: "DELETE",
    body: JSON.stringify({
      reason,
    }),
  });
};

// ==========================================
// 4. SERVICE MANAGEMENT
// ==========================================

export const getAllServicesAdmin = async ({
  page = 1,
  limit = 10,
  search = "",
  category = "",
  isActive = undefined,
  serviceType = "",
} = {}) => {
  const params = new URLSearchParams();

  params.set("page", page);
  params.set("limit", limit);

  if (search?.trim()) params.set("search", search.trim());
  if (category) params.set("category", category);

  if (isActive !== undefined && isActive !== "") {
    params.set("isActive", String(isActive));
  }

  if (serviceType) params.set("serviceType", serviceType);

  return apiClient(`/admin/services?${params.toString()}`, {
    method: "GET",
  });
};

export const toggleServiceStatusAdmin = async (
  id,
  { reason = "" } = {}
) => {
  return apiClient(`/admin/services/${id}/toggle-status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      reason,
    }),
  });
};

export const deleteServiceAdmin = async (
  id,
  { reason = "" } = {}
) => {
  return apiClient(`/admin/services/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      reason,
    }),
  });
};

// ==========================================
// 5. BOOKING MANAGEMENT
// ==========================================

export const getAllBookingsAdmin = async ({
  page = 1,
  limit = 10,
  status = "",
  paymentStatus = "",
  startDate = "",
  endDate = "",
} = {}) => {
  const params = new URLSearchParams();

  params.set("page", page);
  params.set("limit", limit);

  if (status) params.set("status", status);
  if (paymentStatus) params.set("paymentStatus", paymentStatus);
  if (startDate) params.set("startDate", startDate);
  if (endDate) params.set("endDate", endDate);

  return apiClient(`/admin/bookings?${params.toString()}`, {
    method: "GET",
  });
};

export const getRecentBookingsAdmin = async (limit = 10) => {
  return apiClient(`/admin/bookings/recent?limit=${limit}`, {
    method: "GET",
  });
};

export const getBookingDetailsAdmin = async (id) => {
  return apiClient(`/admin/bookings/${id}`, {
    method: "GET",
  });
};

export const cancelBookingAdmin = async (
  id,
  { cancellationReason = "" } = {}
) => {
  return apiClient(`/admin/bookings/${id}/cancel`, {
    method: "PATCH",
    body: JSON.stringify({
      cancellationReason,
    }),
  });
};

// ==========================================
// 6. CATEGORY CRUD OPERATIONS
// ==========================================

export const getAllCategoriesAdmin = async ({
  page = 1,
  limit = 20,
  search = "",
  isActive = undefined,
} = {}) => {
  const params = new URLSearchParams();

  params.set("page", page);
  params.set("limit", limit);

  if (search?.trim()) params.set("search", search.trim());

  if (isActive !== undefined && isActive !== "") {
    params.set("isActive", String(isActive));
  }

  return apiClient(`/admin/categories?${params.toString()}`, {
    method: "GET",
  });
};

export const getCategoryByIdAdmin = async (id) => {
  return apiClient(`/admin/categories/${id}`, {
    method: "GET",
  });
};

export const createCategoryAdmin = async (payload) => {
  const isFormData = payload instanceof FormData;

  return apiClient("/admin/categories", {
    method: "POST",
    headers: isFormData ? undefined : { "Content-Type": "application/json" },
    body: isFormData ? payload : JSON.stringify(payload),
  });
};

export const updateCategoryAdmin = async (id, payload) => {
  const isFormData = payload instanceof FormData;

  return apiClient(`/admin/categories/${id}`, {
    method: "PATCH",
    headers: isFormData ? undefined : { "Content-Type": "application/json" },
    body: isFormData ? payload : JSON.stringify(payload),
  });
};

export const toggleCategoryStatusAdmin = async (id, currentStatus) => {
  return updateCategoryAdmin(id, { isActive: !currentStatus });
};

export const deleteCategoryAdmin = async (
  id,
  { force = false, reason = "" } = {}
) => {
  return apiClient(`/admin/categories/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      force,
      reason,
    }),
  });
};

// ==========================================
// 7. AUDIT LOGS
// ==========================================

export const getAdminAuditLogs = async ({
  page = 1,
  limit = 20,
  action = "",
  targetType = "",
} = {}) => {
  const params = new URLSearchParams();

  params.set("page", page);
  params.set("limit", limit);

  if (action) params.set("action", action);
  if (targetType) params.set("targetType", targetType);

  return apiClient(`/admin/logs?${params.toString()}`, {
    method: "GET",
  });
}