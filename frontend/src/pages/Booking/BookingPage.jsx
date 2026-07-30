import { useState } from "react";

import BookingForm from "./BookingForm";
import BookingSummary from "./BookingSummary";
import BookingPriceCard from "./BookingPriceCard";

const BookingPage = () => {

  // Temporary Service Data
  // Backend API se replace hoga

  const service = {
    id: "1",
    title: "AC Repair Service",
    provider: "Rahul Sharma",
    category: "Home Services",
    location: "New Delhi",
    price: 799,
  };

  const [formData, setFormData] = useState({

    customerName: "",
    phone: "",

    address: "",

    bookingDate: "",
    bookingTime: "",

    note: "",

  });

  return (

    <main className="min-h-screen bg-gray-50">

      {/* Hero */}

      <section className="border-b bg-white">

        <div className="mx-auto max-w-7xl px-6 py-10">

          <h1 className="text-4xl font-bold text-gray-900">
            Book Service
          </h1>

          <p className="mt-3 text-gray-600">
            Fill in the details below to complete your booking.
          </p>

        </div>

      </section>

      {/* Content */}

      <section className="mx-auto max-w-7xl px-6 py-10">

        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">

          {/* Left */}

          <BookingForm
            formData={formData}
            setFormData={setFormData}
          />

          {/* Right */}

          <div className="space-y-6">

            <BookingSummary
              service={service}
            />

            <BookingPriceCard
              service={service}
            />

          </div>

        </div>

      </section>

    </main>

  );

};

export default BookingPage;