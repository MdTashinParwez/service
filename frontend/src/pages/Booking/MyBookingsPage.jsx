import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  RefreshCw,
} from "lucide-react";
import { toast } from "sonner";

import BookingCard from "../../components/booking/BookingCard";
import { getMyBookings } from "../../api/booking.api";

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalBookings: 0,
  });

  const fetchBookings = async (currentPage = 1) => {
    try {
      setLoading(true);
      setError("");

      const response = await getMyBookings(currentPage, 10);

      const data = response.data;

      setBookings(data.bookings || []);

      setPagination({
        currentPage: data.currentPage,
        totalPages: data.totalPages,
        totalBookings: data.totalBookings,
      });
    } catch (error) {
      console.error("Failed to fetch bookings:", error);

      const message =
        error?.response?.data?.message ||
        "Failed to load your bookings.";

      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings(page);
  }, [page]);

  const handleRetry = () => {
    fetchBookings(page);
  };

  return (
    <main className="min-h-screen bg-gray-50">

      {/* Header */}

      <section className="border-b bg-white">

        <div className="mx-auto max-w-7xl px-6 py-8 sm:py-10">

          <p className="text-sm font-medium text-blue-600">
            Customer Dashboard
          </p>

          <div className="mt-1 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

            <div>

              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                My Bookings
              </h1>

              <p className="mt-2 text-gray-600">
                Track and manage all your service bookings.
              </p>

            </div>

            {!loading && !error && (
              <div className="flex items-center gap-2 text-sm text-gray-500">

                <ClipboardList size={18} />

                <span>
                  {pagination.totalBookings}{" "}
                  {pagination.totalBookings === 1
                    ? "Booking"
                    : "Bookings"}
                </span>

              </div>
            )}

          </div>

        </div>

      </section>

      {/* Content */}

      <section className="mx-auto max-w-7xl px-6 py-8 sm:py-10">

        {/* Loading */}

        {loading && (

          <div className="space-y-5">

            {[1, 2, 3].map((item) => (

              <div
                key={item}
                className="animate-pulse rounded-2xl border bg-white p-6 shadow-sm"
              >

                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

                  <div className="space-y-4">

                    <div className="h-6 w-48 rounded bg-gray-200" />

                    <div className="h-4 w-64 rounded bg-gray-200" />

                    <div className="h-4 w-40 rounded bg-gray-200" />

                  </div>

                  <div className="h-10 w-32 rounded-xl bg-gray-200" />

                </div>

              </div>

            ))}

          </div>

        )}

        {/* Error */}

        {!loading && error && (

          <div className="rounded-2xl border bg-white p-10 text-center shadow-sm">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50">

              <RefreshCw
                size={26}
                className="text-red-600"
              />

            </div>

            <h2 className="mt-5 text-xl font-bold text-gray-900">
              Unable to Load Bookings
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              {error}
            </p>

            <button
              onClick={handleRetry}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >

              <RefreshCw size={17} />

              Try Again

            </button>

          </div>

        )}

        {/* Empty */}

        {!loading && !error && bookings.length === 0 && (

          <div className="rounded-2xl border bg-white px-6 py-16 text-center shadow-sm">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-50">

              <CalendarDays
                size={30}
                className="text-blue-600"
              />

            </div>

            <h2 className="mt-5 text-2xl font-bold text-gray-900">
              No Bookings Yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-gray-500">
              You haven't made any bookings yet. Find a service and book
              a provider to get started.
            </p>

            <Link
              to="/services"
              className="mt-6 inline-flex rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Explore Services
            </Link>

          </div>

        )}

        {/* Booking List */}

        {!loading && !error && bookings.length > 0 && (

          <>

            <div className="space-y-5">

              {bookings.map((booking) => (

                <BookingCard
                  key={booking._id}
                  booking={booking}
                />

              ))}

            </div>

            {/* Pagination */}

            {pagination.totalPages > 1 && (

              <div className="mt-8 flex items-center justify-center gap-3">

                <button
                  disabled={page === 1}
                  onClick={() => setPage((prev) => prev - 1)}
                  className="inline-flex items-center gap-1 rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                >

                  <ChevronLeft size={17} />

                  Previous

                </button>

                <span className="rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm">

                  {pagination.currentPage} /{" "}
                  {pagination.totalPages}

                </span>

                <button
                  disabled={page === pagination.totalPages}
                  onClick={() => setPage((prev) => prev + 1)}
                  className="inline-flex items-center gap-1 rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                >

                  Next

                  <ChevronRight size={17} />

                </button>

              </div>

            )}

          </>

        )}

      </section>

    </main>
  );
};

export default MyBookingsPage;