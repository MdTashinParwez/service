import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { services } from "../../constants/services";

const RelatedServices = ({ currentServiceId }) => {
  const relatedServices = services.filter(
    (item) => item.id !== currentServiceId
  ).slice(0,3);

  return (
    <section className="rounded-3xl border bg-white p-8 shadow-sm">

      <h2 className="text-2xl font-bold">
        Related Services
      </h2>

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

        {relatedServices.map((service) => (

          <Link
            key={service.id}
            to={`/services/${service.id}`}
            className="overflow-hidden rounded-2xl border transition hover:-translate-y-1 hover:shadow-lg"
          >

            <img
              src={service.image}
              alt={service.title}
              className="h-48 w-full object-cover"
            />

            <div className="p-5">

              <h3 className="text-lg font-bold">
                {service.title}
              </h3>

              <div className="mt-3 flex items-center gap-2">

                <Star
                  size={16}
                  className="fill-yellow-400 text-yellow-400"
                />

                <span>{service.rating}</span>

              </div>

              <p className="mt-4 text-xl font-bold text-blue-600">
                ₹{service.price}
              </p>

            </div>

          </Link>

        ))}

      </div>

    </section>
  );
};

export default RelatedServices;