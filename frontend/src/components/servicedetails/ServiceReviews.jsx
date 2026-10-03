import { MessageSquare, Star } from "lucide-react";

const ServiceReviews = ({ service }) => {
  const rating = Number(service?.rating ?? 0);
  const reviewCount = Number(service?.reviewCount ?? 0);

  const reviews = Array.isArray(service?.reviews)
    ? service.reviews
    : [];

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div>
        <p className="text-sm font-semibold text-blue-600">
          Reviews
        </p>

        <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-950">
          What customers say
        </h2>
      </div>

      {/* Rating summary */}

      <div className="mt-6 flex flex-col gap-6 rounded-2xl bg-slate-50 p-5 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <Star
              size={22}
              className="fill-amber-400 text-amber-400"
            />

            <span className="text-3xl font-bold text-slate-950">
              {rating.toFixed(1)}
            </span>
          </div>

          <p className="mt-1 text-sm text-slate-500">
            Based on {reviewCount.toLocaleString("en-IN")}{" "}
            {reviewCount === 1 ? "review" : "reviews"}
          </p>
        </div>
      </div>

      {/* Reviews */}

      {reviews.length > 0 ? (
        <div className="mt-6 divide-y divide-slate-100">
          {reviews.map((review) => (
            <article
              key={review._id}
              className="py-6 first:pt-0 last:pb-0"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 font-semibold text-blue-700">
                    {(
                      review.user?.name ||
                      "U"
                    )
                      .charAt(0)
                      .toUpperCase()}
                  </div>

                  <div>
                    <p className="font-semibold text-slate-900">
                      {review.user?.name || "Customer"}
                    </p>

                    {review.createdAt && (
                      <p className="text-xs text-slate-400">
                        {new Date(
                          review.createdAt
                        ).toLocaleDateString("en-IN")}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <Star
                    size={14}
                    className="fill-amber-400 text-amber-400"
                  />

                  <span className="text-sm font-semibold text-slate-700">
                    {Number(review.rating || 0).toFixed(1)}
                  </span>
                </div>
              </div>

              {review.comment && (
                <p className="mt-4 text-sm leading-6 text-slate-600">
                  {review.comment}
                </p>
              )}
            </article>
          ))}
        </div>
      ) : (
        <div className="mt-6 flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-6 py-10 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white">
            <MessageSquare
              size={20}
              className="text-slate-400"
            />
          </div>

          <h3 className="mt-4 font-semibold text-slate-900">
            No reviews yet
          </h3>

          <p className="mt-1 max-w-sm text-sm leading-6 text-slate-500">
            Reviews from customers will appear here after
            completed bookings.
          </p>
        </div>
      )}
    </section>
  );
};

export default ServiceReviews;