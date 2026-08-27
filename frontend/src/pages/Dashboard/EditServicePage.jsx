import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  BriefcaseBusiness,
  ImagePlus,
  Loader2,
  Save,
  X,
} from "lucide-react";
import { toast } from "sonner";

import ProviderSidebar from "../../components/provider/ProviderSidebar";
import ProviderNavbar from "../../components/provider/ProviderNavbar";

import {
  getServiceById,
  updateService,
} from "../../api/service.api";

const EditServicePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    duration: "",
    serviceType: "online",
    location: "",
    tags: [],
    customFields: {},
  });

  const [categories, setCategories] = useState([]);

  const [tagInput, setTagInput] = useState("");

  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);

  // =========================================================
  // FETCH SERVICE
  // =========================================================

  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getServiceById(id);

        const service = response?.data;

        if (!service) {
          throw new Error("Service not found");
        }

        setForm({
          title: service.title || "",
          description: service.description || "",
          category:
            typeof service.category === "object"
              ? service.category?._id || ""
              : service.category || "",
          price: service.price ?? "",
          duration: service.duration ?? "",
          serviceType: service.serviceType || "online",

          // IMPORTANT:
          // location can be object OR string
          location: service.location || "",

          tags: Array.isArray(service.tags)
            ? service.tags
            : [],

          customFields:
            service.customFields &&
            typeof service.customFields === "object"
              ? service.customFields
              : {},
        });

        setExistingImages(
          Array.isArray(service.images)
            ? service.images
            : []
        );
      } catch (error) {
        console.error(
          "Failed to fetch service:",
          error
        );

        const message =
          error?.response?.data?.message ||
          error?.message ||
          "Failed to load service.";

        setError(message);
        toast.error(message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchService();
    }
  }, [id]);

  // =========================================================
  // INPUT CHANGE
  // =========================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  // =========================================================
  // LOCATION CHANGE
  // =========================================================

  const handleLocationChange = (e) => {
    const { name, value } = e.target;

    setForm((current) => {
      const currentLocation =
        current.location &&
        typeof current.location === "object"
          ? current.location
          : {};

      return {
        ...current,
        location: {
          ...currentLocation,
          [name]: value,
        },
      };
    });
  };

  // =========================================================
  // TAGS
  // =========================================================

  const addTag = () => {
    const tag = tagInput.trim().toLowerCase();

    if (!tag) return;

    if (form.tags.includes(tag)) {
      setTagInput("");
      return;
    }

    setForm((current) => ({
      ...current,
      tags: [...current.tags, tag],
    }));

    setTagInput("");
  };

  const removeTag = (tagToRemove) => {
    setForm((current) => ({
      ...current,
      tags: current.tags.filter(
        (tag) => tag !== tagToRemove
      ),
    }));
  };

  const handleTagKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  // =========================================================
  // IMAGE SELECTION
  // =========================================================

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || []);

    if (!files.length) return;

    setNewImages((current) => [
      ...current,
      ...files,
    ]);

    // allow selecting same file again
    e.target.value = "";
  };

  const removeNewImage = (index) => {
    setNewImages((current) =>
      current.filter((_, i) => i !== index)
    );
  };

  // =========================================================
  // EXISTING IMAGE REMOVE
  // =========================================================

  const removeExistingImage = (index) => {
    setExistingImages((current) =>
      current.filter((_, i) => i !== index)
    );
  };

  // =========================================================
  // LOCATION HELPER
  // =========================================================

  const getLocationValue = () => {
    if (!form.location) {
      return "";
    }

    if (typeof form.location === "string") {
      return form.location;
    }

    if (typeof form.location === "object") {
      return (
        form.location.address ||
        ""
      );
    }

    return "";
  };

  const getLocationObject = () => {
    if (!form.location) {
      return null;
    }

    if (typeof form.location === "string") {
      return {
        address: form.location.trim(),
      };
    }

    if (typeof form.location === "object") {
      return {
        ...form.location,
        address:
          form.location.address?.trim() || "",
      };
    }

    return null;
  };

  // =========================================================
  // VALIDATION
  // =========================================================

  const validateForm = () => {
    if (!form.title?.trim()) {
      toast.error("Service title is required");
      return false;
    }

    if (!form.description?.trim()) {
      toast.error("Service description is required");
      return false;
    }

    if (!form.category) {
      toast.error("Please select a category");
      return false;
    }

    const price = Number(form.price);

    if (!form.price || Number.isNaN(price) || price <= 0) {
      toast.error("Please enter a valid price");
      return false;
    }

    const duration = Number(form.duration);

    if (
      !form.duration ||
      Number.isNaN(duration) ||
      duration <= 0
    ) {
      toast.error("Please enter a valid duration");
      return false;
    }

    const allowedTypes = [
      "online",
      "onsite",
      "hybrid",
    ];

    if (!allowedTypes.includes(form.serviceType)) {
      toast.error("Invalid service type");
      return false;
    }

    // =====================================================
    // LOCATION VALIDATION
    // =====================================================

    if (
      form.serviceType === "onsite" ||
      form.serviceType === "hybrid"
    ) {
      const location = getLocationObject();

      if (!location) {
        toast.error("Location is required");
        return false;
      }

      if (!location.address?.trim()) {
        toast.error("Location address is required");
        return false;
      }
    }

    return true;
  };

  // =========================================================
  // SUBMIT
  // =========================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (submitting) return;

    if (!validateForm()) {
      return;
    }

    try {
      setSubmitting(true);

      const formData = new FormData();

      // =====================================================
      // BASIC FIELDS
      // =====================================================

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

      formData.append(
        "price",
        String(Number(form.price))
      );

      formData.append(
        "duration",
        String(Number(form.duration))
      );

      formData.append(
        "serviceType",
        form.serviceType
      );

      // =====================================================
      // LOCATION
      // =====================================================

      if (
        form.serviceType === "onsite" ||
        form.serviceType === "hybrid"
      ) {
        const location = getLocationObject();

        formData.append(
          "location",
          JSON.stringify(location)
        );
      } else {
        // For online service send empty object/string
        formData.append(
          "location",
          JSON.stringify({})
        );
      }

      // =====================================================
      // TAGS
      // =====================================================

      form.tags.forEach((tag) => {
        formData.append("tags", tag);
      });

      // =====================================================
      // CUSTOM FIELDS
      // =====================================================

      formData.append(
        "customFields",
        JSON.stringify(
          form.customFields || {}
        )
      );

      // =====================================================
      // EXISTING IMAGES
      // =====================================================

      formData.append(
        "existingImages",
        JSON.stringify(existingImages)
      );

      // =====================================================
      // NEW IMAGES
      // =====================================================

      newImages.forEach((file) => {
        formData.append(
          "images",
          file
        );
      });

      // =====================================================
      // API
      // =====================================================

      const response = await updateService(
        id,
        formData
      );

      toast.success(
        response?.message ||
          "Service updated successfully"
      );

      navigate("/provider/services");
    } catch (error) {
      console.error(
        "Failed to update service:",
        error
      );

      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to update service.";

      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  // =========================================================
  // LOADING UI
  // =========================================================

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50">
        <ProviderNavbar />

        <div className="flex">
          <ProviderSidebar />

          <section className="min-w-0 flex-1 p-5 sm:p-6 lg:p-8">
            <div className="flex min-h-[70vh] items-center justify-center">
              <div className="flex flex-col items-center">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />

                <p className="mt-4 text-sm text-gray-500">
                  Loading service...
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    );
  }

  // =========================================================
  // ERROR UI
  // =========================================================

  if (error) {
    return (
      <main className="min-h-screen bg-gray-50">
        <ProviderNavbar />

        <div className="flex">
          <ProviderSidebar />

          <section className="min-w-0 flex-1 p-5 sm:p-6 lg:p-8">
            <div className="flex min-h-[70vh] items-center justify-center">
              <div className="max-w-md rounded-2xl border border-red-200 bg-white p-8 text-center shadow-sm">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50">
                  <BriefcaseBusiness className="h-7 w-7 text-red-600" />
                </div>

                <h2 className="mt-5 text-xl font-bold text-gray-900">
                  Unable to load service
                </h2>

                <p className="mt-2 text-sm text-red-600">
                  {error}
                </p>

                <button
                  type="button"
                  onClick={() =>
                    navigate(
                      "/provider/services"
                    )
                  }
                  className="mt-6 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  Back to Services
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
    );
  }

  // =========================================================
  // MAIN UI
  // =========================================================

  return (
    <main className="min-h-screen bg-gray-50">
      <ProviderNavbar />

      <div className="flex">
        <ProviderSidebar />

        <section className="min-w-0 flex-1 p-5 sm:p-6 lg:p-8">
          {/* =================================================
              HEADER
          ================================================= */}

          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <button
                type="button"
                onClick={() =>
                  navigate(
                    "/provider/services"
                  )
                }
                className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-gray-900"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to services
              </button>

              <p className="text-sm font-semibold text-blue-600">
                Provider Workspace
              </p>

              <h1 className="mt-1 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                Edit Service
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                Update your service details and availability.
              </p>
            </div>
          </div>

          {/* =================================================
              FORM
          ================================================= */}

          <form
            onSubmit={handleSubmit}
            className="mx-auto max-w-5xl"
          >
            <div className="space-y-6">
              {/* =================================================
                  BASIC INFORMATION
              ================================================= */}

              <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                <div className="mb-6">
                  <h2 className="text-lg font-bold text-gray-900">
                    Basic Information
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Update the basic information about your service.
                  </p>
                </div>

                <div className="space-y-5">
                  {/* TITLE */}

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Service Title
                    </label>

                    <input
                      type="text"
                      name="title"
                      value={form.title}
                      onChange={handleChange}
                      placeholder="e.g. Professional Web Development"
                      className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  {/* DESCRIPTION */}

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Description
                    </label>

                    <textarea
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Describe your service..."
                      className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  {/* CATEGORY */}

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Category
                    </label>

                    <input
                      type="text"
                      value={form.category}
                      disabled
                      className="h-11 w-full cursor-not-allowed rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-500"
                    />

                    <p className="mt-1.5 text-xs text-gray-400">
                      Category ID loaded from the existing service.
                    </p>
                  </div>

                  {/* PRICE + DURATION */}

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-700">
                        Price (₹)
                      </label>

                      <input
                        type="number"
                        name="price"
                        min="1"
                        value={form.price}
                        onChange={handleChange}
                        placeholder="1000"
                        className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-700">
                        Duration (minutes)
                      </label>

                      <input
                        type="number"
                        name="duration"
                        min="1"
                        value={form.duration}
                        onChange={handleChange}
                        placeholder="60"
                        className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* =================================================
                  SERVICE TYPE
              ================================================= */}

              <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                <div className="mb-6">
                  <h2 className="text-lg font-bold text-gray-900">
                    Service Type
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Choose how customers can receive your service.
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    {
                      value: "online",
                      title: "Online",
                      description:
                        "Provide the service remotely.",
                    },
                    {
                      value: "onsite",
                      title: "Onsite",
                      description:
                        "Visit the customer's location.",
                    },
                    {
                      value: "hybrid",
                      title: "Hybrid",
                      description:
                        "Offer both online and onsite.",
                    },
                  ].map((type) => (
                    <label
                      key={type.value}
                      className={`cursor-pointer rounded-xl border p-4 transition ${
                        form.serviceType === type.value
                          ? "border-blue-500 bg-blue-50 ring-2 ring-blue-100"
                          : "border-gray-200 bg-white hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="serviceType"
                        value={type.value}
                        checked={
                          form.serviceType ===
                          type.value
                        }
                        onChange={handleChange}
                        className="sr-only"
                      />

                      <div className="flex items-start gap-3">
                        <div
                          className={`mt-0.5 h-4 w-4 rounded-full border-4 ${
                            form.serviceType ===
                            type.value
                              ? "border-blue-600"
                              : "border-gray-300"
                          }`}
                        />

                        <div>
                          <p className="text-sm font-semibold text-gray-900">
                            {type.title}
                          </p>

                          <p className="mt-1 text-xs leading-5 text-gray-500">
                            {type.description}
                          </p>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>

                {/* =================================================
                    LOCATION
                ================================================= */}

                {(form.serviceType === "onsite" ||
                  form.serviceType === "hybrid") && (
                  <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-4">
                    <div className="mb-4">
                      <h3 className="text-sm font-bold text-gray-900">
                        Service Location
                      </h3>

                      <p className="mt-1 text-xs text-gray-500">
                        Tell customers where you provide the onsite service.
                      </p>
                    </div>

                    <div className="space-y-4">
                      {/* ADDRESS */}

                      <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                          Address
                        </label>

                        <input
                          type="text"
                          name="address"
                          value={getLocationValue()}
                          onChange={handleLocationChange}
                          placeholder="Enter service address"
                          className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                      </div>

                      {/* CITY + STATE */}

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label className="mb-2 block text-sm font-semibold text-gray-700">
                            City
                          </label>

                          <input
                            type="text"
                            name="city"
                            value={
                              typeof form.location ===
                              "object"
                                ? form.location?.city ||
                                  ""
                                : ""
                            }
                            onChange={handleLocationChange}
                            placeholder="City"
                            className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                          />
                        </div>

                        <div>
                          <label className="mb-2 block text-sm font-semibold text-gray-700">
                            State
                          </label>

                          <input
                            type="text"
                            name="state"
                            value={
                              typeof form.location ===
                              "object"
                                ? form.location?.state ||
                                  ""
                                : ""
                            }
                            onChange={handleLocationChange}
                            placeholder="State"
                            className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                          />
                        </div>
                      </div>

                      {/* PINCODE */}

                      <div className="sm:max-w-xs">
                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                          Pincode
                        </label>

                        <input
                          type="text"
                          name="pincode"
                          value={
                            typeof form.location ===
                            "object"
                              ? form.location?.pincode ||
                                ""
                              : ""
                          }
                          onChange={handleLocationChange}
                          placeholder="Pincode"
                          className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* =================================================
                  TAGS
              ================================================= */}

              <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                <div className="mb-6">
                  <h2 className="text-lg font-bold text-gray-900">
                    Tags
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Add keywords that help customers find your service.
                  </p>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) =>
                      setTagInput(e.target.value)
                    }
                    onKeyDown={handleTagKeyDown}
                    placeholder="e.g. react"
                    className="h-11 min-w-0 flex-1 rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />

                  <button
                    type="button"
                    onClick={addTag}
                    className="rounded-xl bg-gray-900 px-5 text-sm font-semibold text-white transition hover:bg-gray-800"
                  >
                    Add
                  </button>
                </div>

                {form.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {form.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700"
                      >
                        #{tag}

                        <button
                          type="button"
                          onClick={() =>
                            removeTag(tag)
                          }
                          className="rounded-full p-0.5 hover:bg-blue-100"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* =================================================
                  IMAGES
              ================================================= */}

              <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                <div className="mb-6">
                  <h2 className="text-lg font-bold text-gray-900">
                    Service Images
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Update the images customers see for this service.
                  </p>
                </div>

                {/* EXISTING IMAGES */}

                {existingImages.length > 0 && (
                  <div className="mb-6">
                    <p className="mb-3 text-sm font-semibold text-gray-700">
                      Current Images
                    </p>

                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                      {existingImages.map(
                        (image, index) => (
                          <div
                            key={`${image}-${index}`}
                            className="group relative aspect-square overflow-hidden rounded-xl border border-gray-200"
                          >
                            <img
                              src={image}
                              alt={`Service ${index + 1}`}
                              className="h-full w-full object-cover"
                            />

                            <button
                              type="button"
                              onClick={() =>
                                removeExistingImage(
                                  index
                                )
                              }
                              className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-red-600 shadow-sm backdrop-blur transition hover:bg-white"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}

                {/* NEW IMAGES */}

                {newImages.length > 0 && (
                  <div className="mb-6">
                    <p className="mb-3 text-sm font-semibold text-gray-700">
                      New Images
                    </p>

                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                      {newImages.map(
                        (file, index) => (
                          <div
                            key={`${file.name}-${index}`}
                            className="group relative aspect-square overflow-hidden rounded-xl border border-gray-200 bg-gray-100"
                          >
                            <img
                              src={URL.createObjectURL(
                                file
                              )}
                              alt={file.name}
                              className="h-full w-full object-cover"
                            />

                            <button
                              type="button"
                              onClick={() =>
                                removeNewImage(
                                  index
                                )
                              }
                              className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-red-600 shadow-sm backdrop-blur transition hover:bg-white"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}

                <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 px-6 py-10 text-center transition hover:border-blue-300 hover:bg-blue-50/50">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm">
                    <ImagePlus className="h-6 w-6 text-gray-400" />
                  </div>

                  <p className="mt-4 text-sm font-semibold text-gray-700">
                    Add new images
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    PNG, JPG or WEBP
                  </p>

                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    multiple
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>

              {/* =================================================
                  ACTIONS
              ================================================= */}

              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  disabled={submitting}
                  onClick={() =>
                    navigate(
                      "/provider/services"
                    )
                  }
                  className="h-11 rounded-xl border border-gray-200 bg-white px-6 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      Update Service
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
};

export default EditServicePage;