import {
  Phone,
  MapPin,
  Star,
  User,
} from "lucide-react";

import { Link } from "react-router-dom";

const ProviderMiniCard = ({ booking }) => {
  return (
    <aside className="rounded-2xl border bg-white p-8 shadow-sm">

      <h2 className="text-2xl font-bold text-gray-900">
        Provider
      </h2>

      <div className="mt-8 flex flex-col items-center text-center">

        <img
          src={
            booking.providerImage ||
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43f?w=300&q=80"
          }
          alt={booking.provider}
          className="h-28 w-28 rounded-full border-4 border-blue-100 object-cover"
        />

        <h3 className="mt-5 text-xl font-bold">
          {booking.provider}
        </h3>

        <p className="mt-1 text-gray-600">
          {booking.profession || "Service Professional"}
        </p>

        <div className="mt-2 flex items-center gap-2 text-gray-500">

          <MapPin
            size={16}
            className="text-blue-600"
          />

          <span>
            {booking.providerLocation}
          </span>

        </div>

      </div>

      <div className="mt-8 space-y-5">

        <div className="flex items-center gap-3">

          <Star
            size={18}
            className="fill-yellow-400 text-yellow-400"
          />

          <span>
            {booking.rating || "4.8"} Rating
          </span>

        </div>

        <div className="flex items-center gap-3">

          <Phone
            size={18}
            className="text-blue-600"
          />

          <span>
            {booking.phone}
          </span>

        </div>

      </div>

      <div className="mt-8 space-y-3">

        <a
          href={`tel:${booking.phone}`}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
        >

          <Phone size={18} />

          Call Provider

        </a>

        <Link
          to={`/provider/${booking.providerId}`}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-300 py-3 font-semibold transition hover:bg-gray-100"
        >

          <User size={18} />

          View Profile

        </Link>

      </div>

    </aside>
  );
};

export default ProviderMiniCard;