const DocumentsInformation = ({
  formData,
  setFormData,
}) => {

  const handleFile = (e) => {

    const { name, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: files[0],
    }));

  };

  return (

    <section className="rounded-3xl border bg-white p-8 shadow-sm">

      <h2 className="text-3xl font-bold">
        Documents
      </h2>

      <p className="mt-2 text-gray-600">
        Upload the required verification documents.
      </p>

      <div className="mt-8 space-y-6">

        <div>

          <label className="mb-2 block font-medium">
            Profile Photo
          </label>

          <input
            type="file"
            name="profilePhoto"
            accept="image/*"
            onChange={handleFile}
            className="block w-full rounded-xl border p-3"
          />

          {formData.profilePhoto && (

            <p className="mt-2 text-sm text-green-600">

              {formData.profilePhoto.name}

            </p>

          )}

        </div>

        <div>

          <label className="mb-2 block font-medium">
            Government ID
          </label>

          <input
            type="file"
            name="governmentId"
            accept="image/*,.pdf"
            onChange={handleFile}
            className="block w-full rounded-xl border p-3"
          />

          {formData.governmentId && (

            <p className="mt-2 text-sm text-green-600">

              {formData.governmentId.name}

            </p>

          )}

        </div>

        <div>

          <label className="mb-2 block font-medium">
            Address Proof
          </label>

          <input
            type="file"
            name="addressProof"
            accept="image/*,.pdf"
            onChange={handleFile}
            className="block w-full rounded-xl border p-3"
          />

          {formData.addressProof && (

            <p className="mt-2 text-sm text-green-600">

              {formData.addressProof.name}

            </p>

          )}

        </div>

      </div>

    </section>

  );

};

export default DocumentsInformation;