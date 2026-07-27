import {
  Star,
  MapPin,
  Briefcase,
  ShieldCheck,
} from "lucide-react";

const ProviderHero = ({ provider }) => {
  return (
    <section className="border-b bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-12 lg:flex-row lg:items-center lg:justify-between">

        {/* Left */}
        <div className="flex items-center gap-6">

          <img
            src={provider.image}
            alt={provider.name}
            className="h-32 w-32 rounded-full border-4 border-blue-100 object-cover"
          />

          <div>

            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
              <ShieldCheck size={16} />
              Verified Provider
            </div>

            <h1 className="text-4xl font-bold text-gray-900">
              {provider.name}
            </h1>

            <p className="mt-2 text-lg text-gray-600">
              {provider.profession}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-5 text-sm text-gray-600">

              <div className="flex items-center gap-1">
                <Star
                  size={16}
                  className="fill-yellow-400 text-yellow-400"
                />
                <span className="font-semibold">
                  {provider.rating}
                </span>
                <span>
                  ({provider.reviews} Reviews)
                </span>
              </div>

              <div className="flex items-center gap-1">
                <MapPin size={16} />
                {provider.location}
              </div>

              <div className="flex items-center gap-1">
                <Briefcase size={16} />
                {provider.experience}
              </div>

            </div>

          </div>

        </div>

        {/* Right */}

        <div className="flex gap-4">

          <button className="rounded-xl bg-blue-600 px-7 py-3 font-semibold text-white transition hover:bg-blue-700">
            Contact Provider
          </button>

          <button className="rounded-xl border border-gray-300 px-7 py-3 font-semibold transition hover:bg-gray-100">
            View Services
          </button>

        </div>

      </div>
    </section>
  );
};

export default ProviderHero;