import BookingCard from "../../components/booking/BookingCard";

const bookings = [
  {
    id: "BK1023",
    service: "AC Repair",
    provider: "Rahul Sharma",
    date: "12 Aug 2026",
    time: "10:30 AM",
    status: "Pending",
    price: 799,
  },
  {
    id: "BK1024",
    service: "Plumbing",
    provider: "Amit Kumar",
    date: "15 Aug 2026",
    time: "02:00 PM",
    status: "Confirmed",
    price: 499,
  },
];

const MyBookingsPage = () => {
  return (
    <main className="min-h-screen bg-gray-50">

      <section className="border-b bg-white">

        <div className="mx-auto max-w-7xl px-6 py-10">

          <h1 className="text-4xl font-bold">
            My Bookings
          </h1>

          <p className="mt-2 text-gray-600">
            Track and manage all your bookings.
          </p>

        </div>

      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">

        <div className="space-y-6">

          {bookings.map((booking) => (

            <BookingCard
              key={booking.id}
              booking={booking}
            />

          ))}

        </div>

      </section>

    </main>
  );
};

export default MyBookingsPage;