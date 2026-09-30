import { useEffect, useState } from "react";
import {
  Search,
  SlidersHorizontal,
  X,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
} from "lucide-react";
import { useSearchParams } from "react-router-dom";

import ServiceCard from "../../components/services/ServiceCard";
import { getAllServices } from "../../api/service.api";
import { getAllCategories } from "../../api/category.api";

const ServicesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // -----------------------------
  // Filters
  // -----------------------------
  const [search, setSearch] = useState(
    searchParams.get("search") || ""
  );

  const [category, setCategory] = useState(
    searchParams.get("category") || ""
  );

  const [provider, setProvider] = useState(
    searchParams.get("provider") || ""
  );

  const [city, setCity] = useState(
    searchParams.get("city") || ""
  );

  const [serviceType, setServiceType] = useState(
    searchParams.get("serviceType") || ""
  );

  const [minPrice, setMinPrice] = useState(
    searchParams.get("minPrice") || ""
  );

  const [maxPrice, setMaxPrice] = useState(
    searchParams.get("maxPrice") || ""
  );

  const [sort, setSort] = useState(
    searchParams.get("sort") || "newest"
  );

  // -----------------------------
  // Services
  // -----------------------------
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [page, setPage] = useState(
    Number(searchParams.get("page")) || 1
  );

  const [totalPages, setTotalPages] = useState(1);
  const [totalServices, setTotalServices] = useState(0);

  // -----------------------------
  // Categories
  // -----------------------------
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] =
    useState(true);

  // Mobile filter
  const [showFilters, setShowFilters] = useState(false);

  // -----------------------------
  // Fetch Categories
  // -----------------------------
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategoriesLoading(true);

        const response = await getAllCategories();

        setCategories(response.data || []);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setCategoriesLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // -----------------------------
  // Sync URL
  // -----------------------------
  useEffect(() => {
    const params = new URLSearchParams();

    if (search.trim()) {
      params.set("search", search.trim());
    }

    if (category) {
      params.set("category", category);
    }

    if (provider.trim()) {
      params.set("provider", provider.trim());
    }

    if (city.trim()) {
      params.set("city", city.trim());
    }

    if (serviceType) {
      params.set("serviceType", serviceType);
    }

    if (minPrice !== "") {
      params.set("minPrice", minPrice);
    }

    if (maxPrice !== "") {
      params.set("maxPrice", maxPrice);
    }

    if (sort !== "newest") {
      params.set("sort", sort);
    }

    if (page > 1) {
      params.set("page", String(page));
    }

    setSearchParams(params, { replace: true });
  }, [
    search,
    category,
    provider,
    city,
    serviceType,
    minPrice,
    maxPrice,
    sort,
    page,
    setSearchParams,
  ]);

  // -----------------------------
  // Fetch Services
  // -----------------------------
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getAllServices({
          page,
          limit: 6,
          search,
          category,
          provider,
          city,
          serviceType,
          minPrice,
          maxPrice,
          sort,
        });

        setServices(response.data?.services || []);
        setTotalPages(response.data?.totalPages || 1);
        setTotalServices(response.data?.totalServices || 0);
      } catch (error) {
        console.error("Failed to fetch services:", error);

        setError(
          error.message || "Failed to load services"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [
    page,
    search,
    category,
    provider,
    city,
    serviceType,
    minPrice,
    maxPrice,
    sort,
  ]);

  // -----------------------------
  // Handlers
  // -----------------------------
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleCategoryChange = (slug) => {
    setCategory(slug);
    setPage(1);
  };

  const handleProviderChange = (e) => {
    setProvider(e.target.value);
    setPage(1);
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
    setPage(1);
  };

  const handleServiceTypeChange = (e) => {
    setServiceType(e.target.value);
    setPage(1);
  };

  const handleMinPriceChange = (e) => {
    setMinPrice(e.target.value);
    setPage(1);
  };

  const handleMaxPriceChange = (e) => {
    setMaxPrice(e.target.value);
    setPage(1);
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
    setPage(1);
  };

  const clearFilters = () => {
    setSearch("");
    setCategory("");
    setProvider("");
    setCity("");
    setServiceType("");
    setMinPrice("");
    setMaxPrice("");
    setSort("newest");
    setPage(1);
  };

  const hasFilters =
    search ||
    category ||
    provider ||
    city ||
    serviceType ||
    minPrice ||
    maxPrice ||
    sort !== "newest";

  return (
    <main className="min-h-screen bg-gray-50">
      {/* =========================================
          HERO
      ========================================= */}
      <section className="border-b border-gray-200 bg-white">
  <div className="mx-auto max-w-7xl px-6 pt-16">
    {/* Hero */}
    <div className="mx-auto max-w-3xl text-center">
      <span className="text-sm font-semibold tracking-wide text-blue-600">
        SERVICES MARKETPLACE
      </span>

      <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
        Find the right service.
        <span className="block text-blue-600">
          Get it done.
        </span>
      </h1>

      <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-gray-500">
        Discover skilled professionals offering services
        across different categories and locations.
      </p>

      {/* Search */}
      <div className="mx-auto mt-8 flex max-w-2xl items-center rounded-2xl border border-gray-200 bg-white p-1.5 shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all focus-within:border-blue-500 focus-within:shadow-[0_8px_30px_rgb(37,99,235,0.12)]">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gray-50">
          <Search
            size={20}
            className="text-gray-500"
          />
        </div>

        <input
          type="text"
          placeholder="Search services, skills or providers..."
          value={search}
          onChange={handleSearchChange}
          className="h-11 w-full bg-transparent px-3 text-sm text-gray-900 outline-none placeholder:text-gray-400 sm:text-base"
        />

        {search && (
          <button
            onClick={() => {
              setSearch("");
              setPage(1);
            }}
            className="mr-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
          >
            <X size={17} />
          </button>
        )}
      </div>
    </div>

    {/* Categories */}
    <div className="mt-14 border-t border-gray-100 py-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="shrink-0">
          <p className="text-sm font-semibold text-gray-900">
            Browse categories
          </p>
          <p className="mt-0.5 text-xs text-gray-400">
            Explore what you need
          </p>
        </div>

        <div className="hidden h-8 w-px bg-gray-200 sm:block" />

        <div className="flex min-w-0 gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {/* All */}
          <button
            onClick={() => handleCategoryChange("")}
            className={`shrink-0 rounded-lg border px-4 py-2 text-sm font-medium transition ${
              category === ""
                ? "border-blue-600 bg-blue-600 text-white shadow-sm"
                : "border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300 hover:bg-white hover:text-gray-900"
            }`}
          >
            All Services
          </button>

          {/* API Categories */}
          {!categoriesLoading &&
            categories.map((item) => (
              <button
                key={item._id}
                onClick={() =>
                  handleCategoryChange(item.slug)
                }
                className={`shrink-0 rounded-lg border px-4 py-2 text-sm font-medium transition ${
                  category === item.slug
                    ? "border-blue-600 bg-blue-600 text-white shadow-sm"
                    : "border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300 hover:bg-white hover:text-gray-900"
                }`}
              >
                {item.name}
              </button>
            ))}

          {/* Loading */}
          {categoriesLoading && (
            <>
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="h-9 w-24 shrink-0 animate-pulse rounded-lg bg-gray-100"
                />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  </div>
</section>

      {/* =========================================
          CONTENT
      ========================================= */}
      <section className="mx-auto max-w-7xl px-6 py-10">
        {/* Mobile filter button */}
        <div className="mb-6 flex items-center justify-between lg:hidden">
          <div>
            <p className="text-sm text-gray-500">
              {totalServices} services found
            </p>
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 rounded-xl border bg-white px-4 py-2.5 text-sm font-medium shadow-sm"
          >
            <SlidersHorizontal size={17} />
            Filters
          </button>
        </div>

        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          {/* =========================================
              FILTER SIDEBAR
          ========================================= */}
          <aside
            className={`${
              showFilters ? "block" : "hidden"
            } lg:block`}
          >
            <div className="sticky top-24 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal
                    size={18}
                    className="text-gray-700"
                  />

                  <h2 className="font-semibold text-gray-900">
                    Filters
                  </h2>
                </div>

                {hasFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-xs font-medium text-blue-600 hover:text-blue-700"
                  >
                    Reset
                  </button>
                )}
              </div>

              {/* Provider */}
              <div className="mt-5">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Provider
                </label>

                <input
                  type="text"
                  value={provider}
                  onChange={handleProviderChange}
                  placeholder="Provider name"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500"
                />
              </div>

              {/* City */}
              <div className="mt-5">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Location
                </label>

                <input
                  type="text"
                  value={city}
                  onChange={handleCityChange}
                  placeholder="e.g. Delhi"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500"
                />
              </div>

              {/* Service Type */}
              <div className="mt-5">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Service Type
                </label>

                <select
                  value={serviceType}
                  onChange={handleServiceTypeChange}
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                >
                  <option value="">All Types</option>
                  <option value="online">Online</option>
                  <option value="onsite">On-site</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>

              {/* Price */}
              <div className="mt-5">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Price Range
                </label>

                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    min="0"
                    value={minPrice}
                    onChange={handleMinPriceChange}
                    placeholder="Min"
                    className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                  />

                  <input
                    type="number"
                    min="0"
                    value={maxPrice}
                    onChange={handleMaxPriceChange}
                    placeholder="Max"
                    className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Sort */}
              <div className="mt-5">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Sort By
                </label>

                <select
                  value={sort}
                  onChange={handleSortChange}
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                >
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                  <option value="price_asc">
                    Price: Low to High
                  </option>
                  <option value="price_desc">
                    Price: High to Low
                  </option>
                  <option value="rating">
                    Highest Rated
                  </option>
                </select>
              </div>

              {hasFilters && (
                <button
                  onClick={clearFilters}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
                >
                  <RotateCcw size={15} />
                  Clear all filters
                </button>
              )}
            </div>
          </aside>

          {/* =========================================
              SERVICES
          ========================================= */}
          <div>
            {/* Result header */}
            <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {search
                    ? `Results for "${search}"`
                    : category
                    ? categories.find(
                        (item) => item.slug === category
                      )?.name || "Services"
                    : "All Services"}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {totalServices} services available
                </p>
              </div>

              {hasFilters && (
                <button
                  onClick={clearFilters}
                  className="hidden items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 sm:flex"
                >
                  <X size={15} />
                  Clear filters
                </button>
              )}
            </div>

            {/* Loading */}
            {loading && (
              <div className="grid gap-6 sm:grid-cols-2">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div
                    key={item}
                    className="overflow-hidden rounded-2xl border bg-white"
                  >
                    <div className="h-52 animate-pulse bg-gray-100" />

                    <div className="space-y-3 p-5">
                      <div className="h-4 w-20 animate-pulse rounded bg-gray-100" />
                      <div className="h-6 w-3/4 animate-pulse rounded bg-gray-100" />
                      <div className="h-4 w-1/2 animate-pulse rounded bg-gray-100" />
                      <div className="h-5 w-full animate-pulse rounded bg-gray-100" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Error */}
            {!loading && error && (
              <div className="rounded-2xl border border-red-200 bg-red-50 p-10 text-center">
                <h3 className="text-xl font-semibold text-red-700">
                  Failed to load services
                </h3>

                <p className="mt-2 text-sm text-red-600">
                  {error}
                </p>

                <button
                  onClick={() => setPage(1)}
                  className="mt-5 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-700"
                >
                  Try Again
                </button>
              </div>
            )}

            {/* Services */}
            {!loading &&
              !error &&
              services.length > 0 && (
                <div className="grid gap-6 sm:grid-cols-2">
                  {services.map((service) => (
                    <ServiceCard
                      key={service._id}
                      service={service}
                    />
                  ))}
                </div>
              )}

            {/* Empty */}
            {!loading &&
              !error &&
              services.length === 0 && (
                <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-20 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
                    <Search
                      size={24}
                      className="text-gray-400"
                    />
                  </div>

                  <h3 className="mt-5 text-xl font-semibold text-gray-900">
                    No services found
                  </h3>

                  <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
                    We couldn't find services matching your
                    current search or filters.
                  </p>

                  <button
                    onClick={clearFilters}
                    className="mt-6 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
                  >
                    Clear Filters
                  </button>
                </div>
              )}

            {/* Pagination */}
            {!loading &&
              !error &&
              totalPages > 1 && (
                <div className="mt-10 flex items-center justify-center gap-2">
                  <button
                    disabled={page === 1}
                    onClick={() =>
                      setPage((prev) => prev - 1)
                    }
                    className="flex items-center gap-1 rounded-lg border bg-white px-3 py-2 text-sm font-medium transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ChevronLeft size={16} />
                    Previous
                  </button>

                  <div className="flex items-center gap-1">
                    {Array.from(
                      { length: totalPages },
                      (_, index) => index + 1
                    ).map((pageNumber) => (
                      <button
                        key={pageNumber}
                        onClick={() => setPage(pageNumber)}
                        className={`h-9 min-w-9 rounded-lg px-3 text-sm font-medium transition ${
                          page === pageNumber
                            ? "bg-blue-600 text-white"
                            : "border bg-white text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        {pageNumber}
                      </button>
                    ))}
                  </div>

                  <button
                    disabled={page === totalPages}
                    onClick={() =>
                      setPage((prev) => prev + 1)
                    }
                    className="flex items-center gap-1 rounded-lg border bg-white px-3 py-2 text-sm font-medium transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Next
                    <ChevronRight size={16} />
                  </button>
                </div>
              )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default ServicesPage;