import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import {
  Plus,
  Search,
  BriefcaseBusiness,
} from "lucide-react";

import { toast } from "sonner";

import ProviderSidebar from "../../components/provider/ProviderSidebar";
import ProviderNavbar from "../../components/provider/ProviderNavbar";
import ServiceCard from "../../components/provider/ServiceCard";
import DeleteServiceDialog from "../../components/provider/DeleteServiceDialog";

import {
  getMyServices,
  deleteService,
} from "../../api/service.api";

const ProviderServicesPage = () => {
  const [services, setServices] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  /*
    ID of service currently being deleted
  */
  const [deletingId, setDeletingId] = useState(null);

  /*
    Service selected for deletion confirmation
  */
  const [selectedService, setSelectedService] =
    useState(null);

  /*
    Confirmation dialog state
  */
  const [deleteDialogOpen, setDeleteDialogOpen] =
    useState(false);

  {/* =====================================================
      FETCH SERVICES
  ====================================================== */}

  const fetchServices = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getMyServices();

      setServices(response?.data || []);
    } catch (error) {
      console.error(
        "Failed to fetch services:",
        error
      );

      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to load your services.";

      setError(message);

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  {/* =====================================================
      INITIAL FETCH
  ====================================================== */}

  useEffect(() => {
    fetchServices();
  }, []);

  {/* =====================================================
      OPEN DELETE CONFIRMATION
  ====================================================== */}

  const handleDeleteRequest = (serviceId) => {
    /*
      Find the actual service from the services array.
    */

    const service = services.find(
      (item) => item._id === serviceId
    );

    if (!service) {
      toast.error("Service not found.");
      return;
    }

    /*
      Store complete service so dialog can show
      service title.
    */

    setSelectedService(service);

    /*
      Open confirmation dialog.
    */

    setDeleteDialogOpen(true);
  };

  {/* =====================================================
      CONFIRM DELETE
  ====================================================== */}

  const handleDeleteConfirm = async () => {
    /*
      Safety check
    */

    if (!selectedService?._id) {
      toast.error("Invalid service.");
      return;
    }

    const serviceId = selectedService._id;

    try {
      /*
        Start loading for this specific service
      */

      setDeletingId(serviceId);

      /*
        IMPORTANT:
        API receives ONLY service ID.
      */

      await deleteService(serviceId);

      /*
        Remove service from UI
      */

      setServices((currentServices) =>
        currentServices.filter(
          (service) => service._id !== serviceId
        )
      );

      toast.success(
        "Service deleted successfully"
      );

      /*
        Close dialog
      */

      setDeleteDialogOpen(false);

      /*
        Clear selected service
      */

      setSelectedService(null);
    } catch (error) {
      console.error(
        "Failed to delete service:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to delete service."
      );
    } finally {
      setDeletingId(null);
    }
  };

  {/* =====================================================
      SEARCH
  ====================================================== */}

  const filteredServices = services.filter(
    (service) =>
      service.title
        ?.toLowerCase()
        .includes(search.toLowerCase())
  );

  {/* =====================================================
      UI
  ====================================================== */}

  return (
    <main className="min-h-screen bg-gray-50">
      {/* =================================================
          NAVBAR
      ================================================= */}

      <ProviderNavbar />

      <div className="flex">
        {/* =================================================
            SIDEBAR
        ================================================= */}

        <ProviderSidebar />

        {/* =================================================
            MAIN CONTENT
        ================================================= */}

        <section className="min-w-0 flex-1 p-5 sm:p-6 lg:p-8">
          {/* =================================================
              HEADER
          ================================================= */}

          <div
            className="
              flex flex-col gap-5
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            <div>
              <p className="text-sm font-semibold text-blue-600">
                Provider Workspace
              </p>

              <h1
                className="
                  mt-1
                  text-2xl
                  font-bold
                  tracking-tight
                  text-gray-900
                  sm:text-3xl
                "
              >
                My Services
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                Manage the services you offer to
                customers.
              </p>
            </div>

            {/* Create Service */}

            <Link
              to="/provider/services/create"
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-blue-600
                px-5
                py-3
                text-sm
                font-semibold
                text-white
                shadow-sm
                transition
                hover:bg-blue-700
              "
            >
              <Plus size={18} />

              Create Service
            </Link>
          </div>

          {/* =================================================
              SEARCH
          ================================================= */}

          <div className="mt-8">
            <div className="relative max-w-xl">
              <Search
                size={18}
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-gray-400
                "
              />

              <input
                type="text"
                placeholder="Search your services..."
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                className="
                  h-12
                  w-full
                  rounded-xl
                  border
                  border-gray-200
                  bg-white
                  pl-11
                  pr-4
                  text-sm
                  text-gray-900
                  outline-none
                  transition
                  placeholder:text-gray-400
                  focus:border-blue-500
                  focus:ring-2
                  focus:ring-blue-100
                "
              />
            </div>
          </div>

          {/* =================================================
              LOADING
          ================================================= */}

          {loading && (
            <div
              className="
                mt-8
                grid
                gap-6
                sm:grid-cols-2
                xl:grid-cols-3
              "
            >
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="
                    overflow-hidden
                    rounded-2xl
                    border
                    border-gray-200
                    bg-white
                  "
                >
                  <div
                    className="
                      h-48
                      animate-pulse
                      bg-gray-200
                    "
                  />

                  <div className="space-y-4 p-5">
                    <div
                      className="
                        h-5
                        w-3/4
                        animate-pulse
                        rounded
                        bg-gray-200
                      "
                    />

                    <div
                      className="
                        h-4
                        w-1/2
                        animate-pulse
                        rounded
                        bg-gray-200
                      "
                    />

                    <div
                      className="
                        h-10
                        w-full
                        animate-pulse
                        rounded
                        bg-gray-200
                      "
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* =================================================
              ERROR
          ================================================= */}

          {!loading && error && (
            <div
              className="
                mt-8
                rounded-2xl
                border
                border-red-200
                bg-white
                p-8
                text-center
              "
            >
              <p className="font-semibold text-gray-900">
                Unable to load services
              </p>

              <p className="mt-2 text-sm text-red-600">
                {error}
              </p>

              <button
                type="button"
                onClick={fetchServices}
                className="
                  mt-5
                  rounded-xl
                  bg-blue-600
                  px-5
                  py-2.5
                  text-sm
                  font-semibold
                  text-white
                  hover:bg-blue-700
                "
              >
                Try Again
              </button>
            </div>
          )}

          {/* =================================================
              EMPTY STATE
          ================================================= */}

          {!loading &&
            !error &&
            filteredServices.length === 0 && (
              <div
                className="
                  mt-8
                  flex
                  min-h-[350px]
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  border-dashed
                  border-gray-300
                  bg-white
                  p-8
                "
              >
                <div className="max-w-sm text-center">
                  {/* Icon */}

                  <div
                    className="
                      mx-auto
                      flex
                      h-14
                      w-14
                      items-center
                      justify-center
                      rounded-2xl
                      bg-blue-50
                      text-blue-600
                    "
                  >
                    <BriefcaseBusiness size={26} />
                  </div>

                  {/* Heading */}

                  <h2
                    className="
                      mt-5
                      text-xl
                      font-bold
                      text-gray-900
                    "
                  >
                    No services found
                  </h2>

                  {/* Description */}

                  <p
                    className="
                      mt-2
                      text-sm
                      leading-6
                      text-gray-500
                    "
                  >
                    {search
                      ? "Try searching with a different service name."
                      : "You haven't created any services yet."}
                  </p>

                  {/* Create */}

                  {!search && (
                    <Link
                      to="/provider/services/create"
                      className="
                        mt-6
                        inline-flex
                        items-center
                        gap-2
                        rounded-xl
                        bg-blue-600
                        px-5
                        py-3
                        text-sm
                        font-semibold
                        text-white
                        hover:bg-blue-700
                      "
                    >
                      <Plus size={18} />

                      Create your first service
                    </Link>
                  )}
                </div>
              </div>
            )}

          {/* =================================================
              SERVICES
          ================================================= */}

          {!loading &&
            !error &&
            filteredServices.length > 0 && (
              <div
                className="
                  mt-8
                  grid
                  gap-6
                  sm:grid-cols-2
                  xl:grid-cols-3
                "
              >
                {filteredServices.map((service) => (
                  <ServiceCard
                    key={service._id}
                    service={service}
                    onDelete={handleDeleteRequest}
                    deleting={
                      deletingId === service._id
                    }
                  />
                ))}
              </div>
            )}
        </section>
      </div>

      {/* =====================================================
          DELETE CONFIRMATION DIALOG
      ====================================================== */}

      <DeleteServiceDialog
        open={deleteDialogOpen}
        onOpenChange={(open) => {
          /*
            Don't allow dialog to be closed while
            deletion API is running.
          */

          if (deletingId) return;

          setDeleteDialogOpen(open);

          /*
            If user closes dialog without deleting,
            clear selected service.
          */

          if (!open) {
            setSelectedService(null);
          }
        }}
        onConfirm={handleDeleteConfirm}
        loading={Boolean(deletingId)}
        serviceTitle={selectedService?.title}
      />
    </main>
  );
};

export default ProviderServicesPage;