import { useState } from "react";
import { Image as ImageIcon, X, ChevronLeft, ChevronRight } from "lucide-react";

const ServiceGallery = ({ service }) => {
  const images = (service.images || []).filter(Boolean);
  const [selectedIndex, setSelectedIndex] = useState(null);

  if (!images.length) {
    return (
      <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-sm font-semibold text-blue-600">
          Gallery
        </p>

        <h2 className="mt-1 text-2xl font-bold text-slate-950">
          Service gallery
        </h2>

        <div className="mt-6 flex min-h-[220px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white">
            <ImageIcon
              size={21}
              className="text-slate-400"
            />
          </div>

          <p className="mt-4 font-medium text-slate-700">
            No images available
          </p>

          <p className="mt-1 text-sm text-slate-500">
            The provider has not uploaded any images yet.
          </p>
        </div>
      </section>
    );
  }

  const openImage = (index) => {
    setSelectedIndex(index);
  };

  const closeImage = () => {
    setSelectedIndex(null);
  };

  const showPrevious = () => {
    setSelectedIndex((current) =>
      current === 0
        ? images.length - 1
        : current - 1
    );
  };

  const showNext = () => {
    setSelectedIndex((current) =>
      current === images.length - 1
        ? 0
        : current + 1
    );
  };

  return (
    <>
      <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-blue-600">
              Gallery
            </p>

            <h2 className="mt-1 text-2xl font-bold text-slate-950">
              Service gallery
            </h2>
          </div>

          <span className="text-sm text-slate-500">
            {images.length}{" "}
            {images.length === 1 ? "image" : "images"}
          </span>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">

          {images.slice(0, 6).map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => openImage(index)}
              className={`group relative overflow-hidden rounded-2xl bg-slate-100 text-left ${
                index === 0
                  ? "col-span-2 aspect-[16/9] lg:col-span-2"
                  : "aspect-[4/3]"
              }`}
            >
              <img
                src={image}
                alt={`${service.title} ${index + 1}`}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/20" />

              {index === 5 && images.length > 6 && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/45">
                  <span className="rounded-full bg-white/95 px-4 py-2 text-sm font-semibold text-slate-900">
                    +{images.length - 6} more
                  </span>
                </div>
              )}
            </button>
          ))}

        </div>
      </section>

      {/* Lightbox */}

      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={closeImage}
        >
          <button
            type="button"
            onClick={closeImage}
            className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >
            <X size={22} />
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              showPrevious();
            }}
            className="absolute left-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:left-8"
          >
            <ChevronLeft size={24} />
          </button>

          <img
            src={images[selectedIndex]}
            alt={`${service.title} ${selectedIndex + 1}`}
            onClick={(event) => event.stopPropagation()}
            className="max-h-[85vh] max-w-[90vw] rounded-xl object-contain"
          />

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              showNext();
            }}
            className="absolute right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:right-8"
          >
            <ChevronRight size={24} />
          </button>

          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-2 text-sm text-white backdrop-blur">
            {selectedIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
};

export default ServiceGallery;