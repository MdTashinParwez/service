import { Star, ShieldCheck, BadgeCheck } from "lucide-react";
import { Link } from "react-router-dom";

const ProviderCard = ({ provider }) => {
  if (!provider) return null;

  return (
    <section className="rounded-3xl border bg-white p-8 shadow-sm">

      <h2 className="text-2xl font-bold text-gray-900">
        Service Provider
      </h2>

      <div className="mt-8 flex items-center gap-5">

        {/* Provider Avatar */}
        <Link to={`/providers/${provider._id}`}>
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-100 text-3xl font-bold text-blue-600">
            {provider.businessName?.charAt(0)?.toUpperCase() || "P"}
          </div>
        </Link>

        <div>

          {/* Business Name */}
          <div className="flex items-center gap-2">
            <Link
              to={`/providers/${provider._id}`}
              className="text-xl font-bold transition hover:text-blue-600"
            >
              {provider.businessName || "Unknown Provider"}
            </Link>

            {provider.isVerified && (
              <BadgeCheck
                size={20}
                className="text-blue-600"
              />
            )}
          </div>

          <p className="mt-1 text-gray-600">
            Service Provider
          </p>

          {/* Rating */}
          <div className="mt-3 flex items-center gap-2 text-gray-600">
            <Star
              size={18}
              className="fill-yellow-400 text-yellow-400"
            />

            <span>
              {provider.averageRating ?? 0}
            </span>

            <span className="text-sm text-gray-500">
              ({provider.totalReviews ?? 0} reviews)
            </span>
          </div>

        </div>

      </div>

      {/* Description */}
      {provider.businessDescription && (
        <p className="mt-6 leading-7 text-gray-600">
          {provider.businessDescription}
        </p>
      )}

      {/* Verification */}
      <div className="mt-6 flex items-center gap-2 rounded-lg bg-blue-50 p-3 text-sm text-blue-700">
        <ShieldCheck size={17} />

        {provider.isVerified
          ? "Verified service provider"
          : "Verification pending"}
      </div>

    </section>
  );
};

export default ProviderCard;