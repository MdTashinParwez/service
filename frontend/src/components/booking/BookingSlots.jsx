import { Clock3 } from "lucide-react";

const BookingSlots = ({
  slots,
  selectedSlot,
  onSlotSelect,
  loading,
}) => {
  const groupedSlots = {
    Morning: [],
    Afternoon: [],
    Evening: [],
  };

  slots.forEach((slot) => {
    const hour = Number(
      slot.startTime?.split(":")[0]
    );

    if (hour < 12) {
      groupedSlots.Morning.push(slot);
    } else if (hour < 17) {
      groupedSlots.Afternoon.push(slot);
    } else {
      groupedSlots.Evening.push(slot);
    }
  });

  const sections = Object.entries(groupedSlots).filter(
    ([, sectionSlots]) => sectionSlots.length > 0
  );

  if (loading) {
    return (
      <div className="mt-8">
        <div className="flex items-center justify-between">
          <div>
            <div className="h-5 w-40 animate-pulse rounded bg-slate-200" />

            <div className="mt-2 h-4 w-56 animate-pulse rounded bg-slate-200" />
          </div>
        </div>

        <div className="mt-6 space-y-7">
          {Array.from({ length: 2 }).map((_, sectionIndex) => (
            <div key={sectionIndex}>
              <div className="h-4 w-20 animate-pulse rounded bg-slate-200" />

              <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                {Array.from({ length: 4 }).map(
                  (_, index) => (
                    <div
                      key={index}
                      className="h-12 animate-pulse rounded-xl bg-slate-200"
                    />
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!slots.length) {
    return (
      <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-9 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white text-slate-400 shadow-sm">
          <Clock3 size={23} />
        </div>

        <h3 className="mt-4 text-sm font-semibold text-slate-900">
          No slots available
        </h3>

        <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-slate-500">
          There are no available slots for this date.
          Try selecting another day.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <div>
        <h2 className="text-lg font-bold text-slate-950">
          Available time slots
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Choose a time that works best for you.
        </p>
      </div>

      <div className="mt-6 space-y-7">
        {sections.map(([sectionName, sectionSlots]) => (
          <div key={sectionName}>
            <div className="mb-3 flex items-center gap-3">
              <span className="text-sm font-semibold text-slate-900">
                {sectionName}
              </span>

              <div className="h-px flex-1 bg-slate-100" />

              <span className="text-xs text-slate-400">
                {sectionSlots.length}{" "}
                {sectionSlots.length === 1
                  ? "slot"
                  : "slots"}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {sectionSlots.map((slot) => {
                const isSelected =
                  selectedSlot?.startTime ===
                    slot.startTime &&
                  selectedSlot?.endTime ===
                    slot.endTime;

                return (
                  <button
                    key={`${slot.startTime}-${slot.endTime}`}
                    type="button"
                    onClick={() => onSlotSelect(slot)}
                    className={`rounded-xl border px-3 py-3 text-sm font-semibold transition ${
                      isSelected
                        ? "border-blue-600 bg-blue-600 text-white shadow-sm shadow-blue-100"
                        : "border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50"
                    }`}
                  >
                    {slot.startTime}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingSlots;