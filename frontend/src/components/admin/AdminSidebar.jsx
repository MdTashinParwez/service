import { NavLink, Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  UserCheck,
  Users,
  Wrench,
  CalendarDays,
  FolderKanban,
  History,
  Shield,
  ArrowLeft,
  X,
  ExternalLink,
} from "lucide-react";

export const adminNavItems = [
  {
    label: "Dashboard",
    path: "/admin",
    exact: true,
    icon: LayoutDashboard,
  },
  {
    label: "Providers",
    path: "/admin/providers",
    icon: UserCheck,
  },
  {
    label: "User Management",
    path: "/admin/users",
    icon: Users,
  },
  {
    label: "Services",
    path: "/admin/services",
    icon: Wrench,
  },
  {
    label: "Bookings",
    path: "/admin/bookings",
    icon: CalendarDays,
  },
  {
    label: "Categories",
    path: "/admin/categories",
    icon: FolderKanban,
  },
  {
    label: "Audit Logs",
    path: "/admin/logs",
    icon: History,
  },
];

const AdminSidebar = ({ mobileOpen, setMobileOpen }) => {
  return (
    <>
      {/* =====================================================
          DESKTOP SIDEBAR
      ===================================================== */}
      <aside className="hidden lg:flex w-64 flex-col shrink-0 border-r border-slate-200/90 bg-white min-h-[calc(100vh-65px)]">
        {/* Brand / Portal info */}
        <div className="p-4 border-b border-slate-100">
          <div className="flex items-center gap-3 px-2 py-1.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm shadow-blue-500/20">
              <Shield size={19} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900 tracking-tight">Admin Console</p>
              <p className="text-[11px] font-medium text-slate-500">ServiceHub Management</p>
            </div>
          </div>
        </div>

        {/* Navigation list */}
        <nav className="flex-1 space-y-1.5 p-3.5 overflow-y-auto">
          {adminNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.exact}
                className={({ isActive }) =>
                  `group relative flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-blue-50 text-blue-600 shadow-xs"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${
                        isActive
                          ? "bg-blue-600 text-white shadow-xs"
                          : "text-slate-500 group-hover:text-slate-700"
                      }`}
                    >
                      <Icon size={18} strokeWidth={2} />
                    </span>
                    <span>{item.label}</span>
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="border-t border-slate-100 p-3.5 space-y-2">
          <Link
            to="/"
            className="flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
          >
            <span className="flex items-center gap-2">
              <ArrowLeft size={15} />
              Return to Website
            </span>
            <ExternalLink size={13} className="text-slate-400" />
          </Link>
        </div>
      </aside>

      {/* =====================================================
          MOBILE DRAWER BACKDROP & SIDEBAR
      ===================================================== */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs lg:hidden transition-opacity"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-white border-r border-slate-200 shadow-2xl transition-transform duration-300 lg:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-slate-100 px-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white">
              <Shield size={19} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">Admin Console</p>
              <p className="text-[11px] text-slate-500">ServiceHub</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 space-y-1.5 p-4 overflow-y-auto">
          {adminNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.exact}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                        isActive
                          ? "bg-blue-600 text-white"
                          : "text-slate-500"
                      }`}
                    >
                      <Icon size={18} strokeWidth={2} />
                    </span>
                    <span>{item.label}</span>
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        <div className="border-t border-slate-100 p-4">
          <Link
            to="/"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          >
            <ArrowLeft size={16} />
            Return to Website
          </Link>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;

