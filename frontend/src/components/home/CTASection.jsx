// const CTASection = () => {
//   return (
//     <section className="py-20">
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-blue-500">
//         <div className="overflow-hidden rounded-3xl bg-primary px-8 py-16 text-center lg:px-16">
//           <h2 className="text-4xl font-bold text-white">
//             Ready to get started?
//           </h2>

//           <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-blue-100">
//             Join 50,000+ customers who trust JanSeva for their everyday
//             service needs.
//           </p>

//           <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
//             <button className="rounded-xl bg-white px-8 py-3 font-semibold text-primary transition hover:bg-slate-100">
//               Find a Service
//             </button>

//             <button className="rounded-xl border border-white/30 px-8 py-3 font-semibold text-white transition hover:bg-white/10">
//               Become a Provider
//             </button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default CTASection;
import { ArrowRight, Search, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-slate-950">
        <div className="relative px-6 py-16 sm:px-12 sm:py-20 lg:px-16">
          {/* Background decoration */}
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-600/20 blur-3xl" />
          <div className="absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />

          <div className="relative grid items-center gap-10 lg:grid-cols-[1fr_auto]">
            {/* Content */}
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-400">
                Ready when you are
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Find the right service for your needs
              </h2>

              <p className="mt-5 max-w-xl text-base leading-7 text-slate-300">
                Explore available services, compare providers, and book a
                time that works for you.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/services"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-blue-50"
                >
                  <Search size={17} />
                  Explore services
                  <ArrowRight size={16} />
                </Link>

                <Link
                  to="/providers"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-700 px-5 py-3 text-sm font-semibold text-white transition hover:border-slate-500 hover:bg-slate-900"
                >
                  Browse providers
                </Link>
              </div>
            </div>

            {/* Trust card */}
            <div className="hidden rounded-2xl border border-slate-800 bg-white/5 p-6 backdrop-blur sm:block lg:w-72">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                <ShieldCheck size={23} />
              </div>

              <h3 className="mt-5 font-semibold text-white">
                Built around a simple experience
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Discover services, review provider information, and manage
                your bookings from one place.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;