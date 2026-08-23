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


// provider Booking
export const getProviderBookings = async (
  page = 1,
  limit = 5,
  status = ""
) => {
  const params = new URLSearchParams({
    page,
    limit,
  });

  if (status) {
    params.append("status", status);
  }

  return apiClient(`/booking/provider?${params.toString()}`, {
    method: "GET",
  });
};

// provider actions;


export const acceptBooking = async (bookingId) => {
  return await apiClient(`/booking/${bookingId}/accept`, {
    method: "PATCH",
  });
};

export const rejectBooking = async (
  bookingId,
  rejectionReason = ""
) => {
  return await apiClient(`/booking/${bookingId}/reject`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      rejectionReason,
    }),
  });
};

export const startBooking = async (bookingId) => {
  return await apiClient(`/booking/${bookingId}/start`, {
    method: "PATCH",
  });
};

export const completeBooking = async (bookingId) => {
  return await apiClient(`/booking/${bookingId}/complete`, {
    method: "PATCH",
  });
};