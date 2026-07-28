const ProviderFilters = ({
  profession = "",
  setProfession = () => {},
  location = "",
  setLocation = () => {},
}) => {
  return (
    <section className="rounded-2xl border bg-white p-6 shadow-sm">

      <div className="grid gap-4 md:grid-cols-3">

        {/* Profession */}

        <select
          value={profession}
          onChange={(e) => setProfession(e.target.value)}
          className="h-12 rounded-xl border border-gray-300 px-4 outline-none focus:border-blue-600"
        >
          <option value="">All Professions</option>
          <option value="Plumber">Plumber</option>
          <option value="Electrician">Electrician</option>
          <option value="Tutor">Tutor</option>
          <option value="Developer">Developer</option>
          <option value="Cleaner">Cleaner</option>
        </select>

        {/* Location */}

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="h-12 rounded-xl border border-gray-300 px-4 outline-none focus:border-blue-600"
        />

        {/* Clear */}

        <button
          onClick={() => {
            setProfession("");
            setLocation("");
          }}
          className="h-12 rounded-xl border border-gray-300 font-medium transition hover:bg-gray-100"
        >
          Clear Filters
        </button>

      </div>

    </section>
  );
};

export default ProviderFilters;