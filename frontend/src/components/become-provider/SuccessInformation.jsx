import {
  CheckCircle2,
  Clock3,
  Mail,
} from "lucide-react";

import { Link } from "react-router-dom";

const SuccessInformation = () => {
  return (
    <section className="rounded-3xl border bg-white p-10 text-center shadow-sm">

      <div className="flex justify-center">

        <CheckCircle2
          size={80}
          className="text-green-600"
        />

      </div>

      <h1 className="mt-6 text-4xl font-bold text-gray-900">
        Application Submitted Successfully 🎉
      </h1>

      <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
        Thank you for applying to become a verified provider.
        Our team will review your application and documents.
      </p>

      {/* Status */}

      <div className="mt-10 rounded-2xl bg-blue-50 p-6">

        <div className="flex items-center justify-center gap-3">

          <Clock3
            size={24}
            className="text-blue-600"
          />

          <h2 className="text-2xl font-semibold text-blue-700">
            Status : Pending Verification
          </h2>

        </div>

        <p className="mt-4 text-gray-700">
          Estimated approval time
        </p>

        <p className="text-3xl font-bold text-gray-900">
          24 – 48 Hours
        </p>

      </div>

      {/* Email */}

      <div className="mt-8 flex items-center justify-center gap-3 rounded-2xl bg-gray-100 p-5">

        <Mail className="text-blue-600" />

        <p className="text-gray-700">
          You'll receive an email once your account is approved.
        </p>

      </div>

      {/* Buttons */}

      <div className="mt-10 flex flex-wrap justify-center gap-4">

        <Link
          to="/"
          className="rounded-xl border border-gray-300 px-6 py-3 font-medium transition hover:bg-gray-100"
        >
          Back to Home
        </Link>

        <Link
          to="/provider/dashboard"
          className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
        >
          Go to Dashboard
        </Link>

      </div>

    </section>
  );
};

export default SuccessInformation;