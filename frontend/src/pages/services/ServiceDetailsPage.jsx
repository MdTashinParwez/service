import { useParams } from "react-router-dom";

import { services } from "../../constants/services";

import ServiceHero from "../../components/serviceDetails/ServiceHero";
import ServiceOverview from "../../components/serviceDetails/ServiceOverview";
import ServiceHighlights from "../../components/serviceDetails/ServiceHighlights";
import ServiceIncludes from "../../components/serviceDetails/ServiceIncludes";
import ProviderProfileCard from "../../components/serviceDetails/ProviderProfileCard";
import BookingPanel from "../../components/serviceDetails/BookingPanel";
import ServiceGallery from "../../components/serviceDetails/ServiceGallery";
import ServiceReviews from "../../components/serviceDetails/ServiceReviews";
import ServiceFAQ from "../../components/serviceDetails/ServiceFAQ";
import RecommendedServices from "../../components/serviceDetails/RecommendedServices";

const ServiceDetailsPage = () => {
  const { serviceId } = useParams();

  const service = services.find(
    (item) => item.id === serviceId
  );

  if (!service) {
    return (
      <div className="flex min-h-screen items-center justify-center text-2xl font-bold">
        Service Not Found
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <ServiceHero service={service} />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
          <div className="space-y-6">
            <ServiceOverview service={service} />
            <ServiceHighlights />
            <ServiceIncludes service={service} />
            <ServiceGallery service={service} />
            <ServiceReviews service={service} />
            <ServiceFAQ service={service} />
            <RecommendedServices
              currentServiceId={service.id}
            />
          </div>

          <div className="space-y-5 lg:sticky lg:top-24">
            <BookingPanel service={service} />
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
