import {
  CalendarDays,
  Clock3,
  CheckCircle2,
} from "lucide-react";

const ProviderAvailability = ({ provider }) => {
  const workingDays = provider?.workingDays || [];

  return (
    <section className="rounded-2xl border bg-white p-8 shadow-sm">

      <h2 className="text-2xl font-bold text-gray-900">
        Availability
      </h2>

      <p className="mt-3 text-gray-600">
        Provider's working schedule and response information.
      </p>

      <div className="mt-8 space-y-6">

        {/* Status */}

        <div className="flex items-center gap-4">
          <div className="rounded-xl bg-green-100 p-3">
            <CheckCircle2
              size={22}
              className="text-green-600"
            />
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Current Status
            </p>

            <p className="font-semibold text-green-600">
              {provider?.availability || "Available"}
            </p>
          </div>
        </div>

        {/* Response Time */}

        <div className="flex items-center gap-4">
          <div className="rounded-xl bg-blue-100 p-3">
            <Clock3
              size={22}
              className="text-blue-600"
            />
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Response Time
            </p>

            <p className="font-semibold text-gray-900">
              {provider?.responseTime || "Not specified"}
            </p>
          </div>
        </div>

        {/* Working Days */}

        <div>
          <div className="mb-3 flex items-center gap-2">
            <CalendarDays
              size={20}
              className="text-blue-600"
            />

            <h3 className="font-semibold text-gray-900">
              Working Days
            </h3>
          </div>

          {workingDays.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {workingDays.map((day) => (
                <span
                  key={day}
                  className="rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700"
                >
                  {day}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">
              Working schedule not available.
            </p>
          )}
        </div>

      </div>

    </section>
  );
};

export default ProviderAvailability;