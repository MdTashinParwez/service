import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  CalendarDays,
  ChevronDown,
  LogOut,
  Menu,
  Moon,
  UserRound,
  X,
} from "lucide-react";
import { toast } from "sonner";

import { useAuth } from "../../context/AuthContext";
import { logoutUser } from "../../api/auth.api";

const navLinks = [
  { name: "Services", path: "/services" },
  { name: "Providers", path: "/providers" },
  { name: "Become a Provider", path: "/become-provider" },
  { name: "About", path: "/about" },
];

const Navbar = () => {
  const { user, loading, setUser } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const navigate = useNavigate();

  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = async () => {
    try {
      await logoutUser();

      setUser(null);
      setProfileOpen(false);
      setMobileMenuOpen(false);

      toast.success("Logged out successfully.");

      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);

      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to logout."
      );
    }
  };

  // =====================================================
  // CLOSE MOBILE MENU
  // =====================================================

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  // =====================================================
  // CLOSE PROFILE DROPDOWN
  // =====================================================

  const closeProfileMenu = () => {
    setProfileOpen(false);
  };

  // =====================================================
  // THEME COMING SOON
  // =====================================================

  const handleThemeComingSoon = () => {
    toast.info("Dark mode is coming soon.");
  };

  // =====================================================
  // PROFILE AVATAR
  // =====================================================

  const avatarInitial =
    user?.username?.charAt(0)?.toUpperCase() || "U";

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* =================================================
            MAIN NAVBAR
        ================================================= */}

        <div className="flex h-16 items-center justify-between">
          {/* =================================================
              LOGO
          ================================================= */}

          <Link
            to="/"
            onClick={() => {
              closeMobileMenu();
              closeProfileMenu();
            }}
            className="
              text-2xl font-bold tracking-tight
              text-blue-600 transition-colors
              hover:text-blue-700
            "
          >
            ServiceHub
          </Link>

          {/* =================================================
              DESKTOP NAVIGATION
          ================================================= */}

          <div className="hidden items-center lg:flex">
            <ul className="flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `relative text-sm font-medium transition-colors duration-200 ${
                        isActive
                          ? "text-blue-600"
                          : "text-gray-600 hover:text-blue-600"
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* =================================================
              DESKTOP RIGHT
          ================================================= */}

          <div className="hidden items-center gap-3 lg:flex">
            {/* Theme button */}
            <button
              type="button"
              onClick={handleThemeComingSoon}
              aria-label="Dark mode coming soon"
              className="
                flex h-10 w-10 items-center justify-center
                rounded-xl border border-gray-200
                bg-white text-gray-700
                transition hover:bg-gray-50
                hover:text-gray-900
              "
            >
              <Moon size={18} />
            </button>

            {/* Authentication */}
            {loading ? (
              <div className="h-10 w-36 animate-pulse rounded-xl bg-gray-100" />
            ) : user ? (
              <div className="relative">
                {/* Profile trigger */}
                <button
                  type="button"
                  onClick={() =>
                    setProfileOpen((prev) => !prev)
                  }
                  aria-expanded={profileOpen}
                  className="
                    flex items-center gap-2 rounded-xl
                    border border-gray-200 bg-white
                    px-2 py-1.5
                    transition hover:bg-gray-50
                  "
                >
                  {/* Avatar */}
                  <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg bg-gray-100">
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.username || "User"}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-xs font-bold text-gray-600">
                        {avatarInitial}
                      </span>
                    )}
                  </div>

                  <span className="max-w-24 truncate text-sm font-semibold text-gray-700">
                    {user.username}
                  </span>

                  <ChevronDown
                    size={16}
                    className={`text-gray-400 transition-transform ${
                      profileOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown */}
                {profileOpen && (
                  <div className="absolute right-0 top-12 z-50 w-60 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">
                    {/* User summary */}
                    <div className="border-b border-gray-100 px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gray-100">
                          {user.avatar ? (
                            <img
                              src={user.avatar}
                              alt={user.username || "User"}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <span className="text-sm font-bold text-gray-600">
                              {avatarInitial}
                            </span>
                          )}
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-bold text-gray-900">
                            @{user.username}
                          </p>

                          <p className="truncate text-xs text-gray-500">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="p-2">
                      <Link
                        to="/profile"
                        onClick={closeProfileMenu}
                        className="
                          flex items-center gap-3 rounded-xl
                          px-3 py-2.5 text-sm font-medium
                          text-gray-700 transition
                          hover:bg-gray-50 hover:text-gray-900
                        "
                      >
                        <UserRound size={17} />
                        My Profile
                      </Link>

                      <Link
                        to="/my-bookings"
                        onClick={closeProfileMenu}
                        className="
                          flex items-center gap-3 rounded-xl
                          px-3 py-2.5 text-sm font-medium
                          text-gray-700 transition
                          hover:bg-gray-50 hover:text-gray-900
                        "
                      >
                        <CalendarDays size={17} />
                        My Bookings
                      </Link>
                    </div>

                    {/* Logout */}
                    <div className="border-t border-gray-100 p-2">
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="
                          flex w-full items-center gap-3
                          rounded-xl px-3 py-2.5
                          text-sm font-medium text-red-600
                          transition hover:bg-red-50
                        "
                      >
                        <LogOut size={17} />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="
                    rounded-xl px-4 py-2.5
                    text-sm font-medium text-gray-700
                    transition hover:bg-gray-100
                  "
                >
                  Sign in
                </Link>

                <Link
                  to="/signup"
                  className="
                    rounded-xl bg-blue-600
                    px-5 py-2.5 text-sm font-semibold
                    text-white transition hover:bg-blue-700
                  "
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* =================================================
              MOBILE RIGHT
          ================================================= */}

          <div className="flex items-center gap-2 lg:hidden">
            {/* Theme */}
            <button
              type="button"
              onClick={handleThemeComingSoon}
              aria-label="Dark mode coming soon"
              className="
                flex h-10 w-10 items-center justify-center
                rounded-xl border border-gray-200
                text-gray-700 transition hover:bg-gray-50
              "
            >
              <Moon size={18} />
            </button>

            {/* Menu */}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen((prev) => !prev);
                setProfileOpen(false);
              }}
              aria-label="Toggle navigation"
              aria-expanded={mobileMenuOpen}
              className="
                flex h-10 w-10 items-center justify-center
                rounded-xl border border-gray-200
                text-gray-700 transition hover:bg-gray-50
              "
            >
              {mobileMenuOpen ? (
                <X size={21} />
              ) : (
                <Menu size={21} />
              )}
            </button>
          </div>
        </div>

        {/* =================================================
            MOBILE MENU
        ================================================= */}

        {mobileMenuOpen && (
          <div className="border-t border-gray-200 py-4 lg:hidden">
            {/* Navigation */}
            <div className="space-y-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    `block rounded-xl px-4 py-3 text-sm font-medium transition ${
                      isActive
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-700 hover:bg-gray-100"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>

            <div className="my-4 border-t border-gray-200" />

            {/* Mobile Auth */}
            {loading ? (
              <div className="h-11 w-full animate-pulse rounded-xl bg-gray-100" />
            ) : user ? (
              <div className="space-y-2">

                {/* User summary */}
                <div className="flex items-center gap-3 rounded-2xl bg-gray-50 px-4 py-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white">
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.username || "User"}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-sm font-bold text-gray-600">
                        {avatarInitial}
                      </span>
                    )}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-gray-900">
                      @{user.username}
                    </p>

                    <p className="truncate text-xs text-gray-500">
                      {user.email}
                    </p>
                  </div>
                </div>

                {/* My Profile */}
                <Link
                  to="/profile"
                  onClick={closeMobileMenu}
                  className="
                    flex items-center gap-3 rounded-xl
                    px-4 py-3 text-sm font-semibold
                    text-gray-700 transition hover:bg-gray-100
                  "
                >
                  <UserRound size={18} />
                  My Profile
                </Link>

                {/* My Bookings */}
                <Link
                  to="/bookings"
                  onClick={closeMobileMenu}
                  className="
                    flex items-center gap-3 rounded-xl
                    px-4 py-3 text-sm font-semibold
                    text-gray-700 transition hover:bg-gray-100
                  "
                >
                  <CalendarDays size={18} />
                  My Bookings
                </Link>

                {/* Logout */}
                <button
                  type="button"
                  onClick={handleLogout}
                  className="
                    flex w-full items-center justify-center
                    gap-2 rounded-xl
                    bg-gray-900 px-4 py-3
                    text-sm font-semibold text-white
                    transition hover:bg-gray-800
                  "
                >
                  <LogOut size={17} />
                  Logout
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Link
                  to="/login"
                  onClick={closeMobileMenu}
                  className="
                    flex items-center justify-center
                    rounded-xl border border-gray-200
                    px-4 py-3 text-sm font-semibold
                    text-gray-700 transition hover:bg-gray-100
                  "
                >
                  Sign in
                </Link>

                <Link
                  to="/signup"
                  onClick={closeMobileMenu}
                  className="
                    flex items-center justify-center
                    rounded-xl bg-blue-600
                    px-4 py-3 text-sm font-semibold
                    text-white transition hover:bg-blue-700
                  "
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;