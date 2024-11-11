import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { format, addDays, startOfWeek, eachDayOfInterval } from "date-fns";
import { Button } from "~/components/ui/button";
import { TimeColumn } from "./TimeColumn";
import { ScheduleColumn } from "./ScheduleColmun";

interface ScheduleGridProps {
  onSlotClick: (slot: { date: Date; time: string }) => void;
}

export function ScheduleGrid({ onSlotClick }: ScheduleGridProps) {
  const [startDate, setStartDate] = useState(() => startOfWeek(new Date()));

  const days = eachDayOfInterval({
    start: startDate,
    end: addDays(startDate, 6),
  });

  const handlePrevWeek = () => setStartDate((date) => addDays(date, -7));
  const handleNextWeek = () => setStartDate((date) => addDays(date, 7));

  return (
    <div className="h-full flex flex-col">
      {/* Date Navigation */}
      <div className="bg-white border-b p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" onClick={handlePrevWeek}>
              <ChevronLeft className="h-4 w-4" />
              Previous Week
            </Button>
            <Button variant="outline" size="sm" onClick={handleNextWeek}>
              Next Week
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setStartDate(startOfWeek(new Date()))}
          >
            Today
          </Button>
        </div>
      </div>

      {/* Schedule Grid */}
      <div className="flex-1 overflow-auto">
        <div className="flex h-full min-h-[800px]">
          <TimeColumn />
          <div className="flex-1 flex">
            {days.map((day) => (
              <ScheduleColumn
                key={day.toISOString()}
                date={day}
                onSlotClick={onSlotClick}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
