import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Heart,
  MapPin,
  Share2,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";

const ServiceHero = ({ service }) => {
  const images = service.images?.filter(Boolean) || [];
  const image = images[0] || "/placeholder-service.jpg";
  const currencyCode = service.currency || "INR";
  const priceValue = Number(service.price ?? 0);

  let formattedPrice = `${currencyCode} ${priceValue}`;

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
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

      {/* Image */}
      <div className="h-[380px] overflow-hidden bg-slate-100">
        <img
          src={image}
          alt={service.title}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-8">

        {/* Category */}
        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
          {service.category?.name || "Service"}
        </span>

        {/* Title */}
        <h1 className="mt-4 text-4xl font-bold text-gray-900">
          {service.title}
        </h1>

        {/* Meta */}
        <div className="mt-5 flex flex-wrap items-center gap-6 text-gray-600">

          {/* Rating */}
          <div className="flex items-center gap-2">
            <Star
              size={18}
              className="fill-yellow-400 text-yellow-400"
            />

            <span className="font-medium">
              {service.rating ?? 0}
            </span>

            <span>
              ({service.reviewCount ?? 0} Reviews)
            </span>
          </div>

          {/* Service Type */}
          <div className="flex items-center gap-2">
            <MapPin
              size={18}
              className="text-blue-600"
            />

            <span>
              {service.serviceType === "onsite"
                ? "On-site Service"
                : "Online Service"}
            </span>
          </div>

        </div>

        {/* Description */}
        <p className="mt-5 max-w-3xl leading-7 text-gray-600">
          {service.description}
        </p>

        {/* Price */}
        <div className="mt-8">

          <p className="text-sm text-gray-500">
            Starting From
          </p>

          <h2 className="mt-2 text-3xl font-bold text-blue-600">
            {service.currency === "INR" ? "₹" : service.currency}{" "}
            {service.price}
          </h2>

        </div>

      </div>
    </section>
  );
};

export default ServiceHero;
