import { useEffect, useState } from "react";

import {
  getProviderStatus,
  createProvider,
} from "../../api/provider.api";

import ProviderApplicationForm from "../../components/become-provider/ProviderApplicationForm";
import ProviderStatus from "../../components/become-provider/ProviderStatus";
import ProviderStatusLoader from "../../components/become-provider/ProviderStatusLoader";

const BecomeProviderPage = () => {
  const [loading, setLoading] = useState(true);
  const [provider, setProvider] = useState(null);
  const [error, setError] = useState("");

  // =====================================================
  // CHECK PROVIDER STATUS
  // =====================================================

  useEffect(() => {
    const checkProviderStatus = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getProviderStatus();

        /*
          Expected response:

          {
            data: {
              provider: {...}
            }
          }

          Agar provider nahi hai to API 404 de sakti hai.
        */

        setProvider(response?.data?.provider || null);
      } catch (error) {
        /*
          404 ka matlab:
          User abhi provider nahi hai.

          Is case mein form show hoga.
        */

        if (error?.response?.status === 404) {
          setProvider(null);
        } else {
          console.error(
            "Provider status check failed:",
            error
          );

          setError(
            error?.response?.data?.message ||
              "Unable to check provider status."
          );
        }
      } finally {
        setLoading(false);
      }
    };

    checkProviderStatus();
  }, []);

  // =====================================================
  // CREATE PROVIDER
  // =====================================================

  const handleCreateProvider = async (formData) => {
    try {
      setError("");

      /*
        FormData already ProviderApplicationForm
        se milega.
      */

      const response = await createProvider(formData);

      /*
        Provider create hone ke baad
        immediately pending state show karenge.
      */

      const createdProvider =
        response?.data?.provider;

      setProvider(createdProvider || {
        isApproved: false,
        isVerified: false,
      });

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
    }
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return <ProviderStatusLoader />;
  }

  // =====================================================
  // STATUS ERROR
  // =====================================================

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
          </div>
        </div>
      </main>
    );
  }

  // =====================================================
  // PROVIDER ALREADY EXISTS
  // =====================================================

  if (provider) {
    return (
      <ProviderStatus
        provider={provider}
      />
    );
  }

  // =====================================================
  // USER IS NOT A PROVIDER
  // SHOW APPLICATION FORM
  // =====================================================

  return (
    <ProviderApplicationForm
      onSubmit={handleCreateProvider}
      submitting={false}
      error={error}
    />
  );
};

export default BecomeProviderPage;