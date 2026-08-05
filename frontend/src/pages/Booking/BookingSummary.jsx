import {
  BadgeCheck,
  MapPin,
  ShieldCheck,
  Wrench,
} from "lucide-react";

const BookingSummary = ({ service = {} }) => {
  return (
    <aside className="rounded-2xl border bg-white p-8 shadow-sm">

      <h2 className="text-2xl font-bold text-gray-900">
        Booking Summary
      </h2>

      <div className="mt-6 space-y-5">

        <div>

          <p className="text-sm text-gray-500">
            Service
          </p>

          <h3 className="mt-1 text-lg font-semibold">
            {service.title || "AC Repair Service"}
          </h3>

        </div>

        <div>

          <p className="text-sm text-gray-500">
            Provider
          </p>

          <h3 className="mt-1 text-lg font-semibold">
            {service.provider?.name || "Rahul Sharma"}
          </h3>

        </div>

        <div className="flex items-center gap-2 text-gray-600">

          <MapPin
            size={18}
            className="text-blue-600"
          />

          <span>
            {service.location || "New Delhi"}
          </span>

        </div>

        <div className="flex items-center gap-2 text-gray-600">

          <Wrench
            size={18}
            className="text-blue-600"
          />

          <span>
            {service.category || "Home Services"}
          </span>

        </div>

      </div>

      <hr className="my-8" />

      <div className="space-y-4">

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

        <div className="flex items-center gap-3">

          <BadgeCheck
            size={18}
            className="text-green-600"
          />

          <span>
            Instant Confirmation
          </span>

        </div>

      </div>

    </aside>
  );
};

export default BookingSummary;