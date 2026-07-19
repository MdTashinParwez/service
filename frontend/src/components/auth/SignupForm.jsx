import { Link } from "react-router-dom";

const SignupForm = () => {
  return (
    <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
      <h2 className="text-3xl font-bold">Create Account</h2>

      <p className="mt-2 text-gray-500">
        Join ServiceHub and get started today.
      </p>

      <form className="mt-8 space-y-5">
        {/* Full Name */}

        <div>
          <label className="mb-2 block text-sm font-medium">
            Full Name
          </label>

          <input
            type="text"
            placeholder="Enter your full name"
            className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-600"
          />
        </div>

        {/* Email */}

        <div>
          <label className="mb-2 block text-sm font-medium">
            Email
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-600"
          />
        </div>

        {/* Password */}

        <div>
          <label className="mb-2 block text-sm font-medium">
            Password
          </label>

          <input
            type="password"
            placeholder="Create password"
            className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-600"
          />
        </div>

        {/* Confirm Password */}

        <div>
          <label className="mb-2 block text-sm font-medium">
            Confirm Password
          </label>

          <input
            type="password"
            placeholder="Confirm password"
            className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-600"
          />
        </div>

        {/* Terms */}

        <label className="flex items-start gap-2 text-sm text-gray-600">
          <input type="checkbox" className="mt-1" />

          <span>
            I agree to the{" "}
            <Link to="/terms" className="text-blue-600">
              Terms
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="text-blue-600">
              Privacy Policy
            </Link>
          </span>
        </label>

        {/* Signup */}

        <button className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700">
          Create Account
        </button>

        {/* Divider */}

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t"></div>
          </div>

          <div className="relative flex justify-center">
            <span className="bg-white px-3 text-sm text-gray-500">
              OR
            </span>
          </div>
        </div>

        {/* Google */}

        <button
          type="button"
          className="w-full rounded-lg border py-3 font-medium hover:bg-gray-50"
        >
          Continue with Google
        </button>

        {/* Login */}

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-blue-600"
          >
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignupForm;