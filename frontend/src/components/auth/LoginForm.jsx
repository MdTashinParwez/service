// // import { Link } from "react-router-dom";

// // const LoginForm = () => {
// //   return (
// //     <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
// //       <h2 className="text-3xl font-bold">Welcome Back 👋</h2>

// //       <p className="mt-2 text-gray-500">
// //         Sign in to continue to your ServiceHub account.
// //       </p>

// //       <form className="mt-8 space-y-5">
// //         {/* Email */}

// //         <div>
// //           <label className="mb-2 block text-sm font-medium">Email</label>

// //           <input
// //             type="email"
// //             placeholder="Enter your email"
// //             className="w-full rounded-lg border px-4 py-3 outline-none transition focus:border-blue-600"
// //           />
// //         </div>

// //         {/* Password */}

// //         <div>
// //           <div className="mb-2 flex justify-between">
// //             <label className="text-sm font-medium">Password</label>

// //             <Link
// //               to="/forgot-password"
// //               className="text-sm text-blue-600 hover:underline"
// //             >
// //               Forgot Password?
// //             </Link>
// //           </div>

// //           <input
// //             type="password"
// //             placeholder="Enter your password"
// //             className="w-full rounded-lg border px-4 py-3 outline-none transition focus:border-blue-600"
// //           />
// //         </div>

// //         {/* Remember */}

// //         <div className="flex items-center gap-2">
// //           <input type="checkbox" />

// //           <span className="text-sm text-gray-600">
// //             Remember me
// //           </span>
// //         </div>

// //         {/* Button */}

// //         <button
// //           className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
// //         >
// //           Sign In
// //         </button>

// //         {/* Divider */}

// //         <div className="relative">
// //           <div className="absolute inset-0 flex items-center">
// //             <div className="w-full border-t"></div>
// //           </div>

// //           <div className="relative flex justify-center">
// //             <span className="bg-white px-3 text-sm text-gray-500">
// //               OR
// //             </span>
// //           </div>
// //         </div>

// //         {/* Google */}

// //         <button
// //           type="button"
// //           className="w-full rounded-lg border py-3 font-medium transition hover:bg-gray-50"
// //         >
// //           Continue with Google
// //         </button>

// //         {/* Signup */}

// //         <p className="text-center text-sm text-gray-600">
// //           Don't have an account?{" "}
// //           <Link
// //             to="/signup"
// //             className="font-semibold text-blue-600 hover:underline"
// //           >
// //             Create Account
// //           </Link>
// //         </p>
// //       </form>
// //     </div>
// //   );
// // };

// // export default LoginForm;


// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { loginUser } from "../../api/auth.api";

// const LoginForm = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setError("");

//     try {
//       setLoading(true);

//       const response = await loginUser(formData);

//       console.log("LOGIN SUCCESS:", response);

//       navigate("/");
//     } catch (error) {
//       console.error("LOGIN ERROR:", error);

//       setError(
//         error?.response?.data?.message ||
//         error?.message ||
//         "Login failed"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="w-full max-w-md">

//       <h1 className="text-3xl font-bold text-gray-900">
//         Welcome Back 👋
//       </h1>

//       <p className="mt-2 text-gray-500">
//         Sign in to continue to your ServiceHub account.
//       </p>

//       {error && (
//         <div className="mt-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
//           {error}
//         </div>
//       )}

//       <form
//         onSubmit={handleSubmit}
//         className="mt-8 space-y-5"
//       >

//         {/* Email */}

//         <div>
//           <label className="mb-2 block text-sm font-medium">
//             Email
//           </label>

//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             placeholder="Enter your email"
//             required
//             className="w-full rounded-lg border px-4 py-3 outline-none transition focus:border-blue-600"
//           />
//         </div>

//         {/* Password */}

//         <div>
//           <div className="mb-2 flex justify-between">
//             <label className="text-sm font-medium">
//               Password
//             </label>

//             <Link
//               to="/forgot-password"
//               className="text-sm text-blue-600 hover:underline"
//             >
//               Forgot Password?
//             </Link>
//           </div>

//           <input
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             placeholder="Enter your password"
//             required
//             className="w-full rounded-lg border px-4 py-3 outline-none transition focus:border-blue-600"
//           />
//         </div>

//         {/* Remember */}

//         <div className="flex items-center gap-2">
//           <input
//             type="checkbox"
//             name="remember"
//           />

//           <span className="text-sm text-gray-600">
//             Remember me
//           </span>
//         </div>

//         {/* Button */}

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
//         >
//           {loading ? "Signing In..." : "Sign In"}
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
//           className="w-full rounded-lg border py-3 font-medium transition hover:bg-gray-50"
//         >
//           Continue with Google
//         </button>

//         {/* Signup */}

//         <p className="text-center text-sm text-gray-600">
//           Don't have an account?{" "}
//           <Link
//             to="/signup"
//             className="font-semibold text-blue-600 hover:underline"
//           >
//             Create Account
//           </Link>
//         </p>

//       </form>
//     </div>
//   );
// };

// export default LoginForm;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../api/auth.api";
import { useAuth } from "../../context/AuthContext";

const LoginForm = () => {
  const navigate = useNavigate();

  const { fetchCurrentUser } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    try {
      setLoading(true);

      // Login API
      await loginUser(formData);

      // Login ke baad backend se current user fetch
      await fetchCurrentUser();

      // Home page par redirect
      navigate("/");
    } catch (error) {
      console.error("LOGIN ERROR:", error);

      setError(error?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      {/* Heading */}

      <h1 className="text-3xl font-bold text-gray-900">
        Welcome Back 👋
      </h1>

      <p className="mt-2 text-gray-500">
        Sign in to continue to your ServiceHub account.
      </p>

      {/* Error */}

      {error && (
        <div className="mt-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Form */}

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-5"
      >
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
            required
            className="w-full rounded-lg border px-4 py-3 outline-none transition focus:border-blue-600"
          />
        </div>

        {/* Password */}

        <div>
          <div className="mb-2 flex justify-between">
            <label className="text-sm font-medium">
              Password
            </label>

            <Link
              to="/forgot-password"
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
            className="w-full rounded-lg border px-4 py-3 outline-none transition focus:border-blue-600"
          />
        </div>

        {/* Remember */}

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="remember"
          />

          <span className="text-sm text-gray-600">
            Remember me
          </span>
        </div>

        {/* Login Button */}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Signing In..." : "Sign In"}
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
          className="w-full rounded-lg border py-3 font-medium transition hover:bg-gray-50"
        >
          Continue with Google
        </button>

        {/* Signup */}

        <p className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-semibold text-blue-600 hover:underline"
          >
            Create Account
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;