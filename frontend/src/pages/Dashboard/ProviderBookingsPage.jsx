//  provider dashboard all booking

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  CalendarDays,
  Clock3,
  Eye,
  IndianRupee,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { toast } from "sonner";
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

  const fetchBookings = async () => {
    try {
      setLoading(true);

      const response = await getProviderBookings(
        page,
        10,
        status
      );

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
          "Failed to load bookings"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [page, status]);

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    setPage(1);
  };

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

  const formatStatus = (status) => {
    if (!status) return "Unknown";

    return status
      .split("-")
      .map(
        (word) =>
          word.charAt(0).toUpperCase() + word.slice(1)
      )
      .join(" ");
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "pending":
        return "bg-amber-50 text-amber-700 border-amber-200";

      case "accepted":
        return "bg-blue-50 text-blue-700 border-blue-200";

      case "in-progress":
        return "bg-purple-50 text-purple-700 border-purple-200";

      case "completed":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";

      case "cancelled":
        return "bg-red-50 text-red-700 border-red-200";

      default:
        return "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat("en-IN").format(
      amount ?? 0
    );
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div>
          <p className="text-sm font-medium text-blue-600">
            Provider Dashboard
          </p>

          <h1 className="mt-1 text-3xl font-bold text-gray-900">
            All Bookings
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Manage and track all bookings for your services.
          </p>
        </div>

        {/* FILTERS */}
        <div className="mt-8 flex flex-wrap gap-2">
          {[
            { label: "All", value: "" },
            { label: "Pending", value: "pending" },
            { label: "Accepted", value: "accepted" },
            { label: "In Progress", value: "in-progress" },
            { label: "Completed", value: "completed" },
            { label: "Cancelled", value: "cancelled" },
          ].map((filter) => (
            <button
              key={filter.value}
              onClick={() =>
                handleStatusChange(filter.value)
              }
              className={`rounded-xl border px-4 py-2 text-sm font-semibold transition ${
                status === filter.value
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* TOTAL */}
        <div className="mt-6 text-sm text-gray-500">
          {pagination.totalBookings} booking
          {pagination.totalBookings !== 1 ? "s" : ""}
        </div>

        {/* BOOKINGS */}
        <div className="mt-4 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          {loading ? (
            <div className="divide-y divide-gray-100">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="animate-pulse p-6"
                >
                  <div className="h-5 w-48 rounded bg-gray-200" />
                  <div className="mt-3 h-4 w-64 rounded bg-gray-200" />
                  <div className="mt-4 h-4 w-40 rounded bg-gray-200" />
                </div>
              ))}
            </div>
          ) : bookings.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-gray-400">
                <CalendarDays size={26} />
              </div>

              <h3 className="mt-4 font-semibold text-gray-900">
                No bookings found
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                There are no bookings matching this filter.
              </p>
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
                    className="flex flex-col gap-5 p-5 transition hover:bg-gray-50 sm:p-6 lg:flex-row lg:items-center lg:justify-between"
                  >
                    {/* LEFT */}
                    <div className="flex min-w-0 items-start gap-4">

                      {/* AVATAR */}
                      {booking.customer?.avatar ? (
                        <img
                          src={booking.customer.avatar}
                          alt={customerName}
                          className="h-12 w-12 shrink-0 rounded-full object-cover"
                        />
                      ) : (
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-50 font-bold text-blue-600">
                          {customerName
                            .charAt(0)
                            .toUpperCase()}
                        </div>
                      )}

                      <div className="min-w-0">
                        {/* CUSTOMER */}
                        <h2 className="font-bold text-gray-900">
                          {customerName}
                        </h2>

                        {/* SERVICE */}
                        <p className="mt-1 text-sm text-gray-500">
                          {booking.service?.title ||
                            "Service Booking"}
                        </p>

                        {/* DATE TIME */}
                        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-gray-500">
                          <span className="flex items-center gap-1.5">
                            <CalendarDays size={14} />
                            {formatDate(
                              booking.bookingDate
                            )}
                          </span>

                          <span className="flex items-center gap-1.5">
                            <Clock3 size={14} />

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

                    {/* RIGHT */}
                    <div className="flex items-center justify-between gap-5 border-t border-gray-100 pt-4 sm:justify-end sm:border-t-0 sm:pt-0">

                      {/* AMOUNT */}
                      <div className="text-right">
                        <p className="text-xs text-gray-400">
                          Amount
                        </p>

                        <div className="mt-1 flex items-center justify-end gap-0.5 font-bold text-gray-900">
                          <IndianRupee size={14} />

                          {formatAmount(
                            booking.totalAmount ??
                              booking.service?.price
                          )}
                        </div>
                      </div>

                      {/* STATUS */}
                      <span
                        className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-semibold ${getStatusStyle(
                          booking.status
                        )}`}
                      >
                        {formatStatus(
                          booking.status
                        )}
                      </span>

                      {/* VIEW */}
                      <Link
                        to={`/bookings/${booking._id}`}
                        className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
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

        {/* PAGINATION */}
        {!loading &&
          pagination.totalPages > 1 && (
            <div className="mt-6 flex items-center justify-between">

              <button
                disabled={page === 1}
                onClick={() =>
                  setPage((prev) => prev - 1)
                }
                className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft size={16} />
                Previous
              </button>

              <span className="text-sm text-gray-500">
                Page {pagination.currentPage} of{" "}
                {pagination.totalPages}
              </span>

              <button
                disabled={
                  page === pagination.totalPages
                }
                onClick={() =>
                  setPage((prev) => prev + 1)
                }
                className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
                <ChevronRight size={16} />
              </button>

            </div>
          )}
      </div>
    </main>
  );
};

export default ProviderBookingsPage;