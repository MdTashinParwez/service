import {
  BadgeCheck,
  MapPin,
  Star,
  Clock,
  IndianRupee,
} from "lucide-react";

const ServiceInfo = ({ service }) => {
  return (
    <div className="rounded-2xl border bg-white p-8 shadow-sm">
      {/* Category */}
      <span className="inline-flex rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-700">
        {service.category}
      </span>

      {/* Title */}
      <h1 className="mt-5 text-4xl font-bold leading-tight text-gray-900">
        {service.title}
      </h1>

      {/* Rating + Location */}
      <div className="mt-6 flex flex-wrap items-center gap-6">
        <div className="flex items-center gap-2">
          <Star
            size={18}
            className="fill-yellow-400 text-yellow-400"
          />

          <span className="font-semibold">
            {service.rating}
          </span>

          <span className="text-gray-500">
            ({service.totalReviews} Reviews)
          </span>
        </div>

        <div className="flex items-center gap-2 text-gray-600">
          <MapPin size={18} />

          {service.location}
        </div>
      </div>

      {/* Provider */}
      <div className="mt-8 rounded-xl border bg-gray-50 p-5">
        <p className="text-sm text-gray-500">
          Service Provider
        </p>

        <div className="mt-2 flex items-center gap-2">
          <h3 className="text-lg font-semibold text-gray-900">
            {service.provider.businessName}
          </h3>

          {service.provider.isVerified && (
            <BadgeCheck
              size={20}
              className="text-blue-600"
            />
          )}
        </div>
      </div>

      {/* Price */}
      <div className="mt-8">
        <p className="text-sm text-gray-500">
          Starting From
        </p>

        <div className="mt-2 flex items-center">
          <IndianRupee
            size={34}
            className="text-blue-600"
          />

          <span className="text-5xl font-bold text-blue-600">
            {service.price}
          </span>
        </div>
      </div>

      {/* Availability */}
      <div className="mt-8 flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 p-4">
        <Clock
          size={20}
          className="text-green-600"
        />

        <div>
          <p className="font-semibold text-green-700">
            Available
          </p>

          <p className="text-sm text-gray-600">
            Usually responds within 1-2 hours
          </p>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <button className="flex-1 rounded-xl bg-blue-600 py-4 font-semibold text-white transition hover:bg-blue-700">
          Book Service
        </button>

        <button className="flex-1 rounded-xl border py-4 font-semibold transition hover:bg-gray-100">
          Contact Provider
        </button>
      </div>
    </div>
  );
};

export default ServiceInfo;