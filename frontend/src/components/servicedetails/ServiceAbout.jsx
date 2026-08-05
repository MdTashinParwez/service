import { MapPin, Star } from "lucide-react";

const ServiceHero = ({ service }) => {
  return (
    <section className="overflow-hidden rounded-3xl border bg-white shadow-sm">

      <img
        src={service.image}
        alt={service.title}
        className="h-[380px] w-full object-cover"
      />

      <div className="p-8">

        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
          {service.category}
        </span>

        <h1 className="mt-4 text-4xl font-bold text-gray-900">
          {service.title}
        </h1>

        <div className="mt-5 flex flex-wrap items-center gap-6 text-gray-600">

          <div className="flex items-center gap-2">

            <Star
              size={18}
              className="fill-yellow-400 text-yellow-400"
            />

            <span>
              {service.rating}
            </span>

            <span>
              ({service.reviews} Reviews)
            </span>

          </div>

          <div className="flex items-center gap-2">

            <MapPin
              size={18}
              className="text-blue-600"
            />

            <span>
              {service.location}
            </span>

          </div>

        </div>

        <div className="mt-8">

          <p className="text-sm text-gray-500">
            Starting From
          </p>

          <h2 className="mt-2 text-3xl font-bold text-blue-600">
            ₹{service.price}
          </h2>

        </div>

      </div>

    </section>
  );
};

export default ServiceHero;