import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const ProviderServices = ({ provider }) => {
  const services = provider?.services || [];

  return (
    <section className="rounded-2xl border bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900">
        Services Offered
      </h2>

      <p className="mt-3 text-gray-600">
        Explore the services currently offered by this provider.
      </p>

      {services.length > 0 ? (
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {services.map((service) => (
            <Link
              key={service._id}
              to={`/services/${service._id}`}
              className="overflow-hidden rounded-xl border transition hover:shadow-lg"
            >
              <img
                src={
                  service?.image ||
                  "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800"
                }
                alt={service?.title || "Service"}
                className="h-48 w-full object-cover"
              />

              <div className="p-5">
                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                  {service?.category || "Service"}
                </span>

                <h3 className="mt-3 text-lg font-semibold">
                  {service?.title || "Untitled Service"}
                </h3>

                <div className="mt-5 flex items-center justify-between">
                  <span className="text-xl font-bold text-blue-600">
                    ₹{service?.price ?? 0}
                  </span>

                  <ArrowRight
                    size={18}
                    className="text-blue-600"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-xl border border-dashed p-10 text-center">
          <p className="text-gray-500">
            No services have been added yet.
          </p>
        </div>
      )}
    </section>
  );
};

export default ProviderServices;