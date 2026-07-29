const BasicInformation = ({
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

    <section className="rounded-3xl border bg-white p-8 shadow-sm">

      <h2 className="text-3xl font-bold text-gray-900">
        Basic Information
      </h2>

      <p className="mt-2 text-gray-600">
        Tell us a little about yourself.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">

        <div>

          <label className="mb-2 block font-medium">
            Full Name
          </label>

          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="h-12 w-full rounded-xl border border-gray-300 px-4 outline-none focus:border-blue-600"
          />

        </div>

        <div>

          <label className="mb-2 block font-medium">
            Email
          </label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="example@email.com"
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
            placeholder="+91 9876543210"
            className="h-12 w-full rounded-xl border border-gray-300 px-4 outline-none focus:border-blue-600"
          />

        </div>

        <div>

          <label className="mb-2 block font-medium">
            City
          </label>

          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Delhi"
            className="h-12 w-full rounded-xl border border-gray-300 px-4 outline-none focus:border-blue-600"
          />

        </div>

      </div>

    </section>

  );

};

export default BasicInformation;