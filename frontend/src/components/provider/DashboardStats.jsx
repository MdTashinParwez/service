import {
  CalendarCheck,
  CheckCircle2,
  IndianRupee,
  Star,
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
      {/* HEADER */}

      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          Dashboard
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Here's what's happening with your provider account.
        </p>
      </div>

      {/* STATS */}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {stat.title}
                  </p>

                  <div className="mt-2 flex items-center gap-1.5">
                    <p className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </p>

                    {stat.title === "Average Rating" && (
                      <Star
                        size={17}
                        className="fill-yellow-400 text-yellow-400"
                      />
                    )}
                  </div>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Icon size={21} />
                </div>
              </div>

              <p className="mt-4 text-xs text-gray-400">
                {stat.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default DashboardStats;