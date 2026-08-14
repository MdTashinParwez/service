import { Link } from "react-router-dom";
import { BadgeCheck, BriefcaseBusiness, ShieldCheck, Star } from "lucide-react";

const ProviderProfileCard = ({ provider }) => {
  if (!provider) return null;

  return (
    <section className="overflow-hidden rounded-[28px] border border-slate-200/80 bg-white shadow-[0_18px_50px_-34px_rgba(15,23,42,0.45)]">
      <div className="border-b border-slate-100 px-6 py-5">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
          Provider
        </p>
        <h2 className="mt-2 text-xl font-bold text-slate-950">
          Who will handle your service
        </h2>
      </div>

      <div className="space-y-5 p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-100 text-xl font-bold text-blue-700">
            {provider.businessName?.charAt(0)?.toUpperCase() || "P"}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <Link
                to={`/providers/${provider._id}`}
                className="truncate text-lg font-bold text-slate-950 transition hover:text-blue-600"
              >
                {provider.businessName || "Unknown Provider"}
              </Link>

              {provider.isVerified && (
                <BadgeCheck size={17} className="shrink-0 text-blue-600" />
              )}
            </div>

            <p className="mt-1 text-sm text-slate-500">
              Professional service provider
            </p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl bg-slate-50 p-4">
            <div className="flex items-center gap-1 text-sm text-slate-500">
              <Star size={15} className="fill-amber-400 text-amber-400" />
              Rating
            </div>
            <p className="mt-1 text-2xl font-bold text-slate-950">
              {provider.averageRating ?? 0}
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4">
            <div className="flex items-center gap-1 text-sm text-slate-500">
              <BriefcaseBusiness size={15} className="text-blue-600" />
              Reviews
            </div>
            <p className="mt-1 text-2xl font-bold text-slate-950">
              {provider.totalReviews ?? 0}
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4 text-sm leading-6 text-blue-800">
          <div className="flex items-start gap-2">
            <ShieldCheck size={17} className="mt-0.5 shrink-0" />
            <span>
              {provider.isVerified
                ? "Verified service provider with a trusted record of completed work."
                : "Service provider verification is in progress."}
            </span>
          </div>
        </div>

        <Link
          to={`/providers/${provider._id}`}
          className="inline-flex w-full items-center justify-center rounded-xl border border-slate-200 px-4 py-3 font-semibold text-slate-700 transition hover:border-blue-200 hover:text-blue-700"
        >
          View provider profile
        </Link>
      </div>
    </section>
  );
};

export default ProviderProfileCard;
