import { Search } from "lucide-react";

const ProviderSearch = ({
  search = "",
  setSearch = () => {},
}) => {
  return (
    <div className="relative flex-1">

      <Search
        size={20}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
      />

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search providers by name..."
        className="h-14 w-full rounded-xl border border-slate-200 bg-white pl-12 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
      />

    </div>
  );
};

export default ProviderSearch;