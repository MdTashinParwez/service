const weekDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const AvailabilityInformation = ({
  formData,
  setFormData,
}) => {

  const toggleDay = (day) => {

    const exists =
      formData.workingDays.includes(day);

    if (exists) {

      setFormData((prev) => ({
        ...prev,
        workingDays: prev.workingDays.filter(
          (item) => item !== day
        ),
      }));

    } else {

      setFormData((prev) => ({
        ...prev,
        workingDays: [
          ...prev.workingDays,
          day,
        ],
      }));

    }

  };

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

  };

  return (

    <section className="rounded-3xl border bg-white p-8 shadow-sm">

      <h2 className="text-3xl font-bold">
        Availability
      </h2>

      <p className="mt-2 text-gray-600">
        Tell customers when you're available.
      </p>

      {/* Days */}

      <div className="mt-8">

        <label className="mb-3 block font-medium">
          Working Days
        </label>

        <div className="flex flex-wrap gap-3">

          {weekDays.map((day) => (

            <button
              key={day}
              type="button"
              onClick={() => toggleDay(day)}
              className={`rounded-full border px-5 py-2 transition

              ${
                formData.workingDays.includes(day)
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-gray-300 bg-white hover:bg-gray-100"
              }`}
            >
              {day}
            </button>

          ))}

        </div>

      </div>

      {/* Time */}

      <div className="mt-8 grid gap-6 md:grid-cols-2">

        <div>

          <label className="mb-2 block font-medium">
            Start Time
          </label>

          <input
            type="time"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            className="h-12 w-full rounded-xl border border-gray-300 px-4"
          />

        </div>

        <div>

          <label className="mb-2 block font-medium">
            End Time
          </label>

          <input
            type="time"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            className="h-12 w-full rounded-xl border border-gray-300 px-4"
          />

        </div>

      </div>

    </section>

  );

};

export default AvailabilityInformation;