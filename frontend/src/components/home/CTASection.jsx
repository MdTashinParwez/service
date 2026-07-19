const CTASection = () => {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-blue-500">
        <div className="overflow-hidden rounded-3xl bg-primary px-8 py-16 text-center lg:px-16">
          <h2 className="text-4xl font-bold text-white">
            Ready to get started?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-blue-100">
            Join 50,000+ customers who trust ServiceHub for their everyday
            service needs.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <button className="rounded-xl bg-white px-8 py-3 font-semibold text-primary transition hover:bg-slate-100">
              Find a Service
            </button>

            <button className="rounded-xl border border-white/30 px-8 py-3 font-semibold text-white transition hover:bg-white/10">
              Become a Provider
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;