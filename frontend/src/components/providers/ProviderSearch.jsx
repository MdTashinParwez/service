const ProviderSearch = ({
  search = "",
  setSearch = () => {},
}) => {
  return (
    <section className="rounded-2xl border bg-white p-6 shadow-sm">

      <div className="flex flex-col gap-4 md:flex-row">

        <input
          type="text"
          placeholder="Search providers by name or profession..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-12 flex-1 rounded-xl border border-gray-300 px-4 outline-none transition focus:border-blue-600"
        />

        <button
          className="h-12 rounded-xl bg-blue-600 px-8 font-semibold text-white transition hover:bg-blue-700"
        >
          Search
        </button>

      </div>

    </section>
  );
};

export default ProviderSearch;