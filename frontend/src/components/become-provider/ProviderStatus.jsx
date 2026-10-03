import {
  CheckCircle2,
  Clock3,
  ShieldCheck,
  ArrowRight,
  FileCheck2,
  UserCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProviderStatus = ({ provider }) => {
  const navigate = useNavigate();

  const isVerified = provider?.isVerified === true;
  const isApproved = provider?.isApproved === true;

  // =====================================================
  // APPROVED
  // =====================================================
  if (isVerified && isApproved) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 px-4 py-12">
        <section className="mx-auto flex min-h-[75vh] max-w-2xl items-center justify-center">
          <div className="w-full overflow-hidden rounded-[32px] border border-emerald-100 bg-white shadow-2xl shadow-emerald-100/40">
            <div className="h-1.5 bg-gradient-to-r from-emerald-500 via-green-500 to-blue-500" />

            <div className="p-8 text-center sm:p-12">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 ring-8 ring-emerald-50">
                <CheckCircle2
                  size={44}
                  strokeWidth={2}
                  className="text-emerald-600"
                />
              </div>

              <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
                <ShieldCheck size={16} />
                Provider Approved
              </div>

              <h1 className="mt-5 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                You're officially a provider
              </h1>

              <p className="mx-auto mt-4 max-w-lg text-base leading-7 text-gray-600">
                Your provider account has been verified and approved.
                You can now manage your services, bookings, and provider
                profile from your dashboard.
              </p>

              {provider?.businessName && (
                <div className="mx-auto mt-8 max-w-md rounded-2xl border border-gray-100 bg-gray-50 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-400">
                    Business
                  </p>

                  <p className="mt-1.5 text-lg font-bold text-gray-900">
                    {provider.businessName}
                  </p>
                </div>
              )}

              <button
                type="button"
                onClick={() => navigate("/provider/dashboard")}
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 hover:shadow-blue-600/30 active:scale-[0.98]"
              >
                Go to Provider Dashboard
                <ArrowRight size={18} />
              </button>

              <div className="mt-7 flex items-center justify-center gap-2 text-xs text-gray-400">
                <CheckCircle2 size={14} className="text-emerald-500" />
                Your provider account is ready
              </div>
            </div>
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
          <div className="w-full overflow-hidden rounded-[32px] border border-blue-100 bg-white shadow-2xl shadow-blue-100/40">
            <div className="h-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500" />

            <div className="p-8 text-center sm:p-12">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 ring-8 ring-blue-50">
                <ShieldCheck
                  size={44}
                  strokeWidth={2}
                  className="text-blue-600"
                />
              </div>

              <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
                <ShieldCheck size={16} />
                Identity Verified
              </div>

              <h1 className="mt-5 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Your application is under review
              </h1>

              <p className="mx-auto mt-4 max-w-lg text-base leading-7 text-gray-600">
                Your identity has been verified successfully. Our team is
                reviewing your provider application before granting final
                approval.
              </p>

              {provider?.businessName && (
                <div className="mx-auto mt-8 max-w-md rounded-2xl border border-gray-100 bg-gray-50 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-400">
                    Business
                  </p>

                  <p className="mt-1.5 text-lg font-bold text-gray-900">
                    {provider.businessName}
                  </p>
                </div>
              )}

              <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50/60 p-6 text-left">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 shadow-sm">
                    <CheckCircle2
                      size={19}
                      className="text-white"
                    />
                  </div>

                  <div>
                    <p className="font-semibold text-gray-900">
                      Identity verification completed
                    </p>

                    <p className="mt-1 text-sm leading-6 text-gray-500">
                      Your submitted identity document has been successfully
                      verified.
                    </p>
                  </div>
                </div>

                <div className="ml-5 mt-3 h-8 border-l border-blue-200" />

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-500 shadow-sm">
                    <Clock3
                      size={19}
                      className="text-white"
                    />
                  </div>

                  <div>
                    <p className="font-semibold text-gray-900">
                      Admin approval pending
                    </p>

                    <p className="mt-1 text-sm leading-6 text-gray-500">
                      Your provider profile is waiting for final approval.
                      You don't need to submit your application again.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-7 flex items-center justify-center gap-2 text-sm text-gray-500">
                <Clock3 size={15} className="text-amber-500" />
                We'll notify you once the review is complete.
              </div>
            </div>
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
        <div className="w-full overflow-hidden rounded-[32px] border border-gray-200 bg-white shadow-2xl shadow-gray-200/50">
          <div className="h-1.5 bg-gradient-to-r from-amber-400 via-orange-400 to-blue-500" />

          <div className="p-8 text-center sm:p-12">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-amber-100 ring-8 ring-amber-50">
              <Clock3
                size={44}
                strokeWidth={2}
                className="text-amber-600"
              />
            </div>

            <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-amber-500" />
              </span>
              Pending Verification
            </div>

            <h1 className="mt-5 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Application Submitted
            </h1>

            <p className="mx-auto mt-4 max-w-lg text-base leading-7 text-gray-600">
              Your provider application has been successfully submitted.
              Our team will review your information and identity document.
            </p>

            {provider?.businessName && (
              <div className="mx-auto mt-8 max-w-md rounded-2xl border border-gray-100 bg-gray-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-400">
                  Business
                </p>

                <p className="mt-1.5 text-lg font-bold text-gray-900">
                  {provider.businessName}
                </p>
              </div>
            )}

            <div className="mt-8 rounded-2xl border border-gray-100 bg-gray-50 p-6 text-left">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500 shadow-sm">
                  <FileCheck2
                    size={19}
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

              <div className="ml-5 mt-3 h-8 border-l border-gray-200" />

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-500 shadow-sm">
                  <UserCheck
                    size={19}
                    className="text-white"
                  />
                </div>

                <div>
                  <p className="font-semibold text-gray-900">
                    Verification pending
                  </p>

                  <p className="mt-1 text-sm leading-6 text-gray-500">
                    Your documents and provider information are waiting
                    for review.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-7 rounded-xl bg-gray-50 px-4 py-3">
              <p className="text-sm text-gray-500">
                Please wait while our team completes the verification
                process.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProviderStatus;