const ProviderSkills = ({ provider }) => {
  return (
    <section className="rounded-2xl border bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900">
        Skills & Expertise
      </h2>

      <p className="mt-3 text-gray-600">
        Technologies, tools and areas of expertise offered by this provider.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">

        {provider?.skills?.length > 0 ? (
          provider.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-blue-200 bg-blue-50 px-5 py-2 text-sm font-medium text-blue-700 transition hover:bg-blue-100"
            >
              {skill}
            </span>
          ))
        ) : (
          <p className="text-gray-500">
            Skills not added yet.
          </p>
        )}

      </div>
    </section>
  );
};

export default ProviderSkills;