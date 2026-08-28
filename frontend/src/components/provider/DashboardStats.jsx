import {
  CalendarCheck,
  CheckCircle2,
  IndianRupee,
  Star,
  TrendingUp,
} from "lucide-react";

const DashboardStats = ({ provider }) => {
  const formatEarnings = (amount) => {
    return new Intl.NumberFormat("en-IN").format(amount ?? 0);
  };

  const stats = [
    {
      title: "Total Bookings",
      value: provider?.totalBookings ?? 0,
      icon: CalendarCheck,
      description: "All time bookings",
    },
    {
      title: "Completed",
      value: provider?.completedBookings ?? 0,
      icon: CheckCircle2,
      description: "Successfully completed",
    },
    {
      title: "Total Earnings",
      value: `₹${formatEarnings(provider?.totalEarnings)}`,
      icon: IndianRupee,
      description: "Total earnings",
    },
    {
      title: "Average Rating",
      value: provider?.averageRating?.toFixed(1) ?? "0.0",
      icon: Star,
      description: "Customer rating",
    },
  ];

  return (
    <section>
      {/* =====================================================
          STATS GRID
      ===================================================== */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="
                group relative overflow-hidden
                rounded-2xl border border-gray-200/80
                bg-white p-5
                shadow-sm
                transition-all duration-300
                hover:-translate-y-1
                hover:border-gray-300
                hover:shadow-lg
              "
            >
              {/* Subtle background decoration */}
              <div
                className="
                  pointer-events-none absolute
                  -right-8 -top-8
                  h-24 w-24 rounded-full
                  bg-blue-50/70
                  transition-transform duration-500
                  group-hover:scale-150
                "
              />

              <div className="relative">
                {/* TOP */}
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-500">
                      {stat.title}
                    </p>

                    <div className="mt-2 flex items-center gap-1.5">
                      <p className="truncate text-2xl font-bold tracking-tight text-gray-900 sm:text-[26px]">
                        {stat.value}
                      </p>

                      {stat.title === "Average Rating" && (
                        <Star
                          size={17}
                          className="shrink-0 fill-yellow-400 text-yellow-400"
                        />
                      )}
                    </div>
                  </div>

                  {/* ICON */}
                  <div
                    className="
                      flex h-11 w-11 shrink-0
                      items-center justify-center
                      rounded-xl
                      bg-blue-50
                      text-blue-600
                      transition-transform duration-300
                      group-hover:scale-105
                    "
                  >
                    <Icon size={21} strokeWidth={2} />
                  </div>
                </div>

                {/* DIVIDER */}
                <div className="my-4 h-px bg-gray-100" />

                {/* DESCRIPTION */}
                <div className="flex items-center gap-2">
                  <TrendingUp
                    size={14}
                    className="text-gray-400"
                  />

                  <p className="text-xs font-medium text-gray-400">
                    {stat.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default DashboardStats