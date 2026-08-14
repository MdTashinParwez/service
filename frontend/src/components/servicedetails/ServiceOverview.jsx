const ServiceOverview = ({ service }) => {
  const bookingCount = new Intl.NumberFormat("en-US").format(
    Number(service.bookingCount ?? 0)
  );

  return (
    <section className="rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-[0_18px_50px_-34px_rgba(15,23,42,0.42)] sm:p-8">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
        Service Overview
      </p>

      <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
        About this service
      </h2>

      <p className="mt-4 max-w-3xl leading-8 text-slate-600">
        {service.description}
      </p>

      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-sm text-slate-500">Duration</p>
          <p className="mt-1 text-lg font-semibold text-slate-950">
            {service.duration} hour{service.duration === 1 ? "" : "s"}
          </p>
        </div>

        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-sm text-slate-500">Service Type</p>
          <p className="mt-1 text-lg font-semibold text-slate-950">
            {service.serviceType === "onsite" ? "On-site" : "Online"}
          </p>
        </div>

        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-sm text-slate-500">Bookings</p>
          <p className="mt-1 text-lg font-semibold text-slate-950">
            {bookingCount}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ServiceOverview;
