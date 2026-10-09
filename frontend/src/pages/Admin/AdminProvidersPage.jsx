import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import {
  UserCheck,
  Search,
  Filter,
  Check,
  X,
  Eye,
  RefreshCw,
  ShieldCheck,
  ShieldAlert,
  Ban,
  RotateCcw,
  ExternalLink,
  Layers,
  Calendar,
  Phone,
  Mail,
  FileText,
} from "lucide-react";
import AdminPagination from "../../components/admin/AdminPagination";
import AdminModal from "../../components/admin/AdminModal";
import {
  getProviderApplications,
  getProviderDetailsAdmin,
  approveProvider,
  rejectProvider,
  toggleProviderStatus,
  getAllCategoriesAdmin,
} from "../../api/admin.api";
import toast from "react-hot-toast";

const AdminProvidersPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // URL state
  const initialStatus = searchParams.get("status") || "";
  const [providers, setProviders] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalProviders, setTotalProviders] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  // Filters
  const [statusFilter, setStatusFilter] = useState(initialStatus);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isVerifiedFilter, setIsVerifiedFilter] = useState("");

  // Modals state
  const [detailsModal, setDetailsModal] = useState({
    isOpen: false,
    loading: false,
    data: null,
  });

  const [approveModal, setApproveModal] = useState({
    isOpen: false,
    provider: null,
    verifyIdentity: true,
    note: "",
    submitting: false,
  });

  const [rejectModal, setRejectModal] = useState({
    isOpen: false,
    provider: null,
    rejectionReason: "",
    submitting: false,
  });

  const [toggleStatusModal, setToggleStatusModal] = useState({
    isOpen: false,
    provider: null,
    reason: "",
    submitting: false,
  });

  // Fetch Categories for dropdown filter
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getAllCategoriesAdmin({ limit: 100 });
        setCategories(res?.data?.categories || []);
      } catch (err) {
        console.error("Failed to load categories for filter", err);
      }
    };
    fetchCategories();
  }, []);

  // Fetch Providers
  const fetchProviders = useCallback(async (page = 1) => {
    try {
      setLoading(true);
      const res = await getProviderApplications({
        page,
        limit: 10,
        status: statusFilter,
        search: searchQuery,
        category: selectedCategory,
        isVerified: isVerifiedFilter,
      });

      const data = res?.data || {};
      setProviders(data.providers || []);
      setCurrentPage(data.currentPage || page);
      setTotalPages(data.totalPages || 1);
      setTotalProviders(data.totalProviders || 0);
    } catch (err) {
      console.error("Failed to fetch providers:", err);
      toast.error(err?.message || "Failed to load provider records");
    } finally {
      setLoading(false);
    }
  }, [statusFilter, searchQuery, selectedCategory, isVerifiedFilter]);

  useEffect(() => {
    fetchProviders(1);
  }, [fetchProviders]);

  const handleOpenDetails = async (providerId) => {
    try {
      setDetailsModal({ isOpen: true, loading: true, data: null });
      const res = await getProviderDetailsAdmin(providerId);
      setDetailsModal({ isOpen: true, loading: false, data: res?.data });
    } catch (err) {
      toast.error(err?.message || "Failed to load provider details");
      setDetailsModal({ isOpen: false, loading: false, data: null });
    }
  };

  const handleConfirmApprove = async () => {
    if (!approveModal.provider) return;
    try {
      setApproveModal((prev) => ({ ...prev, submitting: true }));
      await approveProvider(approveModal.provider._id, {
        verifyIdentity: approveModal.verifyIdentity,
        note: approveModal.note,
      });
      toast.success(`Provider "${approveModal.provider.businessName}" approved!`);
      setApproveModal({
        isOpen: false,
        provider: null,
        verifyIdentity: true,
        note: "",
        submitting: false,
      });
      fetchProviders(currentPage);
    } catch (err) {
      toast.error(err?.message || "Approval failed");
      setApproveModal((prev) => ({ ...prev, submitting: false }));
    }
  };

  const handleConfirmReject = async () => {
    if (!rejectModal.provider) return;
    if (!rejectModal.rejectionReason.trim()) {
      toast.error("Please enter a reason for rejection");
      return;
    }
    try {
      setRejectModal((prev) => ({ ...prev, submitting: true }));
      await rejectProvider(rejectModal.provider._id, {
        rejectionReason: rejectModal.rejectionReason.trim(),
      });
      toast.success(`Provider "${rejectModal.provider.businessName}" rejected.`);
      setRejectModal({
        isOpen: false,
        provider: null,
        rejectionReason: "",
        submitting: false,
      });
      fetchProviders(currentPage);
    } catch (err) {
      toast.error(err?.message || "Rejection failed");
      setRejectModal((prev) => ({ ...prev, submitting: false }));
    }
  };

  const handleConfirmToggleStatus = async () => {
    if (!toggleStatusModal.provider) return;
    try {
      setToggleStatusModal((prev) => ({ ...prev, submitting: true }));
      await toggleProviderStatus(toggleStatusModal.provider._id, {
        reason: toggleStatusModal.reason,
      });
      toast.success(
        `Provider status updated for "${toggleStatusModal.provider.businessName}"`
      );
      setToggleStatusModal({
        isOpen: false,
        provider: null,
        reason: "",
        submitting: false,
      });
      fetchProviders(currentPage);
    } catch (err) {
      toast.error(err?.message || "Action failed");
      setToggleStatusModal((prev) => ({ ...prev, submitting: false }));
    }
  };

  const resetFilters = () => {
    setStatusFilter("");
    setSearchQuery("");
    setSelectedCategory("");
    setIsVerifiedFilter("");
    setSearchParams({});
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
            Partners & Verification
          </span>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Provider Management
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Review onboarding applications, verify merchant credentials, and manage provider status.
          </p>
        </div>

        <button
          type="button"
          onClick={() => fetchProviders(currentPage)}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 self-start sm:self-auto"
        >
          <RefreshCw size={14} className={loading ? "animate-spin text-blue-600" : ""} />
          Refresh
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        <button
          type="button"
          onClick={() => {
            setStatusFilter("");
            setSearchParams({});
          }}
          className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
            statusFilter === ""
              ? "bg-blue-600 text-white shadow-xs"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          All Providers
        </button>
        <button
          type="button"
          onClick={() => {
            setStatusFilter("pending");
            setSearchParams({ status: "pending" });
          }}
          className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
            statusFilter === "pending"
              ? "bg-amber-500 text-white shadow-xs"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          Pending Applications
        </button>
        <button
          type="button"
          onClick={() => {
            setStatusFilter("approved");
            setSearchParams({ status: "approved" });
          }}
          className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
            statusFilter === "approved"
              ? "bg-emerald-600 text-white shadow-xs"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          Approved Partners
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs sm:grid-cols-2 lg:grid-cols-4">
        {/* Search Input */}
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search business name..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2 pl-9 pr-3 text-xs focus:border-blue-500 focus:bg-white focus:outline-none"
          />
        </div>

        {/* Category Filter */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs text-slate-700 focus:border-blue-500 focus:bg-white focus:outline-none"
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>

        {/* Verified Status */}
        <select
          value={isVerifiedFilter}
          onChange={(e) => setIsVerifiedFilter(e.target.value)}
          className="rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs text-slate-700 focus:border-blue-500 focus:bg-white focus:outline-none"
        >
          <option value="">All Verification States</option>
          <option value="true">Verified Identity Only</option>
          <option value="false">Unverified Identity</option>
        </select>

        {/* Reset */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={resetFilters}
            className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
          >
            <RotateCcw size={13} />
            Reset Filters
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/75 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <th className="px-5 py-3.5">Business & User</th>
                <th className="px-4 py-3.5">Category</th>
                <th className="px-4 py-3.5">Approval Status</th>
                <th className="px-4 py-3.5">Identity</th>
                <th className="px-4 py-3.5">Joined</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center">
                      <div className="h-7 w-7 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600" />
                      <p className="mt-3 text-xs font-semibold">Loading providers...</p>
                    </div>
                  </td>
                </tr>
              ) : providers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500">
                    <UserCheck size={28} className="mx-auto mb-2 text-slate-400" />
                    No providers found matching your filter criteria.
                  </td>
                </tr>
              ) : (
                providers.map((p) => (
                  <tr key={p._id} className="hover:bg-slate-50/80 transition">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700 font-bold text-sm">
                          {p.businessName?.[0] || "P"}
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-slate-900 truncate">
                            {p.businessName}
                          </p>
                          <p className="text-[11px] text-slate-500 truncate">
                            {p.user?.username || p.user?.email}
                          </p>
                          {p.user?.phone && (
                            <p className="text-[11px] text-slate-400 truncate">
                              {p.user.phone}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-4">
                      <span className="inline-flex items-center rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-700">
                        {p.businessCategory?.name || "Uncategorized"}
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      {p.isApproved ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700">
                          <Check size={12} />
                          Approved
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-bold text-amber-700">
                          <ShieldAlert size={12} />
                          Pending Review
                        </span>
                      )}
                    </td>

                    <td className="px-4 py-4">
                      {p.isVerified ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-semibold text-blue-700">
                          <ShieldCheck size={12} />
                          Verified
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600">
                          Unverified
                        </span>
                      )}
                    </td>

                    <td className="px-4 py-4 text-slate-500">
                      {new Date(p.createdAt).toLocaleDateString()}
                    </td>

                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* View Details */}
                        <button
                          type="button"
                          onClick={() => handleOpenDetails(p._id)}
                          title="View Details"
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                        >
                          <Eye size={15} />
                        </button>

                        {/* If pending: Approve or Reject */}
                        {!p.isApproved ? (
                          <>
                            <button
                              type="button"
                              onClick={() =>
                                setApproveModal({
                                  isOpen: true,
                                  provider: p,
                                  verifyIdentity: true,
                                  note: "",
                                  submitting: false,
                                })
                              }
                              title="Approve"
                              className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 shadow-2xs"
                            >
                              <Check size={15} />
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                setRejectModal({
                                  isOpen: true,
                                  provider: p,
                                  rejectionReason: "",
                                  submitting: false,
                                })
                              }
                              title="Reject"
                              className="flex h-8 w-8 items-center justify-center rounded-lg border border-rose-200 bg-white text-rose-600 hover:bg-rose-50"
                            >
                              <X size={15} />
                            </button>
                          </>
                        ) : (
                          /* If approved: Suspend / Toggle */
                          <button
                            type="button"
                            onClick={() =>
                              setToggleStatusModal({
                                isOpen: true,
                                provider: p,
                                reason: "",
                                submitting: false,
                              })
                            }
                            title="Suspend Provider"
                            className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-amber-700 hover:bg-amber-50"
                          >
                            <Ban size={13} />
                            Suspend
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <AdminPagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalProviders}
          pageSize={10}
          onPageChange={(page) => fetchProviders(page)}
        />
      </div>

      {/* MODAL: Provider Details */}
      <AdminModal
        isOpen={detailsModal.isOpen}
        onClose={() =>
          setDetailsModal({ isOpen: false, loading: false, data: null })
        }
        title="Provider Profile & History"
        subtitle={detailsModal.data?.provider?.businessName}
        maxWidth="max-w-2xl"
      >
        {detailsModal.loading ? (
          <div className="py-12 text-center text-slate-500">
            <div className="h-7 w-7 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600 mx-auto" />
            <p className="mt-3 text-xs">Loading provider details...</p>
          </div>
        ) : detailsModal.data ? (
          <div className="space-y-5">
            {/* Top Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="rounded-xl border border-slate-200 p-3 bg-slate-50/50">
                <p className="text-[11px] font-semibold text-slate-500 uppercase">
                  Published Services
                </p>
                <p className="mt-1 text-xl font-bold text-slate-900">
                  {detailsModal.data.servicesCount ?? 0}
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 p-3 bg-slate-50/50">
                <p className="text-[11px] font-semibold text-slate-500 uppercase">
                  Total Bookings
                </p>
                <p className="mt-1 text-xl font-bold text-slate-900">
                  {detailsModal.data.bookingsCount ?? 0}
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 p-3 bg-slate-50/50 col-span-2 sm:col-span-1">
                <p className="text-[11px] font-semibold text-slate-500 uppercase">
                  Status
                </p>
                <p className="mt-1 text-xs font-bold text-emerald-600">
                  {detailsModal.data.provider?.isApproved
                    ? "Approved Partner"
                    : "Pending Verification"}
                </p>
              </div>
            </div>

            {/* Business Info */}
            <div className="rounded-xl border border-slate-200 p-4 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Business Information
              </h4>
              <div className="grid sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-400">Business Name: </span>
                  <span className="font-semibold text-slate-800">
                    {detailsModal.data.provider?.businessName}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400">Category: </span>
                  <span className="font-semibold text-slate-800">
                    {detailsModal.data.provider?.businessCategory?.name || "N/A"}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400">Experience: </span>
                  <span className="font-semibold text-slate-800">
                    {detailsModal.data.provider?.experienceYears || 0} years
                  </span>
                </div>
                <div>
                  <span className="text-slate-400">Verified Identity: </span>
                  <span className="font-semibold text-slate-800">
                    {detailsModal.data.provider?.isVerified ? "Yes" : "No"}
                  </span>
                </div>
              </div>

              {detailsModal.data.provider?.bio && (
                <div className="pt-2 border-t border-slate-100">
                  <span className="text-slate-400 text-xs">Description: </span>
                  <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                    {detailsModal.data.provider.bio}
                  </p>
                </div>
              )}
            </div>

            {/* Linked User Account */}
            <div className="rounded-xl border border-slate-200 p-4 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Linked User Account
              </h4>
              <div className="grid sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-400">Username: </span>
                  <span className="font-semibold text-slate-800">
                    {detailsModal.data.provider?.user?.username}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400">Email: </span>
                  <span className="font-semibold text-slate-800">
                    {detailsModal.data.provider?.user?.email}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400">Phone: </span>
                  <span className="font-semibold text-slate-800">
                    {detailsModal.data.provider?.user?.phone || "Not provided"}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400">User Role: </span>
                  <span className="font-semibold capitalize text-slate-800">
                    {detailsModal.data.provider?.user?.role}
                  </span>
                </div>
              </div>
            </div>

            {/* Documents Submitted */}
            {detailsModal.data.provider?.documents &&
              detailsModal.data.provider.documents.length > 0 && (
                <div className="rounded-xl border border-slate-200 p-4 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Submitted Verification Documents (
                    {detailsModal.data.provider.documents.length})
                  </h4>
                  <div className="space-y-2">
                    {detailsModal.data.provider.documents.map((doc, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 p-2 text-xs"
                      >
                        <div className="flex items-center gap-2">
                          <FileText size={16} className="text-blue-600" />
                          <span className="font-semibold text-slate-700">
                            {doc.title || `Document #${idx + 1}`}
                          </span>
                        </div>
                        {doc.url && (
                          <a
                            href={doc.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:underline"
                          >
                            <span>View</span>
                            <ExternalLink size={12} />
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
          </div>
        ) : null}
      </AdminModal>

      {/* MODAL: Approve Provider */}
      <AdminModal
        isOpen={approveModal.isOpen}
        onClose={() =>
          setApproveModal({
            isOpen: false,
            provider: null,
            verifyIdentity: true,
            note: "",
            submitting: false,
          })
        }
        title="Approve Provider Application"
        subtitle={approveModal.provider?.businessName}
      >
        <div className="space-y-4">
          <p className="text-xs text-slate-600">
            Confirming will grant provider status to{" "}
            <strong>{approveModal.provider?.businessName}</strong>, notifying the partner and enabling service publishing.
          </p>

          <label className="flex items-center gap-2.5 rounded-xl border border-slate-200 p-3 hover:bg-slate-50 cursor-pointer">
            <input
              type="checkbox"
              checked={approveModal.verifyIdentity}
              onChange={(e) =>
                setApproveModal((prev) => ({
                  ...prev,
                  verifyIdentity: e.target.checked,
                }))
              }
              className="h-4 w-4 rounded border-slate-300 text-blue-600"
            />
            <span className="text-xs font-semibold text-slate-700">
              Verify identity documents and mark provider as Verified Partner
            </span>
          </label>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Internal Note / Remarks (Optional)
            </label>
            <textarea
              value={approveModal.note}
              onChange={(e) =>
                setApproveModal((prev) => ({ ...prev, note: e.target.value }))
              }
              rows={2}
              placeholder="e.g. KYC documents verified"
              className="w-full rounded-xl border border-slate-200 p-2.5 text-xs focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() =>
                setApproveModal({
                  isOpen: false,
                  provider: null,
                  verifyIdentity: true,
                  note: "",
                  submitting: false,
                })
              }
              className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirmApprove}
              disabled={approveModal.submitting}
              className="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-emerald-700 disabled:opacity-50"
            >
              {approveModal.submitting ? "Approving..." : "Confirm & Approve"}
            </button>
          </div>
        </div>
      </AdminModal>

      {/* MODAL: Reject Provider */}
      <AdminModal
        isOpen={rejectModal.isOpen}
        onClose={() =>
          setRejectModal({
            isOpen: false,
            provider: null,
            rejectionReason: "",
            submitting: false,
          })
        }
        title="Reject Provider Application"
        subtitle={rejectModal.provider?.businessName}
      >
        <div className="space-y-4">
          <p className="text-xs text-slate-600">
            State the official reason for rejecting{" "}
            <strong>{rejectModal.provider?.businessName}</strong>. This feedback will be sent directly to the applicant.
          </p>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Rejection Reason (Required) *
            </label>
            <textarea
              value={rejectModal.rejectionReason}
              onChange={(e) =>
                setRejectModal((prev) => ({
                  ...prev,
                  rejectionReason: e.target.value,
                }))
              }
              rows={3}
              placeholder="e.g. Expired ID proof or incomplete service credentials"
              className="w-full rounded-xl border border-slate-200 p-2.5 text-xs focus:border-rose-500 focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() =>
                setRejectModal({
                  isOpen: false,
                  provider: null,
                  rejectionReason: "",
                  submitting: false,
                })
              }
              className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirmReject}
              disabled={rejectModal.submitting}
              className="rounded-xl bg-rose-600 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-rose-700 disabled:opacity-50"
            >
              {rejectModal.submitting ? "Rejecting..." : "Confirm Rejection"}
            </button>
          </div>
        </div>
      </AdminModal>

      {/* MODAL: Toggle Status (Suspend / Reactivate) */}
      <AdminModal
        isOpen={toggleStatusModal.isOpen}
        onClose={() =>
          setToggleStatusModal({
            isOpen: false,
            provider: null,
            reason: "",
            submitting: false,
          })
        }
        title={
          toggleStatusModal.provider?.isApproved
            ? "Suspend Provider Account"
            : "Reactivate Provider Account"
        }
        subtitle={toggleStatusModal.provider?.businessName}
      >
        <div className="space-y-4">
          <p className="text-xs text-slate-600">
            {toggleStatusModal.provider?.isApproved
              ? "Suspending this provider will immediately deactivate all of their active services and halt new customer bookings."
              : "Reactivating this provider will restore their provider dashboard and allow services to be reactivated."}
          </p>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Administrative Reason (Optional)
            </label>
            <textarea
              value={toggleStatusModal.reason}
              onChange={(e) =>
                setToggleStatusModal((prev) => ({
                  ...prev,
                  reason: e.target.value,
                }))
              }
              rows={2}
              placeholder="e.g. Policy violation or requested pause"
              className="w-full rounded-xl border border-slate-200 p-2.5 text-xs focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() =>
                setToggleStatusModal({
                  isOpen: false,
                  provider: null,
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
              onClick={handleConfirmToggleStatus}
              disabled={toggleStatusModal.submitting}
              className="rounded-xl bg-amber-600 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-amber-700 disabled:opacity-50"
            >
              {toggleStatusModal.submitting
                ? "Updating..."
                : toggleStatusModal.provider?.isApproved
                ? "Confirm Suspension"
                : "Confirm Reactivation"}
            </button>
          </div>
        </div>
      </AdminModal>
    </div>
  );
};

export default AdminProvidersPage;

