import BookingStatusBadge from "./BookingStatusBadge";

const BookingInfo = ({ booking }) => {
  return (
    <section className="rounded-2xl border bg-white p-8 shadow-sm">

      {/* Header */}

      <div className="flex items-center justify-between">

        <h2 className="text-2xl font-bold text-gray-900">
          Booking Information
        </h2>

        <BookingStatusBadge status={booking.status} />

      </div>

      {/* Booking Details */}

      <div className="mt-8 grid gap-6 md:grid-cols-2">

        <div>
          <p className="text-sm text-gray-500">
            Booking ID
          </p>

          <h3 className="mt-1 break-all text-lg font-semibold">
            {booking._id}
          </h3>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Service
          </p>

          <h3 className="mt-1 text-lg font-semibold">
            {booking.service.title}
          </h3>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Provider
          </p>

          <h3 className="mt-1 text-lg font-semibold">
            {booking.provider.businessName}
          </h3>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Total Price
          </p>

          <h3 className="mt-1 text-lg font-semibold text-green-600">
            ₹{booking.totalAmount}
          </h3>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Booking Date
          </p>

          <h3 className="mt-1 text-lg font-semibold">
            {new Date(booking.bookingDate).toLocaleDateString("en-IN")}
          </h3>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Booking Time
          </p>

          <h3 className="mt-1 text-lg font-semibold">
            {new Date(booking.startTime).toLocaleTimeString("en-IN", {
              hour: "2-digit",
              minute: "2-digit",
            })}
            {" - "}
            {new Date(booking.endTime).toLocaleTimeString("en-IN", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </h3>
        </div>

      </div>

      <hr className="my-8" />

      {/* Notes */}

      <div>

        <p className="text-sm font-medium text-gray-500">
          Special Instructions
        </p>

        <div className="mt-3 rounded-xl bg-gray-50 p-4">

          <p className="leading-7 text-gray-700">
            {booking.customerNotes || "No special instructions provided."}
          </p>

        </div>

      </div>

    </section>
  );
};

export default BookingInfo;