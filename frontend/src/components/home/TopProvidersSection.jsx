import { ChevronRight, MapPin, Star } from "lucide-react";
import { providers } from "../../constants/hero";

const TopProvidersSection = () => {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground">
              Top-rated providers
            </h2>

            <p className="mt-2 text-muted-foreground">
              Verified professionals trusted by thousands
            </p>
          </div>

          <button className="hidden items-center gap-1 text-sm font-medium text-primary hover:underline sm:flex">
            See all
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Providers */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {providers.map((provider) => (
            <div
              key={provider.name}
              className="group overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={`https://images.unsplash.com/${provider.img}?w=600&h=500&fit=crop&auto=format`}
                  alt={provider.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                <span
                  className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold text-white ${
                    provider.badge === "Top Rated"
                      ? "bg-blue-600"
                      : provider.badge === "Verified"
                      ? "bg-emerald-500"
                      : "bg-amber-500"
                  }`}
                >
                  {provider.badge}
                </span>
              </div>

              {/* Content */}
              <div className="space-y-3 p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {provider.name}
                    </h3>

                    <p className="text-sm text-muted-foreground">
                      {provider.role}
                    </p>
                  </div>

                  <span className="font-semibold text-primary">
                    {provider.price}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star
                      size={14}
                      className="fill-yellow-400 text-yellow-400"
                    />

                    <span className="text-sm font-medium">
                      {provider.rating}
                    </span>

                    <span className="text-xs text-muted-foreground">
                      ({provider.reviews})
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin size={12} />
                    {provider.location}
                  </div>
                </div>

                <button className="mt-2 w-full rounded-lg bg-primary py-2.5 text-sm font-medium text-white transition hover:bg-blue-700">
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopProvidersSection;