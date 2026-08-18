import {
  CheckCircle2,
  Clock3,
  Loader2,
  XCircle,
} from "lucide-react";

const BookingTimeline = ({ booking }) => {
  const steps = [
    {
      status: "pending",
      title: "Booking Requested",
      description:
        "Your booking request has been sent to the provider.",
    },
    {
      status: "accepted",
      title: "Booking Accepted",
      description:
        "The provider has accepted your booking request.",
    },
    {
      status: "in-progress",
      title: "Service in Progress",
      description:
        "The provider is currently working on your service.",
    },
    {
      status: "completed",
      title: "Service Completed",
      description:
        "Your service has been successfully completed.",
    },
  ];

  const statusOrder = {
    pending: 0,
    accepted: 1,
    "in-progress": 2,
    completed: 3,
  };

  const currentIndex = statusOrder[booking.status];

  const isCancelled = booking.status === "cancelled";

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">

      {/* Header */}

      <div>

        <p className="text-sm font-medium text-blue-600">
          Booking Progress
        </p>

        <h2 className="mt-1 text-2xl font-bold text-gray-900">
          Booking Timeline
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Track the progress of your service booking.
        </p>

      </div>

      {/* Cancelled */}

      {isCancelled ? (

        <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-5">

          <div className="flex items-start gap-4">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-100">

              <XCircle
                size={24}
                className="text-red-600"
              />

            </div>

            <div>

              <h3 className="font-bold text-red-900">
                Booking Cancelled
              </h3>

              <p className="mt-1 text-sm leading-6 text-red-700">
                This booking has been cancelled and
                will not proceed further.
              </p>

              {booking.cancellationReason && (
                <div className="mt-3">

                  <p className="text-xs font-semibold uppercase tracking-wide text-red-600">
                    Reason
                  </p>

                  <p className="mt-1 text-sm text-red-800">
                    {booking.cancellationReason}
                  </p>

                </div>
              )}

            </div>

          </div>

        </div>

      ) : (

        /* Normal Timeline */

        <div className="mt-8">

          {steps.map((step, index) => {

            const stepIndex = statusOrder[step.status];

            const completed =
              currentIndex >= stepIndex;

            const active =
              booking.status === step.status;

            const isLast =
              index === steps.length - 1;

            return (
              <div
                key={step.status}
                className="relative flex gap-4"
              >

                {/* Icon + Line */}

                <div className="flex flex-col items-center">

                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                      completed
                        ? "bg-green-100"
                        : "bg-gray-100"
                    }`}
                  >

                    {completed ? (

                      <CheckCircle2
                        size={21}
                        className="text-green-600"
                      />

                    ) : (

                      <Clock3
                        size={20}
                        className="text-gray-400"
                      />

                    )}

                  </div>

                  {!isLast && (
                    <div
                      className={`my-2 h-12 w-[2px] ${
                        currentIndex > stepIndex
                          ? "bg-green-500"
                          : "bg-gray-200"
                      }`}
                    />
                  )}

                </div>

                {/* Content */}

                <div
                  className={`pb-8 ${
                    isLast ? "pb-0" : ""
                  }`}
                >

                  <div className="flex flex-wrap items-center gap-2">

                    <h3
                      className={`font-semibold ${
                        completed
                          ? "text-gray-900"
                          : "text-gray-400"
                      }`}
                    >
                      {step.title}
                    </h3>

                    {active && (
                      <span className="rounded-full bg-blue-100 px-2.5 py-1 text-xs font-semibold text-blue-700">
                        Current
                      </span>
                    )}

                  </div>

                  <p
                    className={`mt-1 text-sm leading-6 ${
                      completed
                        ? "text-gray-600"
                        : "text-gray-400"
                    }`}
                  >
                    {step.description}
                  </p>

                </div>

              </div>
            );
          })}

        </div>

      )}

    </section>
  );
};

export default BookingTimeline;