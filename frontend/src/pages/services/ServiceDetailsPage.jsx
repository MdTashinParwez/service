import ProviderCard from "../../components/servicedetails/ProviderCard";
import ServiceDescription from "../../components/servicedetails/serviceDescription";
import ServiceGallery from "../../components/servicedetails/ServiceGallary";
import ServiceInfo from "../../components/servicedetails/ServiceInfo";
import ServiceIncluded from "../../components/servicedetails/ServiceIncluded";


const ServiceDetailsPage = () => {
  return (
    <main className="min-h-screen bg-gray-50">

      {/* Hero + Basic Service Information */}
      <ServiceInfo />

      <section className="mx-auto max-w-7xl px-6 py-12">

        <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">

          {/* Left Content */}
          <div className="space-y-8">

            <ServiceDescription />

            <ServiceIncluded />

            <ServiceGallery/>

          </div>

          {/* Right Sidebar */}
          <div className="space-y-8">

            <ProviderCard />

            {/* Booking Sidebar yaha aayega */}
            {/* <BookingSidebar /> */}

          </div>

        </div>

      </section>

    </main>
  );
};

export default ServiceDetailsPage;