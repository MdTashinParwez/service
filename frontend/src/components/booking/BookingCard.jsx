import {
  CalendarDays,
  Clock3,
  ArrowRight,
  ShieldCheck,
  IndianRupee,
  Hash,
} from "lucide-react";

import { Link } from "react-router-dom";

import BookingStatusBadge from "./BookingStatusBadge";

const BookingCard = ({ booking }) => {
  const service = booking.service;
  const provider = booking.provider;

  const formattedDate = new Date(
    booking.bookingDate
  ).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const startTime = new Date(
    booking.startTime
  ).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const endTime = new Date(
    booking.endTime
  ).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <article className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-lg">

      {/* Top */}

      <div className="p-6 sm:p-7">

        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">

          {/* Service */}

          <div className="min-w-0">

            <div className="flex flex-wrap items-center gap-3">

              <h2 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
                {service?.title || "Service"}
              </h2>

              {provider?.isVerified && (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">

                  <ShieldCheck size={14} />

                  Verified

                </span>
              )}

            </div>

            <p className="mt-2 text-sm text-gray-500">
              Booked with{" "}
              <span className="font-semibold text-gray-800">
                {provider?.businessName || "Service Provider"}
              </span>
            </p>

          </div>

          {/* Status */}

          <BookingStatusBadge
            status={booking.status}
          />

        </div>

        {/* Divider */}

        <div className="my-6 border-t border-gray-100" />

        {/* Information */}

        <div className="grid gap-4 sm:grid-cols-2">

          {/* Date */}

          <div className="flex items-center gap-4 rounded-2xl bg-gray-50 p-4">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100">

              <CalendarDays
                size={21}
                className="text-blue-600"
              />

            </div>

            <div>

              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Booking Date
              </p>

              <p className="mt-1 font-semibold text-gray-900">
                {formattedDate}
              </p>

            </div>

          </div>

          {/* Time */}

          <div className="flex items-center gap-4 rounded-2xl bg-gray-50 p-4">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-100">

              <Clock3
                size={21}
                className="text-indigo-600"
              />

            </div>

            <div>

              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Time
              </p>

              <p className="mt-1 font-semibold text-gray-900">
                {startTime} - {endTime}
              </p>

            </div>

          </div>

        </div>

        {/* Bottom */}

        <div className="mt-6 flex flex-col gap-5 border-t border-gray-100 pt-6 sm:flex-row sm:items-center sm:justify-between">

          {/* Booking ID */}

          <div className="flex items-center gap-2 text-sm text-gray-500">

            <Hash size={16} />

            <span>
              {booking._id.slice(-8).toUpperCase()}
            </span>

          </div>

          {/* Price + Action */}

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">

            <div className="sm:text-right">

              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Total Amount
              </p>

              <div className="mt-1 flex items-center font-bold text-gray-900">

                <IndianRupee size={18} />

                <span className="text-xl">
                  {booking.totalAmount}
                </span>

              </div>

            </div>

            <Link
              to={`/bookings/${booking._id}`}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-600"
            >

              View Details

              <ArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-0.5"
              />

            </Link>

          </div>

        </div>

      </div>

    </article>
  );
};

export default BookingCard;