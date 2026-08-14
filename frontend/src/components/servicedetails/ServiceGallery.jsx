const ServiceGallery = ({ service }) => {
  const images = (service.images || []).filter(Boolean);

  return (
    <section className="rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-[0_18px_50px_-34px_rgba(15,23,42,0.42)] sm:p-8">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
        Work Preview
      </p>

      <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
        Service Gallery
      </h2>

      {images.length > 0 ? (
        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {images.slice(0, 6).map((image, index) => (
            <div key={index} className={index === 0 ? "sm:col-span-2 lg:col-span-2" : ""}>
              <img
                src={image}
                alt={`${service.title} ${index + 1}`}
                className={`h-full w-full rounded-2xl object-cover shadow-sm ${
                  index === 0 ? "min-h-[320px]" : "min-h-[220px]"
                }`}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-7 rounded-2xl border border-dashed border-slate-200 bg-slate-50 py-12 text-center">
          <p className="font-semibold text-slate-700">
            No images available for this service.
          </p>
          <p className="mt-2 text-sm text-slate-500">
            The provider has not uploaded any service images yet.
          </p>
        </div>
      )}
    </section>
  );
};

export default ServiceGallery;
