import { useEffect, useState, useCallback } from "react";
import {
  FolderKanban,
  Search,
  Plus,
  RotateCcw,
  RefreshCw,
  Edit2,
  Trash2,
  Image as ImageIcon,
  Layers,
  Check,
  X,
  AlertTriangle,
  Upload,
} from "lucide-react";
import AdminPagination from "../../components/admin/AdminPagination";
import AdminModal from "../../components/admin/AdminModal";
import {
  getAllCategoriesAdmin,
  getCategoryByIdAdmin,
  createCategoryAdmin,
  updateCategoryAdmin,
  deleteCategoryAdmin,
} from "../../api/admin.api";
import toast from "react-hot-toast";

const AdminCategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalCategories, setTotalCategories] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [isActiveFilter, setIsActiveFilter] = useState("");

  // Create / Edit modal state
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
    subcategories: "",
    isActive: true,
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  // Delete modal state
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    category: null,
    associatedServicesCount: 0,
    force: false,
    reason: "",
    submitting: false,
    checkingServices: false,
  });

  const fetchCategories = useCallback(async (page = 1) => {
    try {
      setLoading(true);
      const res = await getAllCategoriesAdmin({
        page,
        limit: 12,
        search: searchQuery,
        isActive: isActiveFilter,
      });

      const data = res?.data || {};
      setCategories(data.categories || []);
      setCurrentPage(data.currentPage || page);
      setTotalPages(data.totalPages || 1);
      setTotalCategories(data.totalCategories || 0);
    } catch (err) {
      console.error("Failed to load categories:", err);
      toast.error(err?.message || "Failed to load categories");
    } finally {
      setLoading(false);
    }
  }, [searchQuery, isActiveFilter]);

  useEffect(() => {
    fetchCategories(1);
  }, [fetchCategories]);

  // Handle open create modal
  const handleOpenCreate = () => {
    setFormData({
      name: "",
      description: "",
      icon: "",
      subcategories: "",
      isActive: true,
    });
    setImageFile(null);
    setImagePreview("");
    setFormModal({
      isOpen: true,
      mode: "create",
      category: null,
      submitting: false,
    });
  };

  // Handle open edit modal
  const handleOpenEdit = (category) => {
    setFormData({
      name: category.name || "",
      description: category.description || "",
      icon: category.icon || "",
      subcategories: Array.isArray(category.subcategories)
        ? category.subcategories.join(", ")
        : "",
      isActive: category.isActive ?? true,
    });
    setImageFile(null);
    setImagePreview(category.image || "");
    setFormModal({
      isOpen: true,
      mode: "edit",
      category,
      submitting: false,
    });
  };

  // Handle file select
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Submit create or edit
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error("Category name is required");
      return;
    }

    try {
      setFormModal((prev) => ({ ...prev, submitting: true }));

      // Format payload using FormData if image file is attached
      let payload;
      if (imageFile) {
        payload = new FormData();
        payload.append("name", formData.name.trim());
        payload.append("description", formData.description.trim());
        payload.append("icon", formData.icon.trim());
        payload.append("isActive", String(formData.isActive));
        payload.append("image", imageFile);

        const subArr = formData.subcategories
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);
        payload.append("subcategories", JSON.stringify(subArr));
      } else {
        const subArr = formData.subcategories
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);
        payload = {
          name: formData.name.trim(),
          description: formData.description.trim(),
          icon: formData.icon.trim(),
          subcategories: subArr,
          isActive: formData.isActive,
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
      fetchCategories(currentPage);
    } catch (err) {
      toast.error(err?.message || "Operation failed");
      setFormModal((prev) => ({ ...prev, submitting: false }));
    }
  };

  // Open delete modal & check associated services
  const handleOpenDelete = async (category) => {
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

  const handleConfirmDelete = async () => {
    if (!deleteModal.category) return;
    try {
      setDeleteModal((prev) => ({ ...prev, submitting: true }));
      await deleteCategoryAdmin(deleteModal.category._id, {
        force: deleteModal.force,
        reason: deleteModal.reason,
      });
      toast.success(`Category "${deleteModal.category.name}" deleted.`);
      setDeleteModal({
        isOpen: false,
        category: null,
        associatedServicesCount: 0,
        force: false,
        reason: "",
        submitting: false,
        checkingServices: false,
      });
      fetchCategories(currentPage);
    } catch (err) {
      toast.error(err?.message || "Delete failed");
      setDeleteModal((prev) => ({ ...prev, submitting: false }));
    }
  };

  const resetFilters = () => {
    setSearchQuery("");
    setIsActiveFilter("");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
            Taxonomy & Structure
          </span>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Category Management
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Organize the marketplace directory with categories, subcategories, and cover media.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => fetchCategories(currentPage)}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50"
          >
            <RefreshCw size={14} className={loading ? "animate-spin text-blue-600" : ""} />
            Refresh
          </button>

          <button
            type="button"
            onClick={handleOpenCreate}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-3.5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-blue-700"
          >
            <Plus size={15} />
            <span>New Category</span>
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs sm:grid-cols-2 lg:grid-cols-4">
        {/* Search */}
        <div className="relative lg:col-span-2">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search categories by name, slug, or description..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2 pl-9 pr-3 text-xs focus:border-blue-500 focus:bg-white focus:outline-none"
          />
        </div>

        {/* Status */}
        <select
          value={isActiveFilter}
          onChange={(e) => setIsActiveFilter(e.target.value)}
          className="rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs text-slate-700 focus:border-blue-500 focus:bg-white focus:outline-none"
        >
          <option value="">All Statuses</option>
          <option value="true">Active Categories</option>
          <option value="false">Inactive Categories</option>
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

      {/* Categories Cards Grid */}
      {loading ? (
        <div className="py-16 text-center text-slate-500">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600 mx-auto" />
          <p className="mt-3 text-xs font-semibold">Loading marketplace categories...</p>
        </div>
      ) : categories.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center text-slate-500">
          <FolderKanban size={32} className="mx-auto mb-2 text-slate-400" />
          <p className="text-sm font-semibold text-slate-700">No categories found</p>
          <p className="text-xs text-slate-400 mt-1">
            Create a category to begin populating service listings.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map((c) => (
            <div
              key={c._id}
              className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-4 shadow-2xs hover:border-slate-300 hover:shadow-xs transition"
            >
              <div>
                {/* Image Header */}
                <div className="relative h-32 w-full overflow-hidden rounded-xl bg-slate-100 mb-3.5">
                  {c.image ? (
                    <img
                      src={c.image}
                      alt={c.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-slate-400">
                      <ImageIcon size={28} />
                    </div>
                  )}

                  <span
                    className={`absolute right-2.5 top-2.5 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                      c.isActive
                        ? "bg-emerald-500/90 text-white backdrop-blur-xs"
                        : "bg-slate-900/70 text-slate-200 backdrop-blur-xs"
                    }`}
                  >
                    {c.isActive ? "Active" : "Hidden"}
                  </span>
                </div>

                {/* Details */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-bold text-slate-900 text-sm truncate">
                      {c.name}
                    </h3>
                    <span className="text-[11px] font-mono text-slate-400 truncate">
                      /{c.slug}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 line-clamp-2 min-h-[32px]">
                    {c.description || "No description provided."}
                  </p>
                </div>

                {/* Subcategories preview */}
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
                  Services: <strong className="text-slate-700">{c.serviceCount ?? 0}</strong>
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(c)}
                    title="Edit Category"
                    className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                  >
                    <Edit2 size={13} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleOpenDelete(c)}
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
      )}

      {/* Pagination */}
      <AdminPagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalCategories}
        pageSize={12}
        onPageChange={(page) => fetchCategories(page)}
      />

      {/* MODAL: Create / Edit Category */}
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
        subtitle="Manage taxonomy metadata, image banner, and subcategories"
        maxWidth="max-w-xl"
      >
        <form onSubmit={handleSubmitForm} className="space-y-4">
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
              placeholder="e.g. Home Cleaning, Appliance Repair"
              className="w-full rounded-xl border border-slate-200 p-2.5 text-xs focus:border-blue-500 focus:outline-none"
            />
          </div>

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
              placeholder="Brief description of services in this category"
              className="w-full rounded-xl border border-slate-200 p-2.5 text-xs focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Icon Identifier
              </label>
              <input
                type="text"
                value={formData.icon}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, icon: e.target.value }))
                }
                placeholder="e.g. Wrench, Sparkles"
                className="w-full rounded-xl border border-slate-200 p-2.5 text-xs focus:border-blue-500 focus:outline-none"
              />
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
                <option value="true">Active (Visible)</option>
                <option value="false">Inactive (Hidden)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Subcategories (Comma separated)
            </label>
            <input
              type="text"
              value={formData.subcategories}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, subcategories: e.target.value }))
              }
              placeholder="e.g. AC Repair, Deep Cleaning, Water Purifier"
              className="w-full rounded-xl border border-slate-200 p-2.5 text-xs focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Image Upload with preview */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Category Cover Image
            </label>

            {imagePreview && (
              <div className="mb-2 relative h-28 w-full overflow-hidden rounded-xl border border-slate-200">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="h-full w-full object-cover"
                />
              </div>
            )}

            <label className="flex items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 p-3 text-xs text-slate-600 hover:bg-slate-50 cursor-pointer">
              <Upload size={16} />
              <span>{imageFile ? imageFile.name : "Choose an image file to upload"}</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
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
              className="rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-blue-700 disabled:opacity-50"
            >
              {formModal.submitting
                ? "Saving..."
                : formModal.mode === "create"
                ? "Create Category"
                : "Update Category"}
            </button>
          </div>
        </form>
      </AdminModal>

      {/* MODAL: Delete Category */}
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
            <div className="py-4 text-center text-xs text-slate-500">
              Checking linked services...
            </div>
          ) : deleteModal.associatedServicesCount > 0 ? (
            <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-3 space-y-2">
              <div className="flex items-center gap-2 text-amber-800 font-bold text-xs">
                <AlertTriangle size={16} />
                <span>Active Services Linked</span>
              </div>
              <p className="text-xs text-amber-700 leading-relaxed">
                There are currently <strong>{deleteModal.associatedServicesCount} service(s)</strong> tied to this category. The system prevents accidental deletion unless forced.
              </p>
              <label className="flex items-center gap-2 pt-1 cursor-pointer">
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
                  Force delete this category anyway
                </span>
              </label>
            </div>
          ) : (
            <p className="text-xs text-slate-600">
              Are you sure you want to delete category{" "}
              <strong>{deleteModal.category?.name}</strong>? No services are currently linked to it.
            </p>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Audit Reason (Optional)
            </label>
            <textarea
              value={deleteModal.reason}
              onChange={(e) =>
                setDeleteModal((prev) => ({ ...prev, reason: e.target.value }))
              }
              rows={2}
              placeholder="e.g. Category taxonomy restructure"
              className="w-full rounded-xl border border-slate-200 p-2.5 text-xs focus:border-rose-500 focus:outline-none"
            />
          </div>

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

export default AdminCategoriesPage;

