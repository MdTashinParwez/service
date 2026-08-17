import { CalendarDays, Clock3 } from "lucide-react";

const BookingDateTime = ({
  formData,
  setFormData,
  service,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <section className="rounded-2xl border bg-white p-6 shadow-sm">

      <div>
        <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
          Schedule
        </p>

        <h2 className="mt-2 text-2xl font-bold text-gray-900">
          Choose Date & Time
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Select when you want the provider to start the service.
        </p>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">

        {/* Date */}

        <div>
          <label
            htmlFor="bookingDate"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Booking Date
          </label>

          <div className="relative">

            <CalendarDays
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-600"
            />

            <input
              id="bookingDate"
              name="bookingDate"
              type="date"
              value={formData.bookingDate}
              onChange={handleChange}
              min={new Date().toISOString().split("T")[0]}
              className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-10 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

          </div>
        </div>

        {/* Start Time */}

        <div>
          <label
            htmlFor="startTime"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Start Time
          </label>

          <div className="relative">

            <Clock3
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-600"
            />

            <input
              id="startTime"
              name="startTime"
              type="time"
              value={formData.startTime}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-10 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

          </div>
        </div>

      </div>

      {/* Duration info */}

      <div className="mt-5 rounded-xl bg-blue-50 px-4 py-3 text-sm text-blue-800">

        Service duration:{" "}

        <span className="font-semibold">
          {service?.duration || 1} hour
          {Number(service?.duration) === 1 ? "" : "s"}
        </span>

        <p className="mt-1 text-blue-700">
          End time will be calculated automatically.
        </p>

      </div>

    </section>
  );
};

export default BookingDateTime;