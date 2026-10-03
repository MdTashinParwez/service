import { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";

import { ArrowLeft, ChevronRight } from "lucide-react";

import { getServiceById } from "../../api/service.api";

import ServiceHero from "../../components/serviceDetails/ServiceHero";
import ServiceOverview from "../../components/serviceDetails/ServiceOverview";
import ProviderProfileCard from "../../components/serviceDetails/ProviderProfileCard";
import BookingPanel from "../../components/serviceDetails/BookingPanel";
import ServiceGallery from "../../components/serviceDetails/ServiceGallery";
import ServiceReviews from "../../components/serviceDetails/ServiceReviews";

const ServiceDetailsPage = () => {
  const { serviceId } = useParams();

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getServiceById(serviceId);

        setService(response.data);
      } catch (error) {
        console.error("Failed to fetch service:", error);
        setError(error?.message || "Failed to load service");
      } finally {
        setLoading(false);
      }
    };

    if (serviceId) {
      fetchService();
    }
  }, [serviceId]);

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-6">
            <div className="h-5 w-40 rounded bg-slate-200" />

            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
              <div className="overflow-hidden rounded-3xl bg-white">
                <div className="h-[380px] bg-slate-200" />

                <div className="space-y-4 p-8">
                  <div className="h-5 w-24 rounded bg-slate-200" />
                  <div className="h-10 w-3/4 rounded bg-slate-200" />
                  <div className="h-5 w-full rounded bg-slate-200" />
                  <div className="h-5 w-5/6 rounded bg-slate-200" />
                </div>
              </div>

              <div className="h-[520px] rounded-3xl bg-white p-6">
                <div className="h-full rounded-2xl bg-slate-200" />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="w-full max-w-md rounded-3xl border border-red-100 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600">
            !
          </div>

          <h2 className="mt-5 text-2xl font-bold text-slate-950">
            Unable to load service
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            {error}
          </p>

          <Link
            to="/services"
            className="mt-6 inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-600"
          >
            Browse services
          </Link>
        </div>
      </main>
    );
  }

  if (!service) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-950">
            Service not found
          </h2>

          <p className="mt-2 text-slate-500">
            This service may no longer be available.
          </p>

          <Link
            to="/services"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-600"
          >
            <ArrowLeft size={16} />
            Back to services
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm">
            <Link
              to="/services"
              className="font-medium text-slate-500 transition hover:text-blue-600"
            >
              Services
            </Link>

            <ChevronRight
              size={15}
              className="text-slate-300"
            />

            {service.category?.name && (
              <>
                <span className="text-slate-400">
                  {service.category.name}
                </span>

                <ChevronRight
                  size={15}
                  className="text-slate-300"
                />
              </>
            )}

            <span className="max-w-[220px] truncate font-medium text-slate-900">
              {service.title}
            </span>
          </div>
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
          <div className="min-w-0 space-y-8">
            {/* Hero */}
            <ServiceHero service={service} />

            {/* Overview */}
            <ServiceOverview service={service} />

            {/* Gallery */}
            <ServiceGallery service={service} />

            {/* Reviews */}
            <ServiceReviews service={service} />
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24">
            {/* Booking */}
            <div className="hidden lg:block">
              <BookingPanel service={service} />
            </div>

            {/* Provider */}
            <ProviderProfileCard
              provider={service.provider}
            />
          </aside>
        </div>
      </section>
    </main>
  );
};

export default ServiceDetailsPage;