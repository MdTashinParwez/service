const CustomerDetails = ({
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
        Customer Details
      </h2>

      <p className="mt-2 text-gray-600">
        Confirm your contact information.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">

        <div>

          <label className="mb-2 block font-medium">
            Full Name
          </label>

          <input
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="h-12 w-full rounded-xl border border-gray-300 px-4 outline-none focus:border-blue-600"
          />

        </div>

        <div>

          <label className="mb-2 block font-medium">
            Phone Number
          </label>

          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
            className="h-12 w-full rounded-xl border border-gray-300 px-4 outline-none focus:border-blue-600"
          />

        </div>

      </div>

    </section>

  );

};

export default CustomerDetails;