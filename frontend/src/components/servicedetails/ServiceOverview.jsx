import { ClipboardCheck, Sparkles, Wrench } from "lucide-react";

const ServiceOverview = ({ service }) => {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="grid gap-8 lg:grid-cols-[1fr_260px]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            Service overview
          </p>
          <h2 className="mt-2 text-2xl font-bold text-slate-950">
            Professional {service.title.toLowerCase()} with clear scope and support
          </h2>
          <p className="mt-4 leading-8 text-slate-600">
            {service.description}
          </p>
        </div>

        <div className="grid gap-3">
          {[
            { icon: ClipboardCheck, label: "Inspection report", value: "Shared after work" },
            { icon: Wrench, label: "Tools included", value: "Professional kit" },
            { icon: Sparkles, label: "Clean finish", value: "Area cleanup included" },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="rounded-lg bg-slate-50 p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-950">
                <Icon size={16} className="text-blue-600" />
                {label}
              </div>
              <p className="mt-1 text-sm text-slate-500">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceOverview;
