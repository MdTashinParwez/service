import { Star } from "lucide-react";

const ServiceReviews = ({ service }) => {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            Reviews
          </p>
          <h2 className="mt-2 text-2xl font-bold text-slate-950">
            Customers say the work is reliable
          </h2>
        </div>
        <div className="rounded-lg bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-700">
          {service.rating}/5 average from {service.reviews} reviews
        </div>
      </div>

      <div className="mt-7 space-y-4">
        {service.reviewsData.map((review) => (
          <div
            key={review.id}
            className="rounded-lg border border-slate-200 p-5"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-semibold text-slate-950">
                  {review.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {review.date}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Star
                  size={17}
                  className="fill-yellow-400 text-yellow-400"
                />
                <span className="font-semibold text-slate-950">
                  {review.rating}
                </span>
              </div>
            </div>

            <p className="mt-4 leading-7 text-slate-600">
              {review.comment}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServiceReviews;
