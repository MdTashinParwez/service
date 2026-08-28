import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  CalendarDays,
  Clock3,
  Eye,
  IndianRupee,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
} from "lucide-react";
import { toast } from "sonner";

import ProviderSidebar from "../../components/provider/ProviderSidebar";
import ProviderNavbar from "../../components/provider/ProviderNavbar";
import { getProviderBookings } from "../../api/booking.api";

const ProviderBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalBookings: 0,
  });

  const [loading, setLoading] = useState(true);

  // =====================================================
  // FETCH BOOKINGS
  // =====================================================
  const fetchBookings = async () => {
    try {
      setLoading(true);

      const response = await getProviderBookings(page, 10, status);
      const data = response.data;

      setBookings(data.bookings || []);

      setPagination({
        currentPage: data.currentPage,
        totalPages: data.totalPages,
        totalBookings: data.totalBookings,
      });
    } catch (error) {
      console.error("Failed to fetch provider bookings:", error);

      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to load bookings"
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // INITIAL / FILTER / PAGINATION FETCH
  // =====================================================
  useEffect(() => {
    fetchBookings();
  }, [page, status]);

  // =====================================================
  // STATUS FILTER
  // =====================================================
  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    setPage(1);
  };

  // =====================================================
  // FORMATTERS
  // =====================================================
  const formatDate = (date) => {
    if (!date) return "Date unavailable";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (time) => {
    if (!time) return "--:--";

    return new Date(time).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatStatus = (bookingStatus) => {
    if (!bookingStatus) return "Unknown";

    return bookingStatus
      .split("-")
      .map(
        (word) =>
          word.charAt(0).toUpperCase() + word.slice(1)
      )
      .join(" ");
  };

  const getStatusStyle = (bookingStatus) => {
    switch (bookingStatus) {
      case "pending":
        return "border-amber-200 bg-amber-50 text-amber-700";

      case "accepted":
        return "border-blue-200 bg-blue-50 text-blue-700";

      case "in-progress":
        return "border-purple-200 bg-purple-50 text-purple-700";

      case "completed":
        return "border-emerald-200 bg-emerald-50 text-emerald-700";

      case "cancelled":
        return "border-red-200 bg-red-50 text-red-700";

      default:
        return "border-gray-200 bg-gray-50 text-gray-600";
    }
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat("en-IN").format(amount ?? 0);
  };

  const filters = [
    { label: "All", value: "" },
    { label: "Pending", value: "pending" },
    { label: "Accepted", value: "accepted" },
    { label: "In Progress", value: "in-progress" },
    { label: "Completed", value: "completed" },
    { label: "Cancelled", value: "cancelled" },
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      {/* =====================================================
          NAVBAR
          ===================================================== */}
      <ProviderNavbar />

      <div className="flex">
        {/* =====================================================
            SIDEBAR
            ===================================================== */}
        <ProviderSidebar />

        {/* =====================================================
            MAIN CONTENT
            ===================================================== */}
        <section className="min-w-0 flex-1 p-5 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">
            {/* =================================================
                HEADER
                ================================================= */}
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-blue-600">
                  Provider Workspace
                </p>

                <h1 className="mt-1 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                  Bookings
                </h1>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
                  Manage and track bookings for the services you offer.
                </p>
              </div>

              {/* Total bookings summary */}
              <div className="flex w-fit items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <ClipboardList size={19} />
                </div>

                <div>
                  <p className="text-xs font-medium text-gray-400">
                    Total bookings
                  </p>

                  <p className="text-lg font-bold leading-5 text-gray-900">
                    {pagination.totalBookings}
                  </p>
                </div>
              </div>
            </div>

            {/* =================================================
                FILTERS
                ================================================= */}
            <div className="mt-8 overflow-x-auto pb-1">
              <div className="flex min-w-max gap-2">
                {filters.map((filter) => {
                  const isActive = status === filter.value;

                  return (
                    <button
                      key={filter.value}
                      type="button"
                      onClick={() =>
                        handleStatusChange(filter.value)
                      }
                      className={`
                        rounded-xl border px-4 py-2.5
                        text-sm font-semibold
                        transition-all duration-200
                        ${
                          isActive
                            ? "border-blue-600 bg-blue-600 text-white shadow-sm"
                            : "border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                        }
                      `}
                    >
                      {filter.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* =================================================
                BOOKINGS CARD
                ================================================= */}
            <div className="mt-5 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              {loading ? (
                <div className="divide-y divide-gray-100">
                  {[1, 2, 3, 4].map((item) => (
                    <div
                      key={item}
                      className="p-5 sm:p-6"
                    >
                      <div className="flex items-start gap-4">
                        <div className="h-12 w-12 shrink-0 animate-pulse rounded-full bg-gray-200" />

                        <div className="min-w-0 flex-1">
                          <div className="h-5 w-40 animate-pulse rounded bg-gray-200" />

                          <div className="mt-3 h-4 w-56 animate-pulse rounded bg-gray-200" />

                          <div className="mt-4 h-3 w-72 max-w-full animate-pulse rounded bg-gray-200" />
                        </div>

                        <div className="hidden h-8 w-24 animate-pulse rounded-lg bg-gray-200 sm:block" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : bookings.length === 0 ? (
                <div className="flex min-h-[360px] items-center justify-center px-6 py-16 text-center">
                  <div className="max-w-sm">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 text-gray-400">
                      <CalendarDays size={28} />
                    </div>

                    <h3 className="mt-5 text-lg font-bold text-gray-900">
                      No bookings found
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-gray-500">
                      There are no bookings matching the selected filter.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {bookings.map((booking) => {
                    const customerName =
                      booking.customer?.username ||
                      "Customer";

                    return (
                      <div
                        key={booking._id}
                        className="
                          group
                          flex flex-col gap-5
                          p-5
                          transition-colors duration-200
                          hover:bg-gray-50/70
                          sm:p-6
                          lg:flex-row lg:items-center lg:justify-between
                        "
                      >
                        {/* =================================================
                            CUSTOMER + BOOKING INFO
                            ================================================= */}
                        <div className="flex min-w-0 items-start gap-4">
                          {/* Avatar */}
                          {booking.customer?.avatar ? (
                            <img
                              src={booking.customer.avatar}
                              alt={customerName}
                              className="
                                h-12 w-12
                                shrink-0
                                rounded-full
                                object-cover
                                ring-2 ring-white
                              "
                            />
                          ) : (
                            <div
                              className="
                                flex h-12 w-12
                                shrink-0
                                items-center justify-center
                                rounded-full
                                bg-blue-50
                                text-sm font-bold
                                text-blue-600
                              "
                            >
                              {customerName
                                .charAt(0)
                                .toUpperCase()}
                            </div>
                          )}

                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <h2 className="truncate font-bold text-gray-900">
                                {customerName}
                              </h2>

                              <span
                                className={`
                                  rounded-full border
                                  px-2.5 py-1
                                  text-[11px] font-semibold
                                  ${getStatusStyle(
                                    booking.status
                                  )}
                                `}
                              >
                                {formatStatus(booking.status)}
                              </span>
                            </div>

                            {/* Service */}
                            <p className="mt-1.5 truncate text-sm font-medium text-gray-600">
                              {booking.service?.title ||
                                "Service Booking"}
                            </p>

                            {/* Date + time */}
                            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-gray-500">
                              <span className="flex items-center gap-1.5">
                                <CalendarDays
                                  size={14}
                                  className="shrink-0 text-gray-400"
                                />

                                {formatDate(
                                  booking.bookingDate
                                )}
                              </span>

                              <span className="flex items-center gap-1.5">
                                <Clock3
                                  size={14}
                                  className="shrink-0 text-gray-400"
                                />

                                {formatTime(
                                  booking.startTime
                                )}

                                {booking.endTime && (
                                  <>
                                    {" - "}
                                    {formatTime(
                                      booking.endTime
                                    )}
                                  </>
                                )}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* =================================================
                            AMOUNT + VIEW
                            ================================================= */}
                        <div
                          className="
                            flex items-center
                            justify-between gap-4
                            border-t border-gray-100
                            pt-4
                            sm:justify-end
                            sm:gap-6
                            sm:border-t-0
                            sm:pt-0
                          "
                        >
                          {/* Amount */}
                          <div className="text-left sm:text-right">
                            <p className="text-xs font-medium text-gray-400">
                              Amount
                            </p>

                            <div className="mt-1 flex items-center gap-0.5 text-base font-bold text-gray-900 sm:justify-end">
                              <IndianRupee size={14} />

                              {formatAmount(
                                booking.totalAmount ??
                                  booking.service?.price
                              )}
                            </div>
                          </div>

                          {/* View */}
                          <Link
                            to={`/bookings/${booking._id}`}
                            className="
                              inline-flex
                              items-center
                              gap-1.5
                              rounded-xl
                              border border-gray-200
                              bg-white
                              px-3.5 py-2.5
                              text-sm font-semibold
                              text-gray-700
                              shadow-sm
                              transition-all duration-200
                              hover:border-blue-200
                              hover:bg-blue-50
                              hover:text-blue-600
                            "
                          >
                            <Eye size={16} />
                            <span>View</span>
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* =================================================
                PAGINATION
                ================================================= */}
            {!loading && pagination.totalPages > 1 && (
              <div
                className="
                  mt-6
                  flex flex-col gap-3
                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                "
              >
                <button
                  type="button"
                  disabled={page === 1}
                  onClick={() =>
                    setPage((prev) => prev - 1)
                  }
                  className="
                    inline-flex items-center justify-center gap-2
                    rounded-xl
                    border border-gray-200
                    bg-white
                    px-4 py-2.5
                    text-sm font-semibold text-gray-700
                    shadow-sm
                    transition
                    hover:bg-gray-50
                    disabled:cursor-not-allowed
                    disabled:opacity-40
                  "
                >
                  <ChevronLeft size={16} />
                  Previous
                </button>

                <span className="text-center text-sm text-gray-500">
                  Page{" "}
                  <span className="font-semibold text-gray-900">
                    {pagination.currentPage}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-gray-900">
                    {pagination.totalPages}
                  </span>
                </span>

                <button
                  type="button"
                  disabled={
                    page === pagination.totalPages
                  }
                  onClick={() =>
                    setPage((prev) => prev + 1)
                  }
                  className="
                    inline-flex items-center justify-center gap-2
                    rounded-xl
                    border border-gray-200
                    bg-white
                    px-4 py-2.5
                    text-sm font-semibold text-gray-700
                    shadow-sm
                    transition
                    hover:bg-gray-50
                    disabled:cursor-not-allowed
                    disabled:opacity-40
                  "
                >
                  Next
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default ProviderBookingsPage;
