const ReviewInformation = ({ formData }) => {
  return (
    <section className="rounded-3xl border bg-white p-8 shadow-sm">

      <h2 className="text-3xl font-bold">
        Review Your Application
      </h2>

      <p className="mt-2 text-gray-600">
        Please review all the information before submitting your application.
      </p>

      {/* Basic */}

      <div className="mt-8 rounded-2xl border p-6">

        <h3 className="mb-5 text-xl font-semibold">
          Basic Information
        </h3>

        <div className="grid gap-4 md:grid-cols-2">

          <p><strong>Name:</strong> {formData.fullName}</p>

          <p><strong>Email:</strong> {formData.email}</p>

          <p><strong>Phone:</strong> {formData.phone}</p>

          <p><strong>City:</strong> {formData.city}</p>

        </div>

      </div>

      {/* Professional */}

      <div className="mt-8 rounded-2xl border p-6">

        <h3 className="mb-5 text-xl font-semibold">
          Professional Information
        </h3>

        <div className="space-y-3">

          <p>
            <strong>Business:</strong> {formData.businessName}
          </p>

          <p>
            <strong>Profession:</strong> {formData.profession}
          </p>

          <p>
            <strong>Category:</strong> {formData.category}
          </p>

          <p>
            <strong>Experience:</strong> {formData.experience}
          </p>

          <p>
            <strong>About:</strong> {formData.about}
          </p>

        </div>

      </div>

      {/* Skills */}

      <div className="mt-8 rounded-2xl border p-6">

        <h3 className="mb-5 text-xl font-semibold">
          Skills
        </h3>

        <div className="flex flex-wrap gap-3">

          {formData.skills.length ? (

            formData.skills.map((skill) => (

              <span
                key={skill}
                className="rounded-full bg-blue-100 px-4 py-2"
              >
                {skill}
              </span>

            ))

          ) : (

            <p>No skills added.</p>

          )}

        </div>

      </div>

      {/* Services */}

      <div className="mt-8 rounded-2xl border p-6">

        <h3 className="mb-5 text-xl font-semibold">
          Services
        </h3>

        {formData.services.map((service, index) => (

          <div
            key={index}
            className="mb-5 rounded-xl border p-4"
          >

            <p>
              <strong>Title:</strong> {service.title}
            </p>

            <p>
              <strong>Price:</strong> ₹{service.price}
            </p>

            <p>
              <strong>Description:</strong>
              {" "}
              {service.description}
            </p>

          </div>

        ))}

      </div>

      {/* Availability */}

      <div className="mt-8 rounded-2xl border p-6">

        <h3 className="mb-5 text-xl font-semibold">
          Availability
        </h3>

        <p>
          <strong>Working Days:</strong>{" "}
          {formData.workingDays.join(", ")}
        </p>

        <p>
          <strong>Time:</strong>{" "}
          {formData.startTime}
          {" - "}
          {formData.endTime}
        </p>

      </div>

      {/* Documents */}

      <div className="mt-8 rounded-2xl border p-6">

        <h3 className="mb-5 text-xl font-semibold">
          Documents
        </h3>

        <p>
          <strong>Profile Photo:</strong>{" "}
          {formData.profilePhoto?.name || "Not Uploaded"}
        </p>

        <p>
          <strong>Government ID:</strong>{" "}
          {formData.governmentId?.name || "Not Uploaded"}
        </p>

        <p>
          <strong>Address Proof:</strong>{" "}
          {formData.addressProof?.name || "Not Uploaded"}
        </p>

      </div>

    </section>
  );
};

export default ReviewInformation;