import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Aarav Sharma",
    role: "Customer",
    message:
      "The service discovery and booking experience feels simple and straightforward.",
    rating: 5,
  },
  {
    name: "Priya Verma",
    role: "Customer",
    message:
      "Being able to compare different providers before booking makes the process much easier.",
    rating: 5,
  },
  {
    name: "Rahul Kumar",
    role: "Customer",
    message:
      "The platform keeps the important service and booking information in one place.",
    rating: 4,
  },
];

const TestimonialsSection = () => {
  return (
    <section className="bg-slate-50 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Customer feedback
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            What people are saying
          </h2>

          <p className="mt-4 text-base leading-7 text-slate-600">
            Feedback from customers helps us keep improving the service
            discovery and booking experience.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.name}
              className="group relative rounded-2xl border border-slate-200 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/50"
            >
              {/* Quote */}
              <div className="absolute right-6 top-6 text-slate-100">
                <Quote size={42} fill="currentColor" />
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    size={16}
                    className={
                      index < testimonial.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-slate-200"
                    }
                  />
                ))}
              </div>

              {/* Message */}
              <p className="relative mt-6 min-h-[120px] text-sm leading-7 text-slate-600">
                “{testimonial.message}”
              </p>

              {/* User */}
              <div className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
                  {testimonial.name.charAt(0)}
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-slate-900">
                    {testimonial.name}
                  </h3>

                  <p className="mt-0.5 text-xs text-slate-500">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;