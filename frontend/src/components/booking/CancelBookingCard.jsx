import { useState } from "react";
import {
  TriangleAlert,
  X,
  Loader2,
} from "lucide-react";

import { cancelBooking } from "../../api/booking.api";

const CancelBookingCard = ({ booking, onCancelled }) => {
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");

  const handleCancel = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await cancelBooking(
        booking._id,
        reason.trim()
      );

      console.log("Cancel response:", response);

      setShowConfirm(false);

      if (onCancelled) {
        onCancelled(response.data);
      }

    } catch (error) {
      console.error("Cancel booking error:", error);

      setError(
        error?.message ||
        "Failed to cancel booking. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Cancel Card */}

      <section className="overflow-hidden rounded-2xl border border-red-200 bg-white shadow-sm">

        {/* Header */}

        <div className="border-b border-red-100 bg-red-50 px-6 py-5">

          <div className="flex items-start gap-4">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-100">

              <TriangleAlert
                size={22}
                className="text-red-600"
              />

            </div>

            <div>

              <h2 className="text-lg font-bold text-gray-900">
                Cancel Booking
              </h2>

              <p className="mt-1 text-sm text-gray-600">
                Need to cancel your appointment?
              </p>

            </div>

          </div>

        </div>

        {/* Content */}

        <div className="p-6">

          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">

            <p className="text-sm leading-6 text-gray-600">
              You can cancel this booking before the service
              starts. Once cancelled, this action cannot be undone.
            </p>

          </div>

          {/* Reason */}

          <div className="mt-6">

            <div className="flex items-center justify-between">

              <label
                htmlFor="cancellationReason"
                className="text-sm font-semibold text-gray-800"
              >
                Cancellation reason
              </label>

              <span className="text-xs text-gray-400">
                {reason.length}/100
              </span>

            </div>

            <textarea
              id="cancellationReason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              maxLength={100}
              rows={4}
              placeholder="Tell us why you want to cancel..."
              className="mt-2 w-full resize-none rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-red-400 focus:ring-2 focus:ring-red-100"
            />

          </div>

          {/* Error */}

          {error && (
            <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Button */}

          <button
            type="button"
            onClick={() => setShowConfirm(true)}
            disabled={loading}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 py-3.5 text-sm font-semibold text-white transition hover:bg-red-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
          >

            <X size={18} />

            Cancel Booking

          </button>

          <p className="mt-3 text-center text-xs text-gray-400">
            This action cannot be undone.
          </p>

        </div>

      </section>

      {/* Confirmation Modal */}

      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">

          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">

            <div className="flex items-start gap-4">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-100">

                <TriangleAlert
                  size={22}
                  className="text-red-600"
                />

              </div>

              <div>

                <h2 className="text-xl font-bold text-gray-900">
                  Cancel this booking?
                </h2>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  Are you sure you want to cancel this booking?
                  This action cannot be undone.
                </p>

              </div>

            </div>

            <div className="mt-6 flex gap-3">

              <button
                type="button"
                onClick={() => setShowConfirm(false)}
                disabled={loading}
                className="flex-1 rounded-xl border border-gray-300 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                Keep Booking
              </button>

              <button
                type="button"
                onClick={handleCancel}
                disabled={loading}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >

                {loading ? (
                  <>
                    <Loader2
                      size={18}
                      className="animate-spin"
                    />

                    Cancelling...
                  </>
                ) : (
                  <>
                    <X size={18} />

                    Yes, Cancel
                  </>
                )}

              </button>

            </div>

          </div>

        </div>
      )}

    </>
  );
};

export default CancelBookingCard;