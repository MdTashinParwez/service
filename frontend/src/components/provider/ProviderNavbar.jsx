
import { Bell, ChevronDown, Menu } from "lucide-react";

const ProviderNavbar = () => {
  const handleOpenMobileMenu = () => {
    window.dispatchEvent(new Event("provider:open-sidebar"));
  };

  return (
    <header
      className="
        sticky
        top-0
        z-50
        border-b
        border-gray-200
        bg-white/95
        backdrop-blur-md
      "
    >
      <div
        className="
          flex
          h-[73px]
          items-center
          justify-between
          px-5
          sm:px-6
          lg:px-8
        "
      >
        {/* =================================================
            LEFT
            ================================================= */}
        <div className="flex items-center gap-3">
          {/* Mobile menu */}
          <button
            type="button"
            onClick={handleOpenMobileMenu}
            aria-label="Open navigation menu"
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              text-gray-600
              transition
              hover:bg-gray-100
              hover:text-gray-900
              lg:hidden
            "
          >
            <Menu size={22} />
          </button>

          {/* Brand */}
          <div>
            <h2 className="text-lg font-bold tracking-tight text-gray-900">
              Provider Panel
            </h2>

            <p className="hidden text-xs text-gray-500 sm:block">
              Manage your services & bookings
            </p>
          </div>
        </div>

        {/* =================================================
            RIGHT
            ================================================= */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* =================================================
              NOTIFICATION
              ================================================= */}
          <button
            type="button"
            aria-label="Notifications"
            className="
              relative
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              text-gray-600
              transition
              hover:bg-gray-100
              hover:text-gray-900
            "
          >
            <Bell size={20} />

            {/* Notification dot */}
            <span
              className="
                absolute
                right-2
                top-2
                h-2
                w-2
                rounded-full
                bg-red-500
                ring-2
                ring-white
              "
            />
          </button>

          {/* Divider */}
          <div className="hidden h-8 w-px bg-gray-200 sm:block" />

          {/* =================================================
              PROVIDER PROFILE
              ================================================= */}
          <button
            type="button"
            className="
              flex
              items-center
              gap-2
              rounded-xl
              px-2
              py-1.5
              transition
              hover:bg-gray-50
              sm:gap-3
            "
          >
            {/* Avatar */}
            <div
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-blue-100
                text-sm
                font-bold
                text-blue-600
              "
            >
              P
            </div>

            {/* Profile text */}
            <div className="hidden text-left sm:block">
              <p className="text-sm font-semibold text-gray-900">
                Provider
              </p>

              <p className="text-xs text-gray-500">
                Provider Account
              </p>
            </div>

            <ChevronDown
              size={17}
              className="hidden text-gray-400 sm:block"
            />
          </button>
        </div>
      </div>
    </header>
  );
};

export default ProviderNavbar