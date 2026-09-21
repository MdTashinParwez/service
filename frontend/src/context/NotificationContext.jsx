import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";
import socket from "../socket";
import { useAuth } from "./AuthContext";

import {
  getMyNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} from "../api/notification.api";

const NotificationContext = createContext(null);

const showNotificationToast = (type, message) => {
  const config = {
    "booking-created": {
      icon: "📋",
      title: "New Booking Request",
    },
    "booking-accepted": {
      icon: "✓",
      title: "Booking Accepted",
    },
    "booking-rejected": {
      icon: "✕",
      title: "Booking Rejected",
    },
    "booking-cancelled": {
      icon: "!",
      title: "Booking Cancelled",
    },
    "booking-completed": {
      icon: "✓",
      title: "Booking Completed",
    },
  };

  const { icon, title } = config[type] || {
    icon: "🔔",
    title: "New Notification",
  };

  toast.custom(
    (t) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } w-[360px] max-w-[90vw] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-900`}
      >
        <div className="flex items-start gap-3 p-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100 text-lg dark:bg-gray-800">
            {icon}
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              {title}
            </p>

            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              {message}
            </p>
          </div>

          <button
            onClick={() => toast.dismiss(t.id)}
            className="text-gray-400 transition hover:text-gray-700 dark:hover:text-gray-200"
          >
            ✕
          </button>
        </div>
      </div>
    ),
    {
      duration: 5000,
      position: "top-right",
    }
  );
};

export const NotificationProvider = ({ children }) => {
  const { user } = useAuth();

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState(null);

  // GET NOTIFICATIONS

const fetchNotifications = useCallback(
  async (page = 1, limit = 10) => {
    try {
      setLoading(true);

      const response = await getMyNotifications(page, limit);

      const data = response?.data;

      setNotifications(data?.notifications || []);

      setPagination({
        currentPage: data?.currentPage || 1,
        totalPages: data?.totalPages || 1,
        totalNotifications:
          data?.totalNotifications || 0,
      });

      return data;
    } catch (error) {
      console.error(
        "Failed to fetch notifications:",
        error
      );
      throw error;
    } finally {
      setLoading(false);
    }
  },
  []
)


  // MARK ONE AS READ
  const markAsRead = useCallback(async (id) => {
    try {
      await markNotificationAsRead(id);

      setNotifications((prev) =>
        prev.map((notification) =>
          notification._id === id
            ? { ...notification, isRead: true }
            : notification
        )
      );
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
      throw error;
    }
  }, []);

  // -----------------------------
  // MARK ALL AS READ
  // -----------------------------
  const markAllAsRead = useCallback(async () => {
    try {
      await markAllNotificationsAsRead();

      setNotifications((prev) =>
        prev.map((notification) => ({
          ...notification,
          isRead: true,
        }))
      );
    } catch (error) {
      console.error("Failed to mark all notifications as read:", error);
      throw error;
    }
  }, []);

  // -----------------------------
  // INITIAL FETCH
  // -----------------------------
  useEffect(() => {
    if (!user) {
      setNotifications([]);
      setPagination(null);
      return;
    }

    fetchNotifications(1, 10);
  }, [user, fetchNotifications]);

  // -----------------------------
  // SOCKET NOTIFICATIONS
  // -----------------------------
  useEffect(() => {
    if (!user) return;

    const handleNotification = async (type, data) => {
      console.log("Socket Notification:", data);

      // Show real-time toast
      showNotificationToast(type, data.message);

      // Refresh persistent notifications from DB
      try {
        await fetchNotifications(1, 10);
      } catch (error) {
        console.error(
          "Failed to refresh notifications after socket event:",
          error
        );
      }
    };

    const handleBookingCreated = (data) =>
      handleNotification("booking-created", data);

    const handleBookingAccepted = (data) =>
      handleNotification("booking-accepted", data);

    const handleBookingRejected = (data) =>
      handleNotification("booking-rejected", data);

    const handleBookingCancelled = (data) =>
      handleNotification("booking-cancelled", data);

    const handleBookingCompleted = (data) =>
      handleNotification("booking-completed", data);

    socket.on("booking-created", handleBookingCreated);
    socket.on("booking-accepted", handleBookingAccepted);
    socket.on("booking-rejected", handleBookingRejected);
    socket.on("booking-cancelled", handleBookingCancelled);
    socket.on("booking-completed", handleBookingCompleted);

    return () => {
      socket.off("booking-created", handleBookingCreated);
      socket.off("booking-accepted", handleBookingAccepted);
      socket.off("booking-rejected", handleBookingRejected);
      socket.off("booking-cancelled", handleBookingCancelled);
      socket.off("booking-completed", handleBookingCompleted);
    };
  }, [user, fetchNotifications]);

  const unreadCount = notifications.filter(
    (notification) => !notification.isRead
  ).length;

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        setNotifications,

        loading,
        pagination,
        unreadCount,

        fetchNotifications,
        markAsRead,
        markAllAsRead,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  return useContext(NotificationContext);
}
