import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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

        console.log("SERVICE DETAILS:", response);

        setService(response.data);
      } catch (error) {
        console.error("Failed to fetch service:", error);

        setError(
          error.message || "Failed to load service"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [serviceId]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg text-gray-500">
          Loading service...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            Something went wrong
          </h2>

          <p className="mt-2 text-red-500">
            {error}
          </p>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-2xl font-bold">
          Service Not Found
        </p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">

      {/* Hero */}

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <ServiceHero service={service} />
        </div>
      </section>

      {/* Main Content */}

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">

          {/* Left */}

          <div className="space-y-6">

            <ServiceOverview
              service={service}
            />

          

          

            <ServiceGallery
              service={service}
            />

            <ServiceReviews
              service={service}
            />

           

          

          </div>

          {/* Right */}

          <div className="space-y-5 lg:sticky lg:top-24">

            <BookingPanel
              service={service}
            />

            <ProviderProfileCard
              provider={service.provider}
            />

          </div>

        </div>

      </section>

    </main>
  );
};

export default ServiceDetailsPage;