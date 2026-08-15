import { Link } from "react-router-dom";
import {
  BadgeCheck,
  ArrowRight,
  Building2,
  ShieldCheck,
} from "lucide-react";

const ProviderCard = ({ provider = {} }) => {
  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">

      {/* Top */}

      <div className="relative flex h-40 items-center justify-center bg-gradient-to-br from-blue-50 via-white to-slate-100">

        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white text-2xl font-bold uppercase text-blue-600 shadow-sm ring-1 ring-slate-200">
          {provider.businessName?.charAt(0) || "P"}
        </div>

        {provider.isVerified && (
          <span className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-blue-700 shadow-sm">
            <BadgeCheck size={15} />
            Verified
          </span>
        )}

      </div>

      {/* Content */}

      <div className="p-6">

        <div className="flex items-start justify-between gap-4">

          <div className="min-w-0">

            <h3 className="truncate text-xl font-bold text-slate-950">
              {provider.businessName || "Unnamed Provider"}
            </h3>

            <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">

              <Building2 size={15} />

              <span>
                {provider.businessCategory?.name || "Service Provider"}
              </span>

            </div>

          </div>

        </div>

        {/* Description */}

        <p className="mt-5 line-clamp-3 text-sm leading-6 text-slate-600">
          {provider.businessDescription ||
            "Professional service provider available through ServiceHub."}
        </p>

        {/* Trust */}

        <div className="mt-5 flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2.5 text-xs font-medium text-slate-600">

          <ShieldCheck
            size={16}
            className="text-green-600"
          />

          Approved Service Provider

        </div>

        {/* Action */}

        <Link
          to={`/provider/${provider._id}`}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          View Profile
          <ArrowRight size={17} />
        </Link>

      </div>

    </article>
  );
};

export default ProviderCard;