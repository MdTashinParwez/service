import { apiClient } from "./apiClient";

export const getMyNotifications = async (page = 1, limit = 10) => {
  return apiClient(
    `/notifications?page=${page}&limit=${limit}`,
    {
      method: "GET",
    }
  );
};

export const getNotificationById = async (id) => {
  return apiClient(`/notifications/${id}`, {
    method: "GET",
  });
};

export const markNotificationAsRead = async (id) => {
  return apiClient(`/notifications/${id}/read`, {
    method: "PATCH",
  });
};

export const markAllNotificationsAsRead = async () => {
  return apiClient("/notifications/read-all", {
    method: "PATCH",
  });
};