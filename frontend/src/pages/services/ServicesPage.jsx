import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import { services } from "../../constants/services";
import ServiceCard from "../../components/services/ServiceCard";

const categories = [
  "All",
  "Home Services",
  "Repairs",
  "Tech",
  "Photography",
  "Fitness",
  "Education",
];

const ServicesPage = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const matchSearch =
        service.title.toLowerCase().includes(search.toLowerCase()) ||
        (service.provider?.name || "").toLowerCase().includes(search.toLowerCase());

      const matchCategory =
        category === "All" || service.category === category;

      return matchSearch && matchCategory;
    });
  }, [search, category]);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}

      <section className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-14">

          <div className="text-center">

            <h1 className="text-5xl font-bold text-gray-900">
              Explore Services
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-gray-600">
              Discover trusted professionals for home services,
              tech, education, photography and much more.
            </p>

          </div>

          {/* Search */}

          <div className="mx-auto flex w-full max-w-3xl overflow-hidden rounded-xl border bg-white shadow-sm">

            <div className="flex items-center px-4">
              <Search className="text-gray-400" size={20} />
            </div>

            <input
              type="text"
              placeholder="Search services..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-2 py-4 outline-none"
            />

          </div>

          {/* Categories */}

          <div className="flex flex-wrap justify-center gap-3">

            {categories.map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className={`rounded-full px-5 py-2 transition ${
                  category === item
                    ? "bg-blue-600 text-white"
                    : "bg-white border hover:bg-gray-100"
                }`}
              >
                {item}
              </button>
            ))}

          </div>
        </div>
      </section>

      {/* Services */}

      <section className="mx-auto max-w-7xl px-6 py-14">

        <div className="mb-8 flex items-center justify-between">

          <h2 className="text-2xl font-bold">
            {filteredServices.length} Services Found
          </h2>

          <select className="rounded-lg border px-4 py-2">

            <option>Recommended</option>

            <option>Price: Low to High</option>

            <option>Highest Rated</option>

          </select>

        </div>
                {/* Services Grid */}

        {filteredServices.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white py-20 text-center">
            <h3 className="text-2xl font-semibold text-gray-800">
              No Services Found
            </h3>

            <p className="mt-2 text-gray-500">
              Try changing your search or category.
            </p>

            <button
              onClick={() => {
                setSearch("");
                setCategory("All");
              }}
              className="mt-6 rounded-lg bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Pagination */}

        <div className="mt-16 flex items-center justify-center gap-3">

          <button className="rounded-lg border px-4 py-2 hover:bg-gray-100">
            Previous
          </button>

          <button className="rounded-lg bg-blue-600 px-4 py-2 text-white">
            1
          </button>

          <button className="rounded-lg border px-4 py-2 hover:bg-gray-100">
            2
          </button>

          <button className="rounded-lg border px-4 py-2 hover:bg-gray-100">
            3
          </button>

          <button className="rounded-lg border px-4 py-2 hover:bg-gray-100">
            Next
          </button>

        </div>

      </section>
    </main>
  );
};

export default ServicesPage;