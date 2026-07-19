import { Search, MapPin } from "lucide-react";
import { locations, popularTags } from "../../constants/hero";

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-b' from-blue-50 via-white to-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center px-6 pt-16 pb-20 text-center">

        {/* Badge */}
        <div className="mb-6 inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700">
          <span className="mr-2 h-2 w-2 rounded-full bg-blue-600"></span>
          Trusted by 50,000+ customers across India
        </div>

        {/* Heading */}
        <h1 className="max-w-4xl text-5xl font-extrabold leading-[1.05] tracking-tight text-slate-900 md:text-6xl lg:text-7xl">
          Every service.
          <br />
          <span className="text-blue-600">One platform.</span>
        </h1>

        {/* Description */}
        <p className="mt-8 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
          Discover, compare, and book verified professionals for home
          services, creative work, tech, education, and beyond.
          No middlemen. No surprises.
        </p>

        {/* Search Box */}
        <div className="mt-12 flex w-full max-w-4xl flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg md:flex-row">

          {/* Search Input */}
          <div className="flex flex-1 items-center gap-3 px-5">
            <Search size={20} className="text-slate-400" />

            <input
              type="text"
              placeholder="What service are you looking for?"
              className="w-full py-4 text-slate-700 placeholder:text-slate-400 focus:outline-none"
            />
          </div>

          {/* Divider */}
          <div className="hidden w-px bg-slate-200 md:block"></div>

          {/* Location */}
          <div className="flex items-center gap-2 border-t border-slate-200 px-5 md:border-t-0">

            <MapPin size={18} className="text-slate-500" />

            <select className="cursor-pointer bg-transparent py-4 text-slate-700 outline-none">

              {locations.map((location) => (
                <option key={location}>{location}</option>
              ))}

            </select>

          </div>

          {/* Search Button */}

          <button className="m-2 rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700">
            Search
          </button>
        </div>

        {/* Popular Tags */}

        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">

          {popularTags.map((tag) => (
            <button
              key={tag}
              className="rounded-full bg-slate-100 px-4 py-1.5 text-sm text-slate-600 transition hover:bg-blue-100 hover:text-blue-600"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;