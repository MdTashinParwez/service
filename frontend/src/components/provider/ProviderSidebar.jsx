
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  BriefcaseBusiness,
  CalendarDays,
  Bell,
  UserRound,
  ChevronLeft,
  X,
  ArrowLeft,
} from "lucide-react";

const navItems = [
  {
    label: "Dashboard",
    path: "/provider/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "My Services",
    path: "/provider/services",
    icon: BriefcaseBusiness,
  },
  {
    label: "Bookings",
    path: "/provider/bookings",
    icon: CalendarDays,
  },
  {
    label: "Notifications",
    path: "/provider/notifications",
    icon: Bell,
  },
  {
    label: "Profile",
    path: "/provider/profile",
    icon: UserRound,
  },
];

const ProviderSidebar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Navbar ke Menu button se mobile sidebar open karne ke liye
  useEffect(() => {
    const openMenu = () => {
      setMobileOpen(true);
    };

    window.addEventListener("provider:open-sidebar", openMenu);

    return () => {
      window.removeEventListener("provider:open-sidebar", openMenu);
    };
  }, []);

  // Mobile sidebar open hone par body scroll lock
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleBack = () => {
    window.history.back();
  };

  return (
    <>
      {/* =====================================================
          DESKTOP SIDEBAR
          ===================================================== */}
      <aside
        className="
          group/sidebar
          hidden lg:flex
          min-h-[calc(100vh-73px)]
          w-[76px]
          shrink-0
          flex-col
          border-r border-gray-200
          bg-white
          transition-[width]
          duration-300
          ease-in-out
          hover:w-64
        "
      >
        {/* =================================================
            NAVIGATION
            ================================================= */}
        <nav className="flex-1 space-y-2 p-3">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `
                  group/nav
                  relative
                  flex
                  h-12
                  items-center
                  rounded-xl
                  px-0
                  transition-all
                  duration-200
                  group-hover/sidebar:px-4
                  ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                  }
                  `
                }
              >
                {/* Active indicator */}
                <span
                  className="
                    absolute
                    left-0
                    top-1/2
                    h-6
                    w-1
                    -translate-y-1/2
                    rounded-r-full
                    bg-blue-600
                    opacity-0
                    transition-opacity
                    duration-200
                    group-[.active]/nav:opacity-100
                  "
                />

                {/* Icon */}
                <span
                  className="
                    flex
                    h-12
                    w-[52px]
                    shrink-0
                    items-center
                    justify-center
                    transition-all
                    duration-300
                    group-hover/sidebar:w-auto
                    group-hover/sidebar:justify-start
                  "
                >
                  <Icon size={20} strokeWidth={2} />
                </span>

                {/* Text */}
                <span
                  className="
                    ml-0
                    max-w-0
                    overflow-hidden
                    whitespace-nowrap
                    text-sm
                    font-semibold
                    opacity-0
                    transition-all
                    duration-300
                    group-hover/sidebar:ml-3
                    group-hover/sidebar:max-w-[160px]
                    group-hover/sidebar:opacity-100
                  "
                >
                  {item.label}
                </span>
              </NavLink>
            );
          })}
        </nav>

        {/* =================================================
            DESKTOP BOTTOM
            ================================================= */}
        <div className="border-t border-gray-100 p-3">
          <button
            type="button"
            onClick={handleBack}
            className="
              group/back
              flex
              h-12
              w-full
              items-center
              overflow-hidden
              rounded-xl
              px-0
              text-gray-500
              transition-all
              duration-200
              hover:bg-gray-50
              hover:text-gray-900
              group-hover/sidebar:px-4
            "
          >
            <span
              className="
                flex
                h-12
                w-[52px]
                shrink-0
                items-center
                justify-center
                transition-all
                duration-300
                group-hover/sidebar:w-auto
                group-hover/sidebar:justify-start
              "
            >
              <ArrowLeft size={20} />
            </span>

            <span
              className="
                ml-0
                max-w-0
                overflow-hidden
                whitespace-nowrap
                text-sm
                font-medium
                opacity-0
                transition-all
                duration-300
                group-hover/sidebar:ml-3
                group-hover/sidebar:max-w-[160px]
                group-hover/sidebar:opacity-100
              "
            >
              Back to website
            </span>
          </button>
        </div>
      </aside>

      {/* =====================================================
          MOBILE OVERLAY
          ===================================================== */}
      {mobileOpen && (
        <div
          className="
            fixed
            inset-0
            z-[60]
            bg-black/40
            backdrop-blur-[2px]
            lg:hidden
          "
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* =====================================================
          MOBILE SIDEBAR
          ===================================================== */}
      <aside
        className={`
          fixed
          left-0
          top-0
          z-[70]
          flex
          h-screen
          w-[280px]
          flex-col
          border-r
          border-gray-200
          bg-white
          shadow-2xl
          transition-transform
          duration-300
          ease-in-out
          lg:hidden
          ${
            mobileOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        {/* =================================================
            MOBILE HEADER
            ================================================= */}
        <div
          className="
            flex
            h-[73px]
            shrink-0
            items-center
            justify-between
            border-b
            border-gray-100
            px-5
          "
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
              Provider
            </p>

            <h2 className="mt-0.5 text-lg font-bold text-gray-900">
              Provider Panel
            </h2>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              text-gray-500
              transition
              hover:bg-gray-100
              hover:text-gray-900
            "
          >
            <X size={21} />
          </button>
        </div>

        {/* =================================================
            MOBILE NAVIGATION
            ================================================= */}
        <nav className="flex-1 space-y-2 overflow-y-auto p-4">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `
                  flex
                  items-center
                  gap-3
                  rounded-xl
                  px-4
                  py-3
                  text-sm
                  font-semibold
                  transition
                  ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }
                  `
                }
              >
                <Icon size={20} />

                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* =================================================
            MOBILE BOTTOM
            ================================================= */}
        <div className="border-t border-gray-100 p-4">
          <button
            type="button"
            onClick={handleBack}
            className="
              flex
              w-full
              items-center
              gap-3
              rounded-xl
              px-4
              py-3
              text-sm
              font-medium
              text-gray-500
              transition
              hover:bg-gray-50
              hover:text-gray-900
            "
          >
            <ChevronLeft size={20} />

            <span>Back to website</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default ProviderSidebar;