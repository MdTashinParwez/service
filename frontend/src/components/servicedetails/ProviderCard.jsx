// import {
//   Star,
//   ShieldCheck,
//   MapPin,
//   Clock,
//   Briefcase,
//   ChevronRight,
// } from "lucide-react";

// const ProviderCard = () => {
//   return (
//     <section className="rounded-2xl border bg-white p-8 shadow-sm">
//       <div className="flex flex-col gap-8 md:flex-row md:items-start">
//         {/* Profile */}
//         <div className="flex items-center gap-5">
//           <img
//             src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300"
//             alt="Provider"
//             className="h-24 w-24 rounded-full object-cover"
//           />

//           <div>
//             <div className="flex flex-wrap items-center gap-2">
//               <h2 className="text-2xl font-bold text-gray-900">
//                 Rahul Sharma
//               </h2>

//               <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
//                 <ShieldCheck size={14} />
//                 Verified
//               </span>
//             </div>

//             <p className="mt-1 text-gray-600">
//               Plumbing Specialist
//             </p>

//             <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-gray-600">
//               <div className="flex items-center gap-1">
//                 <Star
//                   size={16}
//                   className="fill-yellow-400 text-yellow-400"
//                 />
//                 <span className="font-semibold text-gray-900">
//                   4.8
//                 </span>
//                 <span>(124 Reviews)</span>
//               </div>

//               <div className="flex items-center gap-1">
//                 <MapPin size={15} />
//                 Delhi
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Stats */}
//         <div className="grid flex-1 grid-cols-2 gap-4 md:grid-cols-3">
//           <div className="rounded-xl border p-4">
//             <Briefcase
//               className="mb-2 text-blue-600"
//               size={20}
//             />
//             <p className="text-xl font-bold text-gray-900">
//               320+
//             </p>
//             <p className="text-sm text-gray-500">
//               Jobs Completed
//             </p>
//           </div>

//           <div className="rounded-xl border p-4">
//             <Clock
//               className="mb-2 text-blue-600"
//               size={20}
//             />
//             <p className="text-xl font-bold text-gray-900">
//               ~30 min
//             </p>
//             <p className="text-sm text-gray-500">
//               Response Time
//             </p>
//           </div>

//           <div className="rounded-xl border p-4">
//             <ShieldCheck
//               className="mb-2 text-blue-600"
//               size={20}
//             />
//             <p className="text-xl font-bold text-gray-900">
//               Since 2024
//             </p>
//             <p className="text-sm text-gray-500">
//               Member Since
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Bio */}
//       <div className="mt-8 border-t pt-8">
//         <h3 className="text-lg font-semibold text-gray-900">
//           About Provider
//         </h3>

//         <p className="mt-4 leading-8 text-gray-600">
//           Experienced plumbing professional specializing in residential
//           and commercial repair services. Known for timely response,
//           transparent pricing, and quality workmanship with a strong
//           focus on customer satisfaction.
//         </p>
//       </div>

//       {/* Button */}
//       <div className="mt-8">
//         <button className="inline-flex items-center gap-2 rounded-xl border px-6 py-3 font-semibold transition hover:bg-gray-100">
//           View Provider Profile
//           <ChevronRight size={18} />
//         </button>
//       </div>
//     </section>
//   );
// };

// export default ProviderCard;