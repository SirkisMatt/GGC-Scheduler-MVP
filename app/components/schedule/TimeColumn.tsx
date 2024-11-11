import { generateTimeSlots } from "~/utils/time";

export function TimeColumn() {
  const timeSlots = generateTimeSlots();

  return (
    <div className="w-20 flex-shrink-0 border-r border-gray-200 bg-white">
      <div className="h-14 border-b border-gray-200" /> {/* Header spacer */}
      <div className="relative">
        {timeSlots.map((time) => (
          <div
            key={time.index}
            className="absolute w-full border-b border-gray-200 text-xs text-gray-500"
            style={{ top: `${time.index * 60}px`, height: "60px" }}
          >
            <span className="absolute -top-2 right-2">{time.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
