import { apiClient } from "./apiClient";

export const createPayment = async (bookingId) => {
  return apiClient("/payment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      bookingId,
      paymentMethod: "razorpay",
    }),
  });
};

export const verifyPayment = async (
  paymentId,
  paymentData
) => {
  return apiClient(`/payment/${paymentId}/verify`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(paymentData),
  });
}

export const markPaymentFailed = async (
  paymentId,
  paymentData
) => {
  return apiClient(`/payment/${paymentId}/failed`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(paymentData),
  });
};