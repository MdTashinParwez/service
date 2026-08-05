const ServiceGallery = ({ service }) => {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
        Work preview
      </p>
      <h2 className="mt-2 text-2xl font-bold text-slate-950">
        Service gallery
      </h2>

      <div className="mt-7 grid gap-3 md:grid-cols-3">
        {service.gallery.map((image, index) => (
          <div
            key={index}
            className={index === 0 ? "md:col-span-2 md:row-span-2" : ""}
          >
            <img
              src={image}
              alt={`${service.title} gallery ${index + 1}`}
              className="h-56 w-full rounded-lg object-cover md:h-full"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServiceGallery;
