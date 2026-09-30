import { useEffect, useState } from "react";
import { ArrowUpRight, BadgeCheck, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { getAllProviders } from "../../api/provider.api"

const TopProvidersSection = () => {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProviders = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getAllProviders(1, 6);

      setProviders(response?.data?.providers || []);
    } catch (error) {
      console.error("Failed to fetch providers:", error);
      setError("Unable to load providers. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
              Trusted Professionals
            </p>

            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Find the right provider
            </h2>

            <p className="mt-3 max-w-2xl text-slate-600">
              Explore verified professionals ready to help with your needs.
            </p>
          </div>

          <Link
            to="/providers"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 transition hover:text-blue-600"
          >
            View all providers
            <ArrowUpRight size={17} />
          </Link>
        </div>

        {/* Error */}
        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
            <p className="text-sm text-red-600">{error}</p>

            <button
              onClick={fetchProviders}
              className="mt-4 rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              Try again
            </button>
          </div>
        )}

        {/* Loading */}
        {loading && !error && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="animate-pulse rounded-2xl border border-slate-200 bg-white p-6"
              >
                <div className="mb-5 h-12 w-12 rounded-xl bg-slate-200" />

                <div className="mb-3 h-5 w-3/4 rounded bg-slate-200" />

                <div className="mb-2 h-4 w-1/2 rounded bg-slate-200" />

                <div className="mb-6 h-12 w-full rounded bg-slate-200" />

                <div className="h-10 w-full rounded-xl bg-slate-200" />
              </div>
            ))}
          </div>
        )}

        {/* Providers */}
        {!loading && !error && providers.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {providers.map((provider) => (
              <article
                key={provider._id}
                className="group rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/50"
              >
                {/* Top */}
                <div className="mb-5 flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-lg font-bold text-blue-600">
                    {provider.businessName?.charAt(0)?.toUpperCase() || "P"}
                  </div>

                  {provider.isVerified && (
                    <div className="flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
                      <BadgeCheck size={14} />
                      Verified
                    </div>
                  )}
                </div>

                {/* Info */}
                <h3 className="text-xl font-semibold text-slate-900">
                  {provider.businessName}
                </h3>

                {provider.businessCategory?.name && (
                  <p className="mt-1 text-sm font-medium text-blue-600">
                    {provider.businessCategory.name}
                  </p>
                )}

                <p className="mt-4 line-clamp-3 min-h-[72px] text-sm leading-6 text-slate-600">
                  {provider.businessDescription ||
                    "Professional services tailored to your needs."}
                </p>

                {/* Footer */}
                <div className="mt-6 border-t border-slate-100 pt-5">
                  <Link
                    to={`/provider/${provider._id}`}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-900 hover:bg-slate-900 hover:text-white"
                  >
                    View Profile
                    <ArrowUpRight size={16} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Empty */}
        {!loading && !error && providers.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-16 text-center">
            <h3 className="text-lg font-semibold text-slate-900">
              No providers found
            </h3>

            <p className="mt-2 text-sm text-slate-600">
              There are currently no approved providers available.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default TopProvidersSection;