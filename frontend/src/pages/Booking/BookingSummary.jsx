import {
  BadgeCheck,
  MapPin,
  ShieldCheck,
  Wrench,
} from "lucide-react";

const BookingSummary = ({ service = {} }) => {
  const location =
    typeof service.provider?.location === "string"
      ? service.provider.location
      : typeof service.location === "string"
      ? service.location
      : "Location available after booking";

  return (
    <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
        Your Service
      </p>

      <h2 className="mt-2 text-2xl font-bold text-gray-900">
        Booking Summary
      </h2>

      <div className="mt-6 space-y-5">

        {/* Service */}
        <div>
          <p className="text-sm text-gray-500">
            Service
          </p>

          <h3 className="mt-1 text-lg font-semibold text-gray-900">
            {service.title || "Service"}
          </h3>
        </div>

        {/* Provider */}
        <div>
          <p className="text-sm text-gray-500">
            Provider
          </p>

          <h3 className="mt-1 text-lg font-semibold text-gray-900">
            {service.provider?.businessName || "Service Provider"}
          </h3>
        </div>

        {/* Location */}
        <div className="flex items-center gap-3 text-gray-600">
          <MapPin
            size={18}
            className="shrink-0 text-blue-600"
          />

          <span>
            {location}
          </span>
        </div>

        {/* Category */}
        <div className="flex items-center gap-3 text-gray-600">
          <Wrench
            size={18}
            className="shrink-0 text-blue-600"
          />

          <span>
            {service.category?.name || "Professional Service"}
          </span>
        </div>

      </div>

      <hr className="my-6" />

      <div className="space-y-4 text-sm">

        <div className="flex items-center gap-3">
          <BadgeCheck
            size={18}
            className="text-green-600"
          />

          <span>
            Verified Provider
          </span>
        </div>

        <div className="flex items-center gap-3">
          <ShieldCheck
            size={18}
            className="text-blue-600"
          />

          <span>
            Secure Booking
          </span>
        </div>

      </div>

    </aside>
  );
};

export default BookingSummary;