import { useEffect, useState, useCallback } from "react";
import {
  Wrench,
  Search,
  RotateCcw,
  RefreshCw,
  Eye,
  Trash2,
  Power,
  ShieldCheck,
  AlertTriangle,
  Clock,
  Layers,
  IndianRupee,
  Sparkles,
} from "lucide-react";
import AdminPagination from "../../components/admin/AdminPagination";
import AdminModal from "../../components/admin/AdminModal";
import {
  getAllServicesAdmin,
  toggleServiceStatusAdmin,
  deleteServiceAdmin,
  getAllCategoriesAdmin,
} from "../../api/admin.api";
import toast from "react-hot-toast";

const AdminServicesPage = () => {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalServices, setTotalServices] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isActiveFilter, setIsActiveFilter] = useState("");
  const [serviceTypeFilter, setServiceTypeFilter] = useState("");

  // Modals state
  const [detailsModal, setDetailsModal] = useState({
    isOpen: false,
    service: null,
  });

  const [toggleModal, setToggleModal] = useState({
    isOpen: false,
    service: null,
    reason: "",
    submitting: false,
  });

  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    service: null,
    reason: "",
    submitting: false,
  });

  // Load categories
  useEffect(() => {
    const fetchCats = async () => {
      try {
        const res = await getAllCategoriesAdmin({ limit: 100 });
        setCategories(res?.data?.categories || []);
      } catch (err) {
        console.error("Failed to load categories for services filter", err);
      }
    };
    fetchCats();
  }, []);

  const fetchServices = useCallback(async (page = 1) => {
    try {
      setLoading(true);
      const res = await getAllServicesAdmin({
        page,
        limit: 10,
        search: searchQuery,
        category: selectedCategory,
        isActive: isActiveFilter,
        serviceType: serviceTypeFilter,
      });

      const data = res?.data || {};
      setServices(data.services || []);
      setCurrentPage(data.currentPage || page);
      setTotalPages(data.totalPages || 1);
      setTotalServices(data.totalServices || 0);
    } catch (err) {
      console.error("Failed to load services:", err);
      toast.error(err?.message || "Failed to load services catalog");
    } finally {
      setLoading(false);
    }
  }, [searchQuery, selectedCategory, isActiveFilter, serviceTypeFilter]);

  useEffect(() => {
    fetchServices(1);
  }, [fetchServices]);

  const handleConfirmToggle = async () => {
    if (!toggleModal.service) return;
    try {
      setToggleModal((prev) => ({ ...prev, submitting: true }));
      await toggleServiceStatusAdmin(toggleModal.service._id, {
        reason: toggleModal.reason,
      });
      toast.success(
        `Service status updated for "${toggleModal.service.title}"`
      );
      setToggleModal({
        isOpen: false,
        service: null,
        reason: "",
        submitting: false,
      });
      fetchServices(currentPage);
    } catch (err) {
      toast.error(err?.message || "Action failed");
      setToggleModal((prev) => ({ ...prev, submitting: false }));
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteModal.service) return;
    try {
      setDeleteModal((prev) => ({ ...prev, submitting: true }));
      await deleteServiceAdmin(deleteModal.service._id, {
        reason: deleteModal.reason,
      });
      toast.success(`Service "${deleteModal.service.title}" deleted.`);
      setDeleteModal({
        isOpen: false,
        service: null,
        reason: "",
        submitting: false,
      });
      fetchServices(currentPage);
    } catch (err) {
      toast.error(err?.message || "Delete failed");
      setDeleteModal((prev) => ({ ...prev, submitting: false }));
    }
  };

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setIsActiveFilter("");
    setServiceTypeFilter("");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
            Offerings & Listings
          </span>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Service Catalog
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Monitor, deactivate, or moderate all services offered across providers on the marketplace.
          </p>
        </div>

        <button
          type="button"
          onClick={() => fetchServices(currentPage)}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 self-start sm:self-auto"
        >
          <RefreshCw size={14} className={loading ? "animate-spin text-blue-600" : ""} />
          Refresh
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs sm:grid-cols-2 lg:grid-cols-5">
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
            placeholder="Search service title..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2 pl-9 pr-3 text-xs focus:border-blue-500 focus:bg-white focus:outline-none"
          />
        </div>

        {/* Category */}
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

        {/* Status */}
        <select
          value={isActiveFilter}
          onChange={(e) => setIsActiveFilter(e.target.value)}
          className="rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs text-slate-700 focus:border-blue-500 focus:bg-white focus:outline-none"
        >
          <option value="">All Statuses</option>
          <option value="true">Active Only</option>
          <option value="false">Inactive Only</option>
        </select>

        {/* Service Type */}
        <select
          value={serviceTypeFilter}
          onChange={(e) => setServiceTypeFilter(e.target.value)}
          className="rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs text-slate-700 focus:border-blue-500 focus:bg-white focus:outline-none"
        >
          <option value="">All Service Types</option>
          <option value="online">Online / Virtual</option>
          <option value="offline">In-Person / Onsite</option>
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

      {/* Services Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/75 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <th className="px-5 py-3.5">Service Details</th>
                <th className="px-4 py-3.5">Provider</th>
                <th className="px-4 py-3.5">Category</th>
                <th className="px-4 py-3.5">Pricing</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center">
                      <div className="h-7 w-7 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600" />
                      <p className="mt-3 text-xs font-semibold">Loading services catalog...</p>
                    </div>
                  </td>
                </tr>
              ) : services.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500">
                    <Wrench size={28} className="mx-auto mb-2 text-slate-400" />
                    No services found matching the active filters.
                  </td>
                </tr>
              ) : (
                services.map((s) => {
                  const thumbnail =
                    s.images?.[0] || s.thumbnail || s.coverImage || null;

                  return (
                    <tr key={s._id} className="hover:bg-slate-50/80 transition">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 overflow-hidden text-slate-400">
                            {thumbnail ? (
                              <img
                                src={thumbnail}
                                alt={s.title}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <Layers size={18} />
                            )}
                          </div>
                          <div className="min-w-0 max-w-xs">
                            <p className="font-bold text-slate-900 truncate">
                              {s.title}
                            </p>
                            <p className="text-[11px] text-slate-500 line-clamp-1">
                              {s.description || "No description provided"}
                            </p>
                            {s.serviceType && (
                              <span className="mt-1 inline-block text-[10px] uppercase font-semibold text-blue-600 tracking-wider">
                                {s.serviceType}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-4 text-slate-700">
                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold truncate">
                            {s.provider?.businessName || "Unknown"}
                          </span>
                          {s.provider?.isVerified && (
                            <ShieldCheck size={14} className="text-blue-600 shrink-0" />
                          )}
                        </div>
                      </td>

                      <td className="px-4 py-4">
                        <span className="inline-flex items-center rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-700">
                          {s.category?.name || "Uncategorized"}
                        </span>
                      </td>

                      <td className="px-4 py-4">
                        <p className="font-bold text-slate-900">
                          ₹{s.price || 0}
                        </p>
                        {s.duration && (
                          <p className="text-[11px] text-slate-400">
                            {s.duration} mins
                          </p>
                        )}
                      </td>

                      <td className="px-4 py-4">
                        {s.isActive ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700">
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-500">
                            Inactive
                          </span>
                        )}
                      </td>

                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Details */}
                          <button
                            type="button"
                            onClick={() =>
                              setDetailsModal({ isOpen: true, service: s })
                            }
                            title="View Details"
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                          >
                            <Eye size={15} />
                          </button>

                          {/* Toggle Active / Inactive */}
                          <button
                            type="button"
                            onClick={() =>
                              setToggleModal({
                                isOpen: true,
                                service: s,
                                reason: "",
                                submitting: false,
                              })
                            }
                            title={s.isActive ? "Deactivate" : "Activate"}
                            className={`flex h-8 w-8 items-center justify-center rounded-lg border ${
                              s.isActive
                                ? "border-amber-200 bg-white text-amber-700 hover:bg-amber-50"
                                : "border-emerald-200 bg-white text-emerald-700 hover:bg-emerald-50"
                            }`}
                          >
                            <Power size={14} />
                          </button>

                          {/* Delete */}
                          <button
                            type="button"
                            onClick={() =>
                              setDeleteModal({
                                isOpen: true,
                                service: s,
                                reason: "",
                                submitting: false,
                              })
                            }
                            title="Delete Service"
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-rose-200 bg-white text-rose-600 hover:bg-rose-50"
                          >
                            <Trash2 size={15} />
                          </button>
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
          totalItems={totalServices}
          pageSize={10}
          onPageChange={(page) => fetchServices(page)}
        />
      </div>

      {/* MODAL: Service Details */}
      <AdminModal
        isOpen={detailsModal.isOpen}
        onClose={() => setDetailsModal({ isOpen: false, service: null })}
        title="Service Details"
        subtitle={detailsModal.service?.title}
        maxWidth="max-w-2xl"
      >
        {detailsModal.service && (
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50/50 p-4">
              <div>
                <h4 className="text-base font-bold text-slate-900">
                  {detailsModal.service.title}
                </h4>
                <p className="text-xs text-slate-500">
                  Provider: {detailsModal.service.provider?.businessName}
                </p>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-slate-900">
                  ₹{detailsModal.service.price || 0}
                </span>
                <p className="text-[11px] text-slate-500">
                  Duration: {detailsModal.service.duration || "N/A"} mins
                </p>
              </div>
            </div>

            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                Description
              </h5>
              <p className="text-xs text-slate-700 leading-relaxed rounded-xl border border-slate-200 p-3 bg-white">
                {detailsModal.service.description || "No description provided."}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-xl border border-slate-200 p-3">
                <span className="text-slate-400">Category: </span>
                <strong className="text-slate-800">
                  {detailsModal.service.category?.name || "N/A"}
                </strong>
              </div>
              <div className="rounded-xl border border-slate-200 p-3">
                <span className="text-slate-400">Status: </span>
                <strong
                  className={
                    detailsModal.service.isActive
                      ? "text-emerald-600"
                      : "text-slate-600"
                  }
                >
                  {detailsModal.service.isActive ? "Active Listing" : "Inactive Listing"}
                </strong>
              </div>
            </div>

            {/* Gallery Images if any */}
            {detailsModal.service.images && detailsModal.service.images.length > 0 && (
              <div>
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Service Media ({detailsModal.service.images.length})
                </h5>
                <div className="grid grid-cols-3 gap-2">
                  {detailsModal.service.images.map((imgUrl, i) => (
                    <img
                      key={i}
                      src={imgUrl}
                      alt=""
                      className="h-24 w-full rounded-xl object-cover border border-slate-200"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </AdminModal>

      {/* MODAL: Toggle Active/Inactive */}
      <AdminModal
        isOpen={toggleModal.isOpen}
        onClose={() =>
          setToggleModal({
            isOpen: false,
            service: null,
            reason: "",
            submitting: false,
          })
        }
        title={
          toggleModal.service?.isActive
            ? "Deactivate Service Listing"
            : "Activate Service Listing"
        }
        subtitle={toggleModal.service?.title}
      >
        <div className="space-y-4">
          <p className="text-xs text-slate-600">
            {toggleModal.service?.isActive
              ? "Deactivating this service will hide it from customer search results and block new bookings immediately."
              : "Activating this service will publish it live on the marketplace catalog."}
          </p>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Administrative Reason (Optional)
            </label>
            <textarea
              value={toggleModal.reason}
              onChange={(e) =>
                setToggleModal((prev) => ({ ...prev, reason: e.target.value }))
              }
              rows={2}
              placeholder="e.g. Quality check or pricing review"
              className="w-full rounded-xl border border-slate-200 p-2.5 text-xs focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() =>
                setToggleModal({
                  isOpen: false,
                  service: null,
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
              onClick={handleConfirmToggle}
              disabled={toggleModal.submitting}
              className={`rounded-xl px-4 py-2 text-xs font-semibold text-white shadow-xs disabled:opacity-50 ${
                toggleModal.service?.isActive
                  ? "bg-amber-600 hover:bg-amber-700"
                  : "bg-emerald-600 hover:bg-emerald-700"
              }`}
            >
              {toggleModal.submitting
                ? "Updating..."
                : toggleModal.service?.isActive
                ? "Confirm Deactivation"
                : "Confirm Activation"}
            </button>
          </div>
        </div>
      </AdminModal>

      {/* MODAL: Delete Service */}
      <AdminModal
        isOpen={deleteModal.isOpen}
        onClose={() =>
          setDeleteModal({
            isOpen: false,
            service: null,
            reason: "",
            submitting: false,
          })
        }
        title="Permanently Delete Service"
        subtitle={deleteModal.service?.title}
      >
        <div className="space-y-4">
          <div className="flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50/50 p-3">
            <AlertTriangle size={20} className="text-rose-600 shrink-0 mt-0.5" />
            <p className="text-xs text-rose-700 leading-relaxed">
              <strong>Warning:</strong> Deleting this service will permanently remove it from the platform and decrement the associated category count. This action cannot be undone.
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
              placeholder="e.g. Duplicate listing or terms violation"
              className="w-full rounded-xl border border-slate-200 p-2.5 text-xs focus:border-rose-500 focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() =>
                setDeleteModal({
                  isOpen: false,
                  service: null,
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

export default AdminServicesPage;

