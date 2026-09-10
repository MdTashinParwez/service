import { createContext, useContext, useEffect, useState } from "react";
import socket from "../socket";
import { useAuth } from "./AuthContext";

const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!user) return;

    const handleBookingAccepted = (data) => {
      console.log("Notification:", data);

      setNotifications((prev) => [
        {
          id: Date.now(),
          type: "booking-accepted",
          message: data.message,
          bookingId: data.bookingId,
        },
        ...prev,
      ]);
    };

    const handleBookingRejected = (data) => {
      console.log("Notification:", data);

      setNotifications((prev) => [
        {
          id: Date.now(),
          type: "booking-rejected",
          message: data.message,
          bookingId: data.bookingId,
        },
        ...prev,
      ]);
    };

    const handleBookingCancelled = (data) => {
      console.log("Notification:", data);

      setNotifications((prev) => [
        {
          id: Date.now(),
          type: "booking-cancelled",
          message: data.message,
          bookingId: data.bookingId,
        },
        ...prev,
      ]);
    };

  const handleBookingCompleted = (data) => {
  console.log("Notification:", data);

  setNotifications((prev) => [
    {
      id: Date.now(),
      type: "booking-completed",
      message: data.message,
      bookingId: data.bookingId,
    },
    ...prev,
  ]);
};

    socket.on("booking-accepted", handleBookingAccepted);
    socket.on("booking-rejected", handleBookingRejected);
    socket.on("booking-cancelled", handleBookingCancelled);
    socket.on("booking-completed", handleBookingCompleted);
    return () => {
      socket.off("booking-accepted", handleBookingAccepted);
      socket.off("booking-rejected", handleBookingRejected);
      socket.off("booking-cancelled", handleBookingCancelled);
      socket.off("booking-completed", handleBookingCompleted);
    };
  }, [user]);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        setNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  return useContext(NotificationContext);
};