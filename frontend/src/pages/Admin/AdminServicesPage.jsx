import { useEffect, useState, useCallback, useMemo } from "react";
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
  Layers,
  Grid,
  List,
  CheckCircle2,
  XCircle,
  X,
  Clock,
  Calendar,
  Building2,
  Globe,
  MapPin,
  Check,
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
  // Data state
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalServices, setTotalServices] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // View mode: "grid" | "table"
  const [viewMode, setViewMode] = useState("table");

  // Filters & Search
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isActiveFilter, setIsActiveFilter] = useState("");
  const [serviceTypeFilter, setServiceTypeFilter] = useState("");

  // Debounce search input by 300ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(searchInput);
      setCurrentPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchInput]);

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

  // Track inline toggling ID
  const [togglingId, setTogglingId] = useState(null);

  // Load categories for filter
  useEffect(() => {
    let active = true;
    const fetchCats = async () => {
      try {
        const res = await getAllCategoriesAdmin({ limit: 100 });
        if (!active) return;
        const list = res?.data?.categories || (Array.isArray(res?.data) ? res.data : []);
        setCategories(list);
      } catch (err) {
        if (!active) return;
        console.error("Failed to load categories for services filter", err);
      }
    };
    fetchCats();
    return () => {
      active = false;
    };
  }, []);

  // Fetch services from backend
  const fetchServices = useCallback(
    async (page = currentPage) => {
      try {
        setLoading(true);
        const res = await getAllServicesAdmin({
          page,
          limit: pageSize,
          search: searchQuery,
          category: selectedCategory,
          isActive: isActiveFilter,
          serviceType: serviceTypeFilter,
        });

        const data = res?.data || {};
        const list = Array.isArray(data.services)
          ? data.services
          : Array.isArray(data)
          ? data
          : [];

        setServices(list);
        setCurrentPage(data.currentPage || page);
        setTotalPages(data.totalPages || 1);
        setTotalServices(data.totalServices || list.length);
      } catch (err) {
        console.error("Failed to load services:", err);
        toast.error(err?.message || "Failed to load services catalog");
      } finally {
        setLoading(false);
      }
    },
    [currentPage, pageSize, searchQuery, selectedCategory, isActiveFilter, serviceTypeFilter]
  );

  // Async effect to avoid synchronous setState inside effect
  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      await Promise.resolve();
      if (!isMounted) return;
      fetchServices(currentPage);
    };
    load();
    return () => {
      isMounted = false;
    };
  }, [fetchServices, currentPage]);

  // Compute stats overview
  const stats = useMemo(() => {
    const activeCount = services.filter((s) => s.isActive).length;
    const inactiveCount = services.filter((s) => !s.isActive).length;
    return {
      total: totalServices,
      active: activeCount,
      inactive: inactiveCount,
    };
  }, [services, totalServices]);

  // 1-Click Fast Inline Status Toggle
  const handleInlineToggleStatus = async (service, e) => {
    if (e) e.stopPropagation();
    try {
      setTogglingId(service._id);
      const nextStatus = !service.isActive;

      // Optimistic update
      setServices((prev) =>
        prev.map((s) => (s._id === service._id ? { ...s, isActive: nextStatus } : s))
      );

      await toggleServiceStatusAdmin(service._id, {
        reason: "Quick toggle via admin console",
      });

      toast.success(
        `Service "${service.title}" is now ${nextStatus ? "Active" : "Inactive"}`
      );
    } catch (err) {
      // Rollback
      setServices((prev) =>
        prev.map((s) => (s._id === service._id ? { ...s, isActive: service.isActive } : s))
      );
      toast.error(err?.message || "Failed to toggle service status");
    } finally {
      setTogglingId(null);
    }
  };

  // Confirm modal toggle (with reason)
  const handleConfirmToggle = async () => {
    if (!toggleModal.service) return;
    try {
      setToggleModal((prev) => ({ ...prev, submitting: true }));
      await toggleServiceStatusAdmin(toggleModal.service._id, {
        reason: toggleModal.reason?.trim() || "",
      });

      toast.success(
        `Service "${toggleModal.service.title}" status successfully updated.`
      );

      // If details modal was open, update it
      if (detailsModal.service?._id === toggleModal.service._id) {
        setDetailsModal((prev) => ({
          ...prev,
          service: {
            ...prev.service,
            isActive: !prev.service.isActive,
          },
        }));
      }

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

  // Confirm delete service
  const handleConfirmDelete = async () => {
    if (!deleteModal.service) return;
    try {
      setDeleteModal((prev) => ({ ...prev, submitting: true }));
      await deleteServiceAdmin(deleteModal.service._id, {
        reason: deleteModal.reason?.trim() || "",
      });

      toast.success(`Service "${deleteModal.service.title}" deleted.`);

      // If details modal was open, close it
      if (detailsModal.service?._id === deleteModal.service._id) {
        setDetailsModal({ isOpen: false, service: null });
      }

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

  // Reset Filters
  const resetFilters = () => {
    setSearchInput("");
    setSearchQuery("");
    setSelectedCategory("");
    setIsActiveFilter("");
    setServiceTypeFilter("");
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6">
      {/* 1. Header & Actions */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
            Marketplace Catalog & Offerings
          </span>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Service Management
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Audit, moderate, deactivate, and inspect all provider service offerings across the platform.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 self-start sm:self-auto">
          {/* View mode toggle */}
          <div className="flex items-center rounded-xl border border-slate-200 bg-white p-1 shadow-2xs">
            <button
              type="button"
              onClick={() => setViewMode("table")}
              title="Table View"
              className={`rounded-lg p-1.5 transition ${
                viewMode === "table"
                  ? "bg-blue-600 text-white"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              <List size={15} />
            </button>
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              title="Card Grid View"
              className={`rounded-lg p-1.5 transition ${
                viewMode === "grid"
                  ? "bg-blue-600 text-white"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              <Grid size={15} />
            </button>
          </div>

          {/* Refresh */}
          <button
            type="button"
            onClick={() => fetchServices(currentPage)}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50"
          >
            <RefreshCw size={14} className={loading ? "animate-spin text-blue-600" : ""} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* 2. Quick Stat Counters */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-3.5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Total Services</span>
            <Wrench size={16} className="text-blue-500" />
          </div>
          <p className="mt-2 text-xl font-bold text-slate-900">{stats.total}</p>
        </div>

        <div
          onClick={() => {
            setIsActiveFilter("true");
            setCurrentPage(1);
          }}
          className={`cursor-pointer rounded-2xl border p-3.5 shadow-2xs transition ${
            isActiveFilter === "true"
              ? "border-emerald-500 bg-emerald-50/50"
              : "border-slate-200 bg-white hover:border-slate-300"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Active (Live)</span>
            <CheckCircle2 size={16} className="text-emerald-500" />
          </div>
          <p className="mt-2 text-xl font-bold text-emerald-600">{stats.active}</p>
        </div>

        <div
          onClick={() => {
            setIsActiveFilter("false");
            setCurrentPage(1);
          }}
          className={`cursor-pointer rounded-2xl border p-3.5 shadow-2xs transition ${
            isActiveFilter === "false"
              ? "border-amber-500 bg-amber-50/50"
              : "border-slate-200 bg-white hover:border-slate-300"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Inactive (Suspended)</span>
            <XCircle size={16} className="text-amber-500" />
          </div>
          <p className="mt-2 text-xl font-bold text-amber-600">{stats.inactive}</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-3.5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Categories Linked</span>
            <Layers size={16} className="text-indigo-500" />
          </div>
          <p className="mt-2 text-xl font-bold text-slate-900">{categories.length}</p>
        </div>
      </div>

      {/* 3. Filter Toolbar */}
      <div className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs sm:grid-cols-2 lg:grid-cols-12">
        {/* Search */}
        <div className="relative sm:col-span-2 lg:col-span-4">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search service title..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2 pl-9 pr-8 text-xs focus:border-blue-500 focus:bg-white focus:outline-none"
          />
          {searchInput && (
            <button
              type="button"
              onClick={() => setSearchInput("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Category */}
        <div className="lg:col-span-2">
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs text-slate-700 focus:border-blue-500 focus:bg-white focus:outline-none"
          >
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Status */}
        <div className="lg:col-span-2">
          <select
            value={isActiveFilter}
            onChange={(e) => {
              setIsActiveFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs text-slate-700 focus:border-blue-500 focus:bg-white focus:outline-none"
          >
            <option value="">All Statuses</option>
            <option value="true">Active Listings Only</option>
            <option value="false">Inactive Listings Only</option>
          </select>
        </div>

        {/* Service Type */}
        <div className="lg:col-span-2">
          <select
            value={serviceTypeFilter}
            onChange={(e) => {
              setServiceTypeFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs text-slate-700 focus:border-blue-500 focus:bg-white focus:outline-none"
          >
            <option value="">All Formats</option>
            <option value="online">Online / Virtual</option>
            <option value="offline">In-Person / Onsite</option>
          </select>
        </div>

        {/* Page Size */}
        <div className="lg:col-span-1">
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-2.5 py-2 text-xs text-slate-700 focus:border-blue-500 focus:bg-white focus:outline-none"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>

        {/* Reset */}
        <div className="lg:col-span-1">
          <button
            type="button"
            onClick={resetFilters}
            title="Reset Filters"
            className="flex h-full w-full items-center justify-center gap-1 rounded-xl border border-slate-200 bg-white py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
          >
            <RotateCcw size={13} />
            <span className="lg:hidden">Reset</span>
          </button>
        </div>
      </div>

      {/* 4. Service Display (Table or Grid) */}
      {loading ? (
        <div className="py-20 text-center text-slate-500">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600" />
          <p className="mt-3 text-xs font-semibold text-slate-600">
            Loading service catalog...
          </p>
        </div>
      ) : services.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-14 text-center text-slate-500">
          <Wrench size={36} className="mx-auto mb-2 text-slate-300" />
          <p className="text-sm font-bold text-slate-800">No services found</p>
          <p className="mt-1 text-xs text-slate-400">
            {searchQuery || selectedCategory || isActiveFilter || serviceTypeFilter
              ? "Try adjusting your search criteria or clear active filters."
              : "No services are currently registered on the marketplace."}
          </p>
          {(searchQuery || selectedCategory || isActiveFilter || serviceTypeFilter) && (
            <button
              type="button"
              onClick={resetFilters}
              className="mt-4 inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              <RotateCcw size={13} />
              Clear All Filters
            </button>
          )}
        </div>
      ) : viewMode === "table" ? (
        /* TABLE VIEW */
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/75 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  <th className="px-5 py-3.5">Service Details</th>
                  <th className="px-4 py-3.5">Provider</th>
                  <th className="px-4 py-3.5">Category</th>
                  <th className="px-4 py-3.5">Pricing & Duration</th>
                  <th className="px-4 py-3.5">Status</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                {services.map((s) => {
                  const thumbnail =
                    s.images?.[0] || s.thumbnail || s.coverImage || null;

                  return (
                    <tr
                      key={s._id}
                      onClick={() => setDetailsModal({ isOpen: true, service: s })}
                      className="cursor-pointer hover:bg-slate-50/80 transition"
                    >
                      {/* Service Title & Media */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 overflow-hidden text-slate-400 border border-slate-200">
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
                              <span className="mt-1 inline-flex items-center gap-1 text-[10px] uppercase font-semibold text-blue-600 tracking-wider">
                                {s.serviceType === "online" ? (
                                  <Globe size={10} />
                                ) : (
                                  <MapPin size={10} />
                                )}
                                <span>{s.serviceType}</span>
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Provider */}
                      <td className="px-4 py-4 text-slate-700">
                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold truncate">
                            {s.provider?.businessName || "Unknown Provider"}
                          </span>
                          {s.provider?.isVerified && (
                            <ShieldCheck
                              size={14}
                              className="text-blue-600 shrink-0"
                              title="Verified Partner"
                            />
                          )}
                        </div>
                        {s.provider?.isApproved && (
                          <span className="text-[10px] text-emerald-600 font-medium">
                            Approved Partner
                          </span>
                        )}
                      </td>

                      {/* Category */}
                      <td className="px-4 py-4">
                        <span className="inline-flex items-center rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-700">
                          {s.category?.name || "Uncategorized"}
                        </span>
                        {s.category?.slug && (
                          <p className="mt-0.5 text-[10px] font-mono text-slate-400 truncate">
                            /{s.category.slug}
                          </p>
                        )}
                      </td>

                      {/* Pricing & Duration */}
                      <td className="px-4 py-4">
                        <p className="font-bold text-slate-900">
                          ₹{s.price || 0}
                        </p>
                        {s.duration && (
                          <p className="text-[11px] text-slate-400 flex items-center gap-1">
                            <Clock size={11} />
                            <span>{s.duration} mins</span>
                          </p>
                        )}
                      </td>

                      {/* Status Toggle Switch */}
                      <td className="px-4 py-4" onClick={(e) => e.stopPropagation()}>
                        <button
                          type="button"
                          onClick={(e) => handleInlineToggleStatus(s, e)}
                          disabled={togglingId === s._id}
                          title={s.isActive ? "Click to Deactivate" : "Click to Activate"}
                          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold shadow-2xs transition ${
                            s.isActive
                              ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                          }`}
                        >
                          {togglingId === s._id ? (
                            <RefreshCw size={11} className="animate-spin" />
                          ) : s.isActive ? (
                            <Check size={11} />
                          ) : (
                            <X size={11} />
                          )}
                          <span>{s.isActive ? "Active" : "Inactive"}</span>
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Inspect Modal */}
                          <button
                            type="button"
                            onClick={() =>
                              setDetailsModal({ isOpen: true, service: s })
                            }
                            title="Inspect Details"
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                          >
                            <Eye size={14} />
                          </button>

                          {/* Toggle with Reason Modal */}
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
                            title={s.isActive ? "Deactivate Listing" : "Activate Listing"}
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
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* GRID VIEW */
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((s) => {
            const thumbnail =
              s.images?.[0] || s.thumbnail || s.coverImage || null;

            return (
              <div
                key={s._id}
                onClick={() => setDetailsModal({ isOpen: true, service: s })}
                className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-4 shadow-2xs transition hover:border-slate-300 hover:shadow-xs cursor-pointer"
              >
                <div>
                  {/* Image Cover */}
                  <div className="relative mb-3.5 h-36 w-full overflow-hidden rounded-xl bg-slate-100 border border-slate-100">
                    {thumbnail ? (
                      <img
                        src={thumbnail}
                        alt={s.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-slate-300">
                        <Wrench size={32} />
                      </div>
                    )}

                    {/* Format Badge Top Left */}
                    {s.serviceType && (
                      <span className="absolute left-2.5 top-2.5 inline-flex items-center gap-1 rounded-full bg-slate-900/80 px-2 py-0.5 text-[10px] font-semibold text-white backdrop-blur-xs">
                        {s.serviceType === "online" ? <Globe size={10} /> : <MapPin size={10} />}
                        <span>{s.serviceType}</span>
                      </span>
                    )}

                    {/* Status Switch Top Right */}
                    <button
                      type="button"
                      onClick={(e) => handleInlineToggleStatus(s, e)}
                      disabled={togglingId === s._id}
                      title={s.isActive ? "Click to Deactivate" : "Click to Activate"}
                      className={`absolute right-2.5 top-2.5 inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold shadow-xs backdrop-blur-xs transition ${
                        s.isActive
                          ? "bg-emerald-500/95 text-white hover:bg-emerald-600"
                          : "bg-slate-900/80 text-slate-200 hover:bg-slate-900"
                      }`}
                    >
                      {togglingId === s._id ? (
                        <RefreshCw size={10} className="animate-spin" />
                      ) : s.isActive ? (
                        <Check size={10} />
                      ) : (
                        <X size={10} />
                      )}
                      <span>{s.isActive ? "Active" : "Inactive"}</span>
                    </button>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-1">
                    <h3 className="truncate text-sm font-bold text-slate-900 group-hover:text-blue-600 transition">
                      {s.title}
                    </h3>

                    <p className="line-clamp-2 min-h-[32px] text-xs text-slate-500">
                      {s.description || "No description provided."}
                    </p>
                  </div>

                  {/* Provider & Category */}
                  <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-50 pt-2.5">
                    <span className="truncate max-w-[120px] font-medium text-slate-700">
                      {s.provider?.businessName || "Unknown"}
                    </span>
                    <span className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold text-slate-600">
                      {s.category?.name || "General"}
                    </span>
                  </div>
                </div>

                {/* Footer Pricing & Actions */}
                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                  <div>
                    <span className="text-base font-bold text-slate-900">
                      ₹{s.price || 0}
                    </span>
                    {s.duration && (
                      <span className="text-[10px] text-slate-400 ml-1">
                        / {s.duration}m
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                    <button
                      type="button"
                      onClick={() => setDetailsModal({ isOpen: true, service: s })}
                      title="Inspect Service"
                      className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                    >
                      <Eye size={13} />
                    </button>
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
                      title="Toggle Status"
                      className={`flex h-7 w-7 items-center justify-center rounded-lg border ${
                        s.isActive
                          ? "border-amber-200 bg-white text-amber-700 hover:bg-amber-50"
                          : "border-emerald-200 bg-white text-emerald-700 hover:bg-emerald-50"
                      }`}
                    >
                      <Power size={13} />
                    </button>
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
                      className="flex h-7 w-7 items-center justify-center rounded-lg border border-rose-200 bg-white text-rose-600 hover:bg-rose-50"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 5. Pagination */}
      <AdminPagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalServices}
        pageSize={pageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />

      {/* ============================================================ */}
      {/* MODAL: SERVICE DOSSIER / DETAILS                             */}
      {/* ============================================================ */}
      <AdminModal
        isOpen={detailsModal.isOpen}
        onClose={() => setDetailsModal({ isOpen: false, service: null })}
        title={detailsModal.service?.title || "Service Details"}
        subtitle={`Service ID: ${detailsModal.service?._id || "—"}`}
        maxWidth="max-w-2xl"
      >
        {detailsModal.service && (
          <div className="space-y-4">
            {/* Top Overview Banner */}
            <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-slate-50/70 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h4 className="text-base font-bold text-slate-900">
                  {detailsModal.service.title}
                </h4>
                <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                  <span className="inline-flex items-center gap-1 font-medium text-slate-700">
                    <Building2 size={12} className="text-blue-600" />
                    {detailsModal.service.provider?.businessName || "Unknown Partner"}
                  </span>
                  {detailsModal.service.provider?.isVerified && (
                    <span className="inline-flex items-center gap-0.5 rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700">
                      <ShieldCheck size={11} /> Verified
                    </span>
                  )}
                </div>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-xl font-bold text-slate-900">
                  ₹{detailsModal.service.price || 0}
                </span>
                <p className="text-[11px] text-slate-500 flex items-center sm:justify-end gap-1">
                  <Clock size={11} />
                  <span>Duration: {detailsModal.service.duration || "N/A"} minutes</span>
                </p>
              </div>
            </div>

            {/* Description */}
            <div>
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Service Description
              </span>
              <p className="mt-1 rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-700 leading-relaxed">
                {detailsModal.service.description || "No detailed description provided."}
              </p>
            </div>

            {/* Metadata Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs sm:grid-cols-3">
              <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-3">
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                  Category
                </span>
                <p className="mt-1 font-bold text-slate-800">
                  {detailsModal.service.category?.name || "Uncategorized"}
                </p>
                {detailsModal.service.category?.slug && (
                  <p className="text-[10px] font-mono text-slate-400">
                    /{detailsModal.service.category.slug}
                  </p>
                )}
              </div>

              <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-3">
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                  Service Format
                </span>
                <p className="mt-1 font-bold text-slate-800 uppercase">
                  {detailsModal.service.serviceType || "In-Person"}
                </p>
              </div>

              <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-3 col-span-2 sm:col-span-1">
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                  Publishing Status
                </span>
                <p
                  className={`mt-1 font-bold ${
                    detailsModal.service.isActive ? "text-emerald-600" : "text-amber-600"
                  }`}
                >
                  {detailsModal.service.isActive ? "Active Listing" : "Inactive (Hidden)"}
                </p>
              </div>
            </div>

            {/* Media Gallery */}
            {detailsModal.service.images && detailsModal.service.images.length > 0 && (
              <div>
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  Service Media ({detailsModal.service.images.length})
                </span>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {detailsModal.service.images.map((imgUrl, i) => (
                    <div
                      key={i}
                      className="relative h-24 overflow-hidden rounded-xl border border-slate-200 bg-slate-100"
                    >
                      <img
                        src={imgUrl}
                        alt=""
                        className="h-full w-full object-cover hover:scale-105 transition"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Timestamps */}
            <div className="flex flex-wrap items-center justify-between border-t border-slate-100 pt-3 text-[11px] text-slate-400">
              <span className="inline-flex items-center gap-1">
                <Calendar size={12} />
                Created:{" "}
                {detailsModal.service.createdAt
                  ? new Date(detailsModal.service.createdAt).toLocaleDateString()
                  : "—"}
              </span>
              <span>
                Updated:{" "}
                {detailsModal.service.updatedAt
                  ? new Date(detailsModal.service.updatedAt).toLocaleDateString()
                  : "—"}
              </span>
            </div>

            {/* Footer Actions */}
            <div className="flex justify-end gap-2 border-t border-slate-100 pt-3">
              <button
                type="button"
                onClick={() => {
                  const s = detailsModal.service;
                  setToggleModal({
                    isOpen: true,
                    service: s,
                    reason: "",
                    submitting: false,
                  });
                }}
                className={`inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-semibold ${
                  detailsModal.service.isActive
                    ? "border-amber-200 bg-white text-amber-700 hover:bg-amber-50"
                    : "border-emerald-200 bg-white text-emerald-700 hover:bg-emerald-50"
                }`}
              >
                <Power size={13} />
                {detailsModal.service.isActive ? "Deactivate Service" : "Activate Service"}
              </button>

              <button
                type="button"
                onClick={() => {
                  const s = detailsModal.service;
                  setDeleteModal({
                    isOpen: true,
                    service: s,
                    reason: "",
                    submitting: false,
                  });
                }}
                className="inline-flex items-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-2 text-xs font-semibold text-rose-700 hover:bg-rose-100"
              >
                <Trash2 size={13} />
                Delete Service
              </button>
            </div>
          </div>
        )}
      </AdminModal>

      {/* ============================================================ */}
      {/* MODAL: TOGGLE STATUS (WITH REASON)                          */}
      {/* ============================================================ */}
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
          <p className="text-xs text-slate-600 leading-relaxed">
            {toggleModal.service?.isActive
              ? "Deactivating this service will immediately hide it from customer searches and block new reservations. Existing completed bookings will remain intact."
              : "Activating this service will publish it live on the marketplace catalog for customers to discover and book."}
          </p>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Administrative Reason (Recommended)
            </label>
            <textarea
              value={toggleModal.reason}
              onChange={(e) =>
                setToggleModal((prev) => ({ ...prev, reason: e.target.value }))
              }
              rows={2}
              placeholder="e.g. Quality check, pricing review, partner request"
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
              className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold text-white shadow-xs disabled:opacity-50 ${
                toggleModal.service?.isActive
                  ? "bg-amber-600 hover:bg-amber-700"
                  : "bg-emerald-600 hover:bg-emerald-700"
              }`}
            >
              {toggleModal.submitting && <RefreshCw size={12} className="animate-spin" />}
              <span>
                {toggleModal.submitting
                  ? "Updating..."
                  : toggleModal.service?.isActive
                  ? "Confirm Deactivation"
                  : "Confirm Activation"}
              </span>
            </button>
          </div>
        </div>
      </AdminModal>

      {/* ============================================================ */}
      {/* MODAL: DELETE SERVICE (WITH REASON)                          */}
      {/* ============================================================ */}
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
          <div className="flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50/60 p-3.5">
            <AlertTriangle size={18} className="text-rose-600 shrink-0 mt-0.5" />
            <p className="text-xs text-rose-700 leading-relaxed">
              <strong>Caution:</strong> Deleting this service will permanently remove it from the platform, clear related cache entries, and decrement the category count. This action cannot be undone.
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Audit Deletion Reason (Recommended)
            </label>
            <textarea
              value={deleteModal.reason}
              onChange={(e) =>
                setDeleteModal((prev) => ({ ...prev, reason: e.target.value }))
              }
              rows={2}
              placeholder="e.g. Terms violation, obsolete offering, duplicate entry"
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
              className="inline-flex items-center gap-1.5 rounded-xl bg-rose-600 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-rose-700 disabled:opacity-50"
            >
              {deleteModal.submitting && <RefreshCw size={12} className="animate-spin" />}
              <span>
                {deleteModal.submitting ? "Deleting..." : "Permanently Delete"}
              </span>
            </button>
          </div>
        </div>
      </AdminModal>
    </div>
  );
};

export default AdminServicesPage;
