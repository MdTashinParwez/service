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
  return (
    <aside className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <div className="rounded-lg bg-slate-950 p-5 text-white">
        <p className="text-sm text-slate-300">Starting price</p>
        <h2 className="mt-2 text-3xl font-bold">Rs. {service.price}</h2>
        <p className="mt-3 text-sm leading-6 text-slate-300">
          Final price is confirmed after diagnosis and before work begins.
        </p>
      </div>

      <div className="mt-6 space-y-4">
        {[
          { icon: Clock3, label: "Duration", value: service.duration },
          { icon: CalendarCheck, label: "Availability", value: "Available today" },
          { icon: Wallet, label: "Payment", value: "Pay after service" },
        ].map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-center justify-between gap-4">
            <span className="flex items-center gap-2 text-sm text-slate-500">
              <Icon size={16} className="text-blue-600" />
              {label}
            </span>
            <span className="text-sm font-semibold text-slate-950">{value}</span>
          </div>
        ))}
      </div>

      <Link
        to={`/booking/${service.id}`}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
      >
        <CalendarCheck size={18} />
        Book Now
      </Link>

      <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 py-3 font-semibold text-slate-700 transition hover:bg-slate-50">
        <MessageCircle size={18} />
        Message Provider
      </button>

      <div className="mt-5 space-y-3 border-t border-slate-200 pt-5">
        {[
          "Verified technician",
          "Transparent quote before repair",
          "Support available after booking",
        ].map((item) => (
          <div key={item} className="flex items-center gap-2 text-sm text-slate-600">
            <CheckCircle2 size={16} className="text-emerald-600" />
            {item}
          </div>
        ))}
        <div className="flex items-start gap-2 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-800">
          <ShieldCheck size={17} className="mt-0.5 shrink-0" />
          Protected booking with service issue support.
        </div>
      </div>
    </aside>
  );
};

export default BookingPanel;
