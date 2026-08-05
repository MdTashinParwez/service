import {
  ArrowLeft,
  BadgeCheck,
  Clock3,
  Heart,
  MapPin,
  Share2,
  ShieldCheck,
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";

const ServiceHero = ({ service }) => {
  return (
    <section>
      <div className="mb-5 flex items-center justify-between gap-4">
        <Link
          to="/services"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-slate-950"
        >
          <ArrowLeft size={16} />
          Services
        </Link>

        <div className="flex items-center gap-2">
          <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950">
            <Share2 size={17} />
          </button>
          <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600">
            <Heart size={17} />
          </button>
        </div>
      </div>

      <div className="grid overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm lg:grid-cols-[minmax(0,1fr)_430px]">
        <div className="relative min-h-[360px]">
          <img
            src={service.image}
            alt={service.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />
          <div className="absolute bottom-5 left-5 right-5 flex flex-wrap gap-2">
            <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-900 shadow-sm">
              {service.category}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-white shadow-sm">
              <BadgeCheck size={13} />
              Verified service
            </span>
          </div>
        </div>

        <div className="flex flex-col justify-between p-6 sm:p-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
              Book trusted professionals
            </p>
            <h1 className="mt-3 text-3xl font-bold leading-tight text-slate-950 sm:text-4xl">
              {service.title}
            </h1>
            <p className="mt-4 line-clamp-3 leading-7 text-slate-600">
              {service.description}
            </p>
          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-slate-200 p-4">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Star size={16} className="fill-amber-400 text-amber-400" />
                Rating
              </div>
              <p className="mt-2 text-xl font-bold text-slate-950">
                {service.rating}{" "}
                <span className="text-sm font-medium text-slate-500">
                  ({service.reviews} reviews)
                </span>
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 p-4">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Clock3 size={16} className="text-blue-600" />
                Duration
              </div>
              <p className="mt-2 text-xl font-bold text-slate-950">
                {service.duration}
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 p-4">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <MapPin size={16} className="text-blue-600" />
                Location
              </div>
              <p className="mt-2 text-xl font-bold text-slate-950">
                {service.location}
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 p-4">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <ShieldCheck size={16} className="text-emerald-600" />
                Starting from
              </div>
              <p className="mt-2 text-xl font-bold text-slate-950">
                Rs. {service.price}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceHero;
