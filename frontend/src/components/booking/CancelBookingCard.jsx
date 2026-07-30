import { TriangleAlert } from "lucide-react";

const CancelBookingCard = () => {
  return (

    <section className="rounded-2xl border border-red-200 bg-white p-8 shadow-sm">

      <div className="flex items-center gap-3">

        <TriangleAlert
          className="text-red-600"
          size={26}
        />

        <h2 className="text-2xl font-bold">
          Cancel Booking
        </h2>

      </div>

      <p className="mt-4 leading-7 text-gray-600">

        You can cancel this booking before the provider starts the service.

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