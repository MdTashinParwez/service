const BookingDateTime = ({
  formData,
  setFormData,
}) => {

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

  };

  return (

    <section className="rounded-2xl border bg-white p-8 shadow-sm">

      <h2 className="text-2xl font-bold text-gray-900">
        Schedule Service
      </h2>

      <p className="mt-2 text-gray-600">
        Choose your preferred date and time.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">

        <div>

          <label className="mb-2 block font-medium">
            Booking Date
          </label>

          <input
            type="date"
            name="bookingDate"
            value={formData.bookingDate}
            onChange={handleChange}
            className="h-12 w-full rounded-xl border border-gray-300 px-4 outline-none focus:border-blue-600"
          />

        </div>

        <div>

          <label className="mb-2 block font-medium">
            Booking Time
          </label>

          <input
            type="time"
            name="bookingTime"
            value={formData.bookingTime}
            onChange={handleChange}
            className="h-12 w-full rounded-xl border border-gray-300 px-4 outline-none focus:border-blue-600"
          />

        </div>

      </div>

    </section>

  );

};

export default BookingDateTime;