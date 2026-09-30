import { useState } from "react";
import { Search, MapPin, ArrowRight, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { locations, popularTags } from "../../constants/hero";

const HeroSection = () => {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState(locations[0] || "");

  const handleSearch = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();

    if (searchQuery.trim()) {
      params.set("search", searchQuery.trim());
    }

    if (location) {
      params.set("location", location);
    }

    navigate(`/services?${params.toString()}`);
  };

  const handlePopularSearch = (tag) => {
    const params = new URLSearchParams();

    params.set("search", tag);

    if (location) {
      params.set("location", location);
    }

    navigate(`/services?${params.toString()}`);
  };

  return (
    <section className="relative overflow-hidden bg-white">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-blue-50/70 blur-3xl" />
        <div className="absolute -left-32 top-40 h-64 w-64 rounded-full bg-blue-100/40 blur-3xl" />
        <div className="absolute -right-32 top-20 h-72 w-72 rounded-full bg-indigo-100/40 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 lg:px-8 lg:pb-24 lg:pt-20">

        {/* Badge */}
        <div className="mx-auto mb-7 flex w-fit items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
          <span className="flex h-2 w-2 rounded-full bg-blue-600" />
          Find trusted professionals near you
        </div>

        {/* Heading */}
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl md:text-6xl lg:text-7xl">
            Find the right professional
            <span className="block text-blue-600">
              for any service.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            Discover, compare, and book professionals for home services,
            technology, education, creative work, and more — all in one place.
          </p>
        </div>

        {/* Search */}
        <form
          onSubmit={handleSearch}
          className="mx-auto mt-10 max-w-4xl"
        >
          <div className="rounded-2xl border border-slate-200 bg-white p-2 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.18)]">

            <div className="flex flex-col md:flex-row md:items-center">

              {/* Service search */}
              <div className="flex min-w-0 flex-1 items-center gap-3 px-4 py-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100">
                  <Search size={19} className="text-slate-500" />
                </div>

                <div className="min-w-0 flex-1 text-left">
                  <label className="block text-xs font-medium text-slate-500">
                    What do you need?
                  </label>

                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for a service..."
                    className="mt-0.5 w-full bg-transparent text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Divider */}
              <div className="mx-4 hidden h-10 w-px bg-slate-200 md:block" />

              {/* Location */}
              <div className="flex items-center gap-3 border-t border-slate-100 px-4 py-3 md:min-w-[210px] md:border-t-0">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100">
                  <MapPin size={18} className="text-slate-500" />
                </div>

                <div className="min-w-0 flex-1 text-left">
                  <label className="block text-xs font-medium text-slate-500">
                    Location
                  </label>

                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="mt-0.5 w-full cursor-pointer bg-transparent text-sm font-medium text-slate-900 outline-none"
                  >
                    {locations.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Search button */}
              <button
                type="submit"
                className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700 active:scale-[0.98] md:mt-0"
              >
                Search
                <ArrowRight size={17} />
              </button>

            </div>
          </div>

          {/* Popular searches */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-sm">
            <span className="mr-1 text-slate-500">
              Popular:
            </span>

            {popularTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => handlePopularSearch(tag)}
                className="rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
              >
                {tag}
              </button>
            ))}
          </div>
        </form>

        {/* Trust indicators */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-emerald-500" />
            Verified professionals
          </div>

          <div className="hidden h-4 w-px bg-slate-200 sm:block" />

          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-emerald-500" />
            Transparent pricing
          </div>

          <div className="hidden h-4 w-px bg-slate-200 sm:block" />

          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-emerald-500" />
            Secure booking
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection