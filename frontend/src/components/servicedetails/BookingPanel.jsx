import { Link } from "react-router-dom";
import {
  ArrowRight,
  Clock3,
  ShieldCheck,
  Video,
  MapPin,
  Monitor,
} from "lucide-react";

const BookingPanel = ({ service }) => {
  const serviceType =
    service?.serviceType === "onsite"
      ? {
          label: "On-site",
          icon: MapPin,
        }
      : service?.serviceType === "hybrid"
      ? {
          label: "Hybrid",
          icon: Monitor,
        }
      : {
          label: "Online",
          icon: Video,
        };

  const TypeIcon = serviceType.icon;

  const duration = Number(service?.duration || 0);

  const formatDuration = () => {
    if (!duration) return "Flexible duration";

    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;

    if (hours && minutes) {
      return `${hours} hr ${minutes} min`;
    }

    if (hours) {
      return `${hours} hr`;
    }

    return `${minutes} min`;
  };

  const currency = service?.currency || "INR";
  const price = Number(service?.price || 0);

  let formattedPrice;

  try {
    formattedPrice = new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(price);
  } catch {
    formattedPrice =
      currency === "INR"
        ? `₹${price}`
        : `${currency} ${price}`;
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

      <div className="p-6">

        {/* Price */}

        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
            Starting from
          </p>

          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight text-slate-950">
              {formattedPrice}
            </span>

            <span className="text-sm text-slate-400">
              / service
            </span>
          </div>
        </div>

        {/* Details */}

        <div className="mt-6 space-y-3">

          <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
            <div className="flex items-center gap-2.5 text-sm text-slate-500">
              <Clock3
                size={17}
                className="text-blue-600"
              />
              Duration
            </div>

            <span className="text-sm font-semibold text-slate-900">
              {formatDuration()}
            </span>
          </div>

          <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
            <div className="flex items-center gap-2.5 text-sm text-slate-500">
              <TypeIcon
                size={17}
                className="text-blue-600"
              />
              Service type
            </div>

            <span className="text-sm font-semibold text-slate-900">
              {serviceType.label}
            </span>
          </div>

        </div>

        {/* CTA */}

        <Link
          to={`/booking/${service?._id}`}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-600"
        >
          Book this service
          <ArrowRight size={17} />
        </Link>

        <p className="mt-3 text-center text-xs text-slate-400">
          Choose your preferred date and time on the next step.
        </p>

      </div>

      {/* Trust */}

      <div className="border-t border-slate-100 bg-slate-50 px-6 py-4">
        <div className="flex items-start gap-3">
          <ShieldCheck
            size={19}
            className="mt-0.5 shrink-0 text-emerald-600"
          />

          <div>
            <p className="text-sm font-semibold text-slate-900">
              Secure booking
            </p>

            <p className="mt-0.5 text-xs leading-5 text-slate-500">
              Select your slot and review the booking details
              before payment.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default BookingPanel;