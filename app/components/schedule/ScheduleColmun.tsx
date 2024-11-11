import { format } from "date-fns";
import { generateTimeSlots } from "~/utils/time";
import { cn } from "~/lib/utils";

interface ScheduleColumnProps {
  date: Date;
  onSlotClick: (slot: { date: Date; time: string }) => void;
}

export function ScheduleColumn({ date, onSlotClick }: ScheduleColumnProps) {
  const timeSlots = generateTimeSlots();
  const isToday =
    format(new Date(), "yyyy-MM-dd") === format(date, "yyyy-MM-dd");

  return (
    <div className="flex-1 min-w-[200px] border-r border-gray-200">
      {/* Column Header */}
      <div
        className={cn(
          "h-14 border-b border-gray-200 p-2 text-center",
          isToday && "bg-blue-50"
        )}
      >
        <div className="font-medium">{format(date, "EEEE")}</div>
        <div className="text-sm text-gray-500">{format(date, "MMM d")}</div>
      </div>

      {/* Time Slots */}
      <div className="relative">
        {timeSlots.map((time) => (
          <div
            key={time.label}
            className={cn(
              "absolute w-full border-b border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors",
              isToday && "bg-blue-50/20"
            )}
            style={{ top: `${time.index * 60}px`, height: "60px" }}
            onClick={() => onSlotClick({ date, time: time.label })}
          />
        ))}
      </div>
    </div>
  );
}
