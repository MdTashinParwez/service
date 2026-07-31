import BookingInfo from "../../components/booking/BookingInfo";
import BookingTimeline from "../../components/booking/BookingTimeline";
import ProviderMiniCard from "../../components/booking/ProviderMiniCard";
import CancelBookingCard from "../../components/booking/CancelBookingCard";
import BookingStatusBadge from "../../components/booking/BookingStatusBadge";

const booking = {
  id: "BK102345",

  service: "AC Repair",

  provider: "Rahul Sharma",

  providerId: "1",

  providerImage: "https://placehold.co/150",

  profession: "AC Technician",

  providerLocation: "New Delhi",

  rating: 4.8,

  phone: "+91 9876543210",

  address: "House 24, Lajpat Nagar, New Delhi",

  bookingDate: "12 Aug 2026",

  bookingTime: "10:30 AM",

  status: "Pending",

  note: "Please call before arriving.",

  price: 799,
};

const BookingDetailsPage = () => {
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
              Booking ID : {booking.id}
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

            <BookingInfo
              booking={booking}
            />

            <BookingTimeline
              booking={booking}
            />

          </div>

          {/* Right */}

          <div className="space-y-8">

            <ProviderMiniCard
              booking={booking}
            />

            {booking.status === "Pending" && (
              <CancelBookingCard
                booking={booking}
              />
            )}

          </div>

        </div>

      </section>

    </main>
  );
};

export default BookingDetailsPage;