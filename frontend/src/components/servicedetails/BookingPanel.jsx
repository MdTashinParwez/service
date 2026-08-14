import { Link } from "react-router-dom";
import {
  CalendarCheck,
  CheckCircle2,
  Clock3,
  MessageCircle,
  ShieldCheck,
  Wallet,
} from "lucide-react";

const BookingPanel = ({ service }) => {
  const currencyCode = service.currency || "INR";
  const priceValue = Number(service.price ?? 0);

  let formattedPrice;

  try {
    formattedPrice = new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: currencyCode,
      maximumFractionDigits: 0,
    }).format(priceValue);
  } catch {
    formattedPrice =
      currencyCode === "INR" ? `Rs. ${priceValue}` : `${currencyCode} ${priceValue}`;
  }

  return (
    <aside
      id="booking-panel"
      className="overflow-hidden rounded-[28px] border border-slate-200/80 bg-white shadow-[0_18px_50px_-34px_rgba(15,23,42,0.55)]"
    >
      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 p-6 text-white">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-200">
          <CalendarCheck size={14} />
          Instant booking
        </div>

        <p className="mt-4 text-sm text-slate-300">Starting price</p>

        <h2 className="mt-2 text-4xl font-bold tracking-tight">{formattedPrice}</h2>

        <p className="mt-3 max-w-xs text-sm leading-6 text-slate-300">
          Final price is confirmed before the service begins.
        </p>
      </div>

      <div className="space-y-5 p-6">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl bg-slate-50 p-4">
            <span className="flex items-center gap-2 text-sm text-slate-500">
              <Clock3 size={16} className="text-blue-600" />
              Duration
            </span>

            <p className="mt-2 text-lg font-semibold text-slate-950">
              {service.duration} hour{service.duration === 1 ? "" : "s"}
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4">
            <span className="flex items-center gap-2 text-sm text-slate-500">
              <CalendarCheck size={16} className="text-blue-600" />
              Availability
            </span>

            <p className="mt-2 text-lg font-semibold text-emerald-600">Available now</p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
          <div className="flex items-center justify-between gap-4">
            <span className="flex items-center gap-2 text-sm text-slate-500">
              <Wallet size={16} className="text-blue-600" />
              Service type
            </span>

            <span className="text-sm font-semibold text-slate-950">
              {service.serviceType === "onsite" ? "On-site" : "Online"}
            </span>
          </div>

          <p className="mt-3 text-sm leading-6 text-slate-600">
            Secure payment and clear service confirmation before checkout.
          </p>
        </div>

        <div className="space-y-3 border-t border-slate-200 pt-5">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <CheckCircle2 size={16} className="text-emerald-600" />
            Verified service provider
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-600">
            <CheckCircle2 size={16} className="text-emerald-600" />
            Transparent pricing
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-600">
            <CheckCircle2 size={16} className="text-emerald-600" />
            Support available after booking
          </div>

          <div className="flex items-start gap-2 rounded-2xl bg-emerald-50 p-4 text-sm leading-6 text-emerald-800">
            <ShieldCheck size={17} className="mt-0.5 shrink-0" />
            Protected booking with issue support and clear service updates.
          </div>
        </div>

        <div className="grid gap-3 pt-2 sm:grid-cols-2">
          <Link
            to={`/booking/${service._id}`}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            <CalendarCheck size={18} />
            Book now
          </Link>

          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 font-semibold text-slate-700 transition hover:border-blue-200 hover:text-blue-700"
          >
            <MessageCircle size={18} />
            Message provider
          </button>
        </div>
      </div>
    </aside>
  );
};

export default BookingPanel;
