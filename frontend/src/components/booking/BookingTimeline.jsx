import {
  CheckCircle2,
  Circle,
} from "lucide-react";

const BookingTimeline = ({ booking }) => {

  const steps = [
    "Booking Requested",
    "Provider Reviewing",
    "Confirmed",
    "On The Way",
    "Completed",
  ];

  const statusIndex = {
    Pending: 1,
    Confirmed: 2,
    OnTheWay: 3,
    Completed: 4,
    Cancelled: -1,
  };

  const current =
    statusIndex[booking.status] ?? 0;

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
              key={step}
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
                      completed
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
                  {step}
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