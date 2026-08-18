import {
  MapPin,
  User,
  ShieldCheck,
  Building2,
} from "lucide-react";

import { Link } from "react-router-dom";

const ProviderMiniCard = ({ booking }) => {
  const provider = booking.provider;

  return (
    <aside className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">

      {/* Header */}

      <div>

        <p className="text-sm font-medium text-blue-600">
          Service Provider
        </p>

        <h2 className="mt-1 text-2xl font-bold text-gray-900">
          Provider Details
        </h2>

      </div>

      {/* Provider */}

      <div className="mt-8 flex flex-col items-center text-center">

        {/* Avatar */}

        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-50 ring-4 ring-blue-100">

          <Building2
            size={38}
            className="text-blue-600"
          />

        </div>

        {/* Business Name */}

        <h3 className="mt-5 text-xl font-bold text-gray-900">
          {provider?.businessName || "Service Provider"}
        </h3>

        {/* Verification */}

        <div className="mt-2">

          {provider?.isVerified ? (

            <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">

              <ShieldCheck size={14} />

              Verified Provider

            </span>

          ) : (

            <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
              Verification Pending
            </span>

          )}

        </div>

      </div>

      {/* Divider */}

      <div className="my-8 border-t border-gray-100" />

      {/* Provider Info */}

      <div className="space-y-4">

        <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-4">

          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100">

            <Building2
              size={18}
              className="text-blue-600"
            />

          </div>

          <div>

            <p className="text-xs text-gray-500">
              Business
            </p>

            <p className="mt-0.5 font-medium text-gray-900">
              {provider?.businessName || "Not available"}
            </p>

          </div>

        </div>

        <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-4">

          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100">

            <User
              size={18}
              className="text-blue-600"
            />

          </div>

          <div>

            <p className="text-xs text-gray-500">
              Provider Status
            </p>

            <p className="mt-0.5 font-medium text-gray-900">
              {provider?.isVerified
                ? "Verified"
                : "Verification Pending"}
            </p>

          </div>

        </div>

      </div>

      {/* Profile Button */}

      <Link
        to={`/provider/${provider?._id}`}
        className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl border border-gray-300 py-3 font-semibold text-gray-800 transition hover:bg-gray-50"
      >

        <User size={18} />

        View Provider Profile

      </Link>

    </aside>
  );
};

export default ProviderMiniCard;