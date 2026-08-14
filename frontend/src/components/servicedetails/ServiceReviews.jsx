import { Star } from "lucide-react";

const ServiceReviews = ({ service }) => {
  return (
    <section className="rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-[0_18px_50px_-34px_rgba(15,23,42,0.42)] sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
            Reviews
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
            Customer Reviews
          </h2>
        </div>

        <div className="flex items-center gap-2 rounded-2xl bg-amber-50 px-4 py-3">
          <Star size={17} className="fill-yellow-400 text-yellow-400" />
          <span className="font-semibold text-slate-950">{service.rating ?? 0}</span>
          <span className="text-sm text-slate-500">
            ({service.reviewCount ?? 0} reviews)
          </span>
        </div>
      </div>

      <div className="mt-7">
        {service.reviewCount > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-sm font-medium text-slate-500">Review summary</p>
              <p className="mt-2 text-base leading-7 text-slate-600">
                Customer reviews will appear here once the review feed is connected.
              </p>
            </div>

            <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-5">
              <p className="text-sm font-medium text-slate-500">What customers see</p>
              <p className="mt-2 text-base leading-7 text-slate-600">
                Ratings, written feedback, and booking experience details will be shown in this section.
              </p>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-6 py-10 text-center">
            <p className="font-semibold text-slate-700">No reviews yet</p>
            <p className="mt-2 text-sm text-slate-500">
              Be the first customer to review this service.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ServiceReviews;
