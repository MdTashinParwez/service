import { useEffect, useMemo, useRef, useState } from "react";
import {
  AlertCircle,
  Building2,
  Check,
  CheckCircle2,
  ChevronDown,
  FileText,
  Loader2,
  Mail,
  Pencil,
  Phone,
  RefreshCw,
  ShieldCheck,
  Upload,
  UserRound,
  X,
} from "lucide-react";
import { toast } from "sonner";

import ProviderSidebar from "../../components/provider/ProviderSidebar";
import ProviderNavbar from "../../components/provider/ProviderNavbar";

import {
  getCurrentUser,
  updateProfileDetails,
  updateUserAvatar,
} from "../../api/auth.api";

import {
  getCurrentProvider,
  updateProviderDetail,
  updateProviderDocument,
} from "../../api/provider.api";

import { getAllCategories } from "../../api/category.api";

const ProviderProfile = () => {
  const [user, setUser] = useState(null);
  const [provider, setProvider] = useState(null);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [editingPersonal, setEditingPersonal] = useState(false);
  const [editingBusiness, setEditingBusiness] = useState(false);

  const [savingPersonal, setSavingPersonal] = useState(false);
  const [savingBusiness, setSavingBusiness] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [uploadingDocument, setUploadingDocument] = useState(false);

  const [personalForm, setPersonalForm] = useState({
    username: "",
    email: "",
    phone: "",
  });

  const [businessForm, setBusinessForm] = useState({
    businessName: "",
    businessDescription: "",
    businessCategory: "",
  });

  const avatarInputRef = useRef(null);
  const documentInputRef = useRef(null);

  // =====================================================
  // FETCH PROFILE
  // =====================================================

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError("");

      const [userResponse, providerResponse, categoryResponse] =
        await Promise.all([
          getCurrentUser(),
          getCurrentProvider(),
          getAllCategories(),
        ]);

      const currentUser = userResponse?.data || null;
      const currentProvider = providerResponse?.data || null;

      setUser(currentUser);
      setProvider(currentProvider);

      setCategories(
        Array.isArray(categoryResponse?.data)
          ? categoryResponse.data
          : categoryResponse?.data?.categories || []
      );

      setPersonalForm({
        username: currentUser?.username || "",
        email: currentUser?.email || "",
        phone: currentUser?.phone || "",
      });

      setBusinessForm({
        businessName: currentProvider?.businessName || "",
        businessDescription:
          currentProvider?.businessDescription || "",
        businessCategory:
          currentProvider?.businessCategory?._id || "",
      });
    } catch (error) {
      console.error("Failed to load provider profile:", error);

      setError(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to load provider profile."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // =====================================================
  // PROFILE COMPLETION
  // =====================================================

  const profileCompletion = useMemo(() => {
    if (!user || !provider) return 0;

    const fields = [
      user.avatar,
      user.username,
      user.email,
      user.phone,
      provider.businessName,
      provider.businessDescription,
      provider.businessCategory,
      provider.documents?.length > 0,
    ];

    const completed = fields.filter(Boolean).length;

    return Math.round((completed / fields.length) * 100);
  }, [user, provider]);

  // =====================================================
  // PERSONAL FORM
  // =====================================================

  const handlePersonalChange = (e) => {
    const { name, value } = e.target;

    setPersonalForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetPersonalForm = () => {
    setPersonalForm({
      username: user?.username || "",
      email: user?.email || "",
      phone: user?.phone || "",
    });
  };

  const handlePersonalSave = async () => {
    try {
      if (
        !personalForm.username.trim() ||
        !personalForm.email.trim() ||
        !personalForm.phone.trim()
      ) {
        toast.error("Please fill all personal details.");
        return;
      }

      setSavingPersonal(true);

      const response = await updateProfileDetails({
        username: personalForm.username.trim(),
        email: personalForm.email.trim(),
        phone: personalForm.phone.trim(),
      });

      const updatedUser = response?.data;

      if (updatedUser) {
        setUser(updatedUser);

        setPersonalForm({
          username: updatedUser.username || "",
          email: updatedUser.email || "",
          phone: updatedUser.phone || "",
        });
      }

      setEditingPersonal(false);

      toast.success("Personal information updated successfully.");
    } catch (error) {
      console.error("Failed to update personal details:", error);

      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to update personal information."
      );
    } finally {
      setSavingPersonal(false);
    }
  };

  // =====================================================
  // BUSINESS FORM
  // =====================================================

  const handleBusinessChange = (e) => {
    const { name, value } = e.target;

    setBusinessForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetBusinessForm = () => {
    setBusinessForm({
      businessName: provider?.businessName || "",
      businessDescription:
        provider?.businessDescription || "",
      businessCategory:
        provider?.businessCategory?._id || "",
    });
  };

  const handleBusinessSave = async () => {
    try {
      if (!businessForm.businessName.trim()) {
        toast.error("Business name is required.");
        return;
      }

      if (!businessForm.businessDescription.trim()) {
        toast.error("Business description is required.");
        return;
      }

      if (!businessForm.businessCategory) {
        toast.error("Please select a business category.");
        return;
      }

      setSavingBusiness(true);

      const response = await updateProviderDetail({
        businessName: businessForm.businessName.trim(),
        businessDescription:
          businessForm.businessDescription.trim(),
        businessCategory: businessForm.businessCategory,
      });

      const updatedProvider = response?.data;

      if (updatedProvider) {
        setProvider(updatedProvider);

        setBusinessForm({
          businessName: updatedProvider.businessName || "",
          businessDescription:
            updatedProvider.businessDescription || "",
          businessCategory:
            updatedProvider.businessCategory?._id ||
            businessForm.businessCategory,
        });
      }

      setEditingBusiness(false);

      toast.success("Business information updated successfully.");
    } catch (error) {
      console.error("Failed to update business details:", error);

      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to update business information."
      );
    } finally {
      setSavingBusiness(false);
    }
  };

  // =====================================================
  // AVATAR
  // =====================================================

  const handleAvatarClick = () => {
    avatarInputRef.current?.click();
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Avatar image must be less than 5MB.");
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

      if (avatarInputRef.current) {
        avatarInputRef.current.value = "";
      }
    }
  };

  // =====================================================
  // DOCUMENT
  // =====================================================

  const handleDocumentClick = () => {
    documentInputRef.current?.click();
  };

  const handleDocumentChange = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "application/pdf",
    ];

    if (!allowedTypes.includes(file.type)) {
      toast.error("Please upload JPG, PNG, WEBP or PDF.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error("Document must be less than 10MB.");
      return;
    }

    try {
      setUploadingDocument(true);

      const formData = new FormData();
      formData.append("documents", file);

      const response = await updateProviderDocument(formData);

      if (response?.data) {
        setProvider(response.data);
      }

      toast.success("Document updated successfully.");
    } catch (error) {
      console.error("Failed to update document:", error);

      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to update document."
      );
    } finally {
      setUploadingDocument(false);

      if (documentInputRef.current) {
        documentInputRef.current.value = "";
      }
    }
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
        <div className="w-full max-w-sm rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50">
            <Loader2
              size={28}
              className="animate-spin text-blue-600"
            />
          </div>

          <h1 className="mt-5 text-lg font-bold text-gray-900">
            Loading your profile
          </h1>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            Preparing your provider workspace.
          </p>
        </div>
      </main>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
        <div className="w-full max-w-md rounded-3xl border border-red-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
            <AlertCircle size={24} />
          </div>

          <h1 className="mt-4 text-xl font-bold text-gray-900">
            Unable to load profile
          </h1>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            {error}
          </p>

          <button
            type="button"
            onClick={fetchProfile}
            className="
              mt-6 inline-flex items-center gap-2 rounded-xl
              bg-blue-600 px-5 py-2.5 text-sm font-semibold
              text-white transition hover:bg-blue-700
            "
          >
            <RefreshCw size={16} />
            Try Again
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <ProviderNavbar />

      <div className="flex">
        <ProviderSidebar />

        <section className="min-w-0 flex-1">
          <div className="mx-auto w-full max-w-[1500px] p-5 sm:p-6 lg:p-8">

            {/* =====================================================
                PAGE HEADER
            ===================================================== */}

            <div className="mb-7">
              <p className="text-sm font-semibold text-blue-600">
                Account Management
              </p>

              <div className="mt-1 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                    Provider Profile
                  </h1>

                  <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
                    Manage your personal information, business details,
                    documents and provider account.
                  </p>
                </div>
              </div>
            </div>

            {/* =====================================================
                PROFILE HERO
            ===================================================== */}

            <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">

              {/* COVER */}
              <div className="relative h-32 overflow-hidden bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 sm:h-40">
                <div className="absolute -right-12 -top-20 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
                <div className="absolute -bottom-20 left-1/3 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
              </div>

              <div className="px-5 pb-6 sm:px-7 lg:px-8">
                <div className="-mt-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

                  <div className="flex flex-col gap-4 sm:flex-row sm:items-end">

                    {/* AVATAR */}
                    <div className="relative shrink-0">
                      <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-3xl border-4 border-white bg-gray-100 shadow-lg">
                        {user?.avatar ? (
                          <img
                            src={user.avatar}
                            alt={user?.username || "Provider"}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <UserRound
                            size={44}
                            className="text-gray-400"
                          />
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={handleAvatarClick}
                        disabled={uploadingAvatar}
                        className="
                          absolute -bottom-2 -right-2
                          flex h-10 w-10 items-center justify-center
                          rounded-xl border-4 border-white
                          bg-gray-900 text-white shadow-md
                          transition hover:bg-gray-800
                          disabled:cursor-not-allowed disabled:opacity-70
                        "
                        title="Change profile photo"
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

                    {/* IDENTITY */}
                    <div className="pb-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                          {provider?.businessName || "Your Business"}
                        </h2>

                        {provider?.isVerified && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                            <ShieldCheck size={13} />
                            Verified
                          </span>
                        )}
                      </div>

                      <p className="mt-1 text-sm text-gray-500">
                        @{user?.username || "username"}
                      </p>

                      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-gray-500">
                        <span className="inline-flex items-center gap-1.5">
                          <Mail size={13} />
                          {user?.email}
                        </span>

                        <span className="hidden text-gray-300 sm:inline">
                          •
                        </span>

                        <span className="capitalize">
                          {user?.role || "provider"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* COMPLETION */}
                  <div className="w-full max-w-sm rounded-2xl border border-gray-200 bg-gray-50 p-4 lg:w-80">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                          Profile completion
                        </p>

                        <p className="mt-1 text-sm font-bold text-gray-900">
                          {profileCompletion}% complete
                        </p>
                      </div>

                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
                        <Check size={18} />
                      </div>
                    </div>

                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-200">
                      <div
                        className="h-full rounded-full bg-blue-600 transition-all duration-500"
                        style={{
                          width: `${profileCompletion}%`,
                        }}
                      />
                    </div>

                    <p className="mt-2 text-xs text-gray-500">
                      Complete your profile to give customers more
                      confidence.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <section className="mt-6 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">

              <SectionHeader
                icon={UserRound}
                title="Personal Information"
                description="Your account and contact details."
                editing={editingPersonal}
                onEdit={() => {
                  resetPersonalForm();
                  setEditingPersonal(true);
                }}
                onCancel={() => {
                  resetPersonalForm();
                  setEditingPersonal(false);
                }}
              />

              {editingPersonal ? (
                <div className="p-5 sm:p-7">
                  <div className="grid gap-5 md:grid-cols-2">

                    <InputField
                      label="Username"
                      name="username"
                      value={personalForm.username}
                      onChange={handlePersonalChange}
                      icon={UserRound}
                    />

                    <InputField
                      label="Email Address"
                      name="email"
                      type="email"
                      value={personalForm.email}
                      onChange={handlePersonalChange}
                      icon={Mail}
                    />

                    <InputField
                      label="Phone Number"
                      name="phone"
                      value={personalForm.phone}
                      onChange={handlePersonalChange}
                      icon={Phone}
                    />
                  </div>

                  <div className="mt-6 flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        resetPersonalForm();
                        setEditingPersonal(false);
                      }}
                      disabled={savingPersonal}
                      className="
                        rounded-xl border border-gray-200
                        px-5 py-2.5 text-sm font-semibold
                        text-gray-700 transition hover:bg-gray-50
                      "
                    >
                      Cancel
                    </button>

                    <button
                      type="button"
                      onClick={handlePersonalSave}
                      disabled={savingPersonal}
                      className="
                        inline-flex items-center justify-center gap-2
                        rounded-xl bg-blue-600 px-5 py-2.5
                        text-sm font-semibold text-white
                        shadow-sm transition hover:bg-blue-700
                        disabled:cursor-not-allowed disabled:opacity-60
                      "
                    >
                      {savingPersonal && (
                        <Loader2
                          size={16}
                          className="animate-spin"
                        />
                      )}

                      {savingPersonal
                        ? "Saving..."
                        : "Save Changes"}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid gap-4 p-5 sm:grid-cols-2 sm:p-7 lg:grid-cols-3">
                  <InfoItem
                    icon={UserRound}
                    label="Username"
                    value={user?.username}
                  />

                  <InfoItem
                    icon={Mail}
                    label="Email Address"
                    value={user?.email}
                  />

                  <InfoItem
                    icon={Phone}
                    label="Phone Number"
                    value={user?.phone}
                  />
                </div>
              )}
            </section>  

            {/* =====================================================
                BUSINESS INFORMATION
            ===================================================== */}

            <section className="mt-6 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">

              <SectionHeader
                icon={Building2}
                title="Business Information"
                description="Information customers see about your business."
                editing={editingBusiness}
                onEdit={() => {
                  resetBusinessForm();
                  setEditingBusiness(true);
                }}
                onCancel={() => {
                  resetBusinessForm();
                  setEditingBusiness(false);
                }}
              />

              {editingBusiness ? (
                <div className="p-5 sm:p-7">

                  <div className="grid gap-5 md:grid-cols-2">

                    <InputField
                      label="Business Name"
                      name="businessName"
                      value={businessForm.businessName}
                      onChange={handleBusinessChange}
                      icon={Building2}
                    />

                    {/* CATEGORY */}
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-700">
                        Business Category
                      </label>

                      <div className="relative">
                        <BriefcaseIcon />

                        <select
                          name="businessCategory"
                          value={businessForm.businessCategory}
                          onChange={handleBusinessChange}
                          className="
                            h-11 w-full appearance-none
                            rounded-xl border border-gray-200
                            bg-white pl-11 pr-10
                            text-sm text-gray-800 outline-none
                            transition
                            focus:border-blue-500
                            focus:ring-4 focus:ring-blue-50
                          "
                        >
                          <option value="">
                            Select category
                          </option>

                          {categories.map((category) => (
                            <option
                              key={category._id}
                              value={category._id}
                            >
                              {category.name ||
                                category.title ||
                                category.categoryName}
                            </option>
                          ))}
                        </select>

                        <ChevronDown
                          size={17}
                          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                        />
                      </div>
                    </div>

                  </div>

                  {/* DESCRIPTION */}
                  <div className="mt-5">
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Business Description
                    </label>

                    <textarea
                      name="businessDescription"
                      value={businessForm.businessDescription}
                      onChange={handleBusinessChange}
                      maxLength={1000}
                      rows={5}
                      placeholder="Tell customers about your business and the services you provide..."
                      className="
                        w-full resize-none rounded-xl
                        border border-gray-200 bg-white
                        px-4 py-3 text-sm text-gray-800
                        outline-none transition
                        placeholder:text-gray-400
                        focus:border-blue-500
                        focus:ring-4 focus:ring-blue-50
                      "
                    />

                    <div className="mt-1 flex justify-end">
                      <span className="text-xs text-gray-400">
                        {businessForm.businessDescription.length}/1000
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        resetBusinessForm();
                        setEditingBusiness(false);
                      }}
                      disabled={savingBusiness}
                      className="
                        rounded-xl border border-gray-200
                        px-5 py-2.5 text-sm font-semibold
                        text-gray-700 transition hover:bg-gray-50
                      "
                    >
                      Cancel
                    </button>

                    <button
                      type="button"
                      onClick={handleBusinessSave}
                      disabled={savingBusiness}
                      className="
                        inline-flex items-center justify-center gap-2
                        rounded-xl bg-blue-600 px-5 py-2.5
                        text-sm font-semibold text-white
                        shadow-sm transition hover:bg-blue-700
                        disabled:cursor-not-allowed disabled:opacity-60
                      "
                    >
                      {savingBusiness && (
                        <Loader2
                          size={16}
                          className="animate-spin"
                        />
                      )}

                      {savingBusiness
                        ? "Saving..."
                        : "Save Changes"}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-5 p-5 sm:p-7">

                  <div className="grid gap-4 sm:grid-cols-2">

                    <InfoItem
                      icon={Building2}
                      label="Business Name"
                      value={provider?.businessName}
                    />

                    <InfoItem
                      icon={BriefcaseBusinessIcon}
                      label="Business Category"
                      value={
                        provider?.businessCategory?.name ||
                        provider?.businessCategory?.title ||
                        provider?.businessCategory?.categoryName ||
                        "Not specified"
                      }
                    />

                  </div>

                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Business Description
                    </p>

                    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 sm:p-5">
                      <p className="text-sm leading-7 text-gray-700">
                        {provider?.businessDescription ||
                          "No business description has been added yet."}
                      </p>
                    </div>
                  </div>

                </div>
              )}
            </section>

            {/* =====================================================
                STATUS
            ===================================================== */}

            <section className="mt-6 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">

              <div className="border-b border-gray-100 px-5 py-5 sm:px-7">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <ShieldCheck size={19} />
                  </div>

                  <div>
                    <h2 className="font-bold text-gray-900">
                      Provider Status
                    </h2>

                    <p className="mt-0.5 text-xs text-gray-500">
                      Your current verification and application status.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 p-5 sm:grid-cols-2 sm:p-7">

                <StatusCard
                  title="Identity Verification"
                  active={provider?.isVerified}
                  activeText="Verified"
                  inactiveText="Verification Pending"
                />

                <StatusCard
                  title="Provider Application"
                  active={provider?.isApproved}
                  activeText="Approved"
                  inactiveText="Pending Approval"
                />

              </div>
            </section>

            {/* =====================================================
                DOCUMENT
            ===================================================== */}

            <section className="mt-6 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">

              <div className="flex flex-col gap-4 border-b border-gray-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">

                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <FileText size={19} />
                  </div>

                  <div>
                    <h2 className="font-bold text-gray-900">
                      Identity Document
                    </h2>

                    <p className="mt-0.5 text-xs text-gray-500">
                      Document submitted for provider verification.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleDocumentClick}
                  disabled={uploadingDocument}
                  className="
                    inline-flex items-center justify-center gap-2
                    rounded-xl border border-gray-200
                    bg-white px-4 py-2.5
                    text-sm font-semibold text-gray-700
                    transition hover:bg-gray-50
                    disabled:cursor-not-allowed disabled:opacity-60
                  "
                >
                  {uploadingDocument ? (
                    <Loader2
                      size={16}
                      className="animate-spin"
                    />
                  ) : (
                    <Upload size={16} />
                  )}

                  {uploadingDocument
                    ? "Uploading..."
                    : "Replace Document"}
                </button>

                <input
                  ref={documentInputRef}
                  type="file"
                  accept=".jpg,.jpeg,.png,.webp,.pdf"
                  onChange={handleDocumentChange}
                  className="hidden"
                />
              </div>

              <div className="p-5 sm:p-7">

                {provider?.documents?.length > 0 ? (
                  <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 sm:p-5">
                    {provider.documents.map((document, index) => (
                      <div
                        key={index}
                        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div className="flex items-center gap-4">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
                            <FileText size={21} />
                          </div>

                          <div>
                            <p className="text-sm font-bold capitalize text-gray-900">
                              {document.documentType ||
                                "Identity Document"}
                            </p>

                            <div className="mt-1 flex items-center gap-1.5">
                              {document.verified ? (
                                <>
                                  <CheckCircle2
                                    size={13}
                                    className="text-emerald-600"
                                  />

                                  <span className="text-xs font-medium text-emerald-700">
                                    Verified document
                                  </span>
                                </>
                              ) : (
                                <>
                                  <AlertCircle
                                    size={13}
                                    className="text-amber-600"
                                  />

                                  <span className="text-xs font-medium text-amber-700">
                                    Verification pending
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        <a
                          href={document.documentUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="
                            inline-flex items-center justify-center
                            rounded-xl border border-gray-200
                            bg-white px-4 py-2.5
                            text-sm font-semibold text-gray-700
                            transition hover:bg-gray-100
                          "
                        >
                          View Document
                        </a>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-2xl border border-dashed border-gray-300 p-8 text-center">
                    <FileText
                      size={28}
                      className="mx-auto text-gray-400"
                    />

                    <p className="mt-3 text-sm font-semibold text-gray-700">
                      No document uploaded
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      Upload your identity document to complete verification.
                    </p>
                  </div>
                )}

              </div>
            </section>

            {/* =====================================================
                SECURITY PLACEHOLDER
            ===================================================== */}

            <section className="mt-6 mb-8 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>
                  <h2 className="font-bold text-gray-900">
                    Account Security
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Keep your account secure by regularly updating your password.
                  </p>
                </div>

                <button
                  type="button"
                  className="
                    inline-flex items-center justify-center gap-2
                    rounded-xl border border-gray-200
                    px-4 py-2.5 text-sm font-semibold
                    text-gray-700 transition hover:bg-gray-50
                  "
                >
                  <ShieldCheck size={16} />
                  Change Password
                </button>

              </div>
            </section>

          </div>
        </section>
      </div>
    </main>
  );
};

/* ============================================================
   SECTION HEADER
============================================================ */

const SectionHeader = ({
  icon: Icon,
  title,
  description,
  editing,
  onEdit,
  onCancel,
}) => {
  return (
    <div className="flex flex-col gap-4 border-b border-gray-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-50 text-gray-600">
          <Icon size={19} />
        </div>

        <div>
          <h2 className="font-bold text-gray-900">
            {title}
          </h2>

          <p className="mt-0.5 text-xs text-gray-500">
            {description}
          </p>
        </div>
      </div>

      {editing ? (
        <button
          type="button"
          onClick={onCancel}
          className="
            inline-flex items-center justify-center gap-2
            rounded-xl border border-gray-200
            px-4 py-2.5 text-sm font-semibold
            text-gray-700 transition hover:bg-gray-50
          "
        >
          <X size={16} />
          Cancel
        </button>
      ) : (
        <button
          type="button"
          onClick={onEdit}
          className="
            inline-flex items-center justify-center gap-2
            rounded-xl border border-gray-200
            bg-white px-4 py-2.5
            text-sm font-semibold text-gray-700
            transition hover:bg-gray-50
          "
        >
          <Pencil size={15} />
          Edit
        </button>
      )}
    </div>
  );
};

/* ============================================================
   INFO ITEM
============================================================ */

const InfoItem = ({
  icon: Icon,
  label,
  value,
}) => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
      <div className="flex items-center gap-2">
        <Icon size={15} className="text-gray-400" />

        <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
          {label}
        </span>
      </div>

      <p className="mt-2 break-words text-sm font-semibold capitalize text-gray-800">
        {value || "Not provided"}
      </p>
    </div>
  );
};

/* ============================================================
   INPUT FIELD
============================================================ */

const InputField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  icon: Icon,
}) => {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-gray-700">
        {label}
      </label>

      <div className="relative">
        <Icon
          size={17}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className="
            h-11 w-full rounded-xl
            border border-gray-200
            bg-white pl-11 pr-4
            text-sm text-gray-800
            outline-none transition
            placeholder:text-gray-400
            focus:border-blue-500
            focus:ring-4 focus:ring-blue-50
          "
        />
      </div>
    </div>
  );
};

/* ============================================================
   STATUS CARD
============================================================ */

const StatusCard = ({
  title,
  active,
  activeText,
  inactiveText,
}) => {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-gray-200 bg-gray-50 p-4 sm:p-5">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
          {title}
        </p>

        <p className="mt-1 text-sm font-bold text-gray-900">
          {active ? activeText : inactiveText}
        </p>
      </div>

      <div
        className={`flex h-10 w-10 items-center justify-center rounded-xl ${
          active
            ? "bg-emerald-50 text-emerald-600"
            : "bg-amber-50 text-amber-600"
        }`}
      >
        {active ? (
          <CheckCircle2 size={19} />
        ) : (
          <AlertCircle size={19} />
        )}
      </div>
    </div>
  );
};

/* ============================================================
   ICON HELPERS
============================================================ */

const BriefcaseIcon = () => (
  <BriefcaseBusinessIcon
    size={17}
    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
  />
);

const BriefcaseBusinessIcon = ({ size = 17, className = "" }) => (
  <Building2 size={size} className={className} />
);

export default ProviderProfile;