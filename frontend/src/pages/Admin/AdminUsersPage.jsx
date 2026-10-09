import { useEffect, useState, useCallback } from "react";
import {
  Users,
  Search,
  RotateCcw,
  RefreshCw,
  Eye,
  Shield,
  Trash2,
  Calendar,
  CreditCard,
  Briefcase,
  AlertTriangle,
  UserCheck,
  CheckCircle2,
} from "lucide-react";
import AdminPagination from "../../components/admin/AdminPagination";
import AdminModal from "../../components/admin/AdminModal";
import {
  getAllUsersAdmin,
  getUserDetailsAdmin,
  updateUserRoleAdmin,
  deleteUserAdmin,
} from "../../api/admin.api";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

const AdminUsersPage = () => {
  const { user: currentAdmin } = useAuth();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  // Filters
  const [roleFilter, setRoleFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isVerifiedFilter, setIsVerifiedFilter] = useState("");

  // Modals state
  const [detailsModal, setDetailsModal] = useState({
    isOpen: false,
    loading: false,
    data: null,
  });

  const [roleModal, setRoleModal] = useState({
    isOpen: false,
    user: null,
    newRole: "customer",
    reason: "",
    submitting: false,
  });

  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    user: null,
    reason: "",
    submitting: false,
  });

  const fetchUsers = useCallback(async (page = 1) => {
    try {
      setLoading(true);
      const res = await getAllUsersAdmin({
        page,
        limit: 10,
        role: roleFilter,
        search: searchQuery,
        isVerified: isVerifiedFilter,
      });

      const data = res?.data || {};
      setUsers(data.users || []);
      setCurrentPage(data.currentPage || page);
      setTotalPages(data.totalPages || 1);
      setTotalUsers(data.totalUsers || 0);
    } catch (err) {
      console.error("Failed to load users:", err);
      toast.error(err?.message || "Failed to load user accounts");
    } finally {
      setLoading(false);
    }
  }, [roleFilter, searchQuery, isVerifiedFilter]);

  useEffect(() => {
    fetchUsers(1);
  }, [fetchUsers]);

  const handleOpenDetails = async (userId) => {
    try {
      setDetailsModal({ isOpen: true, loading: true, data: null });
      const res = await getUserDetailsAdmin(userId);
      setDetailsModal({ isOpen: true, loading: false, data: res?.data });
    } catch (err) {
      toast.error(err?.message || "Failed to load user details");
      setDetailsModal({ isOpen: false, loading: false, data: null });
    }
  };

  const handleConfirmRoleChange = async () => {
    if (!roleModal.user) return;
    if (roleModal.user._id === currentAdmin?._id && roleModal.newRole !== "admin") {
      toast.error("You cannot revoke your own administrator privileges.");
      return;
    }

    try {
      setRoleModal((prev) => ({ ...prev, submitting: true }));
      await updateUserRoleAdmin(roleModal.user._id, {
        role: roleModal.newRole,
        reason: roleModal.reason,
      });
      toast.success(
        `Updated role for ${roleModal.user.username} to ${roleModal.newRole}`
      );
      setRoleModal({
        isOpen: false,
        user: null,
        newRole: "customer",
        reason: "",
        submitting: false,
      });
      fetchUsers(currentPage);
    } catch (err) {
      toast.error(err?.message || "Role change failed");
      setRoleModal((prev) => ({ ...prev, submitting: false }));
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteModal.user) return;
    if (deleteModal.user._id === currentAdmin?._id) {
      toast.error("You cannot delete your own active administrator account.");
      return;
    }

    try {
      setDeleteModal((prev) => ({ ...prev, submitting: true }));
      await deleteUserAdmin(deleteModal.user._id, {
        reason: deleteModal.reason,
      });
      toast.success(`User ${deleteModal.user.username} deleted permanently.`);
      setDeleteModal({
        isOpen: false,
        user: null,
        reason: "",
        submitting: false,
      });
      fetchUsers(currentPage);
    } catch (err) {
      toast.error(err?.message || "Delete failed");
      setDeleteModal((prev) => ({ ...prev, submitting: false }));
    }
  };

  const resetFilters = () => {
    setRoleFilter("");
    setSearchQuery("");
    setIsVerifiedFilter("");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
            Accounts & Access
          </span>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            User Management
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            View member profiles, assign system roles, and audit customer and merchant accounts.
          </p>
        </div>

        <button
          type="button"
          onClick={() => fetchUsers(currentPage)}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 self-start sm:self-auto"
        >
          <RefreshCw size={14} className={loading ? "animate-spin text-blue-600" : ""} />
          Refresh
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs sm:grid-cols-2 lg:grid-cols-4">
        {/* Search */}
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search username, email, phone..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2 pl-9 pr-3 text-xs focus:border-blue-500 focus:bg-white focus:outline-none"
          />
        </div>

        {/* Role Filter */}
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs text-slate-700 focus:border-blue-500 focus:bg-white focus:outline-none"
        >
          <option value="">All Roles</option>
          <option value="customer">Customer</option>
          <option value="provider">Provider</option>
          <option value="admin">Administrator</option>
        </select>

        {/* Verified Status */}
        <select
          value={isVerifiedFilter}
          onChange={(e) => setIsVerifiedFilter(e.target.value)}
          className="rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs text-slate-700 focus:border-blue-500 focus:bg-white focus:outline-none"
        >
          <option value="">All Verification States</option>
          <option value="true">Verified Users</option>
          <option value="false">Unverified Users</option>
        </select>

        {/* Reset */}
        <button
          type="button"
          onClick={resetFilters}
          className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
        >
          <RotateCcw size={13} />
          Reset Filters
        </button>
      </div>

      {/* Users Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/75 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <th className="px-5 py-3.5">User Profile</th>
                <th className="px-4 py-3.5">Contact Details</th>
                <th className="px-4 py-3.5">Role</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-4 py-3.5">Created</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center">
                      <div className="h-7 w-7 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600" />
                      <p className="mt-3 text-xs font-semibold">Loading users...</p>
                    </div>
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500">
                    <Users size={28} className="mx-auto mb-2 text-slate-400" />
                    No user accounts match your search criteria.
                  </td>
                </tr>
              ) : (
                users.map((u) => {
                  const isCurrent = u._id === currentAdmin?._id;

                  return (
                    <tr key={u._id} className="hover:bg-slate-50/80 transition">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-white font-bold text-xs uppercase overflow-hidden">
                            {u.avatar ? (
                              <img
                                src={u.avatar}
                                alt={u.username}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              u.username?.[0] || "U"
                            )}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <p className="font-bold text-slate-900 truncate">
                                {u.username}
                              </p>
                              {isCurrent && (
                                <span className="rounded bg-blue-50 px-1.5 py-0.2 text-[10px] font-bold text-blue-600">
                                  You
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-slate-400 font-mono">
                              ID: {u._id.slice(-6)}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-4 text-slate-600">
                        <p className="truncate font-medium">{u.email}</p>
                        <p className="text-[11px] text-slate-400">{u.phone || "—"}</p>
                      </td>

                      <td className="px-4 py-4">
                        {u.role === "admin" ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2.5 py-1 text-[11px] font-bold text-rose-700">
                            <Shield size={12} />
                            Administrator
                          </span>
                        ) : u.role === "provider" ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-purple-50 px-2.5 py-1 text-[11px] font-bold text-purple-700">
                            <Briefcase size={12} />
                            Provider
                          </span>
                        ) : (
                          <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-700">
                            Customer
                          </span>
                        )}
                      </td>

                      <td className="px-4 py-4">
                        {u.isVerified ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700">
                            <CheckCircle2 size={12} />
                            Verified
                          </span>
                        ) : (
                          <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-medium text-slate-500">
                            Unverified
                          </span>
                        )}
                      </td>

                      <td className="px-4 py-4 text-slate-500 text-[11px]">
                        {new Date(u.createdAt).toLocaleDateString()}
                      </td>

                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* View Profile */}
                          <button
                            type="button"
                            onClick={() => handleOpenDetails(u._id)}
                            title="View History & Details"
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                          >
                            <Eye size={15} />
                          </button>

                          {/* Change Role */}
                          <button
                            type="button"
                            onClick={() =>
                              setRoleModal({
                                isOpen: true,
                                user: u,
                                newRole: u.role,
                                reason: "",
                                submitting: false,
                              })
                            }
                            title="Edit Role"
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-blue-600 hover:bg-blue-50"
                          >
                            <Shield size={15} />
                          </button>

                          {/* Delete Account */}
                          {!isCurrent && (
                            <button
                              type="button"
                              onClick={() =>
                                setDeleteModal({
                                  isOpen: true,
                                  user: u,
                                  reason: "",
                                  submitting: false,
                                })
                              }
                              title="Delete Account"
                              className="flex h-8 w-8 items-center justify-center rounded-lg border border-rose-200 bg-white text-rose-600 hover:bg-rose-50"
                            >
                              <Trash2 size={15} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <AdminPagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalUsers}
          pageSize={10}
          onPageChange={(page) => fetchUsers(page)}
        />
      </div>

      {/* MODAL: User Details & History */}
      <AdminModal
        isOpen={detailsModal.isOpen}
        onClose={() =>
          setDetailsModal({ isOpen: false, loading: false, data: null })
        }
        title="User Account & Activity History"
        subtitle={detailsModal.data?.user?.username}
        maxWidth="max-w-3xl"
      >
        {detailsModal.loading ? (
          <div className="py-12 text-center text-slate-500">
            <div className="h-7 w-7 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600 mx-auto" />
            <p className="mt-3 text-xs">Loading user profile & logs...</p>
          </div>
        ) : detailsModal.data ? (
          <div className="space-y-5">
            {/* User Profile Card */}
            <div className="rounded-xl border border-slate-200 p-4 bg-slate-50/50">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-white font-bold text-sm uppercase overflow-hidden">
                    {detailsModal.data.user.avatar ? (
                      <img
                        src={detailsModal.data.user.avatar}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      detailsModal.data.user.username?.[0]
                    )}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      {detailsModal.data.user.username}
                    </h4>
                    <p className="text-xs text-slate-500">
                      {detailsModal.data.user.email}
                    </p>
                    <p className="text-xs text-slate-500">
                      {detailsModal.data.user.phone || "No phone registered"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="rounded-lg bg-white border border-slate-200 px-3 py-1 text-xs font-bold capitalize text-slate-800">
                    Role: {detailsModal.data.user.role}
                  </span>
                  <span className="rounded-lg bg-white border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600">
                    {detailsModal.data.user.isVerified ? "Verified" : "Unverified"}
                  </span>
                </div>
              </div>
            </div>

            {/* Linked Provider Profile if exists */}
            {detailsModal.data.providerProfile && (
              <div className="rounded-xl border border-blue-200 bg-blue-50/40 p-4 space-y-1.5">
                <div className="flex items-center gap-2">
                  <Briefcase size={16} className="text-blue-600" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900">
                    Linked Provider Profile
                  </h4>
                </div>
                <div className="grid sm:grid-cols-2 gap-2 text-xs pt-1">
                  <p>
                    <span className="text-slate-500">Business Name: </span>
                    <strong className="text-slate-900">
                      {detailsModal.data.providerProfile.businessName}
                    </strong>
                  </p>
                  <p>
                    <span className="text-slate-500">Category: </span>
                    <strong className="text-slate-900">
                      {detailsModal.data.providerProfile.businessCategory?.name || "N/A"}
                    </strong>
                  </p>
                </div>
              </div>
            )}

            {/* Recent Bookings */}
            <div className="rounded-xl border border-slate-200 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-slate-500" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Recent Bookings ({detailsModal.data.recentBookings?.length || 0})
                  </h4>
                </div>
              </div>

              {!detailsModal.data.recentBookings || detailsModal.data.recentBookings.length === 0 ? (
                <p className="text-xs text-slate-400 italic">No booking history logged for this user.</p>
              ) : (
                <div className="divide-y divide-slate-100 max-h-48 overflow-y-auto">
                  {detailsModal.data.recentBookings.map((bk) => (
                    <div key={bk._id} className="py-2 flex items-center justify-between text-xs">
                      <div>
                        <p className="font-semibold text-slate-800">
                          {bk.service?.title || "Booking"}
                        </p>
                        <p className="text-[11px] text-slate-400">
                          Provider: {bk.provider?.businessName || "Unknown"}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="inline-block rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold capitalize text-slate-700">
                          {bk.status}
                        </span>
                        <p className="text-[11px] font-bold text-slate-900">
                          ₹{bk.totalAmount || bk.service?.price || 0}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Recent Payments */}
            <div className="rounded-xl border border-slate-200 p-4 space-y-3">
              <div className="flex items-center gap-2">
                <CreditCard size={16} className="text-slate-500" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Recent Payment Transactions ({detailsModal.data.recentPayments?.length || 0})
                </h4>
              </div>

              {!detailsModal.data.recentPayments || detailsModal.data.recentPayments.length === 0 ? (
                <p className="text-xs text-slate-400 italic">No payments logged for this user.</p>
              ) : (
                <div className="divide-y divide-slate-100 max-h-48 overflow-y-auto">
                  {detailsModal.data.recentPayments.map((pmt) => (
                    <div key={pmt._id} className="py-2 flex items-center justify-between text-xs">
                      <div>
                        <p className="font-semibold text-slate-800 font-mono">
                          Txn: {pmt.transactionId || pmt._id.slice(-8)}
                        </p>
                        <p className="text-[11px] text-slate-400">
                          Method: {pmt.paymentMethod || "Online"}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="inline-block rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 capitalize">
                          {pmt.paymentStatus}
                        </span>
                        <p className="text-[11px] font-bold text-slate-900">
                          ₹{pmt.amount || 0}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : null}
      </AdminModal>

      {/* MODAL: Update Role */}
      <AdminModal
        isOpen={roleModal.isOpen}
        onClose={() =>
          setRoleModal({
            isOpen: false,
            user: null,
            newRole: "customer",
            reason: "",
            submitting: false,
          })
        }
        title="Modify User Role"
        subtitle={roleModal.user?.username}
      >
        <div className="space-y-4">
          <p className="text-xs text-slate-600">
            Select the new platform role for <strong>{roleModal.user?.username}</strong>.
            This will adjust their access permissions immediately.
          </p>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Platform Role
            </label>
            <select
              value={roleModal.newRole}
              onChange={(e) =>
                setRoleModal((prev) => ({ ...prev, newRole: e.target.value }))
              }
              className="w-full rounded-xl border border-slate-200 p-2.5 text-xs focus:border-blue-500 focus:outline-none"
            >
              <option value="customer">Customer (Standard User)</option>
              <option value="provider">Provider (Service Merchant)</option>
              <option value="admin">Administrator (Full Console Access)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Administrative Reason (Optional)
            </label>
            <textarea
              value={roleModal.reason}
              onChange={(e) =>
                setRoleModal((prev) => ({ ...prev, reason: e.target.value }))
              }
              rows={2}
              placeholder="e.g. Promoted to administrator team"
              className="w-full rounded-xl border border-slate-200 p-2.5 text-xs focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() =>
                setRoleModal({
                  isOpen: false,
                  user: null,
                  newRole: "customer",
                  reason: "",
                  submitting: false,
                })
              }
              className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirmRoleChange}
              disabled={roleModal.submitting}
              className="rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-blue-700 disabled:opacity-50"
            >
              {roleModal.submitting ? "Updating..." : "Save Role"}
            </button>
          </div>
        </div>
      </AdminModal>

      {/* MODAL: Delete User */}
      <AdminModal
        isOpen={deleteModal.isOpen}
        onClose={() =>
          setDeleteModal({
            isOpen: false,
            user: null,
            reason: "",
            submitting: false,
          })
        }
        title="Permanently Delete User"
        subtitle={deleteModal.user?.username}
      >
        <div className="space-y-4">
          <div className="flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50/50 p-3">
            <AlertTriangle size={20} className="text-rose-600 shrink-0 mt-0.5" />
            <p className="text-xs text-rose-700 leading-relaxed">
              <strong>Warning:</strong> Deleting this account will permanently remove the user, any linked provider profile, and all associated services from the platform database. This action is irreversible.
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Deletion Reason (Optional)
            </label>
            <textarea
              value={deleteModal.reason}
              onChange={(e) =>
                setDeleteModal((prev) => ({ ...prev, reason: e.target.value }))
              }
              rows={2}
              placeholder="e.g. Account deletion requested by user or policy violation"
              className="w-full rounded-xl border border-slate-200 p-2.5 text-xs focus:border-rose-500 focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() =>
                setDeleteModal({
                  isOpen: false,
                  user: null,
                  reason: "",
                  submitting: false,
                })
              }
              className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirmDelete}
              disabled={deleteModal.submitting}
              className="rounded-xl bg-rose-600 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-rose-700 disabled:opacity-50"
            >
              {deleteModal.submitting ? "Deleting..." : "Permanently Delete"}
            </button>
          </div>
        </div>
      </AdminModal>
    </div>
  );
};

export default AdminUsersPage;

