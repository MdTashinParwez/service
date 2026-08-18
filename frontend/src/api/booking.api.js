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

export const getBookingById = async (bookingId) => {
  return await apiClient(`/booking/${bookingId}`, {
    method: "GET",
  });
};