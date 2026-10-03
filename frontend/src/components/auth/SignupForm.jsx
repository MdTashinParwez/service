// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { registerUser } from "../../api/auth.api";

// const SignupForm = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     phone: "",
//     avatar: null,
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: files ? files[0] : value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setError("");

//     if (formData.password !== formData.confirmPassword) {
//       setError("Passwords do not match");
//       return;
//     }

//     if (!formData.avatar) {
//       setError("Please select an avatar");
//       return;
//     }

//     try {
//       setLoading(true);

//       const body = new FormData();

//       body.append("username", formData.username);
//       body.append("email", formData.email);
//       body.append("password", formData.password);
//       body.append("phone", formData.phone);
//       body.append("avatar", formData.avatar);

//       const response = await registerUser(body);



//       navigate("/login");
//     } catch (error) {
//       console.error("REGISTER ERROR:", error);
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="w-full max-w-md">

//       <h1 className="text-3xl font-bold text-gray-900">
//         Create Account
//       </h1>

//       <p className="mt-2 text-gray-500">
//         Join Helper and get started today.
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
//         {/* Username */}

//         <div>
//           <label className="mb-2 block text-sm font-medium">
//             Username
//           </label>

//           <input
//             type="text"
//             name="username"
//             value={formData.username}
//             onChange={handleChange}
//             placeholder="Enter your username"
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
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             placeholder="Enter your email"
//             className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-600"
//           />
//         </div>

//         {/* Phone */}

//         <div>
//           <label className="mb-2 block text-sm font-medium">
//             Phone
//           </label>

//           <input
//             type="tel"
//             name="phone"
//             value={formData.phone}
//             onChange={handleChange}
//             placeholder="Enter your phone number"
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
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
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
//             name="confirmPassword"
//             value={formData.confirmPassword}
//             onChange={handleChange}
//             placeholder="Confirm password"
//             className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-600"
//           />
//         </div>

//         {/* Avatar */}

//         <div>
//           <label className="mb-2 block text-sm font-medium">
//             Profile Picture
//           </label>

//           <input
//             type="file"
//             name="avatar"
//             accept="image/*"
//             onChange={handleChange}
//             className="w-full rounded-lg border px-4 py-3"
//           />
//         </div>

//         {/* Terms */}

//         <label className="flex items-start gap-2 text-sm text-gray-600">
//           <input
//             type="checkbox"
//             required
//             className="mt-1"
//           />

//           <span>
//             I agree to the{" "}
//             <Link
//               to="/terms"
//               className="text-blue-600"
//             >
//               Terms
//             </Link>{" "}
//             and{" "}
//             <Link
//               to="/privacy"
//               className="text-blue-600"
//             >
//               Privacy Policy
//             </Link>
//           </span>
//         </label>

//         {/* Submit */}

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
//         >
//           {loading ? "Creating Account..." : "Create Account"}
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
import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
  LoaderCircle,
  AlertCircle,
  User,
  Phone,
  Camera,
} from "lucide-react";

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

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "avatar") {
      const file = files?.[0] || null;

      setFormData((prev) => ({
        ...prev,
        avatar: file,
      }));

      if (file) {
        setAvatarPreview(URL.createObjectURL(file));
      } else {
        setAvatarPreview("");
      }

      setError("");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  };

  const validateForm = () => {
    const username = formData.username.trim();
    const email = formData.email.trim();
    const phone = formData.phone.trim();
    const password = formData.password;
    const confirmPassword = formData.confirmPassword;

    // Username
    if (!username) {
      return "Please enter your username.";
    }

    if (username.length < 3) {
      return "Username must be at least 3 characters long.";
    }

    if (username.length > 30) {
      return "Username cannot exceed 30 characters.";
    }

    if (!/^[a-zA-Z0-9_ ]+$/.test(username)) {
      return "Username can only contain letters, numbers, spaces, and underscores.";
    }

    // Email
    if (!email) {
      return "Please enter your email address.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return "Please enter a valid email address.";
    }

    // Phone
    if (!phone) {
      return "Please enter your phone number.";
    }

    if (!/^\d+$/.test(phone)) {
      return "Phone number must contain only digits.";
    }

    if (phone.length !== 10) {
      return "Phone number must be exactly 10 digits.";
    }

    if (!/^[6-9]\d{9}$/.test(phone)) {
      return "Please enter a valid 10-digit Indian phone number.";
    }

    // Password
    if (!password) {
      return "Please create a password.";
    }

    if (password.length < 8) {
      return "Password must be at least 8 characters long.";
    }

    if (password.length > 50) {
      return "Password cannot exceed 50 characters.";
    }

    // Confirm password
    if (!confirmPassword) {
      return "Please confirm your password.";
    }

    if (password !== confirmPassword) {
      return "Passwords do not match.";
    }

    // Avatar
    if (!formData.avatar) {
      return "Please select a profile picture.";
    }

    if (!formData.avatar.type.startsWith("image/")) {
      return "Please select a valid image file.";
    }

    // File size: 5 MB
    if (formData.avatar.size > 5 * 1024 * 1024) {
      return "Profile picture must be smaller than 5 MB.";
    }

    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);

      const body = new FormData();

      body.append(
        "username",
        formData.username.trim()
      );

      body.append(
        "email",
        formData.email.trim()
      );

      body.append(
        "password",
        formData.password
      );

      body.append(
        "phone",
        formData.phone.trim()
      );

      body.append(
        "avatar",
        formData.avatar
      );

      await registerUser(body);

      navigate("/login");
    } catch (error) {
      console.error("REGISTER ERROR:", error);

      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Unable to create your account. Please try again.";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      {/* Header */}
      <div>
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50">
          <ShieldCheck
            size={25}
            className="text-blue-600"
          />
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Create your account
        </h1>

        <p className="mt-2 text-sm leading-6 text-gray-500 sm:text-base">
          Join Helper and get started with trusted services.
        </p>
      </div>

      {/* Error */}
      {error && (
        <div
          role="alert"
          className="mt-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3.5 text-sm text-red-700"
        >
          <AlertCircle
            size={18}
            className="mt-0.5 shrink-0"
          />

          <p className="leading-5">{error}</p>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-5"
      >
        {/* Username */}
        <div>
          <label
            htmlFor="username"
            className="mb-2 block text-sm font-semibold text-gray-800"
          >
            Username
          </label>

          <div className="relative">
            <User
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              id="username"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              autoComplete="username"
              disabled={loading}
              required
              maxLength={30}
              className="w-full rounded-xl border border-gray-200 bg-white py-3.5 pl-11 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 hover:border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:bg-gray-50"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-semibold text-gray-800"
          >
            Email address
          </label>

          <div className="relative">
            <Mail
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              autoComplete="email"
              disabled={loading}
              required
              className="w-full rounded-xl border border-gray-200 bg-white py-3.5 pl-11 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 hover:border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:bg-gray-50"
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label
            htmlFor="phone"
            className="mb-2 block text-sm font-semibold text-gray-800"
          >
            Phone number
          </label>

          <div className="relative">
            <Phone
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              id="phone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="10-digit phone number"
              autoComplete="tel"
              disabled={loading}
              required
              maxLength={10}
              inputMode="numeric"
              className="w-full rounded-xl border border-gray-200 bg-white py-3.5 pl-11 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 hover:border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:bg-gray-50"
            />
          </div>

          <p className="mt-1.5 text-xs text-gray-400">
            Enter a valid 10-digit Indian mobile number.
          </p>
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-semibold text-gray-800"
          >
            Password
          </label>

          <div className="relative">
            <LockKeyhole
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              autoComplete="new-password"
              disabled={loading}
              required
              maxLength={50}
              className="w-full rounded-xl border border-gray-200 bg-white py-3.5 pl-11 pr-12 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 hover:border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:bg-gray-50"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword((prev) => !prev)
              }
              disabled={loading}
              aria-label={
                showPassword
                  ? "Hide password"
                  : "Show password"
              }
              className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
            >
              {showPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label
            htmlFor="confirmPassword"
            className="mb-2 block text-sm font-semibold text-gray-800"
          >
            Confirm password
          </label>

          <div className="relative">
            <LockKeyhole
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              id="confirmPassword"
              type={
                showConfirmPassword
                  ? "text"
                  : "password"
              }
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              autoComplete="new-password"
              disabled={loading}
              required
              maxLength={50}
              className="w-full rounded-xl border border-gray-200 bg-white py-3.5 pl-11 pr-12 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 hover:border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:bg-gray-50"
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(
                  (prev) => !prev
                )
              }
              disabled={loading}
              aria-label={
                showConfirmPassword
                  ? "Hide confirm password"
                  : "Show confirm password"
              }
              className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
            >
              {showConfirmPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>
        </div>

        {/* Avatar */}
        <div>
          <label
            htmlFor="avatar"
            className="mb-2 block text-sm font-semibold text-gray-800"
          >
            Profile picture
          </label>

          <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-3">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-blue-50">
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt="Profile preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <Camera
                  size={21}
                  className="text-blue-500"
                />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <input
                id="avatar"
                type="file"
                name="avatar"
                accept="image/*"
                onChange={handleChange}
                disabled={loading}
                required
                className="block w-full cursor-pointer text-sm text-gray-500 file:mr-3 file:rounded-lg file:border-0 file:bg-blue-50 file:px-3 file:py-2 file:text-xs file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
              />

              <p className="mt-1 text-xs text-gray-400">
                Maximum file size: 5 MB.
              </p>
            </div>
          </div>
        </div>

        {/* Terms */}
        <label className="flex cursor-pointer items-start gap-3 text-sm text-gray-600">
          <input
            type="checkbox"
            required
            disabled={loading}
            className="mt-1 h-4 w-4 rounded border-gray-300 accent-blue-600 focus:ring-blue-500"
          />

          <span className="leading-6">
            I agree to the{" "}
            <Link
              to="/terms"
              className="font-medium text-blue-600 hover:text-blue-700 hover:underline"
            >
              Terms
            </Link>{" "}
            and{" "}
            <Link
              to="/privacy"
              className="font-medium text-blue-600 hover:text-blue-700 hover:underline"
            >
              Privacy Policy
            </Link>
          </span>
        </label>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 hover:shadow-blue-600/30 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none"
        >
          {loading ? (
            <>
              <LoaderCircle
                size={18}
                className="animate-spin"
              />
              Creating account...
            </>
          ) : (
            "Create account"
          )}
        </button>

        {/* Divider */}
        <div className="relative py-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>

          <div className="relative flex justify-center">
            <span className="bg-white px-4 text-xs font-medium uppercase tracking-wider text-gray-400">
              Or continue with
            </span>
          </div>
        </div>

        {/* Google */}
        <button
          type="button"
          disabled
          className="flex w-full cursor-not-allowed items-center justify-center gap-3 rounded-xl border border-gray-200 bg-gray-50 py-3.5 text-sm font-semibold text-gray-400"
        >
          <span className="flex h-5 w-5 items-center justify-center text-base font-bold">
            G
          </span>

          <span>Continue with Google</span>

          <span className="rounded-full bg-gray-200 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-gray-500">
            Coming Soon
          </span>
        </button>

        {/* Login */}
        <p className="pt-2 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-blue-600 transition hover:text-blue-700 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </form>

      {/* Security note */}
      <div className="mt-8 flex items-center justify-center gap-2 text-xs text-gray-400">
        <ShieldCheck size={14} />
        Your account information is securely protected.
      </div>
    </div>
  );
};

export default SignupForm;