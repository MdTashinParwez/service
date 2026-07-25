import { Link } from "react-router-dom";
import { Star, MapPin } from "lucide-react";

const ServiceCard = ({ service }) => {
  return (
    <Link
      to={`/services/${service.id}`}
      className="block overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      {/* Image */}
      <div className="h-52 overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          className="h-full w-full object-cover transition duration-500 hover:scale-110"
        />
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Category */}
        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-600">
          {service.category}
        </span>

        {/* Title */}
        <h3 className="mt-3 text-xl font-semibold text-gray-900">
          {service.title}
        </h3>

        {/* Provider */}
        <p className="mt-1 text-sm text-gray-500">
          by {service.provider}
        </p>

        {/* Rating */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star
              size={16}
              className="fill-yellow-400 text-yellow-400"
            />
            <span className="font-medium">{service.rating}</span>
            <span className="text-sm text-gray-500">
              ({service.reviews})
            </span>
          </div>

          <div className="flex items-center gap-1 text-sm text-gray-500">
            <MapPin size={15} />
            {service.location}
          </div>
        </div>

        {/* Price */}
        <div className="mt-5 flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-gray-900">
              ₹{service.price}
            </span>

            <span className="text-sm text-gray-500">
              {" "}
              / service
            </span>
          </div>

          <span className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white transition hover:bg-blue-700">
            View Details
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ServiceCard;