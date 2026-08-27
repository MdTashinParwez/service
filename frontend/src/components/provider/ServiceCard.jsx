import { Link } from "react-router-dom";
import {
  BriefcaseBusiness,
  Clock3,
  MoreVertical,
  Pencil,
  Trash2,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ServiceCard = ({ service, onDelete, deleting }) => {
  const hasImage =
    Array.isArray(service.images) && service.images.length > 0;

  return (
    <article
      className="
        group overflow-hidden rounded-2xl
        border border-gray-200/80
        bg-white shadow-sm
        transition-all duration-300
        hover:-translate-y-1
        hover:border-gray-300
        hover:shadow-lg
      "
    >
      {/* ================= IMAGE ================= */}

      <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
        {hasImage ? (
          <img
            src={service.images[0]}
            alt={service.title}
            className="
              h-full w-full object-cover
              transition-transform duration-500
              group-hover:scale-105
            "
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-100">
            <div
              className="
                flex h-14 w-14
                items-center justify-center
                rounded-2xl bg-white shadow-sm
              "
            >
              <BriefcaseBusiness className="h-7 w-7 text-gray-400" />
            </div>
          </div>
        )}

        {/* Image overlay */}

        <div
          className="
            absolute inset-x-0 bottom-0
            h-20 bg-gradient-to-t
            from-black/30 to-transparent
          "
        />

        {/* ================= STATUS ================= */}

        <span
          className={`
            absolute left-4 top-4
            inline-flex items-center gap-1.5
            rounded-full px-3 py-1.5
            text-xs font-semibold
            shadow-sm backdrop-blur-md
            ${
              service.isActive
                ? "bg-emerald-50/95 text-emerald-700"
                : "bg-white/95 text-gray-600"
            }
          `}
        >
          <span
            className={`
              h-1.5 w-1.5 rounded-full
              ${
                service.isActive
                  ? "bg-emerald-500"
                  : "bg-gray-400"
              }
            `}
          />

          {service.isActive ? "Active" : "Inactive"}
        </span>

        {/* ================= DROPDOWN ================= */}

        <div className="absolute right-3 top-3">
          <DropdownMenu>
            {/* 
              IMPORTANT:
              No Button component here.
              DropdownMenuTrigger itself renders a button.
            */}

            <DropdownMenuTrigger
              type="button"
              aria-label="Service options"
              className="
                flex h-9 w-9
                items-center justify-center
                rounded-full
                border border-white/60
                bg-white/90
                shadow-sm
                backdrop-blur-md
                transition
                hover:bg-white
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500/30
              "
            >
              <MoreVertical className="h-4 w-4 text-gray-700" />
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-40"
            >
              {/* EDIT */}

              <DropdownMenuItem
                onClick={() => {
                  window.location.href = `/provider/services/${service._id}/edit`;
                }}
                className="cursor-pointer"
              >
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              {/* DELETE */}

              <DropdownMenuItem
                disabled={deleting}
                onClick={() => onDelete(service._id)}
                className="
                  cursor-pointer
                  text-red-600
                  focus:bg-red-50
                  focus:text-red-600
                "
              >
                <Trash2 className="mr-2 h-4 w-4" />

                {deleting ? "Deleting..." : "Delete"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* ================= CONTENT ================= */}

      <div className="p-4 sm:p-5">
        {/* TITLE */}

        <h2
          className="
            line-clamp-1
            text-base font-bold
            tracking-tight text-gray-900
            sm:text-lg
          "
        >
          {service.title}
        </h2>

        {/* DESCRIPTION */}

        <p
          className="
            mt-2
            line-clamp-2
            min-h-10
            text-sm
            leading-5
            text-gray-500
          "
        >
          {service.description ||
            "No description provided."}
        </p>

        {/* ================= PRICE + DURATION ================= */}

        <div
          className="
            mt-5
            flex items-center justify-between
            border-t border-gray-100
            pt-4
          "
        >
          {/* PRICE */}

          <div>
            <p className="text-xs font-medium text-gray-400">
              Starting from
            </p>

            <p className="mt-0.5 text-lg font-bold text-gray-900">
              ₹{service.price}
            </p>
          </div>

          {/* DURATION */}

          <div
            className="
              inline-flex
              items-center gap-1.5
              rounded-lg
              bg-gray-50
              px-3 py-2
              text-sm font-medium
              text-gray-600
            "
          >
            <Clock3 className="h-4 w-4 text-gray-400" />

            {service.duration} min
          </div>
        </div>

        {/* ================= ACTIONS ================= */}

        <div className="mt-5 grid grid-cols-2 gap-2.5">
          {/* EDIT */}

          <Link
            to={`/provider/services/${service._id}/edit`}
            className="
              inline-flex h-10
              items-center justify-center
              gap-2
              rounded-xl
              border border-gray-200
              text-sm font-semibold
              text-gray-700
              transition
              hover:bg-gray-50
            "
          >
            <Pencil className="h-4 w-4" />
            Edit
          </Link>

          {/* DELETE */}

          <button
            type="button"
            disabled={deleting}
            onClick={() => onDelete(service._id)}
            className="
              inline-flex h-10
              items-center justify-center
              gap-2
              rounded-xl
              border border-red-200
              text-sm font-semibold
              text-red-600
              transition
              hover:bg-red-50
              hover:text-red-700
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            <Trash2 className="h-4 w-4" />

            {deleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </article>
  );
};

export default ServiceCard;