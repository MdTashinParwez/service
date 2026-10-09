import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  UserCheck,
  CalendarDays,
  IndianRupee,
  Layers,
  ArrowRight,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  RefreshCw,
  Eye,
  Check,
  X,
  ShieldAlert,
} from "lucide-react";
import AdminStatCard from "../../components/admin/AdminStatCard";
import AdminModal from "../../components/admin/AdminModal";
import {
  getDashboardStats,
  approveProvider,
  rejectProvider,
} from "../../api/admin.api";
import toast from "react-hot-toast";

const AdminDashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  // Modal actions for pending providers
  const [actionModal, setActionModal] = useState({
    isOpen: false,
    type: null, // "approve" | "reject"
    provider: null,
  });
  const [verifyIdentity, setVerifyIdentity] = useState(true);
  const [actionNote, setActionNote] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  const fetchStats = async (isManual = false) => {
    try {
      if (isManual) setRefreshing(true);
      else setLoading(true);
      setError("");

      const response = await getDashboardStats();
      setStats(response.data || {});
    } catch (err) {
      console.error("Failed to load admin stats:", err);
      setError(err?.message || "Failed to load dashboard statistics.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleApprove = async () => {
    if (!actionModal.provider) return;
    try {
      setActionLoading(true);
      await approveProvider(actionModal.provider._id, {
        verifyIdentity,
        note: actionNote,
      });
      toast.success(
        `Provider "${actionModal.provider.businessName}" approved successfully!`
      );
      setActionModal({ isOpen: false, type: null, provider: null });
      setActionNote("");
      fetchStats(true);
    } catch (err) {
      toast.error(err?.message || "Failed to approve provider");
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async () => {
    if (!actionModal.provider) return;
    if (!actionNote.trim()) {
      toast.error("Please provide a reason for rejection");
      return;
    }
    try {
      setActionLoading(true);
      await rejectProvider(actionModal.provider._id, {
        rejectionReason: actionNote.trim(),
      });
      toast.success(
        `Provider "${actionModal.provider.businessName}" rejected.`
      );
      setActionModal({ isOpen: false, type: null, provider: null });
      setActionNote("");
      fetchStats(true);
    } catch (err) {
      toast.error(err?.message || "Failed to reject provider");
    } finally {
      setActionLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount || 0);
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
        <p className="mt-4 text-sm font-semibold text-slate-600">
          Loading platform dashboard & analytics...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-rose-200 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 text-rose-600">
          <AlertTriangle size={24} />
        </div>
        <h2 className="mt-4 text-lg font-bold text-slate-900">
          Unable to Load Dashboard
        </h2>
        <p className="mt-1 text-sm text-rose-600">{error}</p>
        <button
          type="button"
          onClick={() => fetchStats()}
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          <RefreshCw size={15} />
          Retry
        </button>
      </div>
    );
  }

  const {
    users = {},
    providers = {},
    services = {},
    bookings = {},
    financials = {},
    recentBookings = [],
    pendingProviderApplications = [],
  } = stats || {};

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
            Overview
          </span>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Admin Dashboard
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Monitor ecosystem performance, approve service providers, and manage platform resources.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => fetchStats(true)}
            disabled={refreshing}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 disabled:opacity-50"
          >
            <RefreshCw
              size={14}
              className={refreshing ? "animate-spin text-blue-600" : ""}
            />
            {refreshing ? "Refreshing..." : "Refresh Stats"}
          </button>

          <Link
            to="/admin/providers"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-3.5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-blue-700"
          >
            <span>Review Applications</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* Pending Approvals Alert Banner */}
      {providers.pending > 0 && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 p-4 sm:p-5 shadow-xs">
          <div className="flex items-start sm:items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500 text-white shadow-xs">
              <ShieldAlert size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-amber-900">
                {providers.pending} Provider Application{providers.pending > 1 ? "s" : ""} Awaiting Review
              </p>
              <p className="text-xs text-amber-700">
                New service partners have submitted their business profiles and documents for verification.
              </p>
            </div>
          </div>
          <Link
            to="/admin/providers?status=pending"
            className="shrink-0 inline-flex items-center justify-center gap-2 rounded-xl bg-amber-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-amber-700 transition"
          >
            Review Applications ({providers.pending})
          </Link>
        </div>
      )}

      {/* KPI Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        <AdminStatCard
          title="Total Revenue"
          value={formatCurrency(financials.totalRevenue)}
          icon={IndianRupee}
          description="Settled booking transactions"
          accentColor="emerald"
        />

        <AdminStatCard
          title="Platform Users"
          value={users.total || 0}
          icon={Users}
          description={`${users.customers || 0} Customers • ${users.providers || 0} Providers`}
          accentColor="blue"
        />

        <AdminStatCard
          title="Providers"
          value={providers.total || 0}
          icon={UserCheck}
          description={`${providers.approved || 0} Approved • ${providers.pending || 0} Pending`}
          trend={providers.pending > 0 ? `${providers.pending} pending` : "All approved"}
          trendType={providers.pending > 0 ? "down" : "up"}
          accentColor="violet"
        />

        <AdminStatCard
          title="Services Catalog"
          value={services.total || 0}
          icon={Layers}
          description={`${services.active || 0} Active • ${services.inactive || 0} Inactive`}
          accentColor="indigo"
        />

        <AdminStatCard
          title="Total Bookings"
          value={bookings.total || 0}
          icon={CalendarDays}
          description={`${bookings.completed || 0} Completed • ${bookings.cancelled || 0} Cancelled`}
          accentColor="amber"
        />
      </div>

      {/* Quick Action Shortcuts */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Link
          to="/admin/providers"
          className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs hover:border-blue-200 hover:shadow-xs transition"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 group-hover:scale-105 transition-transform">
              <UserCheck size={20} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">Manage Providers</p>
              <p className="text-[11px] text-slate-500">Approve, reject & suspend</p>
            </div>
          </div>
          <ArrowRight size={16} className="text-slate-400 group-hover:translate-x-0.5 group-hover:text-blue-600 transition" />
        </Link>

        <Link
          to="/admin/users"
          className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs hover:border-blue-200 hover:shadow-xs transition"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600 group-hover:scale-105 transition-transform">
              <Users size={20} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">User Management</p>
              <p className="text-[11px] text-slate-500">Roles, accounts & details</p>
            </div>
          </div>
          <ArrowRight size={16} className="text-slate-400 group-hover:translate-x-0.5 group-hover:text-violet-600 transition" />
        </Link>

        <Link
          to="/admin/categories"
          className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs hover:border-blue-200 hover:shadow-xs transition"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 group-hover:scale-105 transition-transform">
              <Layers size={20} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">Categories & Tags</p>
              <p className="text-[11px] text-slate-500">Add & modify taxonomy</p>
            </div>
          </div>
          <ArrowRight size={16} className="text-slate-400 group-hover:translate-x-0.5 group-hover:text-emerald-600 transition" />
        </Link>

        <Link
          to="/admin/logs"
          className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs hover:border-blue-200 hover:shadow-xs transition"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700 group-hover:scale-105 transition-transform">
              <Clock size={20} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">Admin Audit Trail</p>
              <p className="text-[11px] text-slate-500">Real-time action logs</p>
            </div>
          </div>
          <ArrowRight size={16} className="text-slate-400 group-hover:translate-x-0.5 group-hover:text-slate-900 transition" />
        </Link>
      </div>

      {/* Two Column Layout: Pending Providers + Recent Bookings */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Pending Applications Widget */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-2xs overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-100 p-5">
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Pending Provider Applications
              </h2>
              <p className="text-xs text-slate-500">
                Latest submissions waiting for administrator decision
              </p>
            </div>
            <Link
              to="/admin/providers"
              className="text-xs font-semibold text-blue-600 hover:underline"
            >
              View All
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {pendingProviderApplications.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-500">
                <CheckCircle size={24} className="mx-auto mb-2 text-emerald-500" />
                No pending provider applications right now. All caught up!
              </div>
            ) : (
              pendingProviderApplications.map((prov) => (
                <div
                  key={prov._id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 hover:bg-slate-50 transition"
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700 font-bold text-sm">
                      {prov.businessName?.[0] || "P"}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-slate-900 truncate">
                        {prov.businessName}
                      </p>
                      <p className="text-xs text-slate-500 truncate">
                        {prov.user?.username || prov.user?.email} • {prov.businessCategory?.name || "Uncategorized"}
                      </p>
                      <span className="mt-1 inline-flex items-center rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-700">
                        Pending Verification
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <button
                      type="button"
                      onClick={() =>
                        setActionModal({
                          isOpen: true,
                          type: "approve",
                          provider: prov,
                        })
                      }
                      className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white shadow-2xs hover:bg-emerald-700"
                    >
                      <Check size={13} />
                      Approve
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setActionModal({
                          isOpen: true,
                          type: "reject",
                          provider: prov,
                        })
                      }
                      className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50"
                    >
                      <X size={13} />
                      Reject
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Bookings Widget */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-2xs overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-100 p-5">
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Recent Platform Bookings
              </h2>
              <p className="text-xs text-slate-500">
                Latest orders and booking transactions
              </p>
            </div>
            <Link
              to="/admin/bookings"
              className="text-xs font-semibold text-blue-600 hover:underline"
            >
              View All Bookings
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {recentBookings.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-500">
                <CalendarDays size={24} className="mx-auto mb-2 text-slate-400" />
                No recent bookings logged on the platform yet.
              </div>
            ) : (
              recentBookings.map((b) => (
                <div
                  key={b._id}
                  className="flex items-center justify-between gap-4 p-4 hover:bg-slate-50 transition"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-bold text-slate-900 truncate">
                        {b.service?.title || "Custom Service"}
                      </p>
                      <span
                        className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold capitalize ${
                          b.status === "completed"
                            ? "bg-emerald-50 text-emerald-700"
                            : b.status === "cancelled"
                            ? "bg-rose-50 text-rose-700"
                            : "bg-blue-50 text-blue-700"
                        }`}
                      >
                        {b.status}
                      </span>
                    </div>

                    <p className="mt-0.5 text-xs text-slate-500 truncate">
                      Customer: <span className="font-medium text-slate-700">{b.customer?.username || b.customer?.email}</span> • Provider: <span className="font-medium text-slate-700">{b.provider?.businessName}</span>
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold text-slate-900">
                      ₹{b.totalAmount || b.service?.price || 0}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      {new Date(b.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Approve/Reject Provider Modal */}
      <AdminModal
        isOpen={actionModal.isOpen}
        onClose={() =>
          setActionModal({ isOpen: false, type: null, provider: null })
        }
        title={
          actionModal.type === "approve"
            ? "Approve Provider Application"
            : "Reject Provider Application"
        }
        subtitle={actionModal.provider?.businessName}
      >
        {actionModal.type === "approve" ? (
          <div className="space-y-4">
            <p className="text-sm text-slate-600">
              Are you sure you want to approve{" "}
              <strong className="text-slate-900">
                {actionModal.provider?.businessName}
              </strong>
              ? This will convert their user account to a verified provider and allow them to publish services.
            </p>

            <label className="flex items-center gap-2.5 rounded-xl border border-slate-200 p-3 hover:bg-slate-50 cursor-pointer">
              <input
                type="checkbox"
                checked={verifyIdentity}
                onChange={(e) => setVerifyIdentity(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-xs font-semibold text-slate-700">
                Mark Provider Identity & Submitted Documents as Verified
              </span>
            </label>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Optional Internal Note
              </label>
              <textarea
                value={actionNote}
                onChange={(e) => setActionNote(e.target.value)}
                placeholder="e.g. Identity verified via government ID"
                rows={2}
                className="w-full rounded-xl border border-slate-200 p-3 text-xs focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() =>
                  setActionModal({ isOpen: false, type: null, provider: null })
                }
                className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleApprove}
                disabled={actionLoading}
                className="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-emerald-700 disabled:opacity-50"
              >
                {actionLoading ? "Approving..." : "Confirm Approval"}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-slate-600">
              Please specify the reason for rejecting{" "}
              <strong className="text-slate-900">
                {actionModal.provider?.businessName}
              </strong>
              . This reason will be dispatched to the applicant.
            </p>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Rejection Reason (Required) *
              </label>
              <textarea
                value={actionNote}
                onChange={(e) => setActionNote(e.target.value)}
                placeholder="e.g. Incomplete documentation or invalid business license"
                rows={3}
                required
                className="w-full rounded-xl border border-slate-200 p-3 text-xs focus:border-rose-500 focus:outline-none"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() =>
                  setActionModal({ isOpen: false, type: null, provider: null })
                }
                className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleReject}
                disabled={actionLoading}
                className="rounded-xl bg-rose-600 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-rose-700 disabled:opacity-50"
              >
                {actionLoading ? "Rejecting..." : "Confirm Rejection"}
              </button>
            </div>
          </div>
        )}
      </AdminModal>
    </div>
  );
};

export default AdminDashboardPage;

