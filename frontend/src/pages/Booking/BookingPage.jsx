import { useEffect, useMemo, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

import { getServiceById } from "../../api/service.api";
import {
  createBooking,
  getAvailableSlots,
} from "../../api/booking.api";

import BookingDateSelector from "../../components/booking/BookingDateSelector";
import BookingSlots from "../../components/booking/BookingSlots";
import BookingSummary from "../../components/booking/BookingSummary";

const getDateKey = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(
    2,
    "0"
  );
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const getStartOfWeek = (date) => {
  const result = new Date(date);

  result.setHours(0, 0, 0, 0);

  const day = result.getDay();
  const difference = day === 0 ? -6 : 1 - day;

  result.setDate(result.getDate() + difference);

  return result;
};

const isSameDate = (dateA, dateB) => {
  return getDateKey(dateA) === getDateKey(dateB);
};

const BookingPage = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();

  const today = useMemo(() => {
    const date = new Date();

    date.setHours(0, 0, 0, 0);

    return date;
  }, []);

  const currentWeekStart = useMemo(
    () => getStartOfWeek(today),
    [today]
  );

  const [service, setService] = useState(null);

  const [weekStart, setWeekStart] = useState(
    currentWeekStart
  );

  const [selectedDate, setSelectedDate] = useState(
    today
  );

  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const [customerNotes, setCustomerNotes] = useState("");

  const [loadingService, setLoadingService] =
    useState(true);

  const [loadingSlots, setLoadingSlots] =
    useState(false);

  const [bookingLoading, setBookingLoading] =
    useState(false);

  const [error, setError] = useState("");

  const selectedDateKey = useMemo(
    () => getDateKey(selectedDate),
    [selectedDate]
  );

  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoadingService(true);
        setError("");

        const response = await getServiceById(serviceId);

        setService(response.data);
      } catch (error) {
        console.error(
          "Failed to fetch service:",
          error
        );

        setError(
          error?.message || "Failed to load service"
        );
      } finally {
        setLoadingService(false);
      }
    };

    if (serviceId) {
      fetchService();
    }
  }, [serviceId]);

  useEffect(() => {
    const fetchSlots = async () => {
      if (!serviceId || !selectedDateKey) {
        return;
      }

      try {
        setLoadingSlots(true);
        setSelectedSlot(null);
        setSlots([]);
        setError("");

        const response = await getAvailableSlots(
          serviceId,
          selectedDateKey
        );

        setSlots(response?.data || []);
      } catch (error) {
        console.error(
          "Failed to fetch available slots:",
          error
        );

        setSlots([]);

        setError(
          error?.message ||
            "Failed to load available slots"
        );
      } finally {
        setLoadingSlots(false);
      }
    };

    fetchSlots();
  }, [serviceId, selectedDateKey]);

  const handleDateSelect = (date) => {
    const normalizedDate = new Date(date);

    normalizedDate.setHours(0, 0, 0, 0);

    if (normalizedDate < today) {
      return;
    }

    setSelectedDate(normalizedDate);
    setError("");
  };

  const handlePreviousWeek = () => {
    setWeekStart((current) => {
      const previous = new Date(current);

      previous.setDate(previous.getDate() - 7);

      if (previous < currentWeekStart) {
        return current;
      }

      setSelectedDate(previous);

      return previous;
    });
  };

  const handleNextWeek = () => {
    setWeekStart((current) => {
      const next = new Date(current);

      next.setDate(next.getDate() + 7);

      setSelectedDate(next);

      return next;
    });
  };

  const handleConfirmBooking = async () => {
    if (!selectedDate || !selectedSlot) {
      setError(
        "Please select a date and available time slot."
      );

      return;
    }

    try {
      setBookingLoading(true);
      setError("");

      const response = await createBooking({
        serviceId: service._id,
        bookingDate: selectedDateKey,
        startTime: selectedSlot.startTime,
        customerNotes: customerNotes.trim(),
      });

      const booking = response?.data;

      if (!booking?._id) {
        throw new Error(
          "Booking was created but booking details were not returned."
        );
      }

     navigate(`/bookings/${booking._id}`);
    } catch (error) {
      console.error(
        "Failed to create booking:",
        error
      );

      setError(
        error?.message || "Failed to create booking"
      );
    } finally {
      setBookingLoading(false);
    }
  };

  const formattedSelectedDate =
    selectedDate.toLocaleDateString("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });

  if (loadingService) {
    return (
      <main className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-4 w-32 rounded bg-slate-200" />

            <div className="mt-8 h-10 w-72 rounded bg-slate-200" />

            <div className="mt-3 h-5 w-96 max-w-full rounded bg-slate-200" />

            <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_390px]">
              <div className="rounded-3xl border border-slate-200 bg-white p-7">
                <div className="h-10 w-44 rounded bg-slate-200" />

                <div className="mt-8 grid grid-cols-7 gap-2">
                  {Array.from({ length: 7 }).map(
                    (_, index) => (
                      <div
                        key={index}
                        className="h-20 rounded-xl bg-slate-200"
                      />
                    )
                  )}
                </div>

                <div className="mt-10 h-6 w-44 rounded bg-slate-200" />

                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {Array.from({ length: 6 }).map(
                    (_, index) => (
                      <div
                        key={index}
                        className="h-12 rounded-xl bg-slate-200"
                      />
                    )
                  )}
                </div>
              </div>

              <div className="h-[560px] rounded-3xl bg-white" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error && !service) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-500">
            !
          </div>

          <h2 className="mt-5 text-2xl font-bold text-slate-950">
            Unable to load booking
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            {error}
          </p>

          <Link
            to="/services"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-600"
          >
            <ArrowLeft size={16} />
            Browse services
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm">
            <Link
              to="/services"
              className="font-medium text-slate-500 transition hover:text-blue-600"
            >
              Services
            </Link>

            <ChevronRight
              size={15}
              className="text-slate-300"
            />

            <Link
              to={`/services/${service._id}`}
              className="max-w-[180px] truncate font-medium text-slate-500 transition hover:text-blue-600"
            >
              {service.title}
            </Link>

            <ChevronRight
              size={15}
              className="text-slate-300"
            />

            <span className="font-semibold text-slate-900">
              Booking
            </span>
          </div>
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="mb-8">
          <Link
            to={`/services/${service._id}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-600"
          >
            <ArrowLeft size={16} />
            Back to service
          </Link>

          <div className="mt-5">
            <p className="text-sm font-semibold text-blue-600">
              Book your service
            </p>

            <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Choose your date & time
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
              Select an available date and time slot that
              works best for you.
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-6 flex items-start gap-3 rounded-2xl border border-red-100 bg-red-50 px-4 py-4 text-sm text-red-600">
            <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100 text-xs font-bold">
              !
            </div>

            <p>{error}</p>
          </div>
        )}

        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_390px]">
          <div className="min-w-0">
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="p-5 sm:p-7">
                <div className="mb-7 flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
                    <CalendarDays size={19} />
                  </div>

                  <div>
                    <p className="text-xs font-medium text-slate-400">
                      Selected date
                    </p>

                    <p className="mt-0.5 text-sm font-semibold text-slate-900">
                      {formattedSelectedDate}
                    </p>
                  </div>
                </div>

                <BookingDateSelector
                  weekStart={weekStart}
                  selectedDate={selectedDate}
                  onDateSelect={handleDateSelect}
                  onPreviousWeek={
                    handlePreviousWeek
                  }
                  onNextWeek={handleNextWeek}
                  disablePrevious={isSameDate(
                    weekStart,
                    currentWeekStart
                  )}
                />

                <BookingSlots
                  slots={slots}
                  selectedSlot={selectedSlot}
                  onSlotSelect={setSelectedSlot}
                  loading={loadingSlots}
                />
              </div>
            </div>

            <div className="mt-5 flex items-start gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4">
              <ShieldCheck
                size={19}
                className="mt-0.5 shrink-0 text-emerald-600"
              />

              <div>
                <p className="text-sm font-semibold text-slate-900">
                  Secure booking
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Your selected slot is checked again when
                  the booking is confirmed.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:sticky lg:top-24">
            <BookingSummary
              service={service}
              selectedDate={selectedDate}
              selectedSlot={selectedSlot}
              customerNotes={customerNotes}
              onNotesChange={setCustomerNotes}
              onConfirm={handleConfirmBooking}
              loading={bookingLoading}
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default BookingPage;