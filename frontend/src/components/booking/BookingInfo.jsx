const BookingInfo = ({ booking }) => {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">

      {/* Header */}

      <div>
        <p className="text-sm font-medium text-blue-600">
          Booking Summary
        </p>

        <h2 className="mt-1 text-2xl font-bold text-gray-900">
          Booking Information
        </h2>
      </div>

      {/* Details */}

      <div className="mt-8 grid gap-6 sm:grid-cols-2">

        {/* Booking ID */}


        {/* Service */}

        <div className="rounded-xl bg-gray-50 p-4">

          <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
            Service
          </p>

          <p className="mt-2 text-lg font-semibold text-gray-900">
            {booking.service?.title || "N/A"}
          </p>

        </div>

        {/* Provider */}

        <div className="rounded-xl bg-gray-50 p-4">

          <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
            Provider
          </p>

          <p className="mt-2 text-lg font-semibold text-gray-900">
            {booking.provider?.businessName || "N/A"}
          </p>

        </div>

        {/* Price */}

        <div className="rounded-xl bg-gray-50 p-4">

          <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
            Total Amount
          </p>

          <p className="mt-2 text-xl font-bold text-green-600">
            ₹{booking.totalAmount}
          </p>

        </div>

        {/* Date */}

        <div className="rounded-xl bg-gray-50 p-4">

          <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
            Booking Date
          </p>

          <p className="mt-2 text-lg font-semibold text-gray-900">
            {new Date(
              booking.bookingDate
            ).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </p>

        </div>

        {/* Time */}

        <div className="rounded-xl bg-gray-50 p-4">

          <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
            Booking Time
          </p>

          <p className="mt-2 text-lg font-semibold text-gray-900">

            {new Date(
              booking.startTime
            ).toLocaleTimeString("en-IN", {
              hour: "2-digit",
              minute: "2-digit",
            })}

            {" - "}

            {new Date(
              booking.endTime
            ).toLocaleTimeString("en-IN", {
              hour: "2-digit",
              minute: "2-digit",
            })}

          </p>

        </div>

      </div>

      {/* Notes */}

      <div className="mt-8 border-t pt-8">

        <p className="text-sm font-medium text-gray-500">
          Special Instructions
        </p>

        <div className="mt-3 rounded-xl border border-gray-200 bg-gray-50 p-4">

          <p className="leading-7 text-gray-700">
            {booking.customerNotes ||
              "No special instructions provided."}
          </p>

        </div>

      </div>

    </section>
  );
};

export default BookingInfo;