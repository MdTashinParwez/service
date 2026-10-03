import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const BookingDateSelector = ({
  weekStart,
  selectedDate,
  onDateSelect,
  onPreviousWeek,
  onNextWeek,
  disablePrevious,
}) => {
  const dates = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(weekStart);

    date.setDate(date.getDate() + index);
    date.setHours(0, 0, 0, 0);

    return date;
  });

  const formatDateKey = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(
      2,
      "0"
    );
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const selectedKey = formatDateKey(selectedDate);

  const monthLabel = weekStart.toLocaleDateString(
    "en-IN",
    {
      month: "long",
      year: "numeric",
    }
  );

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
            Select a date
          </p>

          <h2 className="mt-1 text-xl font-bold text-slate-950">
            {monthLabel}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onPreviousWeek}
            disabled={disablePrevious}
            aria-label="Previous week"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft size={17} />
          </button>

          <button
            type="button"
            onClick={onNextWeek}
            aria-label="Next week"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
          >
            <ChevronRight size={17} />
          </button>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-7 gap-1.5 sm:gap-2">
        {dates.map((date) => {
          const dateKey = formatDateKey(date);
          const isSelected = dateKey === selectedKey;

          return (
            <button
              key={dateKey}
              type="button"
              onClick={() => onDateSelect(date)}
              className={`min-w-0 rounded-xl border px-1 py-3 text-center transition sm:px-2 ${
                isSelected
                  ? "border-slate-950 bg-slate-950 text-white shadow-sm"
                  : "border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50"
              }`}
            >
              <span
                className={`block text-[10px] font-medium uppercase sm:text-[11px] ${
                  isSelected
                    ? "text-slate-300"
                    : "text-slate-400"
                }`}
              >
                {date.toLocaleDateString("en-IN", {
                  weekday: "short",
                })}
              </span>

              <span className="mt-1 block text-base font-bold sm:text-lg">
                {date.getDate()}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BookingDateSelector;