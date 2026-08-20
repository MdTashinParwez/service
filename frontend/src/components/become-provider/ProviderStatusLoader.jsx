
import { BriefcaseBusiness, Loader2 } from "lucide-react";

const ProviderStatusLoader = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50/60 via-gray-50 to-white px-4 py-12">
      <div className="flex min-h-[70vh] items-center justify-center">

        <section className="w-full max-w-md rounded-[28px] border border-gray-200 bg-white p-8 text-center shadow-xl shadow-gray-200/50">

          {/* Icon */}

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <BriefcaseBusiness size={28} />
          </div>

          {/* Loader */}

          <div className="mt-6 flex justify-center">
            <Loader2
              size={30}
              className="animate-spin text-blue-600"
            />
          </div>

          <h1 className="mt-5 text-xl font-bold text-gray-900">
            Checking your provider status
          </h1>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            Please wait while we check your provider
            application.
          </p>

        </section>

      </div>
    </main>
  );
};

export default ProviderStatusLoader