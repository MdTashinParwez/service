import { useMemo, useState, useEffect } from "react";
import { Search } from "lucide-react";

import ServiceCard from "../../components/services/ServiceCard";
import { getAllServices } from "../../api/service.api";

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

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch services from backend
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getAllServices(page, 6);

        console.log("SERVICES:", response);

        setServices(response.data?.services || []);
        setTotalPages(response.data?.totalPages || 1);
      } catch (error) {
        console.error("Failed to fetch services:", error);

        setError(error.message || "Failed to load services");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [page]);

  // Search + Category filtering
  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const searchText = search.toLowerCase();

      const matchSearch =
        service.title?.toLowerCase().includes(searchText) ||
        service.provider?.businessName
          ?.toLowerCase()
          .includes(searchText);

      const matchCategory =
        category === "All" ||
        service.category?.name === category;

      return matchSearch && matchCategory;
    });
  }, [search, category, services]);

  // Reset filters
  const resetFilters = () => {
    setSearch("");
    setCategory("All");
  };

  return (
    <main className="min-h-screen bg-gray-50">

      {/* ================= HERO ================= */}

      <section className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-14">

          {/* Heading */}

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
              <Search
                className="text-gray-400"
                size={20}
              />
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
                className={`rounded-full border px-5 py-2 transition ${
                  category === item
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-gray-200 bg-white hover:bg-gray-100"
                }`}
              >
                {item}
              </button>
            ))}

          </div>

        </div>
      </section>

      {/* ================= SERVICES ================= */}

      <section className="mx-auto max-w-7xl px-6 py-14">

        {/* Header */}

        <div className="mb-8 flex items-center justify-between">

          <h2 className="text-2xl font-bold text-gray-900">
            {filteredServices.length} Services Found
          </h2>

          <select className="rounded-lg border bg-white px-4 py-2">
            <option>Recommended</option>
            <option>Price: Low to High</option>
            <option>Highest Rated</option>
          </select>

        </div>

        {/* ================= LOADING ================= */}

        {loading && (
          <div className="py-20 text-center">

            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />

            <p className="mt-4 text-gray-500">
              Loading services...
            </p>

          </div>
        )}

        {/* ================= ERROR ================= */}

        {!loading && error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 py-16 text-center">

            <h3 className="text-2xl font-semibold text-red-600">
              Failed to Load Services
            </h3>

            <p className="mt-2 text-red-500">
              {error}
            </p>

            <button
              onClick={() => window.location.reload()}
              className="mt-6 rounded-lg bg-red-600 px-6 py-3 text-white transition hover:bg-red-700"
            >
              Try Again
            </button>

          </div>
        )}

        {/* ================= SERVICES GRID ================= */}

        {!loading &&
          !error &&
          filteredServices.length > 0 && (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

              {filteredServices.map((service) => (
                <ServiceCard
                  key={service._id}
                  service={service}
                />
              ))}

            </div>
          )}

        {/* ================= NO SERVICES ================= */}

        {!loading &&
          !error &&
          filteredServices.length === 0 && (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white py-20 text-center">

              <h3 className="text-2xl font-semibold text-gray-800">
                No Services Found
              </h3>

              <p className="mt-2 text-gray-500">
                Try changing your search or category.
              </p>

              <button
                onClick={resetFilters}
                className="mt-6 rounded-lg bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700"
              >
                Reset Filters
              </button>

            </div>
          )}

        {/* ================= PAGINATION ================= */}

        {!loading &&
          !error &&
          totalPages > 0 && (
            <div className="mt-16 flex items-center justify-center gap-3">

              {/* Previous */}

              <button
                onClick={() => setPage((prev) => prev - 1)}
                disabled={page === 1}
                className="rounded-lg border bg-white px-4 py-2 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Previous
              </button>

              {/* Page Numbers */}

              {Array.from(
                { length: totalPages },
                (_, index) => index + 1
              ).map((pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => setPage(pageNumber)}
                  className={`rounded-lg px-4 py-2 ${
                    page === pageNumber
                      ? "bg-blue-600 text-white"
                      : "border bg-white hover:bg-gray-100"
                  }`}
                >
                  {pageNumber}
                </button>
              ))}

              {/* Next */}

              <button
                onClick={() => setPage((prev) => prev + 1)}
                disabled={page === totalPages}
                className="rounded-lg border bg-white px-4 py-2 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next
              </button>

            </div>
          )}

      </section>

    </main>
  );
};

export default ServicesPage;