import { useEffect, useState } from "react";

import { getProviderStatus, createProvider } from "../../api/provider.api";
import { apiClient } from "../../api/apiClient";

import ProviderApplicationForm from "../../components/become-provider/ProviderApplicationForm";
import ProviderStatus from "../../components/become-provider/ProviderStatus";
import ProviderStatusLoader from "../../components/become-provider/ProviderStatusLoader";

const BecomeProviderPage = () => {
  const [loading, setLoading] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);

  const [provider, setProvider] = useState(null);
  const [categories, setCategories] = useState([]);

  const [error, setError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [submitting, setSubmitting] = useState(false);


  const fetchCategories = async () => {
    try {
      setLoadingCategories(true);
      setCategoryError("");

      const response = await apiClient("/categories", {
        method: "GET",
      });

      console.log("CATEGORIES RESPONSE:", response);

      const categoryData =
        response?.data?.categories ||
        response?.data?.data ||
        response?.data ||
        [];

      if (!Array.isArray(categoryData)) {
        throw new Error("Invalid categories response");
      }

      setCategories(categoryData);
    } catch (error) {
      console.error("Failed to fetch categories:", error);

      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Unable to load business categories.";

      setCategoryError(message);
      setCategories([]);
    } finally {
      setLoadingCategories(false);
    }
  };


  const checkProviderStatus = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getProviderStatus();

      console.log("PROVIDER STATUS RESPONSE:", response);

      setProvider(response?.data?.provider || null);
    } catch (error) {
      console.error("Provider status check failed:", error);

      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Unable to check provider status.";

      setError(message);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    const initializePage = async () => {
      await Promise.all([
        checkProviderStatus(),
        fetchCategories(),
      ]);
    };

    initializePage();
  }, []);


  const handleCreateProvider = async (formData) => {
    try {
      setError("");
      setSubmitting(true);

      const response = await createProvider(formData);

      console.log("CREATE PROVIDER RESPONSE:", response);

      /*
       * Provider successfully created.
       *
       * Instead of trusting the create response structure,
       * fetch the latest provider status from backend.
       * This keeps frontend state consistent with database.
       */

      const statusResponse = await getProviderStatus();

      console.log(
        "PROVIDER STATUS AFTER CREATE:",
        statusResponse
      );

      setProvider(
        statusResponse?.data?.provider || null
      );

      return {
        success: true,
      };
    } catch (error) {
      console.error(
        "Provider creation failed:",
        error
      );

      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to submit provider application.";

      setError(message);

      return {
        success: false,
        message,
      };
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <ProviderStatusLoader />;
  }

  if (error && !provider) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-12">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-3xl border border-red-200 bg-white p-8 shadow-sm">
            <h1 className="text-xl font-bold text-gray-900">
              Something went wrong
            </h1>

            <p className="mt-2 text-sm leading-6 text-red-600">
              {error}
            </p>

            <button
              type="button"
              onClick={checkProviderStatus}
              className="mt-6 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </main>
    );
  }


  if (provider) {
    return (
      <ProviderStatus
        provider={provider}
      />
    );
  }


  return (
    <ProviderApplicationForm
      categories={categories}
      loadingCategories={loadingCategories}
      onSubmit={handleCreateProvider}
      submitting={submitting}
      error={error || categoryError}
    />
  );
};

export default BecomeProviderPage;