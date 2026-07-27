// import { CheckCircle2 } from "lucide-react";

// const ServiceIncluded = ({ includedServices = [] }) => {
//   const services =
//     includedServices.length > 0
//       ? includedServices
//       : [
//           "Professional inspection",
//           "High-quality tools & equipment",
//           "On-site service",
//           "Basic material handling",
//           "Work completion verification",
//           "Customer support after service",
//         ];

//   return (
//     <section className="rounded-2xl border bg-white p-8 shadow-sm">
//       {/* Heading */}
//       <h2 className="text-2xl font-bold text-gray-900">
//         What's Included
//       </h2>

//       <p className="mt-3 text-gray-600">
//         This service includes everything required to complete the job
//         professionally and efficiently.
//       </p>

//       {/* Included List */}
//       <div className="mt-8 grid gap-4 sm:grid-cols-2">
//         {services.map((item) => (
//           <div
//             key={item}
//             className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 p-4 transition hover:border-blue-200 hover:bg-blue-50"
//           >
//             <CheckCircle2
//               size={20}
//               className="text-green-600"
//             />

//             <span className="font-medium text-gray-700">
//               {item}
//             </span>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default ServiceIncluded;