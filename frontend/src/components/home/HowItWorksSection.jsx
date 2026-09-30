import {
  Search,
  GitCompare,
  CalendarCheck,
  Star,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Search for a service",
    description:
      "Tell us what you need and explore services that match your requirements.",
  },
  {
    number: "02",
    icon: GitCompare,
    title: "Compare providers",
    description:
      "Review provider profiles, services, and details before making your choice.",
  },
  {
    number: "03",
    icon: CalendarCheck,
    title: "Book your service",
    description:
      "Choose a suitable time and place your booking in just a few clicks.",
  },
  {
    number: "04",
    icon: Star,
    title: "Get it done & review",
    description:
      "Complete your service and share your experience to help others.",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="bg-slate-50 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            How it works
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Get the help you need in four simple steps
          </h2>

          <p className="mt-4 text-base leading-7 text-slate-600">
            From finding the right professional to completing your booking,
            everything is designed to be simple and straightforward.
          </p>
        </div>

        {/* Steps */}
        <div className="relative mt-14 grid gap-8 md:grid-cols-4">

          {/* Connecting line - desktop */}
          <div className="absolute left-[12%] right-[12%] top-8 hidden h-px bg-slate-200 md:block" />

          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="group relative text-center"
              >
                {/* Icon */}
                <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-200 bg-white text-blue-600 shadow-sm transition duration-300 group-hover:-translate-y-1 group-hover:border-blue-200 group-hover:shadow-lg">
                  <Icon size={26} strokeWidth={1.8} />

                  <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-[10px] font-bold text-white">
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <h3 className="mt-6 text-lg font-semibold text-slate-900">
                  {step.title}
                </h3>

                <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-slate-600">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 flex justify-center">
          <button
            onClick={() => {
              window.location.href = "/services";
            }}
            className="group inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-600"
          >
            Explore services
            <ArrowRight
              size={17}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;