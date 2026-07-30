const BookingNotes = ({
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
        Special Instructions
      </h2>

      <p className="mt-2 text-gray-600">
        Add any extra instructions for the provider.
      </p>

      <div className="mt-8">

        <textarea
          rows={5}
          name="note"
          value={formData.note}
          onChange={handleChange}
          placeholder="Any specific requirements..."
          className="w-full rounded-xl border border-gray-300 p-4 outline-none focus:border-blue-600"
        />

      </div>

    </section>

  );

};

export default BookingNotes;