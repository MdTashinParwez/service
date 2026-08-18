import {
  CheckCircle2,
  Circle,
  XCircle,
} from "lucide-react";

const BookingTimeline = ({ booking }) => {

  const steps = [
    {
      key: "pending",
      label: "Booking Requested",
    },
    {
      key: "accepted",
      label: "Booking Accepted",
    },
    {
      key: "in-progress",
      label: "Service In Progress",
    },
    {
      key: "completed",
      label: "Completed",
    },
  ];

  const statusIndex = {
    pending: 0,
    accepted: 1,
    "in-progress": 2,
    completed: 3,
  };

  const current = statusIndex[booking.status];

  // Cancelled booking
  if (booking.status === "cancelled") {
    return (
      <section className="rounded-2xl border bg-white p-8 shadow-sm">

        <h2 className="text-2xl font-bold text-gray-900">
          Booking Timeline
        </h2>

        <p className="mt-2 text-gray-600">
          Track your booking progress.
        </p>

        <div className="mt-8 flex items-center gap-4 rounded-xl bg-red-50 p-5">

          <XCircle
            size={28}
            className="text-red-600"
          />

          <div>
            <h3 className="font-semibold text-red-700">
              Booking Cancelled
            </h3>

            <p className="mt-1 text-sm text-red-600">
              This booking is no longer active.
            </p>
          </div>

        </div>

      </section>
    );
  }

  return (
    <section className="rounded-2xl border bg-white p-8 shadow-sm">

      <h2 className="text-2xl font-bold text-gray-900">
        Booking Timeline
      </h2>

      <p className="mt-2 text-gray-600">
        Track your booking progress.
      </p>

      <div className="mt-8 space-y-6">

        {steps.map((step, index) => {

          const completed = index <= current;

          return (
            <div
              key={step.key}
              className="flex items-start gap-4"
            >

              <div className="flex flex-col items-center">

                {completed ? (
                  <CheckCircle2
                    size={24}
                    className="text-green-600"
                  />
                ) : (
                  <Circle
                    size={24}
                    className="text-gray-300"
                  />
                )}

                {index !== steps.length - 1 && (
                  <div
                    className={`mt-2 h-10 w-[2px] ${
                      index < current
                        ? "bg-green-500"
                        : "bg-gray-200"
                    }`}
                  />
                )}

              </div>

              <div>

                <h3
                  className={`font-semibold ${
                    completed
                      ? "text-gray-900"
                      : "text-gray-400"
                  }`}
                >
                  {step.label}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  {completed
                    ? "Completed"
                    : "Waiting..."}
                </p>

              </div>

            </div>
          );
        })}

      </div>

    </section>
  );
};

export default BookingTimeline;