import { Link } from "react-router-dom";import {
  Star,
  MapPin,
  Monitor,
  ArrowUpRight,
} from "lucide-react";

const ServiceCard = ({ service }) => {
  const image =
    service.images?.[0] || "/placeholder-service.jpg";

  const serviceType = service.serviceType || "online";

  const serviceTypeConfig = {
    online: {
      label: "Online",
      icon: Monitor,
    },
    onsite: {
      label: "On-site",
      icon: MapPin,
    },
    hybrid: {
      label: "Hybrid",
      icon: Monitor,
    },
  };

  const type =
    serviceTypeConfig[serviceType] ||
    serviceTypeConfig.online;

  const TypeIcon = type.icon;

  return (
    <Link
      to={`/services/${service._id}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-xl"
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden bg-gray-100">
        <img
          src={image}
          alt={service.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Image Overlay */}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/35 to-transparent" />

        {/* Category */}
        {service.category?.name && (
          <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-gray-700 shadow-sm backdrop-blur">
            {service.category.name}
          </span>
        )}

        {/* View Icon */}
        <div className="absolute right-4 top-4 flex h-9 w-9 translate-y-1 items-center justify-center rounded-full bg-white/95 text-gray-700 opacity-0 shadow-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight size={17} />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        {/* Provider */}
        <p className="truncate text-sm text-gray-500">
          {service.provider?.businessName ||
            "Unknown Provider"}
        </p>

        {/* Title */}
        <h3 className="mt-1.5 line-clamp-2 text-lg font-semibold leading-6 text-gray-900 transition-colors duration-200 group-hover:text-blue-600">
          {service.title}
        </h3>

        {/* Rating / Type */}
        <div className="mt-4 flex items-center justify-between gap-3">
          {/* Rating */}
          <div className="flex items-center gap-1.5">
            <Star
              size={15}
              className="fill-yellow-400 text-yellow-400"
            />

            <span className="text-sm font-semibold text-gray-800">
              {Number(service.rating || 0).toFixed(1)}
            </span>

            <span className="text-sm text-gray-400">
              ({service.reviewCount || 0})
            </span>
          </div>

          {/* Service Type */}
          <div className="flex shrink-0 items-center gap-1.5 text-xs font-medium text-gray-500">
            <TypeIcon size={14} />

            <span>{type.label}</span>
          </div>
        </div>

        {/* Divider */}
        <div className="my-5 border-t border-gray-100" />

        {/* Bottom */}
        <div className="mt-auto flex items-end justify-between gap-4">
          <div>
            <p className="text-xs text-gray-400">
              Starting from
            </p>

            <div className="mt-0.5 flex items-baseline">
              <span className="text-2xl font-bold tracking-tight text-gray-900">
                ₹{service.price}
              </span>

              <span className="ml-1.5 text-xs text-gray-400">
                / service
              </span>
            </div>
          </div>

          <span className="shrink-0 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition-colors duration-200 group-hover:bg-blue-600">
            View Details
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ServiceCard;