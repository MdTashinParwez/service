import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  CalendarCheck2,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileCheck2,
  Handshake,
  MapPin,
  MessageCircle,
  Search,
  ShieldCheck,
  Sparkles,
  UserRoundCheck,
  UsersRound,
} from "lucide-react";

import { Link } from "react-router-dom";


const About = () => {
  const customerSteps = [
    {
      number: "01",
      icon: Search,
      title: "Discover nearby services",
      description:
        "Search for the service you need and explore providers available around your area.",
    },
    {
      number: "02",
      icon: UserRoundCheck,
      title: "Compare providers",
      description:
        "Review provider profiles, services, pricing, ratings and other available information.",
    },
    {
      number: "03",
      icon: CalendarCheck2,
      title: "Book a service",
      description:
        "Choose a suitable service and request a booking based on the provider's availability.",
    },
    {
      number: "04",
      icon: MessageCircle,
      title: "Stay updated",
      description:
        "Track your booking status and receive updates throughout the booking journey.",
    },
  ];

  const providerBenefits = [
    {
      icon: UsersRound,
      title: "Reach local customers",
      description:
        "Put your services in front of people searching for help in your area.",
    },
    {
      icon: CalendarCheck2,
      title: "Manage bookings",
      description:
        "Receive booking requests and manage them from your provider dashboard.",
    },
    {
      icon: Clock3,
      title: "Manage availability",
      description:
        "Control your schedule and decide when customers can request your services.",
    },
    {
      icon: BriefcaseBusiness,
      title: "Grow your business",
      description:
        "Build your provider profile, showcase your services and earn through completed work.",
    },
  ];

  const trustPoints = [
    {
      icon: BadgeCheck,
      title: "Provider verification",
      description:
        "Providers are required to submit identity information during the provider onboarding process.",
    },
    {
      icon: FileCheck2,
      title: "Transparent service information",
      description:
        "Customers can review service details, pricing and provider information before booking.",
    },
    {
      icon: ShieldCheck,
      title: "Protected account access",
      description:
        "Authentication and authorization help protect customer and provider accounts.",
    },
  ];

  return (
    <main className="min-h-screen bg-white text-gray-900">

      {/* =========================================================
          HERO
      ========================================================= */}

      <section className="relative overflow-hidden border-b border-gray-100 bg-gray-50">
        <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-blue-100/60 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -left-20 h-80 w-80 rounded-full bg-indigo-100/50 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3.5 py-2 text-xs font-semibold text-gray-600 shadow-sm">
              <Sparkles size={14} className="text-blue-600" />
              Local services. Local people. One platform.
            </div>

            <h1 className="mt-6 max-w-4xl text-4xl font-bold tracking-tight text-gray-950 sm:text-5xl lg:text-6xl">
              Find trusted local service providers{" "}
              <span className="text-blue-600">
                around you.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg">
              ServiceHub connects customers with independent service
              providers in their local area, making it easier to discover,
              compare and book the help they need.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/services"
                className="
                  inline-flex items-center justify-center gap-2
                  rounded-xl bg-gray-900
                  px-5 py-3
                  text-sm font-semibold text-white
                  transition hover:bg-gray-800
                "
              >
                Explore Services
                <ArrowRight size={17} />
              </Link>

              <Link
                to="/become-provider"
                className="
                  inline-flex items-center justify-center gap-2
                  rounded-xl border border-gray-200
                  bg-white px-5 py-3
                  text-sm font-semibold text-gray-700
                  shadow-sm transition hover:bg-gray-50
                "
              >
                Become a Provider
                <BriefcaseBusiness size={17} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          WHAT SERVICEHUB DOES
      ========================================================= */}

      <section className="border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">

            <div>
              <p className="text-sm font-semibold text-blue-600">
                What is ServiceHub?
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
                We don't own the service.
                <br />
                <span className="text-gray-500">
                  We connect you to the people who provide it.
                </span>
              </h2>

              <p className="mt-5 max-w-xl text-sm leading-7 text-gray-600 sm:text-base">
                ServiceHub is a marketplace and discovery platform for local
                services. The providers listed on the platform are
                independent individuals or businesses who offer their own
                services to customers.
              </p>

              <p className="mt-4 max-w-xl text-sm leading-7 text-gray-600 sm:text-base">
                That means when you book a plumber, electrician, tutor,
                cleaner or another professional through ServiceHub, the
                actual service is provided by that independent provider.
                ServiceHub helps make the discovery and booking experience
                easier.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <InfoCard
                icon={MapPin}
                title="Local first"
                text="Discover providers operating in or around your area."
              />

              <InfoCard
                icon={Handshake}
                title="Independent providers"
                text="Connect directly with professionals running their own services."
              />

              <InfoCard
                icon={Search}
                title="Easy discovery"
                text="Search, compare and understand your options before booking."
              />

              <InfoCard
                icon={CalendarCheck2}
                title="Structured booking"
                text="Move from discovery to booking through one platform."
              />
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================
          HOW IT WORKS
      ========================================================= */}

      <section className="border-b border-gray-100 bg-gray-50">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20">

          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold text-blue-600">
              How it works
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
              From finding a service to getting it done.
            </h2>

            <p className="mt-4 text-sm leading-6 text-gray-600 sm:text-base">
              ServiceHub keeps the customer journey straightforward.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {customerSteps.map((step) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  className="
                    rounded-2xl
                    border border-gray-200
                    bg-white p-6
                    shadow-sm
                  "
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-50 text-gray-600">
                      <Icon size={19} />
                    </div>

                    <span className="text-xs font-bold tracking-widest text-gray-300">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="mt-6 text-base font-bold text-gray-900">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* =========================================================
          NEARBY / LOCAL VALUE
      ========================================================= */}

      <section className="border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20">

          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

            <div className="order-2 lg:order-1">
              <div className="overflow-hidden rounded-3xl border border-gray-200 bg-gray-950 p-6 shadow-sm sm:p-8">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-white/50">
                        Your area
                      </p>

                      <p className="mt-1 text-lg font-bold text-white">
                        Nearby providers
                      </p>
                    </div>

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white">
                      <MapPin size={18} />
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    {[
                      "Home electrician",
                      "AC repair",
                      "Cleaning service",
                    ].map((service, index) => (
                      <div
                        key={service}
                        className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3"
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-2.5 w-2.5 rounded-full bg-emerald-400" />

                          <span className="text-sm font-medium text-white">
                            {service}
                          </span>
                        </div>

                        <span className="text-xs text-white/50">
                          {index + 1}.2 km
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 flex items-center gap-2 text-xs text-white/50">
                  <CheckCircle2 size={14} className="text-emerald-400" />
                  Discover providers operating near you
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <p className="text-sm font-semibold text-blue-600">
                Why local?
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
                Sometimes the best person for the job is already nearby.
              </h2>

              <p className="mt-5 text-sm leading-7 text-gray-600 sm:text-base">
                ServiceHub is built around local discovery. Instead of
                limiting customers to a fixed company network, the platform
                helps them discover independent professionals operating in
                their neighbourhood or nearby locations.
              </p>

              <div className="mt-7 space-y-4">
                <BulletPoint>
                  Find service providers closer to your location.
                </BulletPoint>

                <BulletPoint>
                  Compare different providers before making a decision.
                </BulletPoint>

                <BulletPoint>
                  Support independent professionals and local businesses.
                </BulletPoint>

                <BulletPoint>
                  Build longer-term trust with providers you may already
                  know or discover through the platform.
                </BulletPoint>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================
          VERIFIED PROVIDERS
      ========================================================= */}

      <section className="border-b border-gray-100 bg-gray-50">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20">

          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-blue-600">
              Trust comes first
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
              Know who you're booking.
            </h2>

            <p className="mt-4 text-sm leading-7 text-gray-600 sm:text-base">
              ServiceHub is designed to create more transparency between
              customers and independent providers. Provider onboarding
              includes identity information and platform-level verification
              processes.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {trustPoints.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="
                    rounded-2xl
                    border border-gray-200
                    bg-white p-6
                    shadow-sm
                  "
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <Icon size={19} />
                  </div>

                  <h3 className="mt-5 text-base font-bold text-gray-900">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4">
            <p className="text-sm leading-6 text-amber-800">
              Verification helps increase trust, but customers should still
              review provider information, service details and booking
              information carefully before proceeding.
            </p>
          </div>

        </div>
      </section>

      {/* =========================================================
          PROVIDER SECTION
      ========================================================= */}

      <section className="border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20">

          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">

            <div>
              <p className="text-sm font-semibold text-blue-600">
                For independent providers
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
                Have a skill, service or local business?
              </h2>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base">
                ServiceHub gives independent professionals a place to
                showcase their services and connect with customers looking
                for those services locally.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {providerBenefits.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.title}
                      className="rounded-2xl border border-gray-200 p-5"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-50 text-gray-600">
                        <Icon size={18} />
                      </div>

                      <h3 className="mt-4 text-sm font-bold text-gray-900">
                        {item.title}
                      </h3>

                      <p className="mt-1.5 text-sm leading-6 text-gray-500">
                        {item.description}
                      </p>
                    </div>
                  );
                })}
              </div>

              <Link
                to="/become-provider"
                className="
                  mt-8 inline-flex items-center gap-2
                  rounded-xl bg-gray-900
                  px-5 py-3
                  text-sm font-semibold text-white
                  transition hover:bg-gray-800
                "
              >
                Join ServiceHub as a Provider
                <ArrowRight size={17} />
              </Link>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-gray-50 p-6 sm:p-8">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Provider journey
              </p>

              <div className="mt-6 space-y-5">
                <TimelineItem
                  number="01"
                  title="Apply as a provider"
                  text="Create your provider profile and submit the required information."
                />

                <TimelineItem
                  number="02"
                  title="Complete verification"
                  text="Submit identity information for the platform's verification process."
                />

                <TimelineItem
                  number="03"
                  title="Publish your services"
                  text="Add your services, pricing, descriptions and availability."
                />

                <TimelineItem
                  number="04"
                  title="Start receiving bookings"
                  text="Manage customer requests and grow your local service business."
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================
          OUR ROLE / WHAT WE DON'T DO
      ========================================================= */}

      <section className="border-b border-gray-100 bg-gray-50">
        <div className="mx-auto max-w-5xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20">

          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8 lg:p-10">

            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gray-900 text-white">
                <ShieldCheck size={19} />
              </div>

              <div>
                <p className="text-sm font-semibold text-blue-600">
                  Our role
                </p>

                <h2 className="mt-1 text-2xl font-bold tracking-tight text-gray-950">
                  What ServiceHub does — and what it doesn't.
                </h2>
              </div>
            </div>

            <div className="mt-8 grid gap-8 md:grid-cols-2">

              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  ServiceHub provides
                </p>

                <div className="mt-4 space-y-3">
                  <CheckLine text="Service and provider discovery" />
                  <CheckLine text="Provider profiles and service information" />
                  <CheckLine text="Booking workflows" />
                  <CheckLine text="Account and booking updates" />
                  <CheckLine text="Platform-level trust and verification mechanisms" />
                </div>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  ServiceHub does not
                </p>

                <div className="mt-4 space-y-3">
                  <CheckLine text="Own every provider listed on the platform" muted />
                  <CheckLine text="Employ every person providing a service" muted />
                  <CheckLine text="Operate every listed local business" muted />
                  <CheckLine text="Replace the provider's responsibility for the actual service" muted />
                  <CheckLine text="Guarantee every service outcome simply because a provider is listed" muted />
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* =========================================================
          POLICIES
      ========================================================= */}

      <section className="border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20">

          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-blue-600">
              Platform information
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
              Clear policies. Better expectations.
            </h2>

            <p className="mt-4 text-sm leading-7 text-gray-600 sm:text-base">
              Before using the platform, customers and providers should
              understand how bookings, accounts, payments, cancellations,
              provider participation and platform responsibilities work.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">

            <PolicyCard
              title="Terms & Conditions"
              description="Understand the rules and responsibilities for using ServiceHub."
              to="/terms"
            />

            <PolicyCard
              title="Privacy Policy"
              description="Learn how account and platform data is handled."
              to="/privacy"
            />

            <PolicyCard
              title="Provider Policy"
              description="Understand provider participation, verification and service responsibilities."
              to="/provider-policy"
            />

          </div>

        </div>
      </section>

      {/* =========================================================
          FINAL CTA
      ========================================================= */}

      <section className="bg-gray-950">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20">

          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

            <div className="max-w-2xl">
              <p className="text-sm font-semibold text-blue-400">
                Built around local communities
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                The next service you need might already be nearby.
              </h2>

              <p className="mt-4 text-sm leading-7 text-white/60 sm:text-base">
                Explore local providers, compare your options and choose
                the service that works for you.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                to="/services"
                className="
                  inline-flex items-center justify-center gap-2
                  rounded-xl bg-white
                  px-5 py-3
                  text-sm font-semibold text-gray-900
                  transition hover:bg-gray-100
                "
              >
                Find a Service
                <ArrowRight size={17} />
              </Link>

              <Link
                to="/providers"
                className="
                  inline-flex items-center justify-center gap-2
                  rounded-xl border border-white/15
                  bg-white/5
                  px-5 py-3
                  text-sm font-semibold text-white
                  transition hover:bg-white/10
                "
              >
                Explore Providers
                <ChevronRight size={17} />
              </Link>
            </div>

          </div>

        </div>
      </section>
    </main>
  );
};

/* =========================================================
   SMALL COMPONENTS
========================================================= */

const InfoCard = ({ icon: Icon, title, text }) => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-gray-600 shadow-sm">
        <Icon size={18} />
      </div>

      <h3 className="mt-4 text-sm font-bold text-gray-900">
        {title}
      </h3>

      <p className="mt-1.5 text-sm leading-6 text-gray-500">
        {text}
      </p>
    </div>
  );
};

const BulletPoint = ({ children }) => {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
        <CheckCircle2 size={13} />
      </div>

      <p className="text-sm leading-6 text-gray-600">
        {children}
      </p>
    </div>
  );
};

const TimelineItem = ({ number, title, text }) => {
  return (
    <div className="flex gap-4">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-900 text-xs font-bold text-white">
        {number}
      </div>

      <div>
        <h3 className="text-sm font-bold text-gray-900">
          {title}
        </h3>

        <p className="mt-1 text-sm leading-6 text-gray-500">
          {text}
        </p>
      </div>
    </div>
  );
};

const CheckLine = ({ text, muted = false }) => {
  return (
    <div className="flex items-start gap-3">
      <CheckCircle2
        size={17}
        className={
          muted
            ? "mt-0.5 shrink-0 text-gray-300"
            : "mt-0.5 shrink-0 text-emerald-600"
        }
      />

      <p className="text-sm leading-6 text-gray-600">
        {text}
      </p>
    </div>
  );
};

const PolicyCard = ({ title, description, to }) => {
  return (
    <Link
      to={to}
      className="
        group rounded-2xl
        border border-gray-200
        bg-gray-50 p-5
        transition
        hover:border-gray-300
        hover:bg-white
        hover:shadow-sm
      "
    >
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-sm font-bold text-gray-900">
          {title}
        </h3>

        <ArrowRight
          size={17}
          className="
            text-gray-400
            transition-transform
            group-hover:translate-x-0.5
            group-hover:text-gray-700
          "
        />
      </div>

      <p className="mt-2 text-sm leading-6 text-gray-500">
        {description}
      </p>
    </Link>
  );
};

export default About;