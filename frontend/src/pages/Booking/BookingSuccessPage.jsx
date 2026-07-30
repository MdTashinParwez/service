import {
  CheckCircle2,
  CalendarDays,
  Clock3,
  Home,
  ListChecks,
} from "lucide-react";

import { Link } from "react-router-dom";

const BookingSuccessPage = () => {
  return (
    <main className="min-h-screen bg-gray-50">

      <section className="mx-auto flex min-h-screen max-w-4xl items-center justify-center px-6">

        <div className="w-full rounded-3xl border bg-white p-10 text-center shadow-sm">

          <CheckCircle2
            size={80}
            className="mx-auto text-green-600"
          />

          <h1 className="mt-6 text-4xl font-bold text-gray-900">
            Booking Request Submitted
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            Your booking request has been submitted successfully.
            The provider will review your request shortly.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2">

            <div className="rounded-2xl bg-gray-50 p-6">

              <CalendarDays
                className="mx-auto text-blue-600"
                size={30}
              />

              <h3 className="mt-4 text-lg font-semibold">
                Booking ID
              </h3>

              <p className="mt-2 text-gray-600">
                #BK102345
              </p>

            </div>

            <div className="rounded-2xl bg-gray-50 p-6">

              <Clock3
                className="mx-auto text-green-600"
                size={30}
              />

              <h3 className="mt-4 text-lg font-semibold">
                Expected Response
              </h3>

              <p className="mt-2 text-gray-600">
                Within 24 Hours
              </p>

            </div>

          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-4">

            <Link
              to="/bookings"
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              <ListChecks size={20} />
              View My Bookings
            </Link>

            <Link
              to="/"
              className="flex items-center gap-2 rounded-xl border border-gray-300 px-6 py-3 font-semibold transition hover:bg-gray-100"
            >
              <Home size={20} />
              Back to Home
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
};

export default BookingSuccessPage;