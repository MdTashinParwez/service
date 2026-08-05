import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { services } from "../../constants/services";

const RecommendedServices = ({ currentServiceId }) => {
  const relatedServices = services
    .filter((item) => item.id !== currentServiceId)
    .slice(0, 3);

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
        Keep browsing
      </p>
      <h2 className="mt-2 text-2xl font-bold text-slate-950">
        Related services
      </h2>

      <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {relatedServices.map((service) => (
          <Link
            key={service.id}
            to={`/services/${service.id}`}
            className="overflow-hidden rounded-lg border border-slate-200 bg-white transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
          >
            <img
              src={service.image}
              alt={service.title}
              className="h-40 w-full object-cover"
            />
            <div className="p-4">
              <h3 className="font-bold text-slate-950">{service.title}</h3>
              <div className="mt-3 flex items-center gap-2 text-sm text-slate-600">
                <Star size={16} className="fill-yellow-400 text-yellow-400" />
                <span>{service.rating}</span>
              </div>
              <p className="mt-4 text-lg font-bold text-blue-600">
                Rs. {service.price}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RecommendedServices;
