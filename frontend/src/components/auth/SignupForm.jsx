// import { Link } from "react-router-dom";

// const SignupForm = () => {
//   return (
//     <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
//       <h2 className="text-3xl font-bold">Create Account</h2>

//       <p className="mt-2 text-gray-500">
//         Join ServiceHub and get started today.
//       </p>

//       <form className="mt-8 space-y-5">
//         {/* Full Name */}

//         <div>
//           <label className="mb-2 block text-sm font-medium">
//             Full Name
//           </label>

//           <input
//             type="text"
//             placeholder="Enter your full name"
//             className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-600"
//           />
//         </div>

//         {/* Email */}

//         <div>
//           <label className="mb-2 block text-sm font-medium">
//             Email
//           </label>

//           <input
//             type="email"
//             placeholder="Enter your email"
//             className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-600"
//           />
//         </div>

//         {/* Password */}

//         <div>
//           <label className="mb-2 block text-sm font-medium">
//             Password
//           </label>

//           <input
//             type="password"
//             placeholder="Create password"
//             className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-600"
//           />
//         </div>

//         {/* Confirm Password */}

//         <div>
//           <label className="mb-2 block text-sm font-medium">
//             Confirm Password
//           </label>

//           <input
//             type="password"
//             placeholder="Confirm password"
//             className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-600"
//           />
//         </div>

//         {/* Terms */}

//         <label className="flex items-start gap-2 text-sm text-gray-600">
//           <input type="checkbox" className="mt-1" />

//           <span>
//             I agree to the{" "}
//             <Link to="/terms" className="text-blue-600">
//               Terms
//             </Link>{" "}
//             and{" "}
//             <Link to="/privacy" className="text-blue-600">
//               Privacy Policy
//             </Link>
//           </span>
//         </label>

//         {/* Signup */}

//         <button className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700">
//           Create Account
//         </button>

//         {/* Divider */}

//         <div className="relative">
//           <div className="absolute inset-0 flex items-center">
//             <div className="w-full border-t"></div>
//           </div>

//           <div className="relative flex justify-center">
//             <span className="bg-white px-3 text-sm text-gray-500">
//               OR
//             </span>
//           </div>
//         </div>

//         {/* Google */}

//         <button
//           type="button"
//           className="w-full rounded-lg border py-3 font-medium hover:bg-gray-50"
//         >
//           Continue with Google
//         </button>

//         {/* Login */}

//         <p className="text-center text-sm text-gray-600">
//           Already have an account?{" "}
//           <Link
//             to="/login"
//             className="font-semibold text-blue-600"
//           >
//             Sign In
//           </Link>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default SignupForm;
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../api/auth.api";

const SignupForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    avatar: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!formData.avatar) {
      setError("Please select an avatar");
      return;
    }

    try {
      setLoading(true);

      const body = new FormData();

      body.append("username", formData.username);
      body.append("email", formData.email);
      body.append("password", formData.password);
      body.append("phone", formData.phone);
      body.append("avatar", formData.avatar);

      const response = await registerUser(body);

      console.log("REGISTER SUCCESS:", response);

      navigate("/login");
    } catch (error) {
      console.error("REGISTER ERROR:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">

      <h1 className="text-3xl font-bold text-gray-900">
        Create Account
      </h1>

      <p className="mt-2 text-gray-500">
        Join ServiceHub and get started today.
      </p>

      {error && (
        <div className="mt-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-5"
      >
        {/* Username */}

        <div>
          <label className="mb-2 block text-sm font-medium">
            Username
          </label>

          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
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
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-600"
          />
        </div>

        {/* Phone */}

        <div>
          <label className="mb-2 block text-sm font-medium">
            Phone
          </label>

          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
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
            name="password"
            value={formData.password}
            onChange={handleChange}
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
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm password"
            className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-600"
          />
        </div>

        {/* Avatar */}

        <div>
          <label className="mb-2 block text-sm font-medium">
            Profile Picture
          </label>

          <input
            type="file"
            name="avatar"
            accept="image/*"
            onChange={handleChange}
            className="w-full rounded-lg border px-4 py-3"
          />
        </div>

        {/* Terms */}

        <label className="flex items-start gap-2 text-sm text-gray-600">
          <input
            type="checkbox"
            required
            className="mt-1"
          />

          <span>
            I agree to the{" "}
            <Link
              to="/terms"
              className="text-blue-600"
            >
              Terms
            </Link>{" "}
            and{" "}
            <Link
              to="/privacy"
              className="text-blue-600"
            >
              Privacy Policy
            </Link>
          </span>
        </label>

        {/* Submit */}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Creating Account..." : "Create Account"}
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