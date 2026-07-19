const stats = [
  {
    value: "12,000+",
    label: "Verified Providers",
  },
  {
    value: "50,000+",
    label: "Happy Customers",
  },
  {
    value: "280+",
    label: "Cities Covered",
  },
  {
    value: "4.9/5",
    label: "Average Rating",
  },
];

const StatsSection = () => {
  return (
    <section className="-mt-8 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-6 rounded-3xl border border-border bg-card p-8 shadow-lg lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <h2 className="text-3xl font-bold text-primary lg:text-4xl">
                {stat.value}
              </h2>

              <p className="mt-2 text-sm text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;