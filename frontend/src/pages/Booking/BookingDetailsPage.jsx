
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { toast } from "sonner";

import BookingInfo from "../../components/booking/BookingInfo";
import BookingTimeline from "../../components/booking/BookingTimeline";
import ProviderMiniCard from "../../components/booking/ProviderMiniCard";
import CancelBookingCard from "../../components/booking/CancelBookingCard";
import BookingStatusBadge from "../../components/booking/BookingStatusBadge";
import BookingStatusBanner from "../../components/booking/BookingStatusBanner";
import ProviderBookingActions from "../../components/booking/ProviderBookingActions";

import { getBookingById } from "../../api/booking.api";
import { useAuth } from "../../context/AuthContext";

const BookingDetailsPage = () => {
  const { bookingId } = useParams();

  const { user } = useAuth();
  
  const [booking, setBooking] = useState(null);
  const [isProvider, setIsProvider] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // const isProvider = user?.role === "provider";  
 const fetchBooking = async () => {
  try {
    setLoading(true);
    setError("");

    const response = await getBookingById(bookingId);

    console.log("BOOKING RESPONSE:", response.data);

    setBooking(response.data.booking);
    setIsProvider(response.data.isProvider);
  } catch (error) {
    console.error("Failed to fetch booking:", error);

    const message =
      error?.response?.data?.message ||
      "Failed to load booking details.";

    setError(message);
    toast.error(message);
  } finally {
    setLoading(false);
  }
};
  useEffect(() => {
    fetchBooking();
  }, [bookingId]);


  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <div className="animate-pulse space-y-8">

            <div className="space-y-4">
              <div className="h-4 w-28 rounded bg-gray-200" />
              <div className="h-10 w-72 rounded bg-gray-200" />
              <div className="h-5 w-96 max-w-full rounded bg-gray-200" />
            </div>

            <div className="h-28 rounded-2xl bg-gray-200" />

            <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
              <div className="space-y-8">
                <div className="h-96 rounded-2xl bg-gray-200" />
                <div className="h-80 rounded-2xl bg-gray-200" />
              </div>

              <div className="space-y-8">
                <div className="h-96 rounded-2xl bg-gray-200" />
                <div className="h-64 rounded-2xl bg-gray-200" />
              </div>
            </div>

          </div>
        </div>
      </main>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (error || !booking) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6">

        <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
            <AlertCircle
              size={28}
              className="text-red-600"
            />
          </div>

          <h2 className="mt-5 text-2xl font-bold text-gray-900">
            Unable to Load Booking
          </h2>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            {error ||
              "We couldn't find the booking you're looking for."}
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">

            <button
              onClick={fetchBooking}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              <RefreshCw size={17} />
              Try Again
            </button>

            <Link
              to={isProvider ? "/provider/dashboard" : "/bookings"}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              <ArrowLeft size={17} />

              {isProvider
                ? "Dashboard"
                : "My Bookings"}
            </Link>

          </div>

        </div>

      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">


      <section className="border-b bg-white">

        <div className="mx-auto max-w-7xl px-6 py-8 sm:py-10">

          <Link
            to={isProvider ? "/provider/dashboard" : "/bookings"}
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-blue-600"
          >
            <ArrowLeft size={17} />

            {isProvider
              ? "Provider Dashboard"
              : "My Bookings"}
          </Link>

          <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

            <div>

              <p className="text-sm font-medium text-blue-600">
                Booking Details
              </p>

              <h1 className="mt-1 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {booking.service?.title ||
                  "Service Booking"}
              </h1>

              <div className="mt-3 flex flex-wrap items-center gap-2">

                <span className="text-sm text-gray-500">
                  Booking ID
                </span>

                <span className="font-mono text-sm font-semibold text-gray-700">
                  #{booking._id.slice(-8).toUpperCase()}
                </span>

              </div>

            </div>

            <BookingStatusBadge
              status={booking.status}
            />

          </div>

        </div>

      </section>


      <section className="mx-auto max-w-7xl px-6 py-8 sm:py-10">

        <div className="space-y-8">

          {/* STATUS */}

          <BookingStatusBanner
            booking={booking}
          />

          {/* MAIN */}

          <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">

            <div className="space-y-8">

              <BookingInfo
                booking={booking}
              />

              <BookingTimeline
                booking={booking}
              />

            </div>


            <div className="space-y-8">

              {isProvider ? (


                <ProviderBookingActions
                  booking={booking}
                  onUpdated={(updatedBooking) => {
                    setBooking(updatedBooking);
                  }}
                />

              ) : (

            

                <>
                  <ProviderMiniCard
                    booking={booking}
                  />

                  {["pending", "accepted"].includes(
                    booking.status
                  ) && (
                    <CancelBookingCard
                      booking={booking}
                      onCancelled={(updatedBooking) => {

                        setBooking(updatedBooking);

                        toast.success(
                          "Booking cancelled successfully"
                        );

                      }}
                    />
                  )}
                </>

              )}

            </div>

          </div>

        </div>

      </section>

    </main>
  );
};

export default BookingDetailsPage