import { useEffect, useState } from "react";
import { ArrowLeft, BriefcaseBusiness } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import ProviderNavbar from "../../components/provider/ProviderNavbar";
import ProviderSidebar from "../../components/provider/ProviderSidebar";
import ServiceCardForm from "../../components/provider/ServiceCardForm";

import { createService } from "../../api/service.api";
import { getAllCategories } from "../../api/category.api";

const CreateServicePage = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const fetchCategories = async () => {
    try {
      setLoadingCategories(true);

      const response = await getAllCategories();

      setCategories(response?.data || []);
    } catch (error) {
      console.error("Failed to fetch categories:", error);

      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to load categories."
      );
    } finally {
      setLoadingCategories(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (formData) => {
    try {
      setSubmitting(true);

      await createService(formData);

      toast.success("Service created successfully");

      navigate("/provider/services");
    } catch (error) {
      console.error("Failed to create service:", error);

      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to create service."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <ProviderNavbar />

      <div className="flex">
        <ProviderSidebar />

        <section className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            {/* ================= HEADER ================= */}

            <div className="mb-6 sm:mb-8">
              <Link
                to="/provider/services"
                className="
                  mb-4 inline-flex items-center gap-2
                  text-sm font-medium text-gray-500
                  transition hover:text-gray-900
                "
              >
                <ArrowLeft className="h-4 w-4" />
                Back to My Services
              </Link>

              <div className="flex items-start gap-4">
                <div
                  className="
                    hidden h-12 w-12 shrink-0
                    items-center justify-center
                    rounded-2xl bg-blue-100 text-blue-600
                    sm:flex
                  "
                >
                  <BriefcaseBusiness className="h-6 w-6" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-blue-600">
                    Provider Workspace
                  </p>

                  <h1
                    className="
                      mt-1 text-2xl font-bold
                      tracking-tight text-gray-900
                      sm:text-3xl
                    "
                  >
                    Create New Service
                  </h1>

                  <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
                    Add the details of the service you offer
                    so customers can easily understand and
                    book it.
                  </p>
                </div>
              </div>
            </div>

            {/* ================= FORM ================= */}

            {loadingCategories ? (
              <div className="space-y-6">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="
                      h-48 animate-pulse rounded-2xl
                      border border-gray-200 bg-white
                    "
                  />
                ))}
              </div>
            ) : (
              <ServiceCardForm
                mode="create"
                categories={categories}
                onSubmit={handleSubmit}
                submitting={submitting}
              />
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default CreateServicePage;