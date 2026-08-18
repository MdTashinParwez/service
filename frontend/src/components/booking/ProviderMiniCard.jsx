import {
  MapPin,
  User,
  BadgeCheck,
} from "lucide-react";

import { Link } from "react-router-dom";

const ProviderMiniCard = ({ booking }) => {
  return (
    <aside className="rounded-2xl border bg-white p-8 shadow-sm">

      <h2 className="text-2xl font-bold text-gray-900">
        Provider
      </h2>

      <div className="mt-8 flex flex-col items-center text-center">

        <div className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-blue-100 bg-gray-100">
          <User size={48} className="text-gray-400" />
        </div>

        <div className="mt-5 flex items-center gap-2">

          <h3 className="text-xl font-bold">
            {booking.provider.businessName}
          </h3>

          {booking.provider.isVerified && (
            <BadgeCheck
              size={20}
              className="text-blue-600"
            />
          )}

        </div>

        <p className="mt-2 text-gray-600">
          Service Provider
        </p>

      </div>

      <div className="mt-8">

        <Link
          to={`/provider/${booking.provider._id}`}
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