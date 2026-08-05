import { ChevronDown } from "lucide-react";

const ServiceFAQ = ({ service }) => {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
        Help
      </p>
      <h2 className="mt-2 text-2xl font-bold text-slate-950">
        Frequently Asked Questions
      </h2>

      <div className="mt-7 space-y-3">
        {service.faq.map((item) => (
          <details
            key={item.question}
            className="group rounded-lg border border-slate-200 p-5 open:bg-slate-50"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-slate-950">
              {item.question}
              <ChevronDown
                size={20}
                className="shrink-0 text-slate-500 transition group-open:rotate-180"
              />
            </summary>
            <p className="mt-4 leading-7 text-slate-600">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
};

export default ServiceFAQ;
