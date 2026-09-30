import {
  ShieldCheck,
  BadgeCheck,
  CalendarCheck,
  SearchCheck,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const benefits = [
  {
    icon: BadgeCheck,
    title: "Approved providers",
    description:
      "Discover providers who have been reviewed and approved before appearing on the platform.",
  },
  {
    icon: SearchCheck,
    title: "Clear service details",
    description:
      "Understand what each service offers before choosing a provider for your needs.",
  },
  {
    icon: CalendarCheck,
    title: "Easy booking",
    description:
      "Choose a suitable date and time and manage your booking from one place.",
  },
  {
    icon: ShieldCheck,
    title: "Secure experience",
    description:
      "Your account and booking flow are protected with authentication and controlled access.",
  },
];

const WhyChooseUsSection = () => {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">

          {/* Left */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Why choose us
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              A simpler way to find and book services
            </h2>

            <p className="mt-5 max-w-xl text-base leading-7 text-slate-600">
              We bring service discovery, provider information, and booking
              together in one straightforward experience.
            </p>

            <Link
              to="/services"
              className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-600"
            >
              Explore services
              <ArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>

          {/* Right */}
          <div className="grid gap-4 sm:grid-cols-2">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <div
                  key={benefit.title}
                  className="group rounded-2xl border border-slate-200 bg-slate-50/70 p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:bg-white hover:shadow-lg hover:shadow-slate-200/50"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:scale-105">
                    <Icon size={22} strokeWidth={1.8} />
                  </div>

                  <h3 className="mt-5 text-lg font-semibold text-slate-900">
                    {benefit.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;