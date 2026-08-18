import { apiClient } from "./apiClient";

export const createBooking = async (bookingData) => {
  return await apiClient("/booking", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookingData),
  });
};

export const getMyBookings = async (page = 1, limit = 10) => {
  return await apiClient(
    `/booking/my-bookings?page=${page}&limit=${limit}`,
    {
      method: "GET",
    }
  );
};

export const getBookingById = async (bookingId) => {
  return await apiClient(`/booking/${bookingId}`, {
    method: "GET",
  });
};

export const cancelBooking = async (bookingId, cancellationReason) => {
  return await apiClient(`/booking/${bookingId}/cancel`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      cancellationReason,
    }),
  });
};

