import {
  Clock3,
  CheckCircle2,
  Loader2,
  XCircle,
} from "lucide-react";

const statusConfig = {
  pending: {
    title: "Waiting for Provider",
    description:
      "Your booking request has been sent. The provider will review and confirm your booking.",
    icon: Clock3,
    container:
      "border-yellow-200 bg-yellow-50",
    iconBox:
      "bg-yellow-100",
    iconColor:
      "text-yellow-600",
    titleColor:
      "text-yellow-900",
    textColor:
      "text-yellow-700",
  },

  accepted: {
    title: "Booking Confirmed",
    description:
      "Great! Your booking has been accepted by the provider.",
    icon: CheckCircle2,
    container:
      "border-green-200 bg-green-50",
    iconBox:
      "bg-green-100",
    iconColor:
      "text-green-600",
    titleColor:
      "text-green-900",
    textColor:
      "text-green-700",
  },

  "in-progress": {
    title: "Service in Progress",
    description:
      "Your service is currently in progress.",
    icon: Loader2,
    container:
      "border-blue-200 bg-blue-50",
    iconBox:
      "bg-blue-100",
    iconColor:
      "text-blue-600",
    titleColor:
      "text-blue-900",
    textColor:
      "text-blue-700",
  },

  completed: {
    title: "Service Completed",
    description:
      "This booking has been successfully completed.",
    icon: CheckCircle2,
    container:
      "border-green-200 bg-green-50",
    iconBox:
      "bg-green-100",
    iconColor:
      "text-green-600",
    titleColor:
      "text-green-900",
    textColor:
      "text-green-700",
  },

  cancelled: {
    title: "Booking Cancelled",
    description:
      "This booking has been cancelled and is no longer active.",
    icon: XCircle,
    container:
      "border-red-200 bg-red-50",
    iconBox:
      "bg-red-100",
    iconColor:
      "text-red-600",
    titleColor:
      "text-red-900",
    textColor:
      "text-red-700",
  },
};

const BookingStatusBanner = ({ booking }) => {
  const config = statusConfig[booking.status];

  if (!config) {
    return null;
  }

  const Icon = config.icon;

  return (
    <section
      className={`rounded-2xl border ${config.container}`}
    >
      <div className="flex items-start gap-4 p-5">

        {/* Icon */}

        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${config.iconBox}`}
        >
          <Icon
            size={23}
            className={`${config.iconColor} ${
              booking.status === "in-progress"
                ? "animate-spin"
                : ""
            }`}
          />
        </div>

        {/* Content */}

        <div className="min-w-0">

          <h3
            className={`font-bold ${config.titleColor}`}
          >
            {config.title}
          </h3>

          <p
            className={`mt-1 text-sm leading-6 ${config.textColor}`}
          >
            {config.description}
          </p>

          {/* Cancellation Reason */}

          {booking.status === "cancelled" &&
            booking.cancellationReason && (
              <div className="mt-3 rounded-lg bg-white/70 px-3 py-2">

                <p className="text-xs font-medium text-red-600">
                  Cancellation reason
                </p>

                <p className="mt-1 text-sm text-red-800">
                  {booking.cancellationReason}
                </p>

              </div>
            )}

        </div>

      </div>
    </section>
  );
};

export default BookingStatusBanner;