import { TrendingUp, TrendingDown } from "lucide-react";

const AdminStatCard = ({
  title,
  value,
  icon: Icon,
  description,
  trend,
  trendType = "neutral", // "up" | "down" | "neutral"
  accentColor = "blue", // "blue" | "emerald" | "amber" | "violet" | "rose" | "indigo"
}) => {
  const colorMap = {
    blue: {
      bg: "bg-blue-50",
      text: "text-blue-600",
      glow: "bg-blue-100/50",
      border: "hover:border-blue-200",
    },
    emerald: {
      bg: "bg-emerald-50",
      text: "text-emerald-600",
      glow: "bg-emerald-100/50",
      border: "hover:border-emerald-200",
    },
    amber: {
      bg: "bg-amber-50",
      text: "text-amber-600",
      glow: "bg-amber-100/50",
      border: "hover:border-amber-200",
    },
    violet: {
      bg: "bg-violet-50",
      text: "text-violet-600",
      glow: "bg-violet-100/50",
      border: "hover:border-violet-200",
    },
    rose: {
      bg: "bg-rose-50",
      text: "text-rose-600",
      glow: "bg-rose-100/50",
      border: "hover:border-rose-200",
    },
    indigo: {
      bg: "bg-indigo-50",
      text: "text-indigo-600",
      glow: "bg-indigo-100/50",
      border: "hover:border-indigo-200",
    },
  };

  const scheme = colorMap[accentColor] || colorMap.blue;

  return (
    <div
      className={`
        group relative overflow-hidden rounded-2xl border border-slate-200/90
        bg-white p-5 shadow-sm transition-all duration-300
        hover:-translate-y-1 hover:shadow-md ${scheme.border}
      `}
    >
      {/* Glow corner */}
      <div
        className={`pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full ${scheme.glow} transition-transform duration-500 group-hover:scale-150`}
      />

      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              {title}
            </p>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="truncate text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                {value}
              </span>
            </div>
          </div>

          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${scheme.bg} ${scheme.text} transition-transform duration-300 group-hover:scale-105`}
          >
            {Icon && <Icon size={22} strokeWidth={2.2} />}
          </div>
        </div>

        {/* Divider */}
        <div className="my-3.5 h-px bg-slate-100" />

        {/* Footer / Trend */}
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span className="truncate font-medium">{description}</span>

          {trend && (
            <span
              className={`inline-flex items-center gap-1 font-semibold ${
                trendType === "up"
                  ? "text-emerald-600"
                  : trendType === "down"
                  ? "text-rose-600"
                  : "text-slate-600"
              }`}
            >
              {trendType === "up" && <TrendingUp size={13} />}
              {trendType === "down" && <TrendingDown size={13} />}
              {trend}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminStatCard;

