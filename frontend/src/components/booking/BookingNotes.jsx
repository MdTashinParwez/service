const BookingNotes = ({
  formData,
  setFormData,
}) => {
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      customerNotes: e.target.value,
    }));
  };

  return (
    <section className="rounded-2xl border bg-white p-6 shadow-sm">

      <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
        Additional Information
      </p>

      <h2 className="mt-2 text-2xl font-bold text-gray-900">
        Notes for Provider
      </h2>

      <textarea
        name="customerNotes"
        value={formData.customerNotes}
        onChange={handleChange}
        rows={5}
        placeholder="Tell the provider anything they should know..."
        className="mt-5 w-full resize-none rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />

    </section>
  );
};

export default BookingNotes;