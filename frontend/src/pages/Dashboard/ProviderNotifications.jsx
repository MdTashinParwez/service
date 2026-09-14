import { useState } from "react";

import {
  Bell,
  BellRing,
  Check,
  CheckCheck,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Loader2,
  RefreshCw,
} from "lucide-react";

import { toast } from "sonner";

import ProviderNavbar from "../../components/provider/ProviderNavbar";
import ProviderSidebar from "../../components/provider/ProviderSidebar";
import { useNotifications } from "../../context/NotificationContext";

const ProviderNotifications = () => {
  const {
    notifications,
    loading,
    pagination,
    unreadCount,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
  } = useNotifications();

  const [page, setPage] = useState(1);
  const [markingAll, setMarkingAll] = useState(false);
  const [markingId, setMarkingId] = useState(null);
  const [error, setError] = useState("");

  // =====================================================
  // FETCH / REFRESH
  // =====================================================

  const handleRefresh = async () => {
    try {
      setError("");
      await fetchNotifications(page, 10);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);

      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to load notifications.";

      setError(message);
      toast.error(message);
    }
  };

  // =====================================================
  // MARK SINGLE AS READ
  // =====================================================

  const handleMarkAsRead = async (notification) => {
    if (!notification?._id || notification.isRead) return;

    try {
      setMarkingId(notification._id);

      await markAsRead(notification._id);

      toast.success("Notification marked as read.");
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
  // MARK ALL AS READ
  // =====================================================

  const handleMarkAllAsRead = async () => {
    if (unreadCount === 0) {
      toast.info("All notifications are already read.");
      return;
    }

    try {
      setMarkingAll(true);

      await markAllAsRead();

      toast.success("All notifications marked as read.");
    } catch (error) {
      console.error(
        "Failed to mark all notifications as read:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to update notifications."
      );
    } finally {
      setMarkingAll(false);
    }
  };

  // =====================================================
  // PAGE CHANGE
  // =====================================================

  const handlePageChange = async (nextPage) => {
    try {
      setError("");
      setPage(nextPage);

      await fetchNotifications(nextPage, 10);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);

      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to load notifications.";

      setError(message);
      toast.error(message);
    }
  };

  // =====================================================
  // TIME FORMAT
  // =====================================================

  const formatTime = (date) => {
    if (!date) return "";

    const notificationDate = new Date(date);

    if (Number.isNaN(notificationDate.getTime())) {
      return "";
    }

    const now = new Date();

    const difference =
      now.getTime() - notificationDate.getTime();

    const minutes = Math.floor(
      difference / (1000 * 60)
    );

    const hours = Math.floor(
      difference / (1000 * 60 * 60)
    );

    const days = Math.floor(
      difference / (1000 * 60 * 60 * 24)
    );

    if (minutes < 1) {
      return "Just now";
    }

    if (minutes < 60) {
      return `${minutes}m ago`;
    }

    if (hours < 24) {
      return `${hours}h ago`;
    }

    if (days < 7) {
      return `${days}d ago`;
    }

    return notificationDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading && notifications.length === 0) {
    return (
      <main className="min-h-screen bg-gray-50">
        <ProviderNavbar />

        <div className="flex">
          <ProviderSidebar />

          <section className="flex min-h-[calc(100vh-73px)] flex-1 items-center justify-center px-6">
            <div className="w-full max-w-sm rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-50">
                <Loader2
                  size={27}
                  className="animate-spin text-gray-500"
                />
              </div>

              <h1 className="mt-5 text-lg font-bold text-gray-900">
                Loading notifications
              </h1>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Checking your latest provider activity.
              </p>
            </div>
          </section>
        </div>
      </main>
    );
  }

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <main className="min-h-screen bg-gray-50">
      <ProviderNavbar />

      <div className="flex">
        <ProviderSidebar />

        <section className="min-w-0 flex-1">
          <div className="mx-auto w-full max-w-[1100px] p-5 sm:p-6 lg:p-8">

            {/* =================================================
                PAGE HEADER
            ================================================= */}

            <div className="mb-7">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-blue-600">
                    Provider Workspace
                  </p>

                  <div className="mt-1 flex items-center gap-3">
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                      Notifications
                    </h1>

                    {unreadCount > 0 && (
                      <span className="inline-flex min-w-7 items-center justify-center rounded-full bg-gray-900 px-2 py-1 text-xs font-bold text-white">
                        {unreadCount}
                      </span>
                    )}
                  </div>

                  <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
                    Stay updated on your bookings and provider activity.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={handleRefresh}
                    disabled={loading}
                    className="
                      inline-flex items-center justify-center gap-2
                      rounded-xl border border-gray-200
                      bg-white px-4 py-2.5
                      text-sm font-semibold text-gray-700
                      shadow-sm transition
                      hover:bg-gray-50
                      disabled:cursor-not-allowed
                      disabled:opacity-50
                    "
                  >
                    <RefreshCw
                      size={16}
                      className={loading ? "animate-spin" : ""}
                    />

                    Refresh
                  </button>

                  <button
                    type="button"
                    onClick={handleMarkAllAsRead}
                    disabled={
                      markingAll || unreadCount === 0
                    }
                    className="
                      inline-flex items-center justify-center gap-2
                      rounded-xl bg-gray-900 px-4 py-2.5
                      text-sm font-semibold text-white
                      shadow-sm transition
                      hover:bg-gray-800
                      disabled:cursor-not-allowed
                      disabled:opacity-40
                    "
                  >
                    {markingAll ? (
                      <Loader2
                        size={16}
                        className="animate-spin"
                      />
                    ) : (
                      <CheckCheck size={16} />
                    )}

                    {markingAll
                      ? "Updating..."
                      : "Mark all as read"}
                  </button>
                </div>
              </div>
            </div>

            {/* =================================================
                ERROR
            ================================================= */}

            {error && (
              <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-bold text-red-800">
                      Unable to load notifications
                    </p>

                    <p className="mt-1 text-sm leading-6 text-red-600">
                      {error}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleRefresh}
                    className="
                      inline-flex items-center justify-center gap-2
                      rounded-xl bg-white px-4 py-2.5
                      text-sm font-semibold text-red-700
                      shadow-sm ring-1 ring-red-200
                      transition hover:bg-red-50
                    "
                  >
                    <RefreshCw size={16} />
                    Retry
                  </button>
                </div>
              </div>
            )}

            {/* =================================================
                NOTIFICATION LIST
            ================================================= */}

            {!error && notifications.length > 0 && (
              <section className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">

                {/* List Header */}

                <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4 sm:px-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-50 text-gray-600">
                      <Bell size={19} />
                    </div>

                    <div>
                      <h2 className="font-bold text-gray-900">
                        Recent Activity
                      </h2>

                      <p className="text-xs text-gray-500">
                        {pagination?.totalNotifications || 0}{" "}
                        {pagination?.totalNotifications === 1
                          ? "notification"
                          : "notifications"}
                      </p>
                    </div>
                  </div>

                  {unreadCount > 0 && (
                    <span className="text-xs font-semibold text-gray-500">
                      {unreadCount} unread
                    </span>
                  )}
                </div>

                {/* Notifications */}

                <div className="divide-y divide-gray-100">
                  {notifications.map((notification) => {
                    const isUnread = !notification.isRead;

                    const isMarking =
                      markingId === notification._id;

                    return (
                      <article
                        key={notification._id}
                        className={`
                          relative px-5 py-5 transition
                          sm:px-6
                          ${
                            isUnread
                              ? "bg-gray-50/70"
                              : "bg-white"
                          }
                          hover:bg-gray-50
                        `}
                      >
                        <div className="flex items-start gap-4">

                          {/* Notification Icon */}

                          <div
                            className={`
                              flex h-11 w-11 shrink-0
                              items-center justify-center
                              rounded-xl
                              ${
                                isUnread
                                  ? "bg-gray-900 text-white"
                                  : "bg-gray-100 text-gray-500"
                              }
                            `}
                          >
                            {isUnread ? (
                              <BellRing size={19} />
                            ) : (
                              <Bell size={19} />
                            )}
                          </div>

                          {/* Notification Content */}

                          <div className="min-w-0 flex-1">
                            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-5">

                              <div className="min-w-0">
                                <div className="flex items-center gap-2">
                                  <h3
                                    className={`
                                      text-sm
                                      ${
                                        isUnread
                                          ? "font-bold text-gray-900"
                                          : "font-semibold text-gray-700"
                                      }
                                    `}
                                  >
                                    {notification.title ||
                                      "Notification"}
                                  </h3>

                                  {isUnread && (
                                    <span className="h-2 w-2 shrink-0 rounded-full bg-blue-600" />
                                  )}
                                </div>

                                <p className="mt-1 text-sm leading-6 text-gray-500">
                                  {notification.message ||
                                    "You have a new notification."}
                                </p>
                              </div>

                              {/* Time */}

                              <div className="flex shrink-0 items-center gap-1.5 text-xs text-gray-400">
                                <Clock3 size={13} />

                                {formatTime(
                                  notification.createdAt
                                )}
                              </div>
                            </div>

                            {/* Footer */}

                            <div className="mt-4 flex flex-wrap items-center gap-3">

                              {/* Notification Type */}

                              {notification.type && (
                                <span className="rounded-full border border-gray-200 bg-white px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                                  {notification.type.replaceAll(
                                    "_",
                                    " "
                                  )}
                                </span>
                              )}

                              {/* Sender */}

                              {notification.sender?.username && (
                                <span className="text-xs text-gray-400">
                                  From @
                                  {
                                    notification.sender.username
                                  }
                                </span>
                              )}

                              {/* Mark Read */}

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
                                    ml-auto inline-flex
                                    items-center gap-1.5
                                    rounded-lg
                                    px-2.5 py-1.5
                                    text-xs font-semibold
                                    text-gray-600
                                    transition
                                    hover:bg-white
                                    hover:text-gray-900
                                    disabled:cursor-not-allowed
                                    disabled:opacity-50
                                  "
                                >
                                  {isMarking ? (
                                    <Loader2
                                      size={13}
                                      className="animate-spin"
                                    />
                                  ) : (
                                    <Check size={13} />
                                  )}

                                  {isMarking
                                    ? "Updating..."
                                    : "Mark as read"}
                                </button>
                              )}

                              {/* Read State */}

                              {!isUnread && (
                                <span className="ml-auto inline-flex items-center gap-1.5 text-xs font-medium text-gray-400">
                                  <CheckCheck size={13} />
                                  Read
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
            )}

            {/* =================================================
                EMPTY STATE
            ================================================= */}

            {!error && notifications.length === 0 && (
              <section className="rounded-3xl border border-gray-200 bg-white px-6 py-16 text-center shadow-sm">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-50 text-gray-400">
                  <Bell size={29} />
                </div>

                <h2 className="mt-5 text-xl font-bold text-gray-900">
                  You're all caught up
                </h2>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                  New updates about your bookings and provider
                  activity will appear here.
                </p>

                <button
                  type="button"
                  onClick={handleRefresh}
                  className="
                    mt-6 inline-flex items-center gap-2
                    rounded-xl border border-gray-200
                    bg-white px-4 py-2.5
                    text-sm font-semibold text-gray-700
                    shadow-sm transition
                    hover:bg-gray-50
                  "
                >
                  <RefreshCw size={16} />
                  Refresh
                </button>
              </section>
            )}

            {/* =================================================
                PAGINATION
            ================================================= */}

            {!error && pagination?.totalPages > 1 && (
              <div className="mt-6 flex items-center justify-center gap-3">
                <button
                  type="button"
                  disabled={page === 1 || loading}
                  onClick={() =>
                    handlePageChange(page - 1)
                  }
                  className="
                    inline-flex items-center gap-1
                    rounded-xl border border-gray-200
                    bg-white px-4 py-2.5
                    text-sm font-semibold text-gray-700
                    shadow-sm transition
                    hover:bg-gray-50
                    disabled:cursor-not-allowed
                    disabled:opacity-40
                  "
                >
                  <ChevronLeft size={17} />
                  Previous
                </button>

                <span className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm">
                  {pagination.currentPage} /{" "}
                  {pagination.totalPages}
                </span>

                <button
                  type="button"
                  disabled={
                    page === pagination.totalPages ||
                    loading
                  }
                  onClick={() =>
                    handlePageChange(page + 1)
                  }
                  className="
                    inline-flex items-center gap-1
                    rounded-xl border border-gray-200
                    bg-white px-4 py-2.5
                    text-sm font-semibold text-gray-700
                    shadow-sm transition
                    hover:bg-gray-50
                    disabled:cursor-not-allowed
                    disabled:opacity-40
                  "
                >
                  Next
                  <ChevronRight size={17} />
                </button>
              </div>
            )}

            <div className="h-8" />
          </div>
        </section>
      </div>
    </main>
  );
};

export default ProviderNotifications;
