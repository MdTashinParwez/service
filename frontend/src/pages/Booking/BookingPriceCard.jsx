import { CalendarCheck, ShieldCheck } from "lucide-react";

const BookingPriceCard = ({
  service = {},
  onConfirm,
  submitting = false,
}) => {

  const servicePrice = Number(service.price || 0);

  const platformFee = 49;
  const tax = 99;

  const total =
    servicePrice +
    platformFee +
    tax;

  return (
    <aside className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">

      <div className="flex items-center gap-3">

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100">
          <CalendarCheck
            size={21}
            className="text-blue-600"
          />
        </div>

        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Price Details
          </h2>

          <p className="text-sm text-gray-500">
            Booking summary
          </p>
        </div>

      </div>

      <div className="mt-7 space-y-4">

        <div className="flex justify-between text-gray-600">
          <span>Service Price</span>

          <span className="font-medium text-gray-900">
            ₹{servicePrice}
          </span>
        </div>

        <div className="flex justify-between text-gray-600">
          <span>Platform Fee</span>

          <span className="font-medium text-gray-900">
            ₹{platformFee}
          </span>
        </div>

        <div className="flex justify-between text-gray-600">
          <span>Taxes</span>

          <span className="font-medium text-gray-900">
            ₹{tax}
          </span>
        </div>

        <div className="border-t border-slate-200 pt-4">

          <div className="flex justify-between text-lg font-bold text-gray-900">
            <span>Total</span>

            <span>
              ₹{total}
            </span>
          </div>

        </div>

      </div>

      <div className="mt-6 rounded-xl bg-emerald-50 p-4">

        <div className="flex items-start gap-3">

          <ShieldCheck
            size={19}
            className="mt-0.5 shrink-0 text-emerald-600"
          />

          <p className="text-sm leading-6 text-emerald-800">
            Your booking details will be securely submitted
            for confirmation.
          </p>

        </div>

      </div>

      <button
        type="button"
        onClick={onConfirm}
        disabled={submitting}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? (
          "Creating Booking..."
        ) : (
          <>
            <CalendarCheck size={18} />
            Confirm Booking
          </>
        )}
      </button>

    </aside>
  );
};

export default BookingPriceCard;