import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BadgeCheck, BriefcaseBusiness, Clock3, Star, ShieldCheck } from "lucide-react";

import { getProviderById } from "../../api/provider.api";

const ProviderPage = () => {
  const { providerId } = useParams();

  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProvider = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getProviderById(providerId);

        console.log("PROVIDER DETAILS:", response);

        setProvider(response.data);
      } catch (error) {
        console.error("Failed to fetch provider:", error);

        setError(
          error.message || "Failed to load provider"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProvider();
  }, [providerId]);

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="animate-pulse space-y-6">
            <div className="h-56 rounded-3xl bg-white" />
            <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
              <div className="h-80 rounded-2xl bg-white" />
              <div className="h-64 rounded-2xl bg-white" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="rounded-2xl border border-red-100 bg-white p-10 text-center shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">
            Failed to load provider
          </h2>

          <p className="mt-2 text-sm text-red-500">
            {error}
          </p>
        </div>
      </main>
    );
  }

  if (!provider) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <h2 className="text-2xl font-bold text-slate-900">
          Provider Not Found
        </h2>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">

      {/* Header */}

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">

          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <div className="flex flex-wrap items-center gap-3">

                <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                  {provider.businessName}
                </h1>

                {provider.isVerified && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
                    <BadgeCheck size={16} />
                    Verified
                  </span>
                )}

              </div>

              <p className="mt-3 text-slate-500">
                {provider.businessCategory?.name || "Professional Service Provider"}
              </p>
            </div>

            {provider.isApproved && (
              <div className="inline-flex items-center gap-2 self-start rounded-xl bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
                <ShieldCheck size={18} />
                Approved Provider
              </div>
            )}

          </div>

        </div>
      </section>


      {/* Content */}

      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8">

        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">

          {/* Main */}

          <div className="space-y-6">

            {/* About */}

            <section className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">

              <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                About
              </p>

              <h2 className="mt-2 text-2xl font-bold text-slate-950">
                About this provider
              </h2>

              <p className="mt-5 max-w-3xl leading-8 text-slate-600">
                {provider.businessDescription}
              </p>

            </section>


            {/* Stats */}

            <section className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">

              <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                Performance
              </p>

              <h2 className="mt-2 text-2xl font-bold text-slate-950">
                Provider performance
              </h2>

              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

                <StatCard
                  icon={<BriefcaseBusiness size={19} />}
                  label="Total Bookings"
                  value={provider.totalBookings ?? 0}
                />

                <StatCard
                  icon={<ShieldCheck size={19} />}
                  label="Completed"
                  value={provider.completedBookings ?? 0}
                />

                <StatCard
                  icon={<Star size={19} />}
                  label="Reviews"
                  value={provider.totalReviews ?? 0}
                />

                <StatCard
                  icon={<Clock3 size={19} />}
                  label="Response Time"
                  value={`${provider.responseTime ?? 0} min`}
                />

              </div>

            </section>


            {/* Services */}

            <section className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">

              <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                Services
              </p>

              <h2 className="mt-2 text-2xl font-bold text-slate-950">
                Services offered
              </h2>

              <div className="mt-6 rounded-xl bg-slate-50 p-6 text-center">

                <p className="text-slate-500">
                  Provider services will appear here.
                </p>

              </div>

            </section>

          </div>


          {/* Sidebar */}

          <aside className="space-y-5 lg:sticky lg:top-24">

            {/* Rating */}

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm text-slate-500">
                    Provider Rating
                  </p>

                  <div className="mt-2 flex items-center gap-2">

                    <Star
                      size={21}
                      className="fill-amber-400 text-amber-400"
                    />

                    <span className="text-2xl font-bold text-slate-950">
                      {provider.averageRating ?? 0}
                    </span>

                  </div>
                </div>

                <div className="rounded-xl bg-amber-50 p-3">
                  <Star
                    size={22}
                    className="fill-amber-400 text-amber-400"
                  />
                </div>

              </div>

            </section>


            {/* Verification */}

            <section className="rounded-2xl border border-blue-100 bg-blue-50 p-6">

              <div className="flex gap-3">

                <ShieldCheck
                  size={22}
                  className="mt-0.5 shrink-0 text-blue-600"
                />

                <div>
                  <h3 className="font-bold text-blue-950">
                    Trusted Provider
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-blue-800">
                    This provider has completed the platform verification
                    process and is approved to offer services.
                  </p>
                </div>

              </div>

            </section>


            {/* Contact */}

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <h3 className="text-lg font-bold text-slate-950">
                Interested in this provider?
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Browse their available services and book directly.
              </p>

              <button
                className="mt-5 w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                View Services
              </button>

            </section>

          </aside>

        </div>

      </section>

    </main>
  );
};


const StatCard = ({ icon, label, value }) => {
  return (
    <div className="rounded-xl bg-slate-50 p-4">

      <div className="flex items-center gap-2 text-slate-500">
        {icon}
        <span className="text-sm">
          {label}
        </span>
      </div>

      <p className="mt-2 text-xl font-bold text-slate-950">
        {value}
      </p>

    </div>
  );
};


export default ProviderPage;