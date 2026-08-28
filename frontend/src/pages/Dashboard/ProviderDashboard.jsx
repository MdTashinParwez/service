import { useEffect, useState } from "react";
import { Loader2, LayoutDashboard } from "lucide-react";

import ProviderSidebar from "../../components/provider/ProviderSidebar";
import ProviderNavbar from "../../components/provider/ProviderNavbar";
import DashboardStats from "../../components/provider/DashboardStats";
import RecentBookings from "../../components/provider/RecentBookings";

import { getCurrentProvider } from "../../api/provider.api";
import { getProviderBookings } from "../../api/booking.api";

const ProviderDashboard = () => {
  const [provider, setProvider] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =====================================================
  // FETCH DASHBOARD DATA
  // =====================================================
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        const [providerResponse, bookingsResponse] = await Promise.all([
          getCurrentProvider(),
          getProviderBookings(1, 5),
        ]);

        setProvider(providerResponse?.data || null);

        setBookings(bookingsResponse?.data?.bookings || []);
      } catch (error) {
        console.error("Failed to load provider dashboard:", error);

        setError(
          error?.response?.data?.message ||
            error?.message ||
            "Failed to load provider dashboard."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  // =====================================================
  // LOADING
  // =====================================================
  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
        <div className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50">
            <Loader2
              size={28}
              className="animate-spin text-blue-600"
            />
          </div>

          <h1 className="mt-5 text-lg font-bold text-gray-900">
            Loading dashboard
          </h1>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            Please wait while we prepare your provider workspace.
          </p>
        </div>
      </main>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================
  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
        <div className="w-full max-w-md rounded-2xl border border-red-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-lg font-bold text-red-600">
            !
          </div>

          <h1 className="mt-4 text-xl font-bold text-gray-900">
            Unable to load dashboard
          </h1>

          <p className="mt-2 text-sm leading-6 text-red-600">
            {error}
          </p>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="
              mt-6 inline-flex items-center justify-center
              rounded-xl bg-blue-600 px-5 py-2.5
              text-sm font-semibold text-white
              shadow-sm transition
              hover:bg-blue-700
              focus:outline-none focus:ring-2
              focus:ring-blue-200
            "
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  // =====================================================
  // DASHBOARD
  // =====================================================
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
        <section className="min-w-0 flex-1">
          <div className="mx-auto w-full max-w-[1600px] p-5 sm:p-6 lg:p-8">
            {/* =================================================
                PAGE HEADER
            ================================================= */}
            <div className="mb-8">
              <div className="flex items-start gap-4">
                <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 sm:flex">
                  <LayoutDashboard size={21} />
                </div>

                <div>
                  <p className="text-sm font-semibold text-blue-600">
                    Provider Workspace
                  </p>

                  <h1 className="mt-1 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                    Dashboard
                  </h1>

                  <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
                    Keep track of your services, bookings, and provider
                    activity from one place.
                  </p>
                </div>
              </div>
            </div>

            {/* =================================================
                STATS
            ================================================= */}
            <div>
              <DashboardStats provider={provider} />
            </div>

            {/* =================================================
                RECENT BOOKINGS
            ================================================= */}
            <div className="mt-6">
              <RecentBookings bookings={bookings} />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ProviderDashboard