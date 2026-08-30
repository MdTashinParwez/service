import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  AlertCircle,
  ArrowRight,
  CalendarDays,
  Check,
  CheckCircle2,
  Loader2,
  LockKeyhole,
  Mail,
  Pencil,
  Phone,
  RefreshCw,
  ShieldCheck,
  UserRound,
  X,
} from "lucide-react";
import { toast } from "sonner";
import {
  getCurrentUser,
  updateProfileDetails,
  updateUserAvatar,
  changeCurrentPassword,
} from "../../api/auth.api";

const UserProfile = () => {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [editingProfile, setEditingProfile] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);

  const [editingPassword, setEditingPassword] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  const [profileForm, setProfileForm] = useState({
    username: "",
    email: "",
    phone: "",
  });

  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const avatarInputRef = useRef(null);

  // =====================================================
  // FETCH CURRENT USER
  // =====================================================

  const fetchUser = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getCurrentUser();

      const currentUser = response?.data || null;

      if (!currentUser) {
        throw new Error("Unable to fetch user profile.");
      }

      setUser(currentUser);

      setProfileForm({
        username: currentUser.username || "",
        email: currentUser.email || "",
        phone: currentUser.phone || "",
      });
    } catch (error) {
      console.error("Failed to load user profile:", error);

      setError(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to load your profile."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // =====================================================
  // PROFILE EDIT
  // =====================================================

  const handleEditProfile = () => {
    setError("");

    setProfileForm({
      username: user?.username || "",
      email: user?.email || "",
      phone: user?.phone || "",
    });

    setEditingProfile(true);
  };

  const handleCancelProfile = () => {
    if (savingProfile) return;

    setProfileForm({
      username: user?.username || "",
      email: user?.email || "",
      phone: user?.phone || "",
    });

    setEditingProfile(false);
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;

    setProfileForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProfileSave = async () => {
    const username = profileForm.username.trim();
    const email = profileForm.email.trim().toLowerCase();
    const phone = profileForm.phone.trim();

    if (!username || !email || !phone) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (username.length < 3) {
      toast.error("Username must be at least 3 characters.");
      return;
    }

    if (username.length > 8) {
      toast.error("Username cannot exceed 8 characters.");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (!/^[0-9]{10}$/.test(phone)) {
      toast.error("Phone number must contain exactly 10 digits.");
      return;
    }

    try {
      setSavingProfile(true);

      const response = await updateProfileDetails({
        username,
        email,
        phone,
      });

      const updatedUser = response?.data;

      if (updatedUser) {
        setUser(updatedUser);

        setProfileForm({
          username: updatedUser.username || "",
          email: updatedUser.email || "",
          phone: updatedUser.phone || "",
        });
      }

      setEditingProfile(false);

      toast.success("Profile updated successfully.");
    } catch (error) {
      console.error("Failed to update profile:", error);

      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to update profile."
      );
    } finally {
      setSavingProfile(false);
    }
  };

  // =====================================================
  // AVATAR
  // =====================================================

  const handleAvatarClick = () => {
    if (!uploadingAvatar) {
      avatarInputRef.current?.click();
    }
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file.");
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Avatar image must be less than 5MB.");
      e.target.value = "";
      return;
    }

    try {
      setUploadingAvatar(true);

      const formData = new FormData();
      formData.append("avatar", file);

      const response = await updateUserAvatar(formData);

      if (response?.data) {
        setUser(response.data);
      }

      toast.success("Profile photo updated successfully.");
    } catch (error) {
      console.error("Failed to update avatar:", error);

      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to update profile photo."
      );
    } finally {
      setUploadingAvatar(false);
      e.target.value = "";
    }
  };

  // =====================================================
  // PASSWORD
  // =====================================================

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;

    setPasswordForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordEdit = () => {
    setPasswordForm({
      oldPassword: "",
      newPassword: "",
    });

    setEditingPassword(true);
  };

  const handlePasswordCancel = () => {
    if (savingPassword) return;

    setPasswordForm({
      oldPassword: "",
      newPassword: "",
    });

    setEditingPassword(false);
  };

  const handlePasswordSave = async () => {
    const oldPassword = passwordForm.oldPassword.trim();
    const newPassword = passwordForm.newPassword.trim();

    if (!oldPassword || !newPassword) {
      toast.error("Both password fields are required.");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("New password must be at least 6 characters.");
      return;
    }

    if (oldPassword === newPassword) {
      toast.error("New password cannot be the same as the old password.");
      return;
    }

    try {
      setSavingPassword(true);

      await changeCurrentPassword({
        oldPassword,
        newPassword,
      });

      setPasswordForm({
        oldPassword: "",
        newPassword: "",
      });

      setEditingPassword(false);

      toast.success("Password changed successfully.");
    } catch (error) {
      console.error("Failed to change password:", error);

      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to change password."
      );
    } finally {
      setSavingPassword(false);
    }
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 dark:bg-slate-950">
        

        <section className="flex min-h-[calc(100vh-64px)] items-center justify-center px-5">
          <div className="w-full max-w-sm rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-50 dark:bg-slate-800">
              <Loader2
                size={27}
                className="animate-spin text-gray-500"
              />
            </div>

            <h1 className="mt-5 text-lg font-bold text-gray-900 dark:text-white">
              Loading your profile
            </h1>

            <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
              Please wait while we load your account details.
            </p>
          </div>
        </section>
      </main>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (error && !user) {
    return (
      <main className="min-h-screen bg-gray-50 dark:bg-slate-950">
        {/* <Navbar /> */}

        <section className="flex min-h-[calc(100vh-64px)] items-center justify-center px-5">
          <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600 dark:bg-red-950/40">
              <AlertCircle size={23} />
            </div>

            <h1 className="mt-4 text-xl font-bold text-gray-900 dark:text-white">
              Unable to load profile
            </h1>

            <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
              {error}
            </p>

            <button
              type="button"
              onClick={fetchUser}
              className="
                mt-6 inline-flex items-center gap-2
                rounded-xl bg-gray-900 px-5 py-2.5
                text-sm font-semibold text-white
                transition hover:bg-gray-800
                dark:bg-white dark:text-gray-900
                dark:hover:bg-gray-100
              "
            >
              <RefreshCw size={16} />
              Try Again
            </button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-slate-950">
      {/* ===================================================
          NAVBAR
      =================================================== */}

     

      <section>
        <div className="mx-auto w-full max-w-5xl px-5 py-8 sm:px-6 lg:px-8 lg:py-10">

          {/* =================================================
              PAGE INTRO
          ================================================= */}

          <div className="mb-8">
            <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">
              Account
            </p>

            <h1 className="mt-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
              My Profile
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500 dark:text-gray-400">
              Manage your personal information, bookings and account security.
            </p>
          </div>

          {/* =================================================
              PROFILE SUMMARY
          ================================================= */}

          <section className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">

            <div className="h-24 border-b border-gray-100 bg-gray-50 dark:border-slate-800 dark:bg-slate-800/40" />

            <div className="px-5 pb-7 sm:px-7">
              <div className="-mt-12 flex flex-col gap-6 sm:-mt-14 sm:flex-row sm:items-end sm:justify-between">

                <div className="flex items-end gap-4">

                  {/* Avatar */}
                  <div className="relative shrink-0">
                    <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl border-4 border-white bg-gray-100 shadow-md dark:border-slate-900 dark:bg-slate-800 sm:h-28 sm:w-28">
                      {user?.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user?.username || "User"}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <UserRound
                          size={40}
                          strokeWidth={1.5}
                          className="text-gray-400"
                        />
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={handleAvatarClick}
                      disabled={uploadingAvatar}
                      aria-label="Change profile photo"
                      className="
                        absolute -bottom-2 -right-2
                        flex h-9 w-9 items-center justify-center
                        rounded-xl border-2 border-white
                        bg-gray-900 text-white shadow-sm
                        transition hover:bg-gray-700
                        disabled:cursor-not-allowed
                        disabled:opacity-60
                        dark:border-slate-900
                      "
                    >
                      {uploadingAvatar ? (
                        <Loader2
                          size={15}
                          className="animate-spin"
                        />
                      ) : (
                        <Pencil size={15} />
                      )}
                    </button>

                    <input
                      ref={avatarInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="hidden"
                    />
                  </div>

                  {/* Identity */}
                  <div className="pb-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">
                        @{user?.username || "user"}
                      </h2>

                      {user?.isVerified && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400">
                          <CheckCircle2 size={13} />
                          Verified
                        </span>
                      )}
                    </div>

                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      Customer Account
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <Mail size={16} />
                  <span className="max-w-[260px] truncate">
                    {user?.email}
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* =================================================
              PERSONAL INFORMATION
          ================================================= */}

          <section className="mt-6 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">

            <div className="flex flex-col gap-4 border-b border-gray-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7 dark:border-slate-800">

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-50 text-gray-600 dark:bg-slate-800 dark:text-gray-300">
                  <UserRound size={19} />
                </div>

                <div>
                  <h2 className="font-bold text-gray-900 dark:text-white">
                    Personal Information
                  </h2>

                  <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                    Your account and contact information.
                  </p>
                </div>
              </div>

              {!editingProfile && (
                <button
                  type="button"
                  onClick={handleEditProfile}
                  className="
                    inline-flex items-center justify-center gap-2
                    rounded-xl border border-gray-200
                    px-4 py-2.5 text-sm font-semibold
                    text-gray-700 transition hover:bg-gray-50
                    dark:border-slate-700 dark:text-gray-200
                    dark:hover:bg-slate-800
                  "
                >
                  <Pencil size={15} />
                  Edit
                </button>
              )}
            </div>

            <div className="p-5 sm:p-7">

              {!editingProfile ? (
                <div className="grid gap-4 md:grid-cols-3">
                  <InfoCard
                    icon={UserRound}
                    label="Username"
                    value={user?.username}
                  />

                  <InfoCard
                    icon={Mail}
                    label="Email Address"
                    value={user?.email}
                  />

                  <InfoCard
                    icon={Phone}
                    label="Phone Number"
                    value={user?.phone}
                  />
                </div>
              ) : (
                <div>

                  <div className="grid gap-5 md:grid-cols-3">

                    <InputField
                      label="Username"
                      name="username"
                      value={profileForm.username}
                      onChange={handleProfileChange}
                      icon={UserRound}
                    />

                    <InputField
                      label="Email Address"
                      name="email"
                      type="email"
                      value={profileForm.email}
                      onChange={handleProfileChange}
                      icon={Mail}
                    />

                    <InputField
                      label="Phone Number"
                      name="phone"
                      type="tel"
                      value={profileForm.phone}
                      onChange={handleProfileChange}
                      icon={Phone}
                      maxLength={10}
                    />

                  </div>

                  <div className="mt-6 flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:justify-end dark:border-slate-800">

                    <button
                      type="button"
                      onClick={handleCancelProfile}
                      disabled={savingProfile}
                      className="
                        inline-flex items-center justify-center gap-2
                        rounded-xl border border-gray-200
                        px-5 py-2.5 text-sm font-semibold
                        text-gray-700 transition hover:bg-gray-50
                        disabled:opacity-50
                        dark:border-slate-700 dark:text-gray-200
                        dark:hover:bg-slate-800
                      "
                    >
                      <X size={16} />
                      Cancel
                    </button>

                    <button
                      type="button"
                      onClick={handleProfileSave}
                      disabled={savingProfile}
                      className="
                        inline-flex items-center justify-center gap-2
                        rounded-xl bg-gray-900
                        px-5 py-2.5 text-sm font-semibold
                        text-white transition hover:bg-gray-800
                        disabled:cursor-not-allowed disabled:opacity-60
                        dark:bg-white dark:text-gray-900
                        dark:hover:bg-gray-100
                      "
                    >
                      {savingProfile ? (
                        <>
                          <Loader2
                            size={16}
                            className="animate-spin"
                          />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Check size={16} />
                          Save Changes
                        </>
                      )}
                    </button>

                  </div>
                </div>
              )}
            </div>
          </section>

          {/* =================================================
              MY BOOKINGS
          ================================================= */}

          <section className="mt-6 rounded-3xl border border-gray-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">

            <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-7">

              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gray-50 text-gray-600 dark:bg-slate-800 dark:text-gray-300">
                  <CalendarDays size={20} />
                </div>

                <div>
                  <h2 className="font-bold text-gray-900 dark:text-white">
                    My Bookings
                  </h2>

                  <p className="mt-1 max-w-xl text-sm leading-6 text-gray-500 dark:text-gray-400">
                    View, track and manage all your service bookings from
                    your bookings page.
                  </p>
                </div>
              </div>

              <Link
                to="/bookings"
                className="
                  group inline-flex shrink-0 items-center
                  justify-center gap-2 rounded-xl
                  bg-gray-900 px-4 py-2.5
                  text-sm font-semibold text-white
                  transition hover:bg-gray-800
                  dark:bg-white dark:text-gray-900
                  dark:hover:bg-gray-100
                "
              >
                View Bookings
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </section>

          {/* =================================================
              ACCOUNT SECURITY
          ================================================= */}

          <section className="mt-6 mb-10 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">

            <div className="flex items-center gap-3 border-b border-gray-100 px-5 py-5 sm:px-7 dark:border-slate-800">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-50 text-gray-600 dark:bg-slate-800 dark:text-gray-300">
                <ShieldCheck size={19} />
              </div>

              <div>
                <h2 className="font-bold text-gray-900 dark:text-white">
                  Account Security
                </h2>

                <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                  Protect your account and manage your password.
                </p>
              </div>
            </div>

            <div className="p-5 sm:p-7">

              {!editingPassword ? (
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-50 text-gray-500 dark:bg-slate-800 dark:text-gray-300">
                      <LockKeyhole size={18} />
                    </div>

                    <div>
                      <p className="text-sm font-bold text-gray-900 dark:text-white">
                        Password
                      </p>

                      <p className="mt-1 text-sm leading-6 text-gray-500 dark:text-gray-400">
                        Change your password to keep your account secure.
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handlePasswordEdit}
                    className="
                      inline-flex items-center justify-center gap-2
                      rounded-xl border border-gray-200
                      px-4 py-2.5 text-sm font-semibold
                      text-gray-700 transition hover:bg-gray-50
                      dark:border-slate-700 dark:text-gray-200
                      dark:hover:bg-slate-800
                    "
                  >
                    <Pencil size={15} />
                    Change Password
                  </button>
                </div>
              ) : (
                <div>

                  <div className="grid gap-5 md:grid-cols-2">

                    <PasswordField
                      label="Current Password"
                      name="oldPassword"
                      value={passwordForm.oldPassword}
                      onChange={handlePasswordChange}
                    />

                    <PasswordField
                      label="New Password"
                      name="newPassword"
                      value={passwordForm.newPassword}
                      onChange={handlePasswordChange}
                    />

                  </div>

                  <div className="mt-6 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-800/50">
                    <p className="text-xs leading-5 text-gray-500 dark:text-gray-400">
                      Your new password must contain at least 6 characters.
                    </p>
                  </div>

                  <div className="mt-6 flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:justify-end dark:border-slate-800">

                    <button
                      type="button"
                      onClick={handlePasswordCancel}
                      disabled={savingPassword}
                      className="
                        inline-flex items-center justify-center gap-2
                        rounded-xl border border-gray-200
                        px-5 py-2.5 text-sm font-semibold
                        text-gray-700 transition hover:bg-gray-50
                        disabled:opacity-50
                        dark:border-slate-700 dark:text-gray-200
                        dark:hover:bg-slate-800
                      "
                    >
                      <X size={16} />
                      Cancel
                    </button>

                    <button
                      type="button"
                      onClick={handlePasswordSave}
                      disabled={savingPassword}
                      className="
                        inline-flex items-center justify-center gap-2
                        rounded-xl bg-gray-900
                        px-5 py-2.5 text-sm font-semibold
                        text-white transition hover:bg-gray-800
                        disabled:cursor-not-allowed
                        disabled:opacity-60
                        dark:bg-white dark:text-gray-900
                        dark:hover:bg-gray-100
                      "
                    >
                      {savingPassword ? (
                        <>
                          <Loader2
                            size={16}
                            className="animate-spin"
                          />
                          Updating...
                        </>
                      ) : (
                        <>
                          <Check size={16} />
                          Update Password
                        </>
                      )}
                    </button>

                  </div>
                </div>
              )}
            </div>
          </section>

        </div>
      </section>
    </main>
  );
};

// =====================================================
// INFO CARD
// =====================================================

const InfoCard = ({ icon: Icon, label, value }) => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 dark:border-slate-800 dark:bg-slate-800/50">
      <div className="flex items-center gap-2">
        <Icon
          size={15}
          className="text-gray-400"
        />

        <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">
          {label}
        </span>
      </div>

      <p className="mt-2 break-words text-sm font-semibold text-gray-800 dark:text-gray-200">
        {value || "Not provided"}
      </p>
    </div>
  );
};

// =====================================================
// INPUT FIELD
// =====================================================

const InputField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  icon: Icon,
  maxLength,
}) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300"
      >
        {label}
      </label>

      <div className="relative">
        <Icon
          size={17}
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          maxLength={maxLength}
          className="
            h-11 w-full rounded-xl
            border border-gray-200
            bg-white pl-10 pr-4
            text-sm text-gray-900
            outline-none transition
            placeholder:text-gray-400
            hover:border-gray-300
            focus:border-gray-400
            focus:ring-4 focus:ring-gray-100
            dark:border-slate-700
            dark:bg-slate-950
            dark:text-white
            dark:hover:border-slate-600
            dark:focus:border-slate-500
            dark:focus:ring-slate-800
          "
        />
      </div>
    </div>
  );
};

// =====================================================
// PASSWORD FIELD
// =====================================================

const PasswordField = ({
  label,
  name,
  value,
  onChange,
}) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300"
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        type="password"
        value={value}
        onChange={onChange}
        className="
          h-11 w-full rounded-xl
          border border-gray-200
          bg-white px-4
          text-sm text-gray-900
          outline-none transition
          placeholder:text-gray-400
          focus:border-gray-400
          focus:ring-4 focus:ring-gray-100
          dark:border-slate-700
          dark:bg-slate-950
          dark:text-white
          dark:focus:border-slate-500
          dark:focus:ring-slate-800
        "
      />
    </div>
  );
};

export default UserProfile;