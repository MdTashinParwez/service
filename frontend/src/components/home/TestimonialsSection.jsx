import { Star } from "lucide-react";
import { testimonials } from "../../constants/hero";

const TestimonialsSection = () => {
  return (
    <section className="bg-muted/30 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}

        <div className="mb-14 text-center">
          <h2 className="text-4xl font-bold text-foreground">
            Trusted by thousands
          </h2>

          <p className="mt-3 text-muted-foreground">
            See what our community is saying
          </p>
        </div>

        {/* Cards */}

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="rounded-2xl border border-border bg-card p-6 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="mb-5 flex gap-1">
                {Array.from({ length: testimonial.rating }).map((_, index) => (
                  <Star
                    key={index}
                    size={18}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              <p className="mb-6 leading-7 text-muted-foreground">
                "{testimonial.text}"
              </p>

              <div className="flex items-center gap-4">
                <img
                  src={`https://images.unsplash.com/${testimonial.img}?w=100&h=100&fit=crop&auto=format`}
                  alt={testimonial.name}
                  className="h-14 w-14 rounded-full object-cover"
                />

                <div>
                  <h3 className="font-semibold text-foreground">
                    {testimonial.name}
                  </h3>

                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;