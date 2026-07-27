const ProviderAbout = ({ provider }) => {
  return (
    <section className="rounded-2xl border bg-white p-8 shadow-sm">

      <h2 className="text-2xl font-bold text-gray-900">
        About Provider
      </h2>

      <p className="mt-5 leading-8 text-gray-600">
        {provider?.about || "No description available."}
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
            Experience
          </h3>

          <p className="mt-2 text-lg font-semibold text-gray-900">
            {provider?.experience || "Not specified"}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
            Member Since
          </h3>

          <p className="mt-2 text-lg font-semibold text-gray-900">
            {provider?.memberSince || "N/A"}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
            Languages
          </h3>

          <p className="mt-2 text-lg font-semibold text-gray-900">
            {provider?.languages?.length > 0
              ? provider.languages.join(", ")
              : "Not specified"}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
            Availability
          </h3>

          <p className="mt-2 text-lg font-semibold text-green-600">
            {provider?.availability || "Available"}
          </p>
        </div>

      </div>

    </section>
  );
};

export default ProviderAbout;