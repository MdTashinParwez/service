// import { useParams } from "react-router-dom";
// import { services } from "../../constants/services";

// import ProviderCard from "../../components/servicedetails/ProviderCard";
// import ServiceDescription from "../../components/servicedetails/ServiceDescription";
// import ServiceGallery from "../../components/servicedetails/ServiceGallery";
// import ServiceInfo from "../../components/servicedetails/ServiceInfo";
// import ServiceIncluded from "../../components/servicedetails/ServiceIncluded";

// const ServiceDetailsPage = () => {
//   const { serviceId } = useParams();

//   const service = services.find(
//     (item) => item.id === Number(serviceId)
//   );

//   if (!service) {
//     return (
//       <div className="py-20 text-center text-2xl font-semibold">
//         Service not found
//       </div>
//     );
//   }

//   return (
//     <main className="min-h-screen bg-gray-50">

//       <ServiceInfo service={service} />

//       <section className="mx-auto max-w-7xl px-6 py-12">
//         <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">

//           <div className="space-y-8">
//             <ServiceDescription service={service} />

//             <ServiceIncluded
//               includedServices={service.includedServices}
//             />

//             <ServiceGallery
//               images={service.images}
//             />
//           </div>

//           <div className="space-y-8">
//             <ProviderCard
//               provider={service.provider}
//             />
//           </div>

//         </div>
//       </section>

//     </main>
//   );
// };

// export default ServiceDetailsPage;