import {
  CalendarCheck,
  Clock3,
  Monitor,
  MapPin,
  Users,
} from "lucide-react";

const formatDuration = (minutes) => {
  const value = Number(minutes);

  if (!value || value <= 0) return "Not specified";

  const hours = Math.floor(value / 60);
  const mins = value % 60;

  if (hours && mins) return `${hours} hr ${mins} min`;
  if (hours) return `${hours} hr`;

  return `${mins} min`;
};

const getServiceType = (type) => {
  switch (type) {
    case "online":
      return {
        label: "Online",
        icon: Monitor,
      };
    case "onsite":
      return {
        label: "On-site",
        icon: MapPin,
      };
    case "hybrid":
      return {
        label: "Hybrid",
        icon: Monitor,
      };
    default:
      return {
        label: "Not specified",
        icon: Monitor,
      };
  }
};

const ServiceOverview = ({ service }) => {
  const serviceType = getServiceType(service?.serviceType);
  const TypeIcon = serviceType.icon;

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      {/* Header */}
      <div>
        <p className="text-sm font-semibold text-blue-600">
          Service overview
        </p>

        <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-950">
          About this service
        </h2>
      </div>

      {/* Description */}
      <p className="mt-5 max-w-4xl whitespace-pre-line text-[15px] leading-7 text-slate-600">
        {service?.description || "No description available."}
      </p>

      {/* Details */}
      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Clock3 size={17} className="text-blue-600" />
            Duration
          </div>

          <p className="mt-2 font-semibold text-slate-900">
            {formatDuration(service?.duration)}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <TypeIcon size={17} className="text-blue-600" />
            Service type
          </div>

          <p className="mt-2 font-semibold text-slate-900">
            {serviceType.label}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <CalendarCheck size={17} className="text-blue-600" />
            Bookings
          </div>

          <p className="mt-2 font-semibold text-slate-900">
            {Number(service?.bookingCount ?? 0).toLocaleString("en-IN")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ServiceOverview;
