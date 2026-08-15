import { BadgeCheck } from "lucide-react";

const ProviderHero = () => {
  return (
    <section className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8 lg:py-16">

        <div className="max-w-3xl">

          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
            <BadgeCheck size={16} />
            Verified Professionals
          </div>

          <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            Find trusted service providers
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Discover verified professionals, explore their services,
            and choose the right provider for your needs.
          </p>

        </div>

      </div>
    </section>
  );
};

export default ProviderHero;