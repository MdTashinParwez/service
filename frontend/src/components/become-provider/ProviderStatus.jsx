import {
  CheckCircle2,
  Clock3,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

const ProviderStatus = ({ provider }) => {
  const isVerified = provider?.isVerified === true;
  const isApproved = provider?.isApproved === true;

  // =====================================================
  // APPROVED
  // =====================================================

  if (isVerified && isApproved) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 px-4 py-12">
        <section className="mx-auto flex min-h-[75vh] max-w-2xl items-center justify-center">

          <div className="w-full rounded-[32px] border border-green-100 bg-white p-8 text-center shadow-xl shadow-green-100/40 sm:p-12">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2
                size={44}
                className="text-green-600"
              />
            </div>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-sm font-semibold text-green-700">
              <ShieldCheck size={16} />
              Provider Approved
            </div>

            <h1 className="mt-5 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              You're officially a provider!
            </h1>

            <p className="mx-auto mt-4 max-w-lg text-base leading-7 text-gray-600">
              Your provider account has been verified and
              approved. You can now manage your services,
              bookings and provider profile.
            </p>

            {provider?.businessName && (
              <div className="mt-8 rounded-2xl border border-gray-100 bg-gray-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Business
                </p>

                <p className="mt-1 text-lg font-bold text-gray-900">
                  {provider.businessName}
                </p>
              </div>
            )}

            <button
              type="button"
              onClick={() => {
                window.location.href =
                  "/provider/dashboard";
              }}
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-3.5 font-semibold text-white transition hover:bg-blue-700 active:scale-[0.98]"
            >
              Go to Provider Dashboard
              <ArrowRight size={18} />
            </button>

          </div>

        </section>
      </main>
    );
  }

  // =====================================================
  // VERIFIED BUT NOT APPROVED
  // =====================================================

  if (isVerified && !isApproved) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 px-4 py-12">
        <section className="mx-auto flex min-h-[75vh] max-w-2xl items-center justify-center">

          <div className="w-full rounded-[32px] border border-blue-100 bg-white p-8 text-center shadow-xl shadow-blue-100/40 sm:p-12">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
              <ShieldCheck
                size={44}
                className="text-blue-600"
              />
            </div>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
              <ShieldCheck size={16} />
              Identity Verified
            </div>

            <h1 className="mt-5 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Your application is under review
            </h1>

            <p className="mx-auto mt-4 max-w-lg text-base leading-7 text-gray-600">
              Your identity has been verified successfully.
              Our team is reviewing your provider application
              before giving final approval.
            </p>

            {provider?.businessName && (
              <div className="mt-8 rounded-2xl border border-gray-100 bg-gray-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Business
                </p>

                <p className="mt-1 text-lg font-bold text-gray-900">
                  {provider.businessName}
                </p>
              </div>
            )}

            <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50/60 p-6 text-left">

              <div className="flex items-start gap-4">

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600">
                  <CheckCircle2
                    size={18}
                    className="text-white"
                  />
                </div>

                <div>
                  <p className="font-semibold text-gray-900">
                    Identity verification completed
                  </p>

                  <p className="mt-1 text-sm leading-6 text-gray-500">
                    Your submitted identity document has been
                    verified.
                  </p>
                </div>

              </div>

              <div className="ml-4 mt-3 h-7 border-l border-blue-200" />

              <div className="flex items-start gap-4">

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-500">
                  <Clock3
                    size={18}
                    className="text-white"
                  />
                </div>

                <div>
                  <p className="font-semibold text-gray-900">
                    Admin approval pending
                  </p>

                  <p className="mt-1 text-sm leading-6 text-gray-500">
                    Your provider profile is waiting for final
                    approval.
                  </p>
                </div>

              </div>

            </div>

            <p className="mt-7 text-sm text-gray-500">
              You don't need to submit the application again.
            </p>

          </div>

        </section>
      </main>
    );
  }

  // =====================================================
  // APPLICATION SUBMITTED / PENDING
  // =====================================================

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-blue-50 px-4 py-12">
      <section className="mx-auto flex min-h-[75vh] max-w-2xl items-center justify-center">

        <div className="w-full rounded-[32px] border border-gray-200 bg-white p-8 text-center shadow-xl shadow-gray-200/40 sm:p-12">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-amber-100">
            <Clock3
              size={44}
              className="text-amber-600"
            />
          </div>

          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700">
            <span className="h-2 w-2 rounded-full bg-amber-500" />
            Pending Verification
          </div>

          <h1 className="mt-5 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Application Submitted
          </h1>

          <p className="mx-auto mt-4 max-w-lg text-base leading-7 text-gray-600">
            Your provider application has been successfully
            submitted. Our team will review your information
            and identity document.
          </p>

          {provider?.businessName && (
            <div className="mt-8 rounded-2xl border border-gray-100 bg-gray-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Business
              </p>

              <p className="mt-1 text-lg font-bold text-gray-900">
                {provider.businessName}
              </p>
            </div>
          )}

          <div className="mt-8 rounded-2xl border border-gray-100 bg-gray-50 p-6 text-left">

            <div className="flex items-start gap-4">

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-500">
                <CheckCircle2
                  size={18}
                  className="text-white"
                />
              </div>

              <div>
                <p className="font-semibold text-gray-900">
                  Application received
                </p>

                <p className="mt-1 text-sm leading-6 text-gray-500">
                  Your provider application has been submitted
                  successfully.
                </p>
              </div>

            </div>

            <div className="ml-4 mt-3 h-7 border-l border-gray-200" />

            <div className="flex items-start gap-4">

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-500">
                <Clock3
                  size={18}
                  className="text-white"
                />
              </div>

              <div>
                <p className="font-semibold text-gray-900">
                  Verification pending
                </p>

                <p className="mt-1 text-sm leading-6 text-gray-500">
                  Your documents and provider information are
                  waiting for review.
                </p>
              </div>

            </div>

          </div>

          <p className="mt-7 text-sm text-gray-500">
            Please wait for the review to be completed.
          </p>

        </div>

      </section>
    </main>
  );
};

export default ProviderStatus