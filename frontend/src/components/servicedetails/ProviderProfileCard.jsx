import { Link } from "react-router-dom";
import { BadgeCheck, MapPin, ShieldCheck, Star } from "lucide-react";

const ProviderProfileCard = ({ provider }) => {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start gap-4">
        <Link to={`/providers/${provider.id}`} className="shrink-0">
          <img
            src={provider.image}
            alt={provider.name}
            className="h-16 w-16 rounded-lg object-cover"
          />
        </Link>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <Link
              to={`/providers/${provider.id}`}
              className="truncate font-bold text-slate-950 transition hover:text-blue-600"
            >
              {provider.name}
            </Link>
            <BadgeCheck size={17} className="shrink-0 text-blue-600" />
          </div>
          <p className="mt-1 text-sm text-slate-500">{provider.profession}</p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-lg bg-slate-50 p-3">
          <div className="flex items-center gap-1 text-sm text-slate-500">
            <Star size={15} className="fill-amber-400 text-amber-400" />
            Rating
          </div>
          <p className="mt-1 font-bold text-slate-950">{provider.rating}</p>
        </div>
        <div className="rounded-lg bg-slate-50 p-3">
          <div className="flex items-center gap-1 text-sm text-slate-500">
            <MapPin size={15} className="text-blue-600" />
            Area
          </div>
          <p className="mt-1 font-bold text-slate-950">{provider.location}</p>
        </div>
      </div>

      <div className="mt-5 flex items-start gap-2 rounded-lg border border-blue-100 bg-blue-50 p-3 text-sm text-blue-800">
        <ShieldCheck size={17} className="mt-0.5 shrink-0" />
        Identity checked, trained, and reviewed by local customers.
      </div>
    </section>
  );
};

export default ProviderProfileCard;
