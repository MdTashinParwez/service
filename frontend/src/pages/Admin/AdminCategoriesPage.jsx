import { useEffect, useState, useCallback, useMemo } from "react";
import {
  FolderKanban,
  Search,
  Plus,
  RotateCcw,
  RefreshCw,
  Edit2,
  Trash2,
  Check,
  X,
  AlertTriangle,
  Upload,
  Eye,
  Grid,
  List,
  Tag,
  Sparkles,
  Wrench,
  Home,
  Hammer,
  Zap,
  Scissors,
  Shield,
  Truck,
  Paintbrush,
  Camera,
  Laptop,
  Car,
  CheckCircle2,
  XCircle,
  Calendar,
  Hash,
  Link2,
} from "lucide-react";
import AdminPagination from "../../components/admin/AdminPagination";
import AdminModal from "../../components/admin/AdminModal";
import {
  getAllCategoriesAdmin,
  getCategoryByIdAdmin,
  createCategoryAdmin,
  updateCategoryAdmin,
  deleteCategoryAdmin,
  toggleCategoryStatusAdmin,
} from "../../api/admin.api";
import toast from "react-hot-toast";

// Popular icon presets for quick selection
const PRESET_ICONS = [
  { name: "Sparkles", label: "Cleaning / Beauty", Icon: Sparkles },
  { name: "Wrench", label: "Repairs / Plumbing", Icon: Wrench },
  { name: "Hammer", label: "Carpentry / Construction", Icon: Hammer },
  { name: "Zap", label: "Electrical", Icon: Zap },
  { name: "Home", label: "Home Services", Icon: Home },
  { name: "Paintbrush", label: "Painting / Decor", Icon: Paintbrush },
  { name: "Scissors", label: "Salon / Grooming", Icon: Scissors },
  { name: "Truck", label: "Movers / Logistics", Icon: Truck },
  { name: "Shield", label: "Security / Inspection", Icon: Shield },
  { name: "Laptop", label: "IT / Tech Repair", Icon: Laptop },
  { name: "Car", label: "Automotive", Icon: Car },
  { name: "Camera", label: "Events / Media", Icon: Camera },
];

// Helper to render category icon
const CategoryIconRenderer = ({ iconName, className = "h-4 w-4" }) => {
  if (!iconName) return <FolderKanban className={className} />;
  const normalized = String(iconName).trim().toLowerCase();

  switch (normalized) {
    case "sparkles":
      return <Sparkles className={className} />;
    case "wrench":
      return <Wrench className={className} />;
    case "hammer":
      return <Hammer className={className} />;
    case "zap":
    case "electrical":
      return <Zap className={className} />;
    case "home":
      return <Home className={className} />;
    case "paintbrush":
    case "painting":
      return <Paintbrush className={className} />;
    case "scissors":
    case "salon":
      return <Scissors className={className} />;
    case "truck":
    case "movers":
      return <Truck className={className} />;
    case "shield":
      return <Shield className={className} />;
    case "laptop":
    case "tech":
      return <Laptop className={className} />;
    case "car":
    case "auto":
      return <Car className={className} />;
    case "camera":
      return <Camera className={className} />;
    default:
      return <FolderKanban className={className} />;
  }
};

const AdminCategoriesPage = () => {
  // State
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalCategories, setTotalCategories] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);

  // View Mode: "grid" | "table"
  const [viewMode, setViewMode] = useState("grid");

  // Filters & Search
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isActiveFilter, setIsActiveFilter] = useState("");

  // Debounce search input by 300ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(searchInput);
      setCurrentPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchInput]);

  // Form Modal State (Create / Edit)
  const [formModal, setFormModal] = useState({
    isOpen: false,
    mode: "create", // "create" | "edit"
    category: null,
    submitting: false,
  });

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    icon: "",
    subcategories: [], // Array of string tags
    isActive: true,
    image: "",
  });
  const [subcatInput, setSubcatInput] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [imageTab, setImageTab] = useState("file"); // "file" | "url"

  // View / Inspect Modal State
  const [viewModal, setViewModal] = useState({
    isOpen: false,
    category: null,
    associatedServicesCount: 0,
    loading: false,
  });

  // Delete Modal State
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    category: null,
    associatedServicesCount: 0,
    force: false,
    reason: "",
    submitting: false,
    checkingServices: false,
  });

  // Toggling status state tracking
  const [togglingId, setTogglingId] = useState(null);

  // Fetch categories from backend
  const fetchCategories = useCallback(async (page = 1) => {
    try {
      setLoading(true);
      const res = await getAllCategoriesAdmin({
        page,
        limit: pageSize,
        search: searchQuery,
        isActive: isActiveFilter,
      });

      const data = res?.data || {};
      const list = Array.isArray(data.categories)
        ? data.categories
        : Array.isArray(data)
        ? data
        : [];

      setCategories(list);
      setCurrentPage(data.currentPage || page);
      setTotalPages(data.totalPages || 1);
      setTotalCategories(data.totalCategories || list.length);
    } catch (err) {
      console.error("Failed to load categories:", err);
      toast.error(err?.message || "Failed to load categories");
    } finally {
      setLoading(false);
    }
  }, [searchQuery, isActiveFilter, pageSize]);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      await Promise.resolve();
      if (!isMounted) return;
      fetchCategories(currentPage);
    };
    load();
    return () => {
      isMounted = false;
    };
  }, [fetchCategories, currentPage]);

  // Compute stats overview
  const stats = useMemo(() => {
    const activeCount = categories.filter((c) => c.isActive).length;
    const inactiveCount = categories.filter((c) => !c.isActive).length;
    return {
      total: totalCategories,
      active: activeCount,
      inactive: inactiveCount,
    };
  }, [categories, totalCategories]);

  // Quick Inline Toggle Active Status
  const handleToggleStatus = async (category, e) => {
    if (e) e.stopPropagation();
    try {
      setTogglingId(category._id);
      const nextStatus = !category.isActive;

      // Optimistic update
      setCategories((prev) =>
        prev.map((c) => (c._id === category._id ? { ...c, isActive: nextStatus } : c))
      );

      await toggleCategoryStatusAdmin(category._id, category.isActive);
      toast.success(
        `Category "${category.name}" is now ${nextStatus ? "Active" : "Hidden"}`
      );
    } catch (err) {
      // Rollback
      setCategories((prev) =>
        prev.map((c) =>
          c._id === category._id ? { ...c, isActive: category.isActive } : c
        )
      );
      toast.error(err?.message || "Failed to update category status");
    } finally {
      setTogglingId(null);
    }
  };

  // Open Create Modal
  const handleOpenCreate = () => {
    setFormData({
      name: "",
      description: "",
      icon: "",
      subcategories: [],
      isActive: true,
      image: "",
    });
    setSubcatInput("");
    setImageFile(null);
    setImagePreview("");
    setImageTab("file");
    setFormModal({
      isOpen: true,
      mode: "create",
      category: null,
      submitting: false,
    });
  };

  // Open Edit Modal
  const handleOpenEdit = (category, e) => {
    if (e) e.stopPropagation();
    const subcats = Array.isArray(category.subcategories)
      ? category.subcategories
      : typeof category.subcategories === "string"
      ? category.subcategories.split(",").map((s) => s.trim()).filter(Boolean)
      : [];

    setFormData({
      name: category.name || "",
      description: category.description || "",
      icon: category.icon || "",
      subcategories: subcats,
      isActive: category.isActive ?? true,
      image: category.image || "",
    });
    setSubcatInput("");
    setImageFile(null);
    setImagePreview(category.image || "");
    setImageTab(category.image ? "url" : "file");
    setFormModal({
      isOpen: true,
      mode: "edit",
      category,
      submitting: false,
    });
  };

  // Open Inspect / View Modal
  const handleOpenView = async (category, e) => {
    if (e) e.stopPropagation();
    setViewModal({
      isOpen: true,
      category,
      associatedServicesCount: 0,
      loading: true,
    });

    try {
      const res = await getCategoryByIdAdmin(category._id);
      const details = res?.data || {};
      setViewModal((prev) => ({
        ...prev,
        category: details.category || category,
        associatedServicesCount: details.associatedServicesCount ?? 0,
        loading: false,
      }));
    } catch (err) {
      console.error("Failed to load category details:", err);
      setViewModal((prev) => ({ ...prev, loading: false }));
    }
  };

  // Subcategories tag management
  const handleAddSubcategory = () => {
    if (!subcatInput.trim()) return;
    const newItems = subcatInput
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const merged = Array.from(
      new Set([...formData.subcategories, ...newItems])
    );
    setFormData((prev) => ({ ...prev, subcategories: merged }));
    setSubcatInput("");
  };

  const handleRemoveSubcategory = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      subcategories: prev.subcategories.filter((_, idx) => idx !== indexToRemove),
    }));
  };

  // File select handler
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setFormData((prev) => ({ ...prev, image: "" }));
    }
  };

  // Clear preview/image
  const handleClearImage = () => {
    setImageFile(null);
    setImagePreview("");
    setFormData((prev) => ({ ...prev, image: "" }));
  };

  // Submit Create or Edit
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error("Category name is required");
      return;
    }

    try {
      setFormModal((prev) => ({ ...prev, submitting: true }));

      let payload;
      // If a new physical file is chosen, send FormData
      if (imageFile) {
        payload = new FormData();
        payload.append("name", formData.name.trim());
        payload.append("description", formData.description.trim());
        payload.append("icon", formData.icon.trim());
        payload.append("isActive", String(formData.isActive));
        payload.append("image", imageFile);
        payload.append("subcategories", JSON.stringify(formData.subcategories));
      } else {
        // Plain JSON object payload
        payload = {
          name: formData.name.trim(),
          description: formData.description.trim(),
          icon: formData.icon.trim(),
          subcategories: formData.subcategories,
          isActive: formData.isActive,
          image: formData.image?.trim() || (formModal.mode === "create" ? "" : undefined),
        };
      }

      if (formModal.mode === "create") {
        await createCategoryAdmin(payload);
        toast.success(`Category "${formData.name.trim()}" created successfully!`);
      } else {
        await updateCategoryAdmin(formModal.category._id, payload);
        toast.success(`Category "${formData.name.trim()}" updated successfully!`);
      }

      setFormModal({
        isOpen: false,
        mode: "create",
        category: null,
        submitting: false,
      });

      // Refresh list
      fetchCategories(currentPage);
    } catch (err) {
      console.error("Category save error:", err);
      toast.error(err?.message || "Failed to save category");
      setFormModal((prev) => ({ ...prev, submitting: false }));
    }
  };

  // Open Delete Modal & check linked services
  const handleOpenDelete = async (category, e) => {
    if (e) e.stopPropagation();
    setDeleteModal({
      isOpen: true,
      category,
      associatedServicesCount: 0,
      force: false,
      reason: "",
      submitting: false,
      checkingServices: true,
    });

    try {
      const res = await getCategoryByIdAdmin(category._id);
      const count = res?.data?.associatedServicesCount || 0;
      setDeleteModal((prev) => ({
        ...prev,
        associatedServicesCount: count,
        checkingServices: false,
      }));
    } catch (err) {
      console.error("Failed to check category services count:", err);
      setDeleteModal((prev) => ({ ...prev, checkingServices: false }));
    }
  };

  // Confirm permanent or forced deletion
  const handleConfirmDelete = async () => {
    if (!deleteModal.category) return;
    try {
      setDeleteModal((prev) => ({ ...prev, submitting: true }));
      await deleteCategoryAdmin(deleteModal.category._id, {
        force: deleteModal.force,
        reason: deleteModal.reason?.trim() || "",
      });

      toast.success(`Category "${deleteModal.category.name}" deleted successfully.`);
      setDeleteModal({
        isOpen: false,
        category: null,
        associatedServicesCount: 0,
        force: false,
        reason: "",
        submitting: false,
        checkingServices: false,
      });

      // If view modal was open for this category, close it
      if (viewModal.category?._id === deleteModal.category._id) {
        setViewModal({ isOpen: false, category: null, associatedServicesCount: 0, loading: false });
      }

      fetchCategories(currentPage);
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error(err?.message || "Failed to delete category");
      setDeleteModal((prev) => ({ ...prev, submitting: false }));
    }
  };

  // Reset Filters
  const resetFilters = () => {
    setSearchInput("");
    setSearchQuery("");
    setIsActiveFilter("");
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6">
      {/* 1. Header & Actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
            Marketplace Taxonomy & Catalog
          </span>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Category Management
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Create, moderate, and structure service categories, subcategories, banners, and status controls.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 self-start sm:self-auto">
          {/* View mode toggle */}
          <div className="flex items-center rounded-xl border border-slate-200 bg-white p-1 shadow-2xs">
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
          </div>

          {/* Refresh */}
          <button
            type="button"
            onClick={() => fetchCategories(currentPage)}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50"
          >
            <RefreshCw size={14} className={loading ? "animate-spin text-blue-600" : ""} />
            <span>Refresh</span>
          </button>

          {/* Create Button */}
          <button
            type="button"
            onClick={handleOpenCreate}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-blue-700"
          >
            <Plus size={16} />
            <span>New Category</span>
          </button>
        </div>
      </div>

      {/* 2. Quick Stat Counters */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-3.5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Total Categories</span>
            <FolderKanban size={16} className="text-blue-500" />
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
            <span className="text-xs font-medium text-slate-500">Active (Visible)</span>
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
            <span className="text-xs font-medium text-slate-500">Hidden (Inactive)</span>
            <XCircle size={16} className="text-amber-500" />
          </div>
          <p className="mt-2 text-xl font-bold text-amber-600">{stats.inactive}</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-3.5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Catalog Health</span>
            <Sparkles size={16} className="text-indigo-500" />
          </div>
          <p className="mt-2 text-xl font-bold text-slate-900">
            {stats.total > 0
              ? `${Math.round((stats.active / stats.total) * 100)}%`
              : "100%"}
          </p>
        </div>
      </div>

      {/* 3. Filter & Search Toolbar */}
      <div className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs sm:grid-cols-2 lg:grid-cols-12">
        {/* Search */}
        <div className="relative sm:col-span-2 lg:col-span-6">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search categories by name, slug, or keywords..."
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

        {/* Status Filter */}
        <div className="lg:col-span-3">
          <select
            value={isActiveFilter}
            onChange={(e) => {
              setIsActiveFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs text-slate-700 focus:border-blue-500 focus:bg-white focus:outline-none"
          >
            <option value="">All Statuses (Active & Hidden)</option>
            <option value="true">Active Categories Only</option>
            <option value="false">Hidden Categories Only</option>
          </select>
        </div>

        {/* Page Size Selector */}
        <div className="lg:col-span-2">
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs text-slate-700 focus:border-blue-500 focus:bg-white focus:outline-none"
          >
            <option value={12}>12 per page</option>
            <option value={24}>24 per page</option>
            <option value={48}>48 per page</option>
          </select>
        </div>

        {/* Reset Filter Button */}
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

      {/* 4. Category Display (Grid or Table) */}
      {loading ? (
        <div className="py-20 text-center text-slate-500">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600" />
          <p className="mt-3 text-xs font-semibold text-slate-600">
            Fetching marketplace taxonomy...
          </p>
        </div>
      ) : categories.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-14 text-center text-slate-500">
          <FolderKanban size={36} className="mx-auto mb-2 text-slate-300" />
          <p className="text-sm font-bold text-slate-800">No categories found</p>
          <p className="mt-1 text-xs text-slate-400">
            {searchQuery || isActiveFilter
              ? "Try adjusting your search query or status filter."
              : "Click 'New Category' above to create your first service category."}
          </p>
          {(searchQuery || isActiveFilter) && (
            <button
              type="button"
              onClick={resetFilters}
              className="mt-4 inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              <RotateCcw size={13} />
              Clear Filters
            </button>
          )}
        </div>
      ) : viewMode === "grid" ? (
        /* GRID VIEW */
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map((c) => (
            <div
              key={c._id}
              onClick={() => handleOpenView(c)}
              className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-4 shadow-2xs transition hover:border-slate-300 hover:shadow-xs cursor-pointer"
            >
              <div>
                {/* Image & Badges Banner */}
                <div className="relative mb-3.5 h-36 w-full overflow-hidden rounded-xl bg-slate-100">
                  {c.image ? (
                    <img
                      src={c.image}
                      alt={c.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center text-slate-300">
                      <CategoryIconRenderer
                        iconName={c.icon}
                        className="h-10 w-10 text-slate-300"
                      />
                    </div>
                  )}

                  {/* Icon Badge Top Left */}
                  <div className="absolute left-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-lg bg-white/90 text-slate-700 shadow-xs backdrop-blur-xs">
                    <CategoryIconRenderer iconName={c.icon} className="h-4 w-4" />
                  </div>

                  {/* Active Toggle Switch Top Right */}
                  <button
                    type="button"
                    onClick={(e) => handleToggleStatus(c, e)}
                    disabled={togglingId === c._id}
                    title={c.isActive ? "Click to Hide" : "Click to Activate"}
                    className={`absolute right-2.5 top-2.5 inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold shadow-xs backdrop-blur-xs transition ${
                      c.isActive
                        ? "bg-emerald-500/95 text-white hover:bg-emerald-600"
                        : "bg-slate-900/80 text-slate-200 hover:bg-slate-900"
                    }`}
                  >
                    {togglingId === c._id ? (
                      <RefreshCw size={10} className="animate-spin" />
                    ) : c.isActive ? (
                      <Check size={10} />
                    ) : (
                      <X size={10} />
                    )}
                    <span>{c.isActive ? "Active" : "Hidden"}</span>
                  </button>
                </div>

                {/* Details */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="truncate text-sm font-bold text-slate-900 group-hover:text-blue-600 transition">
                      {c.name}
                    </h3>
                  </div>

                  <p className="flex items-center gap-1 font-mono text-[11px] text-slate-400 truncate">
                    <Hash size={11} className="text-slate-400 shrink-0" />
                    <span>{c.slug}</span>
                  </p>

                  <p className="line-clamp-2 min-h-[32px] text-xs text-slate-500">
                    {c.description || "No description provided."}
                  </p>
                </div>

                {/* Subcategories tags */}
                {c.subcategories && c.subcategories.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1">
                    {c.subcategories.slice(0, 3).map((sub, i) => (
                      <span
                        key={i}
                        className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-600"
                      >
                        {sub}
                      </span>
                    ))}
                    {c.subcategories.length > 3 && (
                      <span className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-400">
                        +{c.subcategories.length - 3} more
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Card Footer Actions */}
              <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                <span className="text-[11px] font-medium text-slate-400">
                  Subcategories:{" "}
                  <strong className="text-slate-700">
                    {c.subcategories?.length || 0}
                  </strong>
                </span>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={(e) => handleOpenView(c, e)}
                    title="View Details"
                    className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                  >
                    <Eye size={13} />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => handleOpenEdit(c, e)}
                    title="Edit Category"
                    className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                  >
                    <Edit2 size={13} />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => handleOpenDelete(c, e)}
                    title="Delete Category"
                    className="flex h-7 w-7 items-center justify-center rounded-lg border border-rose-200 bg-white text-rose-600 hover:bg-rose-50"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* TABLE VIEW */
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-200 bg-slate-50/70 font-semibold text-slate-600">
                <tr>
                  <th className="py-3.5 pl-4 pr-3">Category</th>
                  <th className="px-3 py-3.5">Slug</th>
                  <th className="px-3 py-3.5">Description</th>
                  <th className="px-3 py-3.5">Subcategories</th>
                  <th className="px-3 py-3.5">Status</th>
                  <th className="px-3 py-3.5 text-right pr-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {categories.map((c) => (
                  <tr
                    key={c._id}
                    onClick={() => handleOpenView(c)}
                    className="cursor-pointer hover:bg-slate-50/80 transition"
                  >
                    {/* Category with thumbnail */}
                    <td className="py-3 pl-4 pr-3">
                      <div className="flex items-center gap-3">
                        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-slate-100 border border-slate-200">
                          {c.image ? (
                            <img
                              src={c.image}
                              alt={c.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-slate-400">
                              <CategoryIconRenderer iconName={c.icon} className="h-5 w-5" />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{c.name}</p>
                          <span className="text-[10px] text-slate-400">
                            Icon: {c.icon || "Default"}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Slug */}
                    <td className="px-3 py-3 font-mono text-slate-500">
                      /{c.slug}
                    </td>

                    {/* Description */}
                    <td className="max-w-xs px-3 py-3 truncate text-slate-500">
                      {c.description || "—"}
                    </td>

                    {/* Subcategories tags */}
                    <td className="px-3 py-3">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {c.subcategories && c.subcategories.length > 0 ? (
                          c.subcategories.slice(0, 2).map((sub, i) => (
                            <span
                              key={i}
                              className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-600"
                            >
                              {sub}
                            </span>
                          ))
                        ) : (
                          <span className="text-slate-400 text-[11px]">—</span>
                        )}
                        {c.subcategories?.length > 2 && (
                          <span className="rounded bg-slate-100 px-1 py-0.5 text-[10px] text-slate-400">
                            +{c.subcategories.length - 2}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-3 py-3">
                      <button
                        type="button"
                        onClick={(e) => handleToggleStatus(c, e)}
                        disabled={togglingId === c._id}
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold transition ${
                          c.isActive
                            ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        {togglingId === c._id ? (
                          <RefreshCw size={10} className="animate-spin" />
                        ) : c.isActive ? (
                          <Check size={10} />
                        ) : (
                          <X size={10} />
                        )}
                        <span>{c.isActive ? "Active" : "Hidden"}</span>
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-3 pl-3 pr-4 text-right">
                      <div
                        className="flex items-center justify-end gap-1.5"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          type="button"
                          onClick={(e) => handleOpenView(c, e)}
                          title="View Details"
                          className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                        >
                          <Eye size={13} />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => handleOpenEdit(c, e)}
                          title="Edit Category"
                          className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                        >
                          <Edit2 size={13} />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => handleOpenDelete(c, e)}
                          title="Delete Category"
                          className="flex h-7 w-7 items-center justify-center rounded-lg border border-rose-200 bg-white text-rose-600 hover:bg-rose-50"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 5. Pagination */}
      <AdminPagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalCategories}
        pageSize={pageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />

      {/* ============================================================ */}
      {/* MODAL: VIEW / INSPECT CATEGORY DETAILS                       */}
      {/* ============================================================ */}
      <AdminModal
        isOpen={viewModal.isOpen}
        onClose={() =>
          setViewModal({
            isOpen: false,
            category: null,
            associatedServicesCount: 0,
            loading: false,
          })
        }
        title={viewModal.category?.name || "Category Dossier"}
        subtitle={`Taxonomy ID: ${viewModal.category?._id || "—"}`}
        maxWidth="max-w-xl"
      >
        {viewModal.category && (
          <div className="space-y-4">
            {/* Cover Banner */}
            <div className="relative h-44 w-full overflow-hidden rounded-xl bg-slate-100 border border-slate-200">
              {viewModal.category.image ? (
                <img
                  src={viewModal.category.image}
                  alt={viewModal.category.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center text-slate-300">
                  <CategoryIconRenderer
                    iconName={viewModal.category.icon}
                    className="h-12 w-12"
                  />
                  <span className="mt-1 text-xs">No cover image uploaded</span>
                </div>
              )}

              <span
                className={`absolute right-3 top-3 rounded-full px-2.5 py-0.5 text-xs font-bold shadow-xs backdrop-blur-xs ${
                  viewModal.category.isActive
                    ? "bg-emerald-500 text-white"
                    : "bg-slate-900/80 text-slate-200"
                }`}
              >
                {viewModal.category.isActive ? "Active (Visible)" : "Hidden (Inactive)"}
              </span>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-2.5">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Slug
                </span>
                <p className="mt-0.5 font-mono text-xs font-bold text-slate-800 truncate">
                  /{viewModal.category.slug}
                </p>
              </div>

              <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-2.5">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Icon Identifier
                </span>
                <div className="mt-0.5 flex items-center gap-1.5">
                  <CategoryIconRenderer
                    iconName={viewModal.category.icon}
                    className="h-3.5 w-3.5 text-blue-600"
                  />
                  <span className="text-xs font-bold text-slate-800">
                    {viewModal.category.icon || "Default"}
                  </span>
                </div>
              </div>

              <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-2.5 col-span-2 sm:col-span-1">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Active Services
                </span>
                <p className="mt-0.5 text-xs font-bold text-slate-800">
                  {viewModal.loading ? (
                    <span className="text-slate-400">Checking...</span>
                  ) : (
                    <span>{viewModal.associatedServicesCount} services linked</span>
                  )}
                </p>
              </div>
            </div>

            {/* Description */}
            <div>
              <span className="text-[11px] font-semibold text-slate-500">Description</span>
              <p className="mt-1 rounded-xl bg-slate-50 p-3 text-xs text-slate-700 leading-relaxed border border-slate-100">
                {viewModal.category.description || "No description provided for this category."}
              </p>
            </div>

            {/* Subcategories list */}
            <div>
              <span className="text-[11px] font-semibold text-slate-500">
                Subcategories ({viewModal.category.subcategories?.length || 0})
              </span>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {viewModal.category.subcategories &&
                viewModal.category.subcategories.length > 0 ? (
                  viewModal.category.subcategories.map((sub, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700"
                    >
                      <Tag size={11} className="text-blue-500" />
                      {sub}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-slate-400 italic">
                    No subcategories defined yet.
                  </span>
                )}
              </div>
            </div>

            {/* Timestamps */}
            <div className="flex flex-wrap items-center justify-between border-t border-slate-100 pt-3 text-[11px] text-slate-400">
              <span className="inline-flex items-center gap-1">
                <Calendar size={12} />
                Created:{" "}
                {viewModal.category.createdAt
                  ? new Date(viewModal.category.createdAt).toLocaleDateString()
                  : "—"}
              </span>
              <span>
                Updated:{" "}
                {viewModal.category.updatedAt
                  ? new Date(viewModal.category.updatedAt).toLocaleDateString()
                  : "—"}
              </span>
            </div>

            {/* Footer Actions */}
            <div className="flex justify-end gap-2 border-t border-slate-100 pt-3">
              <button
                type="button"
                onClick={() => {
                  const cat = viewModal.category;
                  setViewModal({
                    isOpen: false,
                    category: null,
                    associatedServicesCount: 0,
                    loading: false,
                  });
                  handleOpenEdit(cat);
                }}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                <Edit2 size={13} />
                Edit Category
              </button>

              <button
                type="button"
                onClick={() => {
                  const cat = viewModal.category;
                  setViewModal({
                    isOpen: false,
                    category: null,
                    associatedServicesCount: 0,
                    loading: false,
                  });
                  handleOpenDelete(cat);
                }}
                className="inline-flex items-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2 text-xs font-semibold text-rose-700 hover:bg-rose-100"
              >
                <Trash2 size={13} />
                Delete
              </button>
            </div>
          </div>
        )}
      </AdminModal>

      {/* ============================================================ */}
      {/* MODAL: CREATE / EDIT CATEGORY FORM                           */}
      {/* ============================================================ */}
      <AdminModal
        isOpen={formModal.isOpen}
        onClose={() =>
          setFormModal({
            isOpen: false,
            mode: "create",
            category: null,
            submitting: false,
          })
        }
        title={
          formModal.mode === "create" ? "Create New Category" : "Edit Category"
        }
        subtitle="Manage category name, slug, media banner, and subcategories"
        maxWidth="max-w-xl"
      >
        <form onSubmit={handleSubmitForm} className="space-y-4">
          {/* Name & Slug preview */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Category Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="e.g. Home Cleaning, Appliance Repair, Plumbing"
              className="w-full rounded-xl border border-slate-200 p-2.5 text-xs focus:border-blue-500 focus:outline-none"
            />
            {formData.name.trim() && (
              <p className="mt-1 text-[11px] font-mono text-slate-400">
                Generated Slug: /
                {formData.name.trim().toLowerCase().replace(/\s+/g, "-")}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, description: e.target.value }))
              }
              rows={2}
              placeholder="Brief summary of services offered in this category..."
              className="w-full rounded-xl border border-slate-200 p-2.5 text-xs focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Icon & Status */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Icon Identifier
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.icon}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, icon: e.target.value }))
                  }
                  placeholder="e.g. Wrench, Sparkles, Home"
                  className="w-full rounded-xl border border-slate-200 p-2.5 pl-8 text-xs focus:border-blue-500 focus:outline-none"
                />
                <div className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400">
                  <CategoryIconRenderer iconName={formData.icon} className="h-4 w-4" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Display Status
              </label>
              <select
                value={String(formData.isActive)}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    isActive: e.target.value === "true",
                  }))
                }
                className="w-full rounded-xl border border-slate-200 p-2.5 text-xs focus:border-blue-500 focus:outline-none"
              >
                <option value="true">Active (Publicly Listed)</option>
                <option value="false">Hidden (Draft / Inactive)</option>
              </select>
            </div>
          </div>

          {/* Preset Icon Chips */}
          <div>
            <span className="text-[11px] font-semibold text-slate-500">
              Quick Pick Icon Presets:
            </span>
            <div className="mt-1 flex flex-wrap gap-1.5">
              {PRESET_ICONS.map(({ name, Icon }) => (
                <button
                  type="button"
                  key={name}
                  onClick={() => setFormData((prev) => ({ ...prev, icon: name }))}
                  className={`inline-flex items-center gap-1 rounded-lg border px-2 py-1 text-[11px] font-medium transition ${
                    formData.icon.toLowerCase() === name.toLowerCase()
                      ? "border-blue-600 bg-blue-50 text-blue-700"
                      : "border-slate-200 bg-slate-50/70 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <Icon size={12} />
                  <span>{name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Subcategory Tag Builder */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Subcategories ({formData.subcategories.length})
            </label>

            <div className="flex gap-2">
              <input
                type="text"
                value={subcatInput}
                onChange={(e) => setSubcatInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === ",") {
                    e.preventDefault();
                    handleAddSubcategory();
                  }
                }}
                placeholder="Type subcategory and press Enter or click Add..."
                className="w-full rounded-xl border border-slate-200 p-2.5 text-xs focus:border-blue-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={handleAddSubcategory}
                className="shrink-0 rounded-xl bg-slate-100 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200"
              >
                Add Tag
              </button>
            </div>

            {/* Tag List */}
            {formData.subcategories.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1.5 max-h-32 overflow-y-auto p-1">
                {formData.subcategories.map((tag, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700"
                  >
                    <span>{tag}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSubcategory(idx)}
                      className="text-slate-400 hover:text-rose-600"
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Category Image Options */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Category Cover Image
              </label>
              <div className="flex gap-2 text-[11px]">
                <button
                  type="button"
                  onClick={() => setImageTab("file")}
                  className={`font-semibold ${
                    imageTab === "file" ? "text-blue-600 underline" : "text-slate-400"
                  }`}
                >
                  Upload File
                </button>
                <span className="text-slate-300">|</span>
                <button
                  type="button"
                  onClick={() => setImageTab("url")}
                  className={`font-semibold ${
                    imageTab === "url" ? "text-blue-600 underline" : "text-slate-400"
                  }`}
                >
                  Image URL
                </button>
              </div>
            </div>

            {/* Image Preview Box */}
            {imagePreview && (
              <div className="mb-2 relative h-32 w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
                <img
                  src={imagePreview}
                  alt="Category Preview"
                  className="h-full w-full object-cover"
                />
                <button
                  type="button"
                  onClick={handleClearImage}
                  className="absolute right-2 top-2 rounded-lg bg-slate-900/70 p-1 text-white hover:bg-slate-900"
                  title="Remove Image"
                >
                  <X size={14} />
                </button>
              </div>
            )}

            {imageTab === "file" ? (
              <label className="flex items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 p-3 text-xs text-slate-600 hover:bg-slate-50 cursor-pointer">
                <Upload size={16} />
                <span>
                  {imageFile
                    ? `${imageFile.name} (${Math.round(imageFile.size / 1024)} KB)`
                    : "Choose an image file to upload (JPEG, PNG, WebP)"}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            ) : (
              <div className="relative">
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => {
                    const url = e.target.value;
                    setFormData((prev) => ({ ...prev, image: url }));
                    setImagePreview(url);
                    setImageFile(null);
                  }}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full rounded-xl border border-slate-200 p-2.5 pl-8 text-xs focus:border-blue-500 focus:outline-none"
                />
                <Link2
                  size={14}
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() =>
                setFormModal({
                  isOpen: false,
                  mode: "create",
                  category: null,
                  submitting: false,
                })
              }
              className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={formModal.submitting}
              className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-blue-700 disabled:opacity-50"
            >
              {formModal.submitting && <RefreshCw size={12} className="animate-spin" />}
              <span>
                {formModal.submitting
                  ? "Saving Category..."
                  : formModal.mode === "create"
                  ? "Create Category"
                  : "Save Changes"}
              </span>
            </button>
          </div>
        </form>
      </AdminModal>

      {/* ============================================================ */}
      {/* MODAL: DELETE CATEGORY (WITH LINKED SERVICES CHECK)         */}
      {/* ============================================================ */}
      <AdminModal
        isOpen={deleteModal.isOpen}
        onClose={() =>
          setDeleteModal({
            isOpen: false,
            category: null,
            associatedServicesCount: 0,
            force: false,
            reason: "",
            submitting: false,
            checkingServices: false,
          })
        }
        title="Delete Category"
        subtitle={deleteModal.category?.name}
      >
        <div className="space-y-4">
          {deleteModal.checkingServices ? (
            <div className="py-6 text-center text-xs text-slate-500">
              <RefreshCw size={16} className="animate-spin mx-auto text-blue-600 mb-2" />
              Verifying linked marketplace services...
            </div>
          ) : deleteModal.associatedServicesCount > 0 ? (
            <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-3.5 space-y-2.5">
              <div className="flex items-center gap-2 text-amber-800 font-bold text-xs">
                <AlertTriangle size={16} />
                <span>Active Services Linked</span>
              </div>
              <p className="text-xs text-amber-800 leading-relaxed">
                There are currently{" "}
                <strong>{deleteModal.associatedServicesCount} service(s)</strong> tied to this
                category. Deleting this category without unlinking services may cause catalog issues.
              </p>
              <label className="flex items-center gap-2.5 pt-1 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={deleteModal.force}
                  onChange={(e) =>
                    setDeleteModal((prev) => ({
                      ...prev,
                      force: e.target.checked,
                    }))
                  }
                  className="h-4 w-4 rounded border-slate-300 text-rose-600 focus:ring-rose-500"
                />
                <span className="text-xs font-bold text-rose-700">
                  Force delete this category anyway (Admin Override)
                </span>
              </label>
            </div>
          ) : (
            <p className="text-xs text-slate-600 leading-relaxed">
              Are you sure you want to permanently delete category{" "}
              <strong>&quot;{deleteModal.category?.name}&quot;</strong>? No active services are
              linked to this category.
            </p>
          )}

          {/* Audit Reason */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Audit Reason (Recommended)
            </label>
            <textarea
              value={deleteModal.reason}
              onChange={(e) =>
                setDeleteModal((prev) => ({ ...prev, reason: e.target.value }))
              }
              rows={2}
              placeholder="e.g. Category taxonomy restructure, duplicate listing"
              className="w-full rounded-xl border border-slate-200 p-2.5 text-xs focus:border-rose-500 focus:outline-none"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() =>
                setDeleteModal({
                  isOpen: false,
                  category: null,
                  associatedServicesCount: 0,
                  force: false,
                  reason: "",
                  submitting: false,
                  checkingServices: false,
                })
              }
              className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirmDelete}
              disabled={
                deleteModal.submitting ||
                (deleteModal.associatedServicesCount > 0 && !deleteModal.force)
              }
              className="inline-flex items-center gap-1.5 rounded-xl bg-rose-600 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-rose-700 disabled:opacity-50"
            >
              {deleteModal.submitting && <RefreshCw size={12} className="animate-spin" />}
              <span>
                {deleteModal.submitting ? "Deleting Category..." : "Permanently Delete"}
              </span>
            </button>
          </div>
        </div>
      </AdminModal>
    </div>
  );
};

export default AdminCategoriesPage;
