import { Link } from "react-router-dom";

const BookingSidebar = ({ service }) => {
  return (
    <aside className="sticky top-24 rounded-3xl border bg-white p-8 shadow-sm">

      <h2 className="text-2xl font-bold">
        ₹{service.price}
      </h2>

      <p className="mt-2 text-gray-600">
        Starting Price
      </p>

      <hr className="my-6" />

      <div className="space-y-5">

        <div className="flex justify-between">

          <span className="text-gray-600">
            Duration
          </span>

          <span className="font-semibold">
            {service.duration}
          </span>

        </div>

        <div className="flex justify-between">

          <span className="text-gray-600">
            Availability
          </span>

          <span className="font-semibold text-green-600">
            Available Today
          </span>

        </div>

      </div>

      <Link
        to={`/booking/${service.id}`}
        className="mt-8 flex w-full items-center justify-center rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
      >
        Book Now
      </Link>

    </aside>
  );
};

export default BookingSidebar;