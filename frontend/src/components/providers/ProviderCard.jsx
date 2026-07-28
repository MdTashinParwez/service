// import { Link } from "react-router-dom";

// import {
//   Star,
//   MapPin,
//   BadgeCheck,
//   Briefcase,
// } from "lucide-react";

// const ProviderCard = ({ provider = {} }) => {
//   return (
//     <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">

//       {/* Image */}

//       <div className="relative h-64 overflow-hidden">

//         <img
//           src={
//             provider.image ||
//             "https://images.unsplash.com/photo-1500648767791-00dcc994a43?w=800"
//           }
//           alt={provider.name || "Provider"}
//           className="h-full w-full object-cover transition duration-500 hover:scale-110"
//         />

//         {provider.verified && (
//           <span className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-green-600 px-3 py-1 text-xs font-semibold text-white">
//             <BadgeCheck size={14} />
//             Verified
//           </span>
//         )}

//       </div>

//       {/* Content */}

//       <div className="p-6">

//         <h2 className="text-2xl font-bold text-gray-900">
//           {provider.name || "Unknown Provider"}
//         </h2>

//         <p className="mt-1 text-gray-600">
//           {provider.profession || "Professional"}
//         </p>

//         <div className="mt-5 space-y-3 text-sm text-gray-600">

//           <div className="flex items-center gap-2">

//             <Star
//               size={17}
//               className="fill-yellow-400 text-yellow-400"
//             />

//             <span className="font-semibold">
//               {provider.rating ?? "N/A"}
//             </span>

//             <span>
//               ({provider.reviews ?? 0} Reviews)
//             </span>

//           </div>

//           <div className="flex items-center gap-2">

//             <MapPin size={17} />

//             <span>
//               {provider.location || "Location not available"}
//             </span>

//           </div>

//           <div className="flex items-center gap-2">

//             <Briefcase size={17} />

//             <span>
//               {provider.experience || "Experience not available"}
//             </span>

//           </div>

//         </div>

//         <div className="mt-6 flex items-center justify-between">

//           <div>

//             <p className="text-xs uppercase tracking-wide text-gray-500">
//               Starting From
//             </p>

//             <h3 className="text-2xl font-bold text-blue-600">
//               ₹{provider.startingPrice ?? "--"}
//             </h3>

//           </div>

//           <Link
//             to={`/providers/${provider._id}`}
//             className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
//           >
//             View Profile
//           </Link>

//         </div>

//       </div>

//     </div>
//   );
// };

// export default ProviderCard;

import { Link } from "react-router-dom";
import {
  Star,
  MapPin,
  BadgeCheck,
  Briefcase,
  ArrowRight,
  Heart,
} from "lucide-react";

const ProviderCard = ({ provider = {} }) => {
  return (
    <div className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">

      {/* Image */}

      <div className="relative h-72 overflow-hidden">

        <img
          src={
            provider.image ||
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43?w=1200"
          }
          alt={provider.name || "Provider"}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
        />

        {/* Gradient */}

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Verified */}

        {provider.verified && (
          <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full bg-white/90 px-3 py-2 text-sm font-semibold text-green-700 backdrop-blur">

            <BadgeCheck size={16} />

            Verified

          </div>
        )}

        {/* Wishlist */}

        <button className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 backdrop-blur transition hover:bg-white">

          <Heart size={18} />

        </button>

        {/* Bottom Overlay */}

        <div className="absolute bottom-0 left-0 w-full p-6 text-white">

          <h2 className="text-2xl font-bold">
            {provider.name || "Unknown Provider"}
          </h2>

          <p className="mt-1 text-white/90">
            {provider.profession || "Professional"}
          </p>

        </div>

      </div>

      {/* Content */}

      <div className="p-6">

        {/* Rating */}

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-2">

            <Star
              size={18}
              className="fill-yellow-400 text-yellow-400"
            />

            <span className="font-semibold">
              {provider.rating ?? "N/A"}
            </span>

            <span className="text-gray-500">
              ({provider.reviews ?? 0})
            </span>

          </div>

          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
            Top Rated
          </span>

        </div>

        {/* Info */}

        <div className="mt-6 space-y-3">

          <div className="flex items-center gap-2 text-gray-600">

            <MapPin
              size={17}
              className="text-blue-600"
            />

            {provider.location || "Location unavailable"}

          </div>

          <div className="flex items-center gap-2 text-gray-600">

            <Briefcase
              size={17}
              className="text-blue-600"
            />

            {provider.experience || "Experience unavailable"}

          </div>

        </div>

        {/* Skills */}

        <div className="mt-6 flex flex-wrap gap-2">

          {(provider.skills ?? [])
            .slice(0, 3)
            .map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700"
              >
                {skill}
              </span>
            ))}

        </div>

        {/* Price */}

        <div className="mt-8 flex items-center justify-between">

          <div>

            <p className="text-xs uppercase tracking-wide text-gray-500">
              Starting From
            </p>

            <h3 className="mt-1 text-3xl font-bold text-blue-600">
              ₹{provider.startingPrice ?? "--"}
            </h3>

          </div>

          <Link
            to={`/providers/${provider._id}`}
            className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            View Profile

            <ArrowRight size={18} />

          </Link>

        </div>

      </div>

    </div>
  );
};

export default ProviderCard;