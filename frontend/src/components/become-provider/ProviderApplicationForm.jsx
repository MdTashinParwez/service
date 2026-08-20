
import { useState } from "react";
import {
  BriefcaseBusiness,
  FileText,
  Upload,
  CheckCircle2,
  Loader2,
  ChevronDown,
} from "lucide-react";

const ProviderApplicationForm = ({
  categories = [],
  loadingCategories = false,
  onSubmit,
  submitting = false,
  error = "",
}) => {
  const [formData, setFormData] = useState({
    businessName: "",
    businessDescription: "",
    businessCategory: "",
    documents: null,
  });

  const [validationError, setValidationError] = useState("");

  // =====================================================
  // INPUT CHANGE
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setValidationError("");
  };

  // =====================================================
  // DOCUMENT
  // =====================================================

  const handleDocumentChange = (e) => {
    const file = e.target.files?.[0] || null;

    setFormData((prev) => ({
      ...prev,
      documents: file,
    }));

    setValidationError("");
  };

  // =====================================================
  // REMOVE DOCUMENT
  // =====================================================

  const removeDocument = () => {
    setFormData((prev) => ({
      ...prev,
      documents: null,
    }));
  };

  // =====================================================
  // SUBMIT
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setValidationError("");

    if (!formData.businessName.trim()) {
      setValidationError("Business name is required.");
      return;
    }

    if (!formData.businessDescription.trim()) {
      setValidationError(
        "Business description is required."
      );
      return;
    }

    if (!formData.businessCategory) {
      setValidationError(
        "Please select a business category."
      );
      return;
    }

    if (!formData.documents) {
      setValidationError(
        "Identity document is required."
      );
      return;
    }

    const data = new FormData();

    data.append(
      "businessName",
      formData.businessName.trim()
    );

    data.append(
      "businessDescription",
      formData.businessDescription.trim()
    );

    data.append(
      "businessCategory",
      formData.businessCategory
    );

    /*
      Backend expects:

      req.files?.documents?.[0]

      Therefore field name MUST be:
      documents
    */

    data.append(
      "documents",
      formData.documents
    );

    await onSubmit(data);
  };

  const inputClass =
    "h-13 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50";

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50/60 via-gray-50 to-white px-4 py-10 sm:px-6 lg:py-16">
      <section className="mx-auto w-full max-w-4xl">

        {/* =====================================================
            HERO
        ===================================================== */}

        <div className="mb-8 text-center">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-200">
            <BriefcaseBusiness size={30} />
          </div>

          <h1 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Become a Provider
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-gray-600">
            Create your provider profile and start offering
            your services to customers.
          </p>

        </div>

        {/* =====================================================
            FORM
        ===================================================== */}

        <form
          onSubmit={handleSubmit}
          className="overflow-hidden rounded-[28px] border border-gray-200 bg-white shadow-xl shadow-gray-200/50"
        >

          {/* =====================================================
              BUSINESS INFORMATION
          ===================================================== */}

          <div className="p-6 sm:p-8 lg:p-10">

            <div className="flex items-start gap-4">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <BriefcaseBusiness size={23} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Business Information
                </h2>

                <p className="mt-1 text-sm leading-6 text-gray-500">
                  Tell customers about the business you
                  provide your services through.
                </p>
              </div>

            </div>

            <div className="mt-8 space-y-7">

              {/* BUSINESS NAME */}

              <div>
                <label className="mb-2.5 block text-sm font-semibold text-gray-800">
                  Business Name
                  <span className="ml-1 text-red-500">
                    *
                  </span>
                </label>

                <input
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  placeholder="e.g. Sharma Home Services"
                  maxLength={100}
                  className={inputClass}
                />

                <p className="mt-2 text-xs text-gray-400">
                  This name will be visible to customers.
                </p>
              </div>

              {/* DESCRIPTION */}

              <div>

                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold text-gray-800">
                    Business Description
                    <span className="ml-1 text-red-500">
                      *
                    </span>
                  </label>

                  <span className="text-xs text-gray-400">
                    {formData.businessDescription.length}/1000
                  </span>
                </div>

                <textarea
                  name="businessDescription"
                  value={formData.businessDescription}
                  onChange={handleChange}
                  maxLength={1000}
                  rows={6}
                  placeholder="Describe your business, experience and the services you provide..."
                  className="mt-2.5 w-full resize-none rounded-2xl border border-gray-200 bg-gray-50 p-4 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
                />

              </div>

              {/* CATEGORY */}

              <div>

                <label className="mb-2.5 block text-sm font-semibold text-gray-800">
                  Business Category
                  <span className="ml-1 text-red-500">
                    *
                  </span>
                </label>

                <div className="relative">

                  <select
                    name="businessCategory"
                    value={formData.businessCategory}
                    onChange={handleChange}
                    disabled={loadingCategories}
                    className={`${inputClass} appearance-none pr-12 disabled:cursor-not-allowed disabled:opacity-60`}
                  >
                    <option value="">
                      {loadingCategories
                        ? "Loading categories..."
                        : "Select your business category"}
                    </option>

                    {categories.map((category) => (
                      <option
                        key={category._id}
                        value={category._id}
                      >
                        {category.name}
                      </option>
                    ))}
                  </select>

                  <ChevronDown
                    size={19}
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                </div>

                <p className="mt-2 text-xs text-gray-400">
                  Choose the category that best matches
                  your services.
                </p>

              </div>

            </div>
          </div>

          {/* =====================================================
              IDENTITY VERIFICATION
          ===================================================== */}

          <div className="border-t border-gray-100 bg-gray-50/60 p-6 sm:p-8 lg:p-10">

            <div className="flex items-start gap-4">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                <FileText size={23} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Identity Verification
                </h2>

                <p className="mt-1 text-sm leading-6 text-gray-500">
                  Upload one identity document for provider
                  verification.
                </p>
              </div>

            </div>

            {/* UPLOAD */}

            <label className="mt-8 block cursor-pointer">

              <div
                className={`rounded-2xl border-2 border-dashed p-8 text-center transition ${
                  formData.documents
                    ? "border-green-300 bg-green-50/50"
                    : "border-gray-200 bg-white hover:border-blue-400 hover:bg-blue-50/40"
                }`}
              >

                {formData.documents ? (
                  <>
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-green-600">
                      <CheckCircle2 size={28} />
                    </div>

                    <p className="mt-4 break-all font-semibold text-gray-800">
                      {formData.documents.name}
                    </p>

                    <p className="mt-1 text-sm text-green-600">
                      Document selected successfully
                    </p>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        removeDocument();
                      }}
                      className="mt-4 text-sm font-semibold text-red-600 hover:text-red-700"
                    >
                      Remove document
                    </button>
                  </>
                ) : (
                  <>
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                      <Upload size={26} />
                    </div>

                    <p className="mt-4 font-semibold text-gray-800">
                      Upload identity document
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      Click to browse from your device
                    </p>

                    <p className="mt-3 text-xs text-gray-400">
                      PDF, JPG or PNG
                    </p>
                  </>
                )}

                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleDocumentChange}
                  className="hidden"
                />

              </div>

            </label>

          </div>

          {/* =====================================================
              ERROR
          ===================================================== */}

          {(validationError || error) && (
            <div className="mx-6 mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 sm:mx-8">
              <p className="text-sm font-medium leading-6 text-red-700">
                {validationError || error}
              </p>
            </div>
          )}

          {/* =====================================================
              FOOTER
          ===================================================== */}

          <div className="flex flex-col gap-4 border-t border-gray-100 bg-white px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">

            <div className="flex items-center gap-2 text-sm text-gray-500">
              <CheckCircle2
                size={17}
                className="shrink-0 text-green-500"
              />

              <span>
                Your information will be securely reviewed.
              </span>
            </div>

            <button
              type="submit"
              disabled={
                submitting ||
                loadingCategories
              }
              className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-blue-600 px-7 font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
            >

              {submitting ? (
                <>
                  <Loader2
                    size={19}
                    className="animate-spin"
                  />

                  Submitting...
                </>
              ) : (
                <>
                  Submit Application
                </>
              )}

            </button>

          </div>

        </form>

        {/* FOOTNOTE */}

        <p className="mt-5 text-center text-xs leading-5 text-gray-400">
          By submitting this application, you agree to
          provide accurate information for verification.
        </p>

      </section>
    </main>
  );
};

export default ProviderApplicationForm;
