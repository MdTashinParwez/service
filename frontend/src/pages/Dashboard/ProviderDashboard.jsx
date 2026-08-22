import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

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

      setBookings(
        bookingsResponse?.data?.bookings || []
      );
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




  if (loading) {
    return (
      
      <main className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">

          <Loader2
            size={36}
            className="mx-auto animate-spin text-blue-600"
          />

          <p className="mt-4 text-sm font-medium text-gray-600">
            Loading provider dashboard...
          </p>

        </div>
      </main>
    );
  }

 

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6">

        <div className="w-full max-w-md rounded-2xl border border-red-200 bg-white p-8 text-center shadow-sm">

          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
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
            className="mt-6 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Try Again
          </button>

        </div>

      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">

      <ProviderNavbar />

      <div className="flex">

        <ProviderSidebar />

        <section className="min-w-0 flex-1 p-5 sm:p-6 lg:p-8">

          <DashboardStats
            provider={provider}
          />

          <RecentBookings
            bookings={bookings}
          />

        </section>

      </div>

    </main>
  );
};

export default ProviderDashboard