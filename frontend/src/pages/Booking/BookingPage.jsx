import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getServiceById } from "../../api/service.api";
import { createBooking } from "../../api/booking.api";

import BookingForm from "./BookingForm";
import BookingSummary from "./BookingSummary";
import BookingPriceCard from "./BookingPriceCard";

const BookingPage = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();

  const [service, setService] = useState(null);

  const [formData, setFormData] = useState({
    bookingDate: "",
    startTime: "",
    customerNotes: "",
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getServiceById(serviceId);

        console.log("BOOKING SERVICE:", response);

        setService(response.data);
      } catch (error) {
        console.error("Failed to fetch service:", error);

        setError(error.message || "Failed to load service");
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [serviceId]);

  const handleBooking = async () => {
    try {
      setError("");

      if (!formData.bookingDate) {
        setError("Please select a booking date");
        return;
      }

      if (!formData.startTime) {
        setError("Please select a start time");
        return;
      }

      if (!service?._id) {
        setError("Service information is missing");
        return;
      }

      /*
        User sirf start time select karega.

        Example:
        duration = 1 hour
        startTime = 10:30

        Backend ko:
        startTime = 10:30
        endTime   = 11:30

        bhejenge.
      */

      const [hours, minutes] = formData.startTime
        .split(":")
        .map(Number);

      const start = new Date();
      start.setHours(hours, minutes, 0, 0);

      const durationMinutes = Number(service.duration || 0) * 60;

      const end = new Date(
        start.getTime() + durationMinutes * 60 * 1000
      );

      const endHour = String(end.getHours()).padStart(2, "0");
      const endMinute = String(end.getMinutes()).padStart(2, "0");

      const endTime = `${endHour}:${endMinute}`;

      const payload = {
        serviceId: service._id,
        bookingDate: formData.bookingDate,
        startTime: formData.startTime,
        endTime,
        customerNotes: formData.customerNotes?.trim() || "",
      };

      console.log("BOOKING PAYLOAD:", payload);

      setSubmitting(true);

      const response = await createBooking(payload);

      console.log("BOOKING CREATED:", response);

      const booking = response.data;

      if (!booking?._id) {
        throw new Error("Booking created but booking ID is missing");
      }

      navigate(`/bookings/${booking._id}`);

    } catch (error) {
      console.error("Booking failed:", error);

      setError(
        error.message || "Failed to create booking"
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-lg text-gray-500">
          Loading booking...
        </p>
      </main>
    );
  }

  if (error && !service) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Unable to load booking
          </h1>

          <p className="mt-3 text-red-500">
            {error}
          </p>
        </div>
      </main>
    );
  }

  if (!service) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-2xl font-bold">
          Service Not Found
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">

      <section className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-6 py-10">

          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            Service Booking
          </p>

          <h1 className="mt-2 text-4xl font-bold text-gray-900">
            Book Your Service
          </h1>

          <p className="mt-3 text-gray-600">
            Choose your preferred date and start time.
          </p>

        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-red-700">
            {error}
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">

          <BookingForm
            formData={formData}
            setFormData={setFormData}
            service={service}
          />

          <div className="space-y-6">

            <BookingSummary
              service={service}
            />

            <BookingPriceCard
              service={service}
              onConfirm={handleBooking}
              submitting={submitting}
            />

          </div>

        </div>

      </section>

    </main>
  );
};

export default BookingPage;