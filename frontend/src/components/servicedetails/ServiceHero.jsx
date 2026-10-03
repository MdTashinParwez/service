import { Link } from "react-router-dom";
import {
  ArrowRight,
  BadgeCheck,
  Heart,
  MapPin,
  Monitor,
  Share2,
  Star,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

const ServiceHero = ({ service }) => {
  const [activeImage, setActiveImage] = useState(0);
  const [liked, setLiked] = useState(false);

  const images = (service.images || []).filter(Boolean);

  const gallery =
    images.length > 0 ? images : ["/placeholder-service.jpg"];

  const currentImage = gallery[activeImage] || gallery[0];

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
      currencyCode === "INR"
        ? `₹${priceValue}`
        : `${currencyCode} ${priceValue}`;
  }

  const rating = Number(service.rating ?? 0);
  const reviewCount = Number(service.reviewCount ?? 0);

  const serviceType =
    service.serviceType === "onsite"
      ? {
          label: "On-site",
          icon: MapPin,
        }
      : service.serviceType === "hybrid"
      ? {
          label: "Hybrid",
          icon: Monitor,
        }
      : {
          label: "Online",
          icon: Monitor,
        };

  const TypeIcon = serviceType.icon;

  const providerName =
    service.provider?.businessName || "Professional Provider";

  const handleShare = async () => {
    const shareData = {
      title: service.title,
      text: `Check out this service: ${service.title}`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
      }
    } catch {
      // Share cancelled.
    }
  };

  return (
    <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
      <div className="grid lg:grid-cols-[minmax(0,1fr)_150px]">
        <div className="relative h-[320px] overflow-hidden bg-slate-100 sm:h-[400px] lg:h-[460px]">
          <img
            src={currentImage}
            alt={service.title}
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10" />

          {service.category?.name && (
            <div className="absolute left-5 top-5">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3.5 py-2 text-xs font-semibold text-slate-800 shadow-sm backdrop-blur">
                <Sparkles size={14} className="text-blue-600" />
                {service.category.name}
              </span>
            </div>
          )}

          <div className="absolute right-5 top-5 flex items-center gap-2">
            <button
              type="button"
              onClick={() => setLiked((value) => !value)}
              aria-label={
                liked
                  ? "Remove from favorites"
                  : "Add to favorites"
              }
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-slate-700 shadow-sm backdrop-blur transition hover:scale-105 hover:text-red-500"
            >
              <Heart
                size={18}
                className={
                  liked ? "fill-red-500 text-red-500" : ""
                }
              />
            </button>

            <button
              type="button"
              onClick={handleShare}
              aria-label="Share service"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-slate-700 shadow-sm backdrop-blur transition hover:scale-105 hover:text-blue-600"
            >
              <Share2 size={18} />
            </button>
          </div>

          <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
            <div className="text-white">
              <p className="text-sm font-medium text-white/80">
                Professional service
              </p>

              <p className="mt-1 text-lg font-semibold">
                {providerName}
              </p>
            </div>

            <div className="rounded-lg bg-black/45 px-3 py-1.5 text-xs font-medium text-white backdrop-blur">
              {activeImage + 1} / {gallery.length}
            </div>
          </div>
        </div>

        {gallery.length > 1 && (
          <div className="hidden gap-3 bg-slate-50 p-3 lg:flex lg:flex-col">
            {gallery.slice(0, 5).map((image, index) => (
              <button
                key={`${image}-${index}`}
                type="button"
                onClick={() => setActiveImage(index)}
                className={`group relative min-h-0 flex-1 overflow-hidden rounded-xl border-2 transition ${
                  activeImage === index
                    ? "border-blue-600"
                    : "border-transparent hover:border-slate-300"
                }`}
              >
                <img
                  src={image}
                  alt={`${service.title} preview ${index + 1}`}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />

                {activeImage === index && (
                  <div className="absolute inset-0 bg-blue-600/10" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="p-6 sm:p-8 lg:p-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            to={
              service.provider?._id
                ? `/providers/${service.provider._id}`
                : "#"
            }
            className="group inline-flex min-w-0 items-center gap-3"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 font-bold text-blue-700">
              {providerName.charAt(0).toUpperCase()}
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="truncate text-sm font-semibold text-slate-900 group-hover:text-blue-600">
                  {providerName}
                </span>

                {service.provider?.isVerified && (
                  <BadgeCheck
                    size={16}
                    className="shrink-0 text-blue-600"
                  />
                )}
              </div>

              <p className="text-xs text-slate-500">
                Service provider
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-2 rounded-full bg-amber-50 px-3 py-2">
            <Star
              size={16}
              className="fill-amber-400 text-amber-400"
            />

            <span className="text-sm font-bold text-slate-900">
              {rating.toFixed(1)}
            </span>

            <span className="text-xs text-slate-500">
              {reviewCount}{" "}
              {reviewCount === 1 ? "review" : "reviews"}
            </span>
          </div>
        </div>

        <h1 className="mt-6 max-w-4xl text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-[42px] lg:leading-[1.12]">
          {service.title}
        </h1>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3.5 py-2 text-sm font-medium text-slate-700">
            <TypeIcon size={15} className="text-blue-600" />
            {serviceType.label}
          </span>

          {service.location?.city && (
            <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3.5 py-2 text-sm font-medium text-slate-700">
              <MapPin size={15} className="text-blue-600" />
              {service.location.city}
            </span>
          )}

          {service.category?.name && (
            <span className="inline-flex rounded-full bg-blue-50 px-3.5 py-2 text-sm font-medium text-blue-700">
              {service.category.name}
            </span>
          )}
        </div>

        {service.description && (
          <p className="mt-6 max-w-4xl text-[15px] leading-7 text-slate-600 sm:text-base">
            {service.description}
          </p>
        )}

        <div className="my-7 border-t border-slate-100" />

        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
              Starting from
            </p>

            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                {formattedPrice}
              </span>

              <span className="text-sm text-slate-400">
                / service
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:items-end">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-50">
                  <BadgeCheck
                    size={15}
                    className="text-emerald-600"
                  />
                </span>
                Verified provider
              </div>

              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-50">
                  <Sparkles
                    size={15}
                    className="text-blue-600"
                  />
                </span>
                Professional service
              </div>
            </div>

            <Link
              to={`/booking/${service._id}`}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-600 sm:hidden"
            >
              Book Now
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </div>

      {gallery.length > 1 && (
        <div className="flex gap-2 overflow-x-auto border-t border-slate-100 bg-slate-50 p-3 lg:hidden">
          {gallery.slice(0, 6).map((image, index) => (
            <button
              key={`${image}-mobile-${index}`}
              type="button"
              onClick={() => setActiveImage(index)}
              className={`h-16 w-20 shrink-0 overflow-hidden rounded-lg border-2 ${
                activeImage === index
                  ? "border-blue-600"
                  : "border-transparent"
              }`}
            >
              <img
                src={image}
                alt={`${service.title} ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </section>
  );
};

export default ServiceHero;