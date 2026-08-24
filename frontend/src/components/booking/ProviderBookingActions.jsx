import { useState } from "react";
import {
  CheckCircle2,
  XCircle,
  PlayCircle,
  Flag,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

import {
  acceptBooking,
  rejectBooking,
  startBooking,
  completeBooking,
} from "../../api/booking.api";

const ProviderBookingActions = ({
  booking,
  onUpdated,
}) => {
  const [loading, setLoading] = useState(false);
  const [showReject, setShowReject] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");

  const handleAction = async (action, successMessage) => {
    try {
      setLoading(true);

      const response = await action(booking._id);

      const updatedBooking = response.data;

      onUpdated(updatedBooking);

      toast.success(successMessage);
    } catch (error) {
      console.error(error);

      const message =
        error?.response?.data?.message ||
        "Something went wrong.";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async () => {
    if (rejectionReason.trim().length > 100) {
      toast.error(
        "Cancellation reason cannot exceed 100 characters."
      );
      return;
    }

    try {
      setLoading(true);

      const response = await rejectBooking(
        booking._id,
        rejectionReason
      );

      onUpdated(response.data);

      toast.success(
        "Booking rejected successfully"
      );

      setShowReject(false);
      setRejectionReason("");
    } catch (error) {
      console.error(error);

      const message =
        error?.response?.data?.message ||
        "Failed to reject booking.";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // PENDING
  // =====================================================

  if (booking.status === "pending") {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

        <div>
          <h2 className="text-lg font-bold text-gray-900">
            Booking Request
          </h2>

          <p className="mt-1 text-sm leading-6 text-gray-500">
            Review this booking request and choose
            whether you want to accept or reject it.
          </p>
        </div>

        {!showReject ? (
          <div className="mt-6 grid gap-3 sm:grid-cols-2">

            <button
              type="button"
              disabled={loading}
              onClick={() =>
                handleAction(
                  () => acceptBooking(booking._id),
                  "Booking accepted successfully"
                )
              }
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <Loader2
                  size={18}
                  className="animate-spin"
                />
              ) : (
                <CheckCircle2 size={18} />
              )}

              Accept Booking
            </button>

            <button
              type="button"
              disabled={loading}
              onClick={() => setShowReject(true)}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-100 disabled:opacity-60"
            >
              <XCircle size={18} />

              Reject
            </button>

          </div>
        ) : (
          <div className="mt-6">

            <label className="text-sm font-semibold text-gray-700">
              Rejection reason
              <span className="ml-1 font-normal text-gray-400">
                (optional)
              </span>
            </label>

            <textarea
              value={rejectionReason}
              onChange={(e) =>
                setRejectionReason(e.target.value)
              }
              maxLength={100}
              rows={3}
              placeholder="Tell the customer why you cannot accept this booking..."
              className="mt-2 w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-100"
            />

            <div className="mt-1 text-right text-xs text-gray-400">
              {rejectionReason.length}/100
            </div>

            <div className="mt-4 flex gap-3">

              <button
                type="button"
                disabled={loading}
                onClick={handleReject}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-60"
              >
                {loading ? (
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />
                ) : (
                  <XCircle size={18} />
                )}

                Confirm Reject
              </button>

              <button
                type="button"
                disabled={loading}
                onClick={() => {
                  setShowReject(false);
                  setRejectionReason("");
                }}
                className="rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                Back
              </button>

            </div>

          </div>
        )}

      </div>
    );
  }

  // =====================================================
  // ACCEPTED
  // =====================================================

  if (booking.status === "accepted") {
    return (
      <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">

        <div className="flex items-start gap-4">

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <PlayCircle size={22} />
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900">
              Booking Accepted
            </h2>

            <p className="mt-1 text-sm leading-6 text-gray-500">
              The booking has been accepted. Start the
              booking when the scheduled service begins.
            </p>
          </div>

        </div>

        <button
          type="button"
          disabled={loading}
          onClick={() =>
            handleAction(
              () => startBooking(booking._id),
              "Booking started successfully"
            )
          }
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <Loader2
              size={18}
              className="animate-spin"
            />
          ) : (
            <PlayCircle size={18} />
          )}

          Start Booking
        </button>

      </div>
    );
  }

  // =====================================================
  // IN PROGRESS
  // =====================================================

  if (booking.status === "in-progress") {
    return (
      <div className="rounded-2xl border border-purple-100 bg-white p-6 shadow-sm">

        <div className="flex items-start gap-4">

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
            <Flag size={21} />
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900">
              Service In Progress
            </h2>

            <p className="mt-1 text-sm leading-6 text-gray-500">
              Complete the booking once the service has
              been successfully delivered.
            </p>
          </div>

        </div>

        <button
          type="button"
          disabled={loading}
          onClick={() =>
            handleAction(
              () => completeBooking(booking._id),
              "Booking completed successfully"
            )
          }
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <Loader2
              size={18}
              className="animate-spin"
            />
          ) : (
            <CheckCircle2 size={18} />
          )}

          Complete Booking
        </button>

      </div>
    );
  }

  // =====================================================
  // COMPLETED
  // =====================================================

  if (booking.status === "completed") {
    return (
      <div className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">

        <div className="flex items-start gap-4">

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            <CheckCircle2 size={22} />
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900">
              Booking Completed
            </h2>

            <p className="mt-1 text-sm leading-6 text-gray-500">
              This booking has been successfully completed.
            </p>
          </div>

        </div>

      </div>
    );
  }

  // =====================================================
  // CANCELLED
  // =====================================================

  if (booking.status === "cancelled") {
    return (
      <div className="rounded-2xl border border-red-100 bg-white p-6 shadow-sm">

        <div className="flex items-start gap-4">

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
            <XCircle size={22} />
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900">
              Booking Cancelled
            </h2>

            <p className="mt-1 text-sm leading-6 text-gray-500">
              This booking is no longer active.
            </p>
          </div>

        </div>

        {booking.cancellationReason && (
          <div className="mt-5 rounded-xl bg-gray-50 p-4">

            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
              Cancellation Reason
            </p>

            <p className="mt-1 text-sm text-gray-700">
              {booking.cancellationReason}
            </p>

          </div>
        )}

      </div>
    );
  }

  return null;
};

export default ProviderBookingActions