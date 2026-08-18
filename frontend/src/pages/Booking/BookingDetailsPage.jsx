import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import BookingInfo from "../../components/booking/BookingInfo";
import BookingTimeline from "../../components/booking/BookingTimeline";
import ProviderMiniCard from "../../components/booking/ProviderMiniCard";
import CancelBookingCard from "../../components/booking/CancelBookingCard";
import BookingStatusBadge from "../../components/booking/BookingStatusBadge";

import { getBookingById } from "../../api/booking.Api";

const BookingDetailsPage = () => {
  const { bookingId } = useParams();

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await getBookingById(bookingId);

        setBooking(response.data);
      } catch (error) {
        console.error("Failed to fetch booking:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [bookingId]);

  if (loading) {
    return <div>Loading booking...</div>;
  }

  if (!booking) {
    return <div>Booking not found.</div>;
  }
  console.log("BOOKING:", booking);  // dev
 
  return (
    <main className="min-h-screen bg-gray-50">

      {/* Hero */}

      <section className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-6 py-10">

          <h1 className="text-4xl font-bold">
            Booking Details
          </h1>

          <div className="mt-4 flex items-center gap-4">

            <p className="text-gray-600">
              Booking ID : {booking._id}
            </p>

            <BookingStatusBadge
              status={booking.status}
            />

          </div>

        </div>
      </section>

      {/* Content */}

      <section className="mx-auto max-w-7xl px-6 py-10">

        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">

          {/* Left */}

          <div className="space-y-8">

            <BookingInfo booking={booking} />

            <BookingTimeline booking={booking} />

          </div>

          {/* Right */}

          <div className="space-y-8">

            <ProviderMiniCard booking={booking} />

            {booking.status === "Pending" && (
              <CancelBookingCard booking={booking} />
            )}

          </div>

        </div>

      </section>

    </main>
  );
};

export default BookingDetailsPage;