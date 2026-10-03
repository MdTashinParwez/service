import {
  ShieldCheck,
  Users,
  ArrowLeft,
} from "lucide-react";
import { Link } from "react-router-dom";
import LoginForm from "../../components/auth/LoginForm";

const LoginPage = () => {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto grid min-h-screen max-w-[1600px] lg:grid-cols-2">
        {/* =====================================================
            LEFT — BRAND / TRUST SECTION
        ====================================================== */}
        <section className="relative hidden overflow-hidden bg-blue-700 lg:flex">
          {/* Background decoration */}
          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-blue-500/30 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-indigo-500/30 blur-3xl" />

          <div className="relative z-10 flex w-full flex-col justify-between p-12 xl:p-16">
            {/* Brand */}
            <div>
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-lg font-bold tracking-tight text-white"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm">
                  <ShieldCheck size={20} />
                </span>

                Helper
              </Link>
            </div>

            {/* Main content */}
            <div className="my-auto py-16">
              <div className="max-w-xl">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-blue-50 backdrop-blur-sm">
                  <ShieldCheck size={16} />
                  Trusted service marketplace
                </div>

                <h1 className="text-4xl font-bold leading-tight tracking-tight xl:text-5xl">
                  Welcome back to
                  <span className="block text-blue-100">
                    Helper
                  </span>
                </h1>

                <p className="mt-6 max-w-lg text-base leading-7 text-blue-100 xl:text-lg">
                  Find trusted professionals, manage your bookings,
                  and access reliable services from one place.
                </p>
              </div>

              {/* Image */}
              <div className="mt-10 max-w-xl overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&auto=format&fit=crop"
                  alt="Professional service"
                  className="h-[280px] w-full object-cover xl:h-[340px]"
                  loading="eager"
                />
              </div>

              {/* Trust points */}
              <div className="mt-8 flex flex-wrap gap-6 text-sm text-blue-100">
                <div className="flex items-center gap-2">
                  <ShieldCheck
                    size={17}
                    className="text-blue-200"
                  />
                  Verified providers
                </div>

                <div className="flex items-center gap-2">
                  <Users
                    size={17}
                    className="text-blue-200"
                  />
                  Simple booking
                </div>
              </div>
            </div>

            {/* Footer */}
            <p className="text-sm text-blue-200">
              © {new Date().getFullYear()} Helper. All rights reserved.
            </p>
          </div>
        </section>

        {/* =====================================================
            RIGHT — LOGIN
        ====================================================== */}
        <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8 lg:min-h-0 lg:px-12 xl:px-20">
          <div className="w-full max-w-md">
            {/* Mobile brand */}
            <div className="mb-10 lg:hidden">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-xl font-bold text-gray-900"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white">
                  <ShieldCheck size={20} />
                </span>

                Helper
              </Link>
            </div>

            {/* Back */}
            <Link
              to="/"
              className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-blue-600"
            >
              <ArrowLeft size={16} />
              Back to home
            </Link>

            <LoginForm />
          </div>
        </section>
      </div>
    </main>
  );
};

export default LoginPage;