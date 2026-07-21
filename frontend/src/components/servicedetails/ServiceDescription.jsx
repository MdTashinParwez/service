import { CheckCircle2 } from "lucide-react";

const ServiceDescription = ({ service }) => {
  const highlights = [
    "Verified and experienced professionals",
    "Transparent pricing with no hidden charges",
    "Quality workmanship using professional tools",
    "Timely service with customer satisfaction",
  ];

  return (
    <section className="rounded-2xl border bg-white p-8 shadow-sm">
      {/* Heading */}
      <h2 className="text-2xl font-bold text-gray-900">
        About this Service
      </h2>

      {/* Description */}
      <p className="mt-5 leading-8 text-gray-600">
        {service.description}
      </p>

      {/* Highlights */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {highlights.map((item) => (
          <div
            key={item}
            className="flex items-start gap-3 rounded-xl bg-gray-50 p-4"
          >
            <CheckCircle2
              size={20}
              className="mt-1 text-green-600"
            />

            <span className="text-gray-700">
              {item}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServiceDescription;