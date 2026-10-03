import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  UserRound,
} from "lucide-react";

const BookingSummary = ({
  service,
  selectedDate,
  selectedSlot,
  customerNotes,
  onNotesChange,
  onConfirm,
  loading,
}) => {
  const duration = Number(service?.duration || 0);

  const formatDuration = () => {
    if (!duration) {
      return "Flexible";
    }

    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;

    if (hours && minutes) {
      return `${hours} hr ${minutes} min`;
    }

    if (hours) {
      return `${hours} hr`;
    }

    return `${minutes} min`;
  };

  const formattedDate = selectedDate
    ? selectedDate.toLocaleDateString("en-IN", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "Not selected";

  const price = Number(service?.price || 0);

  let formattedPrice;

  try {
    formattedPrice = new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: service?.currency || "INR",
      maximumFractionDigits: 0,
    }).format(price);
  } catch {
    formattedPrice = `₹${price}`;
  }

  const canConfirm = Boolean(
    selectedDate && selectedSlot
  );

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="p-5 sm:p-6">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
            Booking summary
          </p>

          <h2 className="mt-2 text-xl font-bold leading-7 text-slate-950">
            {service?.title}
          </h2>
        </div>

        <div className="mt-6 space-y-4">
          <div className="flex gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <UserRound size={17} />
            </div>

            <div className="min-w-0">
              <p className="text-xs text-slate-400">
                Provider
              </p>

              <p className="mt-0.5 truncate text-sm font-semibold text-slate-900">
                {service?.provider?.businessName ||
                  service?.provider?.name ||
                  "Provider"}
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <CalendarDays size={17} />
            </div>

            <div>
              <p className="text-xs text-slate-400">
                Date
              </p>

              <p className="mt-0.5 text-sm font-semibold text-slate-900">
                {formattedDate}
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <Clock3 size={17} />
            </div>

            <div>
              <p className="text-xs text-slate-400">
                Time
              </p>

              <p className="mt-0.5 text-sm font-semibold text-slate-900">
                {selectedSlot
                  ? `${selectedSlot.startTime} - ${selectedSlot.endTime}`
                  : "Select a time slot"}
              </p>
            </div>
          </div>
        </div>

        <div className="my-6 border-t border-slate-100" />

        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-500">
            Duration
          </span>

          <span className="text-sm font-semibold text-slate-900">
            {formatDuration()}
          </span>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-sm text-slate-500">
            Service price
          </span>

          <span className="text-xl font-bold text-slate-950">
            {formattedPrice}
          </span>
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-between">
            <label
              htmlFor="customerNotes"
              className="text-sm font-semibold text-slate-900"
            >
              Additional notes
            </label>

            <span className="text-xs text-slate-400">
              {customerNotes.length}/500
            </span>
          </div>

          <textarea
            id="customerNotes"
            value={customerNotes}
            onChange={(event) =>
              onNotesChange(event.target.value)
            }
            maxLength={500}
            rows={4}
            placeholder="Tell the provider anything they should know..."
            className="mt-3 w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <button
          type="button"
          disabled={!canConfirm || loading}
          onClick={onConfirm}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          <CheckCircle2 size={17} />

          {loading
            ? "Creating booking..."
            : "Confirm Booking"}
        </button>

        <p className="mt-3 text-center text-xs leading-5 text-slate-400">
          Your slot will be verified again before the
          booking is created.
        </p>
      </div>
    </div>
  );
};

export default BookingSummary;