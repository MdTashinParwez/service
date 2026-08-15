import { Briefcase } from "lucide-react";

const ProviderFilters = ({
  category = "",
  setCategory = () => {},
  categories = [],
}) => {
  return (
    <div className="relative w-full md:w-64">

      <Briefcase
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="h-14 w-full appearance-none rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
      >
        <option value="">
          All Categories
        </option>

        {categories.map((item) => (
          <option
            key={item._id}
            value={item._id}
          >
            {item.name}
          </option>
        ))}
      </select>

    </div>
  );
};

export default ProviderFilters;