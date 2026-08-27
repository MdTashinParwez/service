import { useEffect, useRef, useState } from "react";

import {
  ImagePlus,
  X,
  Upload,
  IndianRupee,
  Clock3,
  MapPin,
  Tag,
  Loader2,
  FileText,
  Layers3,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const MAX_IMAGES = 5;
const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ServiceForm = ({
  mode = "create",
  initialData = null,
  categories = [],
  onSubmit,
  submitting = false,
}) => {
  const fileInputRef = useRef(null);

  // =====================================================
  // FORM STATE
  // =====================================================

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    hours: "0",
    minutes: "0",
    serviceType: "",
    location: "",
    tags: "",
  });

  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [errors, setErrors] = useState({});

  // =====================================================
  // EDIT MODE
  // Convert backend duration (minutes)
  // into hours + minutes
  // =====================================================

  useEffect(() => {
    if (!initialData) return;

    const totalMinutes = Number(initialData.duration) || 0;

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    setForm({
      title: initialData.title || "",
      description: initialData.description || "",

      category:
        initialData.category?._id ||
        initialData.category ||
        "",

      price:
        initialData.price !== undefined &&
        initialData.price !== null
          ? String(initialData.price)
          : "",

      hours: String(hours),
      minutes: String(minutes),

      serviceType: initialData.serviceType || "",

      location: initialData.location || "",

      tags: Array.isArray(initialData.tags)
        ? initialData.tags.join(", ")
        : "",
    });

    setExistingImages(
      Array.isArray(initialData.images)
        ? initialData.images
        : []
    );
  }, [initialData]);

  // =====================================================
  // GENERIC INPUT CHANGE
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((current) => ({
        ...current,
        [name]: "",
      }));
    }

    // Clear duration error when either field changes
    if (name === "hours" || name === "minutes") {
      setErrors((current) => ({
        ...current,
        duration: "",
        minutes: "",
      }));
    }
  };

  // =====================================================
  // SERVICE TYPE
  // =====================================================

  const handleServiceTypeChange = (value) => {
    const selectedValue = value || "";

    setForm((current) => ({
      ...current,
      serviceType: selectedValue,
      ...(selectedValue === "online"
        ? { location: "" }
        : {}),
    }));

    setErrors((current) => ({
      ...current,
      serviceType: "",
      location: "",
    }));
  };

  // =====================================================
  // IMAGE SELECTION
  // =====================================================

  const handleImages = (e) => {
    const selectedFiles = Array.from(e.target.files || []);

    if (!selectedFiles.length) return;

    const currentCount =
      existingImages.length + images.length;

    if (
      currentCount + selectedFiles.length >
      MAX_IMAGES
    ) {
      setErrors((current) => ({
        ...current,
        images: `You can upload a maximum of ${MAX_IMAGES} images.`,
      }));

      e.target.value = "";
      return;
    }

    const invalidFiles = selectedFiles.filter(
      (file) =>
        !file.type.startsWith("image/") ||
        file.size > MAX_FILE_SIZE
    );

    if (invalidFiles.length > 0) {
      setErrors((current) => ({
        ...current,
        images:
          "Only image files up to 5MB each are allowed.",
      }));
    } else {
      setErrors((current) => ({
        ...current,
        images: "",
      }));
    }

    const validFiles = selectedFiles.filter(
      (file) =>
        file.type.startsWith("image/") &&
        file.size <= MAX_FILE_SIZE
    );

    const filesWithPreview = validFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((current) => [
      ...current,
      ...filesWithPreview,
    ]);

    e.target.value = "";
  };

  // =====================================================
  // REMOVE NEW IMAGE
  // =====================================================

  const removeNewImage = (index) => {
    setImages((current) => {
      const image = current[index];

      if (image?.preview) {
        URL.revokeObjectURL(image.preview);
      }

      return current.filter((_, i) => i !== index);
    });
  };

  // =====================================================
  // REMOVE EXISTING IMAGE
  // =====================================================

  const removeExistingImage = (index) => {
    setExistingImages((current) =>
      current.filter((_, i) => i !== index)
    );
  };

  // =====================================================
  // VALIDATION
  // =====================================================

  const validate = () => {
    const newErrors = {};

    // -------------------------
    // Title
    // -------------------------

    if (!form.title.trim()) {
      newErrors.title =
        "Service title is required.";
    } else if (form.title.trim().length < 3) {
      newErrors.title =
        "Title must be at least 3 characters.";
    }

    // -------------------------
    // Description
    // -------------------------

    if (!form.description.trim()) {
      newErrors.description =
        "Service description is required.";
    } else if (
      form.description.trim().length < 10
    ) {
      newErrors.description =
        "Description must be at least 10 characters.";
    }

    // -------------------------
    // Category
    // -------------------------

    if (!form.category) {
      newErrors.category =
        "Please select a category.";
    }

    // -------------------------
    // Price
    // -------------------------

    if (!form.price) {
      newErrors.price = "Price is required.";
    } else if (
      Number.isNaN(Number(form.price)) ||
      Number(form.price) <= 0
    ) {
      newErrors.price = "Enter a valid price.";
    }

    // -------------------------
    // Duration
    // -------------------------

    const hours = Number(form.hours) || 0;
    const minutes = Number(form.minutes) || 0;

    if (hours < 0 || hours > 24) {
      newErrors.duration =
        "Hours must be between 0 and 24.";
    }

    if (minutes < 0 || minutes > 59) {
      newErrors.minutes =
        "Minutes must be between 0 and 59.";
    }

    const totalDuration =
      hours * 60 + minutes;

    if (totalDuration <= 0) {
      newErrors.duration =
        "Duration must be greater than 0.";
    }

    // -------------------------
    // Service Type
    // -------------------------

    if (!form.serviceType) {
      newErrors.serviceType =
        "Please select a service type.";
    }

    // -------------------------
    // Location
    // -------------------------

    if (
      (form.serviceType === "onsite" ||
        form.serviceType === "hybrid") &&
      !form.location.trim()
    ) {
      newErrors.location =
        "Location is required for this service type.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // =====================================================
  // SUBMIT
  // =====================================================

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    // -----------------------------------------
    // Convert hours + minutes -> total minutes
    // -----------------------------------------

    const totalDurationMinutes =
      (Number(form.hours) || 0) * 60 +
      (Number(form.minutes) || 0);

    const formData = new FormData();

    // -----------------------------------------
    // Basic information
    // -----------------------------------------

    formData.append(
      "title",
      form.title.trim()
    );

    formData.append(
      "description",
      form.description.trim()
    );

    formData.append(
      "category",
      form.category
    );

    // -----------------------------------------
    // Price
    // -----------------------------------------

    formData.append(
      "price",
      form.price
    );

    // -----------------------------------------
    // Duration
    // Backend receives minutes
    // -----------------------------------------

    formData.append(
      "duration",
      String(totalDurationMinutes)
    );

    // -----------------------------------------
    // Service type
    // -----------------------------------------

    formData.append(
      "serviceType",
      form.serviceType
    );

    // -----------------------------------------
    // Location
    // -----------------------------------------

    if (
      form.serviceType === "onsite" ||
      form.serviceType === "hybrid"
    ) {
      formData.append(
        "location",
        form.location.trim()
      );
    }

    // -----------------------------------------
    // Tags
    // -----------------------------------------

    const tags = form.tags
      .split(",")
      .map((tag) =>
        tag.trim().toLowerCase()
      )
      .filter(Boolean);

    formData.append(
      "tags",
      JSON.stringify(tags)
    );

    // -----------------------------------------
    // New images
    // -----------------------------------------

    images.forEach(({ file }) => {
      formData.append("images", file);
    });

    // -----------------------------------------
    // Existing images
    // Only needed in edit mode
    // -----------------------------------------

    if (mode === "edit") {
      formData.append(
        "existingImages",
        JSON.stringify(existingImages)
      );
    }

    onSubmit(formData);
  };

  // =====================================================
  // COUNTS
  // =====================================================

  const imageCount =
    existingImages.length +
    images.length;

  // =====================================================
  // COMMON STYLES
  // =====================================================

  const inputClass =
    "h-11 rounded-xl border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500/20";

  const textareaClass =
    "resize-none rounded-xl border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500/20";

  // =====================================================
  // JSX
  // =====================================================

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* =====================================================
          BASIC INFORMATION
      ===================================================== */}

      <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 bg-gray-50/70 px-5 py-5 sm:px-6">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <FileText size={19} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Basic Information
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Tell customers what service you provide.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-5 p-5 sm:p-6">
          {/* TITLE */}

          <div className="space-y-2">
            <label
              htmlFor="title"
              className="text-sm font-semibold text-gray-800"
            >
              Service Title
              <span className="ml-1 text-red-500">
                *
              </span>
            </label>

            <Input
              id="title"
              name="title"
              type="text"
              value={form.title || ""}
              onChange={handleChange}
              placeholder="e.g. Professional Website Development"
              className={inputClass}
              disabled={submitting}
            />

            {errors.title && (
              <p className="text-xs font-medium text-red-500">
                {errors.title}
              </p>
            )}
          </div>

          {/* DESCRIPTION */}

          <div className="space-y-2">
            <label
              htmlFor="description"
              className="text-sm font-semibold text-gray-800"
            >
              Description
              <span className="ml-1 text-red-500">
                *
              </span>
            </label>

            <Textarea
              id="description"
              name="description"
              value={form.description || ""}
              onChange={handleChange}
              placeholder="Describe your service, what customers get, and what makes your service valuable..."
              className={`${textareaClass} min-h-[140px]`}
              disabled={submitting}
            />

            <div className="flex justify-between gap-4 text-xs text-gray-400">
              <span>
                Give customers enough information
                to understand your service.
              </span>

              <span className="shrink-0">
                {form.description.length}
              </span>
            </div>

            {errors.description && (
              <p className="text-xs font-medium text-red-500">
                {errors.description}
              </p>
            )}
          </div>

          {/* CATEGORY */}

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-800">
              Category
              <span className="ml-1 text-red-500">
                *
              </span>
            </label>

            <Select
              value={form.category || ""}
              onValueChange={(value) => {
                setForm((current) => ({
                  ...current,
                  category: value || "",
                }));

                setErrors((current) => ({
                  ...current,
                  category: "",
                }));
              }}
              disabled={submitting}
            >
              <SelectTrigger
                className={`${inputClass} w-full`}
              >
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>

              <SelectContent>
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <SelectItem
                      key={category._id}
                      value={String(category._id)}
                    >
                      {category.name}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem
                    value="no-category"
                    disabled
                  >
                    No categories available
                  </SelectItem>
                )}
              </SelectContent>
            </Select>

            {errors.category && (
              <p className="text-xs font-medium text-red-500">
                {errors.category}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* =====================================================
          PRICING & DURATION
      ===================================================== */}

      <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 bg-gray-50/70 px-5 py-5 sm:px-6">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
              <IndianRupee size={19} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Pricing & Duration
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Set the price and expected service duration.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-5 p-5 sm:grid-cols-2 sm:p-6">
          {/* PRICE */}

          <div className="space-y-2">
            <label
              htmlFor="price"
              className="text-sm font-semibold text-gray-800"
            >
              Price
              <span className="ml-1 text-red-500">
                *
              </span>
            </label>

            <div className="relative">
              <IndianRupee
                size={17}
                className="absolute left-3.5 top-1/2 z-10 -translate-y-1/2 text-gray-400"
              />

              <Input
                id="price"
                name="price"
                type="number"
                min="1"
                step="1"
                value={form.price || ""}
                onChange={handleChange}
                placeholder="1500"
                className={`${inputClass} pl-10`}
                disabled={submitting}
              />
            </div>

            {errors.price && (
              <p className="text-xs font-medium text-red-500">
                {errors.price}
              </p>
            )}
          </div>

          {/* DURATION */}

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-800">
              Duration
              <span className="ml-1 text-red-500">
                *
              </span>
            </label>

            <div className="grid grid-cols-2 gap-3">
              {/* HOURS */}

              <div className="relative">
                <Clock3
                  size={17}
                  className="absolute left-3.5 top-1/2 z-10 -translate-y-1/2 text-gray-400"
                />

                <Input
                  id="hours"
                  name="hours"
                  type="number"
                  min="0"
                  max="24"
                  value={form.hours || "0"}
                  onChange={handleChange}
                  placeholder="0"
                  className={`${inputClass} pl-10 pr-14`}
                  disabled={submitting}
                />

                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-medium text-gray-400">
                  hr
                </span>
              </div>

              {/* MINUTES */}

              <div className="relative">
                <Input
                  id="minutes"
                  name="minutes"
                  type="number"
                  min="0"
                  max="59"
                  value={form.minutes || "0"}
                  onChange={handleChange}
                  placeholder="0"
                  className={`${inputClass} pr-14`}
                  disabled={submitting}
                />

                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-medium text-gray-400">
                  min
                </span>
              </div>
            </div>

            {errors.duration && (
              <p className="text-xs font-medium text-red-500">
                {errors.duration}
              </p>
            )}

            {errors.minutes && (
              <p className="text-xs font-medium text-red-500">
                {errors.minutes}
              </p>
            )}

            {/* PREVIEW */}

            {(Number(form.hours) > 0 ||
              Number(form.minutes) > 0) && (
              <p className="text-xs text-gray-400">
                Service duration:{" "}
                <span className="font-semibold text-gray-600">
                  {Number(form.hours) > 0 &&
                    `${Number(form.hours)} hr `}
                  {Number(form.minutes) > 0 &&
                    `${Number(form.minutes)} min`}
                </span>
              </p>
            )}
          </div>
        </div>
      </section>

      {/* =====================================================
          SERVICE TYPE
      ===================================================== */}

      <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 bg-gray-50/70 px-5 py-5 sm:px-6">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
              <Layers3 size={19} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Service Type
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Choose how customers can receive your service.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-5 p-5 sm:p-6">
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              {
                value: "online",
                title: "Online",
                description: "Remote service",
              },
              {
                value: "onsite",
                title: "Onsite",
                description: "At customer location",
              },
              {
                value: "hybrid",
                title: "Hybrid",
                description: "Online or onsite",
              },
            ].map((type) => {
              const selected =
                form.serviceType === type.value;

              return (
                <button
                  key={type.value}
                  type="button"
                  disabled={submitting}
                  onClick={() =>
                    handleServiceTypeChange(
                      type.value
                    )
                  }
                  className={`rounded-xl border p-4 text-left transition-all duration-200 ${
                    selected
                      ? "border-blue-500 bg-blue-50 ring-2 ring-blue-100"
                      : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-sm font-bold ${
                        selected
                          ? "text-blue-700"
                          : "text-gray-800"
                      }`}
                    >
                      {type.title}
                    </span>

                    <span
                      className={`h-4 w-4 rounded-full border ${
                        selected
                          ? "border-blue-600 bg-blue-600 ring-4 ring-blue-100"
                          : "border-gray-300 bg-white"
                      }`}
                    />
                  </div>

                  <p className="mt-1 text-xs text-gray-500">
                    {type.description}
                  </p>
                </button>
              );
            })}
          </div>

          {errors.serviceType && (
            <p className="text-xs font-medium text-red-500">
              {errors.serviceType}
            </p>
          )}

          {/* LOCATION */}

          {(form.serviceType === "onsite" ||
            form.serviceType === "hybrid") && (
            <div className="space-y-2">
              <label
                htmlFor="location"
                className="text-sm font-semibold text-gray-800"
              >
                Service Location
                <span className="ml-1 text-red-500">
                  *
                </span>
              </label>

              <div className="relative">
                <MapPin
                  size={17}
                  className="absolute left-3.5 top-3.5 z-10 text-gray-400"
                />

                <Textarea
                  id="location"
                  name="location"
                  value={form.location || ""}
                  onChange={handleChange}
                  placeholder="e.g. Delhi NCR, customer's office, or specific service area"
                  className={`${textareaClass} min-h-[90px] pl-10`}
                  disabled={submitting}
                />
              </div>

              {errors.location && (
                <p className="text-xs font-medium text-red-500">
                  {errors.location}
                </p>
              )}
            </div>
          )}
        </div>
      </section>

      {/* =====================================================
          TAGS
      ===================================================== */}

      <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 bg-gray-50/70 px-5 py-5 sm:px-6">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
              <Tag size={19} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Tags
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Add keywords that help customers discover your
                service.
              </p>
            </div>
          </div>
        </div>

        <div className="p-5 sm:p-6">
          <div className="relative">
            <Tag
              size={17}
              className="absolute left-3.5 top-1/2 z-10 -translate-y-1/2 text-gray-400"
            />

            <Input
              id="tags"
              name="tags"
              type="text"
              value={form.tags || ""}
              onChange={handleChange}
              placeholder="React, Web Development, Frontend"
              className={`${inputClass} pl-10`}
              disabled={submitting}
            />
          </div>

          <p className="mt-2 text-xs text-gray-400">
            Separate multiple tags with commas.
          </p>
        </div>
      </section>

      {/* =====================================================
          IMAGES
      ===================================================== */}

      <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 bg-gray-50/70 px-5 py-5 sm:px-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-pink-100 text-pink-600">
                <ImagePlus size={19} />
              </div>

              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Service Images
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Add up to 5 high-quality images.
                </p>
              </div>
            </div>

            <span className="shrink-0 rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
              {imageCount}/{MAX_IMAGES}
            </span>
          </div>
        </div>

        <div className="p-5 sm:p-6">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            hidden
            onChange={handleImages}
            disabled={submitting}
          />

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
            {/* EXISTING IMAGES */}

            {existingImages.map((image, index) => (
              <div
                key={`existing-${index}`}
                className="group relative aspect-square overflow-hidden rounded-xl border border-gray-200 bg-gray-100"
              >
                <img
                  src={image}
                  alt={`Service ${index + 1}`}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />

                <button
                  type="button"
                  onClick={() =>
                    removeExistingImage(index)
                  }
                  disabled={submitting}
                  className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur transition hover:bg-red-600"
                >
                  <X size={14} />
                </button>
              </div>
            ))}

            {/* NEW IMAGES */}

            {images.map((image, index) => (
              <div
                key={image.preview}
                className="group relative aspect-square overflow-hidden rounded-xl border border-gray-200 bg-gray-100"
              >
                <img
                  src={image.preview}
                  alt={`New service ${index + 1}`}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />

                <button
                  type="button"
                  onClick={() =>
                    removeNewImage(index)
                  }
                  disabled={submitting}
                  className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur transition hover:bg-red-600"
                >
                  <X size={14} />
                </button>
              </div>
            ))}

            {/* UPLOAD */}

            {imageCount < MAX_IMAGES && (
              <button
                type="button"
                disabled={submitting}
                onClick={() =>
                  fileInputRef.current?.click()
                }
                className="flex aspect-square flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 text-gray-500 transition hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600"
              >
                <ImagePlus className="h-6 w-6" />

                <span className="mt-2 text-xs font-semibold">
                  Add Image
                </span>
              </button>
            )}
          </div>

          <div className="mt-4 flex items-start gap-2 rounded-xl bg-gray-50 p-3">
            <Upload className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />

            <p className="text-xs leading-5 text-gray-500">
              JPG, PNG or WEBP. Maximum 5MB per image.
              You can upload up to 5 images.
            </p>
          </div>

          {errors.images && (
            <p className="mt-2 text-xs font-medium text-red-500">
              {errors.images}
            </p>
          )}
        </div>
      </section>

      {/* =====================================================
          ACTIONS
      ===================================================== */}

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="outline"
          disabled={submitting}
          className="h-11 rounded-xl border-gray-300 px-6 text-gray-700"
          onClick={() => window.history.back()}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          disabled={submitting}
          className="h-11 rounded-xl bg-blue-600 px-7 font-semibold text-white shadow-sm hover:bg-blue-700"
        >
          {submitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />

              {mode === "edit"
                ? "Saving Changes..."
                : "Creating Service..."}
            </>
          ) : mode === "edit" ? (
            "Save Changes"
          ) : (
            "Create Service"
          )}
        </Button>
      </div>
    </form>
  );
};

export default ServiceForm;