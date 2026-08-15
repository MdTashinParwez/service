import { useEffect, useState } from "react";

import ProviderHero from "../../components/providers/ProviderHero";
import ProviderSearch from "../../components/providers/ProviderSearch";
import ProviderFilters from "../../components/providers/ProviderFilters";
import ProviderCard from "../../components/providers/ProviderCard";
import ProviderPagination from "../../components/providers/ProviderPagination";

import { getAllProviders } from "../../api/provider.api";

const ProvidersPage = () => {

  const [providers, setProviders] = useState([]);
  const [categories, setCategories] = useState([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);
  const [totalProviders, setTotalProviders] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const limit = 6;

  useEffect(() => {

    const fetchProviders = async () => {

      try {

        setLoading(true);
        setError("");

        const response = await getAllProviders(
          currentPage,
          limit,
          search,
          category
        );

        const data = response.data;

        setProviders(data.providers || []);
        setTotalPages(data.totalPages || 1);
        setTotalProviders(data.totalProviders || 0);

      } catch (error) {

        console.error("Failed to fetch providers:", error);

        setError(
          error.message || "Failed to load providers"
        );

      } finally {

        setLoading(false);

      }
    };

    fetchProviders();

  }, [currentPage, search, category]);


  const handleSearch = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };


  const handleCategory = (value) => {
    setCategory(value);
    setCurrentPage(1);
  };


  return (
    <main className="min-h-screen bg-slate-50">

      <ProviderHero />

      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8">

        {/* Search / Filter */}

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

          <div className="flex flex-col gap-3 md:flex-row">

            <ProviderSearch
              search={search}
              setSearch={handleSearch}
            />

            <ProviderFilters
              category={category}
              setCategory={handleCategory}
              categories={categories}
            />

          </div>

        </div>


        {/* Heading */}

        <div className="mt-10 flex items-end justify-between">

          <div>

            <p className="text-sm font-medium text-blue-600">
              {totalProviders} professionals available
            </p>

            <h2 className="mt-1 text-2xl font-bold text-slate-950">
              Service Providers
            </h2>

          </div>

        </div>


        {/* Loading */}

        {loading && (

          <div className="grid gap-6 pt-6 md:grid-cols-2 lg:grid-cols-3">

            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-[390px] animate-pulse rounded-2xl bg-white"
              />
            ))}

          </div>

        )}


        {/* Error */}

        {!loading && error && (

          <div className="mt-6 rounded-2xl border border-red-100 bg-white p-10 text-center">

            <h3 className="font-semibold text-red-600">
              Failed to load providers
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              {error}
            </p>

          </div>

        )}


        {/* Providers */}

        {!loading && !error && (

          <>
            {providers.length > 0 ? (

              <div className="grid gap-6 pt-6 md:grid-cols-2 lg:grid-cols-3">

                {providers.map((provider) => (
                  <ProviderCard
                    key={provider._id}
                    provider={provider}
                  />
                ))}

              </div>

            ) : (

              <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-12 text-center">

                <h3 className="text-lg font-semibold text-slate-900">
                  No providers found
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  Try another search or category.
                </p>

              </div>

            )}

            <ProviderPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />

          </>

        )}

      </section>

    </main>
  );
};

export default ProvidersPage;