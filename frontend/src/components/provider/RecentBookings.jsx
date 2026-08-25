import {
  CalendarDays,
  Clock3,
  ArrowRight,
  IndianRupee,
  Eye,
  BriefcaseBusiness,
} from "lucide-react";

import { useNavigate, Link } from "react-router-dom";

const RecentBookings = ({ bookings = [] }) => {
  const navigate = useNavigate();

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
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

  const getCustomerName = (customer) => {
    return customer?.username || "Customer";
  };

  const getInitial = (customer) => {
    return getCustomerName(customer)
      .charAt(0)
      .toUpperCase();
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat("en-IN").format(
      amount ?? 0
    );
  };

  return (
    <section className="mt-8 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

      {/* HEADER */}
      <div className="flex items-center justify-between border-b border-gray-100 px-5 py-5 sm:px-6">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-gray-900">
            Recent Bookings
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Your latest customer bookings and their status.
          </p>
        </div>

        <Link
          to="/provider/bookings"
          className="hidden items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-50 sm:flex"
        >
          View all
          <ArrowRight size={16} />
        </Link>
      </div>

      {/* BOOKINGS */}
      {bookings.length === 0 ? (
        <div className="px-6 py-16 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-gray-400">
            <CalendarDays size={25} />
          </div>

          <h3 className="mt-4 font-semibold text-gray-900">
            No bookings yet
          </h3>

          <p className="mx-auto mt-1 max-w-sm text-sm leading-6 text-gray-500">
            Your recent customer bookings will appear here
            once someone books one of your services.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-gray-100">
          {bookings.map((booking) => {
            const customerName = getCustomerName(
              booking.customer
            );

            return (
              <div
                key={booking._id}
                className="group px-5 py-5 transition hover:bg-gray-50/70 sm:px-6"
              >
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                  {/* LEFT */}
                  <div className="flex min-w-0 items-start gap-4">

                    {/* CUSTOMER AVATAR */}
                    {booking.customer?.avatar ? (
                      <img
                        src={booking.customer.avatar}
                        alt={customerName}
                        className="h-12 w-12 shrink-0 rounded-full object-cover ring-2 ring-gray-100"
                      />
                    ) : (
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-50 text-base font-bold text-blue-600 ring-2 ring-blue-100">
                        {getInitial(booking.customer)}
                      </div>
                    )}

                    {/* BOOKING DETAILS */}
                    <div className="min-w-0">

                      {/* CUSTOMER NAME */}
                      <h3 className="truncate text-base font-bold text-gray-900">
                        {customerName}
                      </h3>

                      <p className="mt-0.5 text-xs font-medium text-gray-400">
                        Customer
                      </p>

                      {/* SERVICE */}
                      <div className="mt-3 flex min-w-0 items-center gap-2">
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                          <BriefcaseBusiness size={14} />
                        </div>

                        <div className="min-w-0">
                          <p className="text-[10px] font-medium uppercase tracking-wider text-gray-400">
                            Service
                          </p>

                          <p className="truncate text-sm font-semibold text-gray-700">
                            {booking.service?.title ||
                              "Service unavailable"}
                          </p>
                        </div>
                      </div>

                      {/* DATE + TIME */}
                      <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-gray-500">

                        <span className="flex items-center gap-1.5">
                          <CalendarDays
                            size={14}
                            className="text-gray-400"
                          />

                          {formatDate(
                            booking.bookingDate
                          )}
                        </span>

                        <span className="flex items-center gap-1.5">
                          <Clock3
                            size={14}
                            className="text-gray-400"
                          />

                          {formatTime(
                            booking.startTime
                          )}

                          {booking.endTime && (
                            <>
                              <span className="text-gray-300">
                                →
                              </span>

                              {formatTime(
                                booking.endTime
                              )}
                            </>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT SIDE */}
                  <div className="flex items-center justify-between gap-5 border-t border-gray-100 pt-4 sm:justify-end sm:border-t-0 sm:pt-0">

                    {/* AMOUNT */}
                    <div className="min-w-[75px]">
                      <p className="text-[10px] font-medium uppercase tracking-wider text-gray-400">
                        Amount
                      </p>

                      <div className="mt-1 flex items-center gap-0.5 text-sm font-bold text-gray-900">
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
                    <button
                      type="button"
                      onClick={() =>
                        navigate(
                          `/bookings/${booking._id}`
                        )
                      }
                      className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                    >
                      <Eye size={15} />

                      <span className="hidden sm:inline">
                        View
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* MOBILE VIEW ALL */}
      {bookings.length > 0 && (
        <div className="border-t border-gray-100 p-4 sm:hidden">
          <Link
            to="/provider/bookings"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gray-50 px-4 py-3 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
          >
            View all bookings
            <ArrowRight size={16} />
          </Link>
        </div>
      )}
    </section>
  );
};

export default RecentBookings;