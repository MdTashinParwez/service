import { Navigate, Outlet, useLocation, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ShieldAlert, ArrowLeft, LogIn, Loader2 } from "lucide-react";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 shadow-sm">
          <Loader2 size={28} className="animate-spin text-blue-600" />
        </div>
        <p className="mt-4 text-sm font-semibold text-slate-700">
          Verifying administrator credentials...
        </p>
      </div>
    );
  }

  if (!user) {
    return (
      <Navigate
        to="/login"
        state={{ from: location.pathname }}
        replace
      />
    );
  }

  // Check if role is admin
  if (user.role !== "admin") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">
        <div className="w-full max-w-md rounded-2xl border border-rose-100 bg-white p-8 text-center shadow-lg shadow-rose-500/5">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-rose-600">
            <ShieldAlert size={28} />
          </div>

          <span className="mt-4 inline-flex items-center rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700">
            Restricted Access
          </span>

          <h1 className="mt-3 text-2xl font-bold tracking-tight text-slate-900">
            Admin Privileges Required
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            You are signed in as <span className="font-semibold text-slate-800">{user.username || user.email}</span> (role: <span className="font-semibold text-rose-600 capitalize">{user.role}</span>). Only platform administrators have access to this portal.
          </p>

          <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
            >
              <ArrowLeft size={16} />
              Return Home
            </Link>

            <Link
              to="/login"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
            >
              <LogIn size={16} />
              Switch Account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return children || <Outlet />;
};

export default AdminRoute;

