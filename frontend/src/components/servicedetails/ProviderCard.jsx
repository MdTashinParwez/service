import { Star, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const ProviderCard = ({ provider }) => {
  return (
    <section className="rounded-3xl border bg-white p-8 shadow-sm">

      <h2 className="text-2xl font-bold text-gray-900">
        Service Provider
      </h2>

      <div className="mt-8 flex items-center gap-5">

        <Link to={`/providers/${provider.id}`}>

          <img
            src={provider.image}
            alt={provider.name}
            className="h-24 w-24 rounded-full object-cover transition hover:opacity-90"
          />

        </Link>

        <div>

          <Link
            to={`/providers/${provider.id}`}
            className="text-xl font-bold transition hover:text-blue-600"
          >
            {provider.name}
          </Link>

          <p className="mt-1 text-gray-600">
            {provider.profession}
          </p>

          <div className="mt-3 flex items-center gap-5 text-gray-600">

            <div className="flex items-center gap-2">

              <Star
                size={18}
                className="fill-yellow-400 text-yellow-400"
              />

              <span>{provider.rating}</span>

            </div>

            <div className="flex items-center gap-2">

              <MapPin
                size={18}
                className="text-blue-600"
              />

              <span>{provider.location}</span>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default ProviderCard;