import { Calendar, Clock } from "lucide-react";
import { Link } from "react-router-dom";

import BookingStatusBadge from "./BookingStatusBadge";

const BookingCard = ({ booking }) => {
  return (

    <div className="rounded-2xl border bg-white p-6 shadow-sm">

      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <h2 className="text-2xl font-bold">
            {booking.service}
          </h2>

          <p className="mt-2 text-gray-600">
            Provider : {booking.provider}
          </p>

          <div className="mt-4 flex flex-wrap gap-5 text-gray-500">

            <div className="flex items-center gap-2">

              <Calendar size={18} />

              {booking.date}

            </div>

            <div className="flex items-center gap-2">

              <Clock size={18} />

              {booking.time}

            </div>

          </div>

        </div>

        <div className="space-y-4 text-right">

          <BookingStatusBadge
            status={booking.status}
          />

          <h3 className="text-2xl font-bold">
            ₹{booking.price}
          </h3>

          <Link
            to={`/bookings/${booking.id}`}
            className="inline-block rounded-xl bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700"
          >
            View Details
          </Link>

        </div>

      </div>

    </div>

  );

};

export default BookingCard;