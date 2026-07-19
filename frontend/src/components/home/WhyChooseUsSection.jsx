import { Shield, Clock, Zap, Heart, CheckCircle } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Verified Providers",
    description:
      "Identity verification, document checks and background screening before every provider goes live.",
  },
  {
    icon: Clock,
    title: "Real-time Tracking",
    description:
      "Track your booking from request to completion with real-time updates.",
  },
  {
    icon: Zap,
    title: "Instant Booking",
    description:
      "Book your preferred professional in minutes without unnecessary calls.",
  },
  {
    icon: Heart,
    title: "Quality Guarantee",
    description:
      "If you're not satisfied, we'll make it right or refund your money.",
  },
];

const WhyChooseUsSection = () => {
  return (
    <section className="py-20">
      <div className="mx-auto grid max-w-7xl gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        {/* Left */}

        <div>
          <h2 className="text-4xl font-bold leading-tight text-foreground">
            Built for trust.
            <br />
            Designed for scale.
          </h2>

          <p className="mt-6 text-muted-foreground leading-7">
            ServiceHub isn't just another marketplace. Every provider is
            verified, every booking is protected, and every customer gets a
            transparent and secure experience.
          </p>

          <div className="mt-10 space-y-8">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div key={feature.title} className="flex gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <Icon className="text-primary" size={22} />
                  </div>

                  <div>
                    <h3 className="font-semibold text-foreground">
                      {feature.title}
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right */}

        <div className="relative">
          <div className="overflow-hidden rounded-3xl">
            <img
              src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=900&auto=format&fit=crop"
              alt="Professional"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="absolute -bottom-5 left-6 rounded-2xl border border-border bg-card p-5 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="text-green-600" size={20} />
              </div>

              <div>
                <h4 className="font-semibold text-foreground">
                  Booking Confirmed
                </h4>

                <p className="text-sm text-muted-foreground">
                  Arjun Mehta • Tomorrow, 10:00 AM
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;