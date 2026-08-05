import { CheckCircle2 } from "lucide-react";

const ServiceIncludes = ({ service }) => {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
        In the package
      </p>
      <h2 className="mt-2 text-2xl font-bold text-slate-950">
        What's included
      </h2>

      <div className="mt-7 grid gap-3 md:grid-cols-2">
        {service.includes.map((item) => (
          <div
            key={item}
            className="flex items-start gap-3 rounded-lg border border-slate-200 p-4 transition hover:border-emerald-200 hover:bg-emerald-50"
          >
            <CheckCircle2
              size={20}
              className="mt-0.5 shrink-0 text-emerald-600"
            />
            <p className="leading-6 text-slate-700">
              {item}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServiceIncludes;
