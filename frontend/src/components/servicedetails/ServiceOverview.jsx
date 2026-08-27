const ServiceOverview = ({ service }) => {
  const bookingCount = new Intl.NumberFormat("en-US").format(
    Number(service.bookingCount ?? 0)
  );

  // Backend duration is stored in total minutes
  const totalMinutes = Number(service.duration ?? 0);

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  const formatDuration = () => {
    if (hours === 0 && minutes === 0) {
      return "Not specified";
    }

    const parts = [];

    if (hours > 0) {
      parts.push(`${hours} hour${hours !== 1 ? "s" : ""}`);
    }

    if (minutes > 0) {
      parts.push(`${minutes} minute${minutes !== 1 ? "s" : ""}`);
    }

    return parts.join(" ");
  };

  const getServiceType = () => {
    switch (service.serviceType) {
      case "online":
        return "Online";

      case "onsite":
        return "On-site";

      case "hybrid":
        return "Hybrid";

      default:
        return "Not specified";
    }
  };

  return (
    <section className="rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-[0_18px_50px_-34px_rgba(15,23,42,0.42)] sm:p-8">
      {/* Header */}
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
        Service Overview
      </p>

      <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
        About this service
      </h2>

      {/* Description */}
      <p className="mt-4 max-w-3xl leading-8 text-slate-600">
        {service.description}
      </p>

      {/* Service Stats */}
      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        {/* Duration */}
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-sm text-slate-500">
            Duration
          </p>

          <p className="mt-1 text-lg font-semibold text-slate-950">
            {formatDuration()}
          </p>
        </div>

        {/* Service Type */}
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-sm text-slate-500">
            Service Type
          </p>

          <p className="mt-1 text-lg font-semibold text-slate-950">
            {getServiceType()}
          </p>
        </div>

        {/* Bookings */}
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-sm text-slate-500">
            Bookings
          </p>

          <p className="mt-1 text-lg font-semibold text-slate-950">
            {bookingCount}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ServiceOverview;