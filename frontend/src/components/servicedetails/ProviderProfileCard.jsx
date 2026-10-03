import { Link } from "react-router-dom";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Clock3,
  Star,
  UserRound,
} from "lucide-react";

const ProviderProfileCard = ({ provider }) => {
  if (!provider) return null;

  const name = provider.businessName || "Professional Provider";
  const rating = Number(provider.averageRating ?? 0);
  const reviews = Number(provider.totalReviews ?? 0);
  const bookings = Number(provider.totalBookings ?? 0);
  const completedBookings = Number(provider.completedBookings ?? 0);
  const responseTime = Number(provider.responseTime ?? 0);

  const formatResponseTime = () => {
    if (!responseTime) return "Not specified";
    if (responseTime < 60) return `${responseTime} min`;
    return `${Math.round(responseTime / 60)} hr`;
  };

  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="h-24 bg-gradient-to-br from-blue-600 via-indigo-600 to-slate-900" />

      <div className="px-6 pb-6">
        <div className="-mt-10 flex items-end justify-between gap-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl border-4 border-white bg-blue-100 text-2xl font-bold text-blue-700 shadow-sm">
            {name.charAt(0).toUpperCase()}
          </div>

          {provider.isVerified && (
            <span className="mb-1 inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
              <BadgeCheck size={14} />
              Verified
            </span>
          )}
        </div>

        <div className="mt-4">
          <h2 className="text-xl font-bold tracking-tight text-slate-950">
            {name}
          </h2>

          <div className="mt-2 flex items-center gap-2">
            <Star
              size={15}
              className="fill-amber-400 text-amber-400"
            />
            <span className="text-sm font-semibold text-slate-800">
              {rating.toFixed(1)}
            </span>
            <span className="text-sm text-slate-500">
              ({reviews} {reviews === 1 ? "review" : "reviews"})
            </span>
          </div>
        </div>

        {provider.businessDescription && (
          <>
            <div className="my-5 border-t border-slate-100" />

            <div>
              <div className="flex items-center gap-2">
                <UserRound size={17} className="text-blue-600" />
                <h3 className="font-semibold text-slate-900">
                  About the provider
                </h3>
              </div>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                {provider.businessDescription}
              </p>
            </div>
          </>
        )}

        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-slate-50 p-4">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <BriefcaseBusiness size={15} className="text-blue-600" />
              Completed
            </div>

            <p className="mt-2 text-lg font-bold text-slate-900">
              {completedBookings.toLocaleString("en-IN")}
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Clock3 size={15} className="text-blue-600" />
              Response
            </div>

            <p className="mt-2 text-lg font-bold text-slate-900">
              {formatResponseTime()}
            </p>
          </div>
        </div>

        <div className="mt-3 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
          <p className="text-xs text-slate-500">Total bookings</p>
          <p className="mt-1 text-sm font-semibold text-slate-900">
            {bookings.toLocaleString("en-IN")}
          </p>
        </div>

        {provider._id && (
          <Link
            to={`/provider/${provider._id}`}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
          >
            View provider profile
            <ArrowRight size={16} />
          </Link>
        )}
      </div>
    </section>
  );
};

export default ProviderProfileCard;