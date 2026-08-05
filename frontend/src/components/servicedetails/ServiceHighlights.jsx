import {
  BadgeCheck,
  ShieldCheck,
  Clock3,
  Wrench,
  Wallet,
  Headphones,
} from "lucide-react";

const ServiceHighlights = () => {
  const highlights = [
    {
      icon: BadgeCheck,
      title: "Verified Professionals",
    },
    {
      icon: Clock3,
      title: "Same Day Service",
    },
    {
      icon: Wrench,
      title: "Genuine Spare Parts",
    },
    {
      icon: ShieldCheck,
      title: "30 Days Warranty",
    },
    {
      icon: Wallet,
      title: "Affordable Pricing",
    },
    {
      icon: Headphones,
      title: "Customer Support",
    },
  ];

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            Trust signals
          </p>
          <h2 className="mt-2 text-2xl font-bold text-slate-950">
            Why customers book this service
          </h2>
        </div>
        <p className="max-w-sm text-sm leading-6 text-slate-500">
          Practical guarantees that matter before letting someone into your home.
        </p>
      </div>

      <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {highlights.map(({ icon: Icon, title }) => (
          <div
            key={title}
            className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4 transition hover:border-blue-200 hover:bg-blue-50"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm">
              <Icon size={20} />
            </span>
            <span className="font-semibold text-slate-700">
              {title}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServiceHighlights;
