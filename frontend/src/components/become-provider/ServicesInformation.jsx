const ServicesInformation = ({
  formData,
  setFormData,
}) => {

  const handleChange = (
    index,
    field,
    value
  ) => {

    const updated = [...formData.services];

    updated[index][field] = value;

    setFormData((prev) => ({
      ...prev,
      services: updated,
    }));

  };

  const addService = () => {

    setFormData((prev) => ({
      ...prev,
      services: [
        ...prev.services,
        {
          title: "",
          price: "",
          description: "",
        },
      ],
    }));

  };

  const removeService = (index) => {

    if (formData.services.length === 1) return;

    setFormData((prev) => ({
      ...prev,
      services: prev.services.filter(
        (_, i) => i !== index
      ),
    }));

  };

  return (
    <section className="rounded-3xl border bg-white p-8 shadow-sm">

      <h2 className="text-3xl font-bold">
        Services
      </h2>

      <p className="mt-2 text-gray-600">
        Add all the services you provide.
      </p>

      <div className="mt-8 space-y-8">

        {formData.services.map(
          (service, index) => (

            <div
              key={index}
              className="rounded-2xl border p-6"
            >

              <div className="mb-6 flex items-center justify-between">

                <h3 className="text-xl font-semibold">
                  Service {index + 1}
                </h3>

                <button
                  type="button"
                  onClick={() =>
                    removeService(index)
                  }
                  className="text-red-600"
                >
                  Remove
                </button>

              </div>

              <div className="space-y-5">

                <input
                  type="text"
                  placeholder="Service Title"
                  value={service.title}
                  onChange={(e) =>
                    handleChange(
                      index,
                      "title",
                      e.target.value
                    )
                  }
                  className="h-12 w-full rounded-xl border px-4"
                />

                <input
                  type="number"
                  placeholder="Starting Price"
                  value={service.price}
                  onChange={(e) =>
                    handleChange(
                      index,
                      "price",
                      e.target.value
                    )
                  }
                  className="h-12 w-full rounded-xl border px-4"
                />

                <textarea
                  rows={4}
                  placeholder="Service Description"
                  value={service.description}
                  onChange={(e) =>
                    handleChange(
                      index,
                      "description",
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border p-4"
                />

              </div>

            </div>

          )
        )}

        <button
          type="button"
          onClick={addService}
          className="rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
        >
          + Add Another Service
        </button>

      </div>

    </section>
  );
};

export default ServicesInformation;