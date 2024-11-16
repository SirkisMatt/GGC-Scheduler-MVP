import { generateTimeSlots } from "~/utils/time";

export function TimeColumn() {
  const timeSlots = generateTimeSlots();

  return (
    <div className="w-20 flex-shrink-0 border-r bg-white">
      {/* Header spacer - matches the height of the schedule column headers */}
      <div className="h-16 border-b flex items-center justify-center text-sm font-medium text-gray-500">
        Time
      </div>

      {/* Time slots */}
      <div className="relative">
        {timeSlots.map((time, index) => (
          <div
            key={time}
            className={`h-[15px] relative ${
              index === 0 ? "" : "border-t border-gray-200"
            }`}
          >
            {/* Only show time label every 4 slots (hourly) */}
            {index % 4 === 0 && (
              <span className="absolute -top-[7px] right-2 text-xs text-gray-500 bg-white px-1">
                {time}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
