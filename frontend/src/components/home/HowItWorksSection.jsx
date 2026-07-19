import { Search, Users, CheckCircle, Star } from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Search",
    description: "Find services by category, location, or keyword.",
    icon: Search,
  },
  {
    step: "02",
    title: "Compare",
    description: "Browse profiles, ratings, pricing, and reviews.",
    icon: Users,
  },
  {
    step: "03",
    title: "Book",
    description: "Schedule your preferred provider in seconds.",
    icon: CheckCircle,
  },
  {
    step: "04",
    title: "Review",
    description: "Rate your experience after the service is completed.",
    icon: Star,
  },
];

const HowItWorksSection = () => {
  return (
    <section className="bg-muted/30 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}

        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold text-foreground">
            How ServiceHub Works
          </h2>

          <p className="mt-3 text-muted-foreground">
            Book a verified professional in under 3 minutes
          </p>
        </div>

        {/* Steps */}

        <div className="relative grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="absolute left-[12%] right-[12%] top-8 hidden h-px bg-border lg:block"></div>

          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.step}
                className="relative z-10 flex flex-col items-center text-center"
              >
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-card shadow-sm">
                  <Icon size={26} className="text-primary" />
                </div>

                <span className="mb-2 text-xs font-semibold tracking-widest text-primary">
                  {step.step}
                </span>

                <h3 className="text-lg font-semibold text-foreground">
                  {step.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;