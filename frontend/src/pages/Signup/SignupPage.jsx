// import SignupForm from "../../components/auth/SignupForm";

// const SignupPage = () => {
//   return (
//     <section className="min-h-screen bg-slate-50">
//       <div className="mx-auto grid min-h-screen max-w-7xl lg:grid-cols-2">
//         {/* Left */}

//         <div className="hidden flex-col justify-center bg-blue-600 p-16 text-white lg:flex">
//           <h1 className="text-5xl font-bold leading-tight">
//             Join
//             <br />
//             Helper
//           </h1>

//           <p className="mt-6 max-w-md text-lg text-blue-100">
//             Create your account and connect with thousands of trusted service
//             providers and customers.
//           </p>

//           <img
//             src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&auto=format&fit=crop"
//             alt="Signup"
//             className="mt-12 h-[420px] rounded-2xl object-cover shadow-2xl"
//           />
//         </div>

//         {/* Right */}

//         <div className="flex items-center justify-center px-6 py-12">
//           <SignupForm />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default SignupPage;
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ShieldCheck,
  Users,
  UserPlus,
} from "lucide-react";

import SignupForm from "../../components/auth/SignupForm";

const SignupPage = () => {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto grid min-h-screen max-w-[1600px] lg:grid-cols-2">
        {/* Left */}
        <section className="relative hidden overflow-hidden bg-blue-700 lg:flex">
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

            {/* Content */}
            <div className="my-auto py-16">
              <div className="max-w-xl">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-blue-50 backdrop-blur-sm">
                  <UserPlus size={16} />
                  Join the community
                </div>

                <h1 className="text-4xl font-bold leading-tight tracking-tight xl:text-5xl">
                  Get started with
                  <span className="block text-blue-100">
                    Helper
                  </span>
                </h1>

                <p className="mt-6 max-w-lg text-base leading-7 text-blue-100 xl:text-lg">
                  Create your account to discover trusted
                  professionals, manage bookings, and access
                  reliable services from one place.
                </p>
              </div>

              <div className="mt-10 max-w-xl overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&auto=format&fit=crop"
                  alt="People collaborating professionally"
                  className="h-[280px] w-full object-cover xl:h-[340px]"
                  loading="eager"
                />
              </div>

              <div className="mt-8 flex flex-wrap gap-6 text-sm text-blue-100">
                <div className="flex items-center gap-2">
                  <ShieldCheck
                    size={17}
                    className="text-blue-200"
                  />
                  Trusted platform
                </div>

                <div className="flex items-center gap-2">
                  <Users
                    size={17}
                    className="text-blue-200"
                  />
                  Easy service discovery
                </div>
              </div>
            </div>

            <p className="text-sm text-blue-200">
              © {new Date().getFullYear()} Helper. All rights reserved.
            </p>
          </div>
        </section>

        {/* Right */}
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

            <SignupForm />
          </div>
        </section>
      </div>
    </main>
  );
};

export default SignupPage;