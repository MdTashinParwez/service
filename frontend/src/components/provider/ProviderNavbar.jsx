import { useEffect, useState } from "react";
import {
  Bell,
  BellRing,
  CheckCheck,
  ChevronDown,
  Clock3,
  Loader2,
  Menu,
} from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

import {
  getMyNotifications,
  markNotificationAsRead,
} from "../../api/notification.api";

const ProviderNavbar = () => {
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [notificationLoading, setNotificationLoading] = useState(false);
  const [markingId, setMarkingId] = useState(null);

  // =====================================================
  // MOBILE SIDEBAR
  // =====================================================

  const handleOpenMobileMenu = () => {
    window.dispatchEvent(
      new Event("provider:open-sidebar")
    );
  };

  // =====================================================
  // FETCH RECENT NOTIFICATIONS
  // =====================================================

  const fetchRecentNotifications = async () => {
    try {
      setNotificationLoading(true);

      const response = await getMyNotifications(1, 5);

      setNotifications(
        response?.data?.notifications || []
      );
    } catch (error) {
      console.error(
        "Failed to fetch recent notifications:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to load notifications."
      );
    } finally {
      setNotificationLoading(false);
    }
  };

  // =====================================================
  // NOTIFICATION TOGGLE
  // =====================================================

  const handleNotificationClick = () => {
    setNotificationOpen((prev) => {
      const nextState = !prev;

      if (nextState) {
        fetchRecentNotifications();
      }

      return nextState;
    });
  };

  // =====================================================
  // MARK SINGLE NOTIFICATION AS READ
  // =====================================================

  const handleMarkAsRead = async (notification) => {
    if (!notification?._id || notification.isRead) {
      return;
    }

    try {
      setMarkingId(notification._id);

      await markNotificationAsRead(notification._id);

      setNotifications((prev) =>
        prev.map((item) =>
          item._id === notification._id
            ? {
                ...item,
                isRead: true,
              }
            : item
        )
      );
    } catch (error) {
      console.error(
        "Failed to mark notification as read:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to update notification."
      );
    } finally {
      setMarkingId(null);
    }
  };

  // =====================================================
  // CLOSE POPOVER ON OUTSIDE CLICK
  // =====================================================

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        !event.target.closest(
          "[data-provider-notification]"
        )
      ) {
        setNotificationOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  // =====================================================
  // HELPERS
  // =====================================================

  const unreadCount = notifications.filter(
    (notification) => !notification.isRead
  ).length;

  const formatTime = (date) => {
    if (!date) return "";

    const notificationDate = new Date(date);

    if (Number.isNaN(notificationDate.getTime())) {
      return "";
    }

    const difference =
      Date.now() - notificationDate.getTime();

    const minutes = Math.floor(
      difference / (1000 * 60)
    );

    const hours = Math.floor(
      difference / (1000 * 60 * 60)
    );

    const days = Math.floor(
      difference / (1000 * 60 * 60 * 24)
    );

    if (minutes < 1) return "Just now";

    if (minutes < 60) {
      return `${minutes}m ago`;
    }

    if (hours < 24) {
      return `${hours}h ago`;
    }

    if (days < 7) {
      return `${days}d ago`;
    }

    return notificationDate.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  return (
    <header
      className="
        sticky
        top-0
        z-50
        border-b
        border-gray-200
        bg-white/95
        backdrop-blur-md
      "
    >
      <div
        className="
          flex
          h-[73px]
          items-center
          justify-between
          px-5
          sm:px-6
          lg:px-8
        "
      >
        {/* =================================================
            LEFT
        ================================================= */}

        <div className="flex items-center gap-3">
          {/* Mobile Menu */}
          <button
            type="button"
            onClick={handleOpenMobileMenu}
            aria-label="Open navigation menu"
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              text-gray-600
              transition
              hover:bg-gray-100
              hover:text-gray-900
              lg:hidden
            "
          >
            <Menu size={22} />
          </button>

          {/* Brand */}
          <div>
            <h2 className="text-lg font-bold tracking-tight text-gray-900">
              Provider Panel
            </h2>

            <p className="hidden text-xs text-gray-500 sm:block">
              Manage your services & bookings
            </p>
          </div>
        </div>

        {/* =================================================
            RIGHT
        ================================================= */}

        <div className="flex items-center gap-2 sm:gap-3">
          {/* =================================================
              NOTIFICATIONS
          ================================================= */}

          <div
            className="relative"
            data-provider-notification
          >
            <button
              type="button"
              onClick={handleNotificationClick}
              aria-label="Notifications"
              aria-expanded={notificationOpen}
              className="
                relative
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                text-gray-600
                transition
                hover:bg-gray-100
                hover:text-gray-900
              "
            >
              {notificationOpen ? (
                <BellRing size={20} />
              ) : (
                <Bell size={20} />
              )}

              {unreadCount > 0 && (
                <span
                  className="
                    absolute
                    right-1.5
                    top-1.5
                    h-2.5
                    w-2.5
                    rounded-full
                    bg-red-500
                    ring-2
                    ring-white
                  "
                />
              )}
            </button>

            {/* Notification Popover */}
            {notificationOpen && (
              <div
                className="
                  absolute
                  right-0
                  top-12
                  z-[100]
                  w-[340px]
                  overflow-hidden
                  rounded-2xl
                  border
                  border-gray-200
                  bg-white
                  shadow-2xl
                  sm:w-[380px]
                "
              >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-100 px-4 py-4">
                  <div>
                    <h3 className="text-sm font-bold text-gray-900">
                      Notifications
                    </h3>

                    <p className="mt-0.5 text-xs text-gray-500">
                      Your latest activity
                    </p>
                  </div>

                  {unreadCount > 0 && (
                    <span className="rounded-full bg-gray-900 px-2.5 py-1 text-[11px] font-bold text-white">
                      {unreadCount} new
                    </span>
                  )}
                </div>

                {/* Body */}
                {notificationLoading ? (
                  <div className="flex items-center justify-center px-6 py-12">
                    <div className="text-center">
                      <Loader2
                        size={24}
                        className="mx-auto animate-spin text-gray-400"
                      />

                      <p className="mt-3 text-xs text-gray-500">
                        Loading notifications...
                      </p>
                    </div>
                  </div>
                ) : notifications.length === 0 ? (
                  <div className="px-6 py-11 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gray-50 text-gray-400">
                      <Bell size={21} />
                    </div>

                    <h4 className="mt-3 text-sm font-bold text-gray-800">
                      No notifications yet
                    </h4>

                    <p className="mt-1 text-xs leading-5 text-gray-500">
                      New booking and account updates will appear
                      here.
                    </p>
                  </div>
                ) : (
                  <div className="max-h-[360px] overflow-y-auto">
                    {notifications.map((notification) => {
                      const isUnread =
                        !notification.isRead;

                      const isMarking =
                        markingId === notification._id;

                      return (
                        <div
                          key={notification._id}
                          className={`
                            border-b
                            border-gray-100
                            px-4
                            py-4
                            last:border-b-0
                            transition
                            hover:bg-gray-50
                            ${
                              isUnread
                                ? "bg-gray-50/70"
                                : "bg-white"
                            }
                          `}
                        >
                          <div className="flex items-start gap-3">
                            {/* Icon */}
                            <div
                              className={`
                                flex
                                h-9
                                w-9
                                shrink-0
                                items-center
                                justify-center
                                rounded-xl
                                ${
                                  isUnread
                                    ? "bg-gray-900 text-white"
                                    : "bg-gray-100 text-gray-500"
                                }
                              `}
                            >
                              {isUnread ? (
                                <BellRing size={16} />
                              ) : (
                                <Bell size={16} />
                              )}
                            </div>

                            {/* Content */}
                            <div className="min-w-0 flex-1">
                              <div className="flex items-start justify-between gap-3">
                                <div className="min-w-0">
                                  <div className="flex items-center gap-2">
                                    <h4
                                      className={`
                                        truncate
                                        text-xs
                                        ${
                                          isUnread
                                            ? "font-bold text-gray-900"
                                            : "font-semibold text-gray-700"
                                        }
                                      `}
                                    >
                                      {notification.title ||
                                        "Notification"}
                                    </h4>

                                    {isUnread && (
                                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                                    )}
                                  </div>

                                  <p className="mt-1 line-clamp-2 text-xs leading-5 text-gray-500">
                                    {notification.message ||
                                      "You have a new notification."}
                                  </p>
                                </div>

                                <span className="flex shrink-0 items-center gap-1 text-[10px] text-gray-400">
                                  <Clock3 size={10} />
                                  {formatTime(
                                    notification.createdAt
                                  )}
                                </span>
                              </div>

                              {/* Footer */}
                              <div className="mt-2 flex items-center gap-2">
                                {notification.type && (
                                  <span className="rounded-full border border-gray-200 bg-white px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-gray-400">
                                    {notification.type.replaceAll(
                                      "_",
                                      " "
                                    )}
                                  </span>
                                )}

                                {notification.sender?.username && (
                                  <span className="truncate text-[10px] text-gray-400">
                                    From @
                                    {
                                      notification.sender
                                        .username
                                    }
                                  </span>
                                )}

                                {isUnread && (
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleMarkAsRead(
                                        notification
                                      )
                                    }
                                    disabled={isMarking}
                                    className="
                                      ml-auto
                                      inline-flex
                                      items-center
                                      gap-1
                                      text-[10px]
                                      font-semibold
                                      text-gray-600
                                      hover:text-gray-900
                                      disabled:opacity-50
                                    "
                                  >
                                    {isMarking ? (
                                      <Loader2
                                        size={10}
                                        className="animate-spin"
                                      />
                                    ) : (
                                      <CheckCheck size={10} />
                                    )}

                                    Mark read
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Footer */}
                <div className="border-t border-gray-100 bg-gray-50/70 p-2">
                  <Link
                    to="/provider/notifications"
                    onClick={() =>
                      setNotificationOpen(false)
                    }
                    className="
                      flex
                      w-full
                      items-center
                      justify-center
                      rounded-xl
                      px-3
                      py-2.5
                      text-xs
                      font-bold
                      text-gray-700
                      transition
                      hover:bg-white
                      hover:text-gray-900
                    "
                  >
                    View all notifications
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="hidden h-8 w-px bg-gray-200 sm:block" />

          {/* =================================================
             
          ================================================= */}

          <div className="flex items-center gap-2 rounded-xl px-2 py-1.5 sm:gap-3">
            <div
              className="
               flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-blue-100
                text-sm
                font-bold
                text-blue-600
              "
            >
              P
            </div>

            <div className="hidden text-left sm:block">
              <p className="text-sm font-semibold text-gray-900">
                Provider
              </p>

              <p className="text-xs text-gray-500">
                Provider Account
              </p>
            </div>

            <ChevronDown
              size={17}
              className="hidden text-gray-400 sm:block"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default ProviderNavbar;