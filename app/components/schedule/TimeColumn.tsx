import { generateTimeSlots } from "~/utils/time";

export function TimeColumn() {
  const timeSlots = generateTimeSlots();

  return (
    <div className="w-20 flex-shrink-0 border-r bg-white">
      <div className="h-[49px] border-b" /> {/* Header spacer */}
      <div className="grid grid-rows-[repeat(64,15px)]">
        {timeSlots.map((time) => (
          <div
            key={time}
            className="relative h-[15px] border-t border-gray-200"
          >
            <span className="absolute top-0 -translate-y-1/2 right-2 text-xs text-gray-500">
              {time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
