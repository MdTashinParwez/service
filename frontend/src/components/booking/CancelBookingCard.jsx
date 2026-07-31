import { TriangleAlert } from "lucide-react";

const CancelBookingCard = ({ booking }) => {
  return (
    <section className="rounded-2xl border border-red-200 bg-white p-8 shadow-sm">

      <div className="flex items-center gap-3">

        <TriangleAlert
          size={26}
          className="text-red-600"
        />

        <h2 className="text-2xl font-bold text-gray-900">
          Cancel Booking
        </h2>

      </div>

      <p className="mt-4 leading-7 text-gray-600">
        You can cancel this booking before the provider confirms your request.
        Once cancelled, this action cannot be undone.
      </p>

      <button
        className="mt-8 w-full rounded-xl bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700"
      >
        Cancel Booking
      </button>

    </section>
  );
};

export default CancelBookingCard;