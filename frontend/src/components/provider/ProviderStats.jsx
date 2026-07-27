import {
  Star,
  Briefcase,
  Users,
  Award,
} from "lucide-react";

const ProviderStats = ({ provider }) => {
  const stats = [
    {
      icon: <Star className="text-yellow-500" size={26} />,
      value: provider?.rating ?? "N/A",
      label: "Average Rating",
    },
    {
      icon: <Users className="text-blue-600" size={26} />,
      value: `${provider?.reviews ?? 0}+`,
      label: "Customer Reviews",
    },
    {
      icon: <Briefcase className="text-green-600" size={26} />,
      value: `${provider?.completedJobs ?? 0}+`,
      label: "Jobs Completed",
    },
    {
      icon: <Award className="text-purple-600" size={26} />,
      value: provider?.experience || "Not specified",
      label: "Experience",
    },
  ];

  return (
    <section className="rounded-2xl border bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900">
        Provider Statistics
      </h2>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-gray-100 bg-gray-50 p-6 text-center transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex justify-center">
              {item.icon}
            </div>

            <h3 className="mt-4 text-3xl font-bold text-gray-900">
              {item.value}
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProviderStats;