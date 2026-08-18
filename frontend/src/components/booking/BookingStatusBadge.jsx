import {
  Clock3,
  CheckCircle2,
  LoaderCircle,
  CircleCheckBig,
  XCircle,
} from "lucide-react";

const BookingStatusBadge = ({ status }) => {
  const statusConfig = {
    pending: {
      label: "Pending",
      icon: Clock3,
      className:
        "border-amber-200 bg-amber-50 text-amber-700",
      iconClass: "text-amber-500",
    },

    accepted: {
      label: "Accepted",
      icon: CheckCircle2,
      className:
        "border-blue-200 bg-blue-50 text-blue-700",
      iconClass: "text-blue-600",
    },

    "in-progress": {
      label: "In Progress",
      icon: LoaderCircle,
      className:
        "border-indigo-200 bg-indigo-50 text-indigo-700",
      iconClass: "text-indigo-600",
    },

    completed: {
      label: "Completed",
      icon: CircleCheckBig,
      className:
        "border-emerald-200 bg-emerald-50 text-emerald-700",
      iconClass: "text-emerald-600",
    },

    cancelled: {
      label: "Cancelled",
      icon: XCircle,
      className:
        "border-red-200 bg-red-50 text-red-700",
      iconClass: "text-red-600",
    },
  };

  const normalizedStatus = status?.toLowerCase();

  const config =
    statusConfig[normalizedStatus] ||
    statusConfig.pending;

  const Icon = config.icon;

  return (
    <span
      className={`inline-flex w-fit items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-semibold ${config.className}`}
    >
      <Icon
        size={16}
        className={config.iconClass}
      />

      {config.label}
    </span>
  );
};

export default BookingStatusBadge;