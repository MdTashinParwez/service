import { useNavigate } from "react-router-dom";
const BookingPriceCard = ({ service = {} }) => {


    const navigate = useNavigate();

    const handleBooking = () => {

        // Backend API yaha lagegi

        navigate("/booking/success");

    };

  const servicePrice = service.price || 799;

  const platformFee = 49;

  const tax = 99;

  const total =
    servicePrice +
    platformFee +
    tax;

  return (

    <aside className="rounded-2xl border bg-white p-8 shadow-sm">

      <h2 className="text-2xl font-bold">
        Price Details
      </h2>

      <div className="mt-8 space-y-4">

        <div className="flex justify-between">

          <span>
            Service Price
          </span>

          <span>
            ₹{servicePrice}
          </span>

        </div>

        <div className="flex justify-between">

          <span>
            Platform Fee
          </span>

          <span>
            ₹{platformFee}
          </span>

        </div>

        <div className="flex justify-between">

          <span>
            Taxes
          </span>

          <span>
            ₹{tax}
          </span>

        </div>

        <hr />

        <div className="flex justify-between text-xl font-bold">

          <span>
            Total
          </span>

          <span>
            ₹{total}
          </span>

        </div>

      </div>

      <button
       onClick={handleBooking}
      className="mt-8 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
      >
        Confirm Booking
      </button>

    </aside>

  );

};

export default BookingPriceCard;