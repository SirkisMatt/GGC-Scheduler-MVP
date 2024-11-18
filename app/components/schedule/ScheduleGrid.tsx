import { useState, useEffect } from "react";
import { addDays, subDays } from "date-fns";
import { ScheduleColumn } from "./ScheduleColumn";
import { TimeColumn } from "./TimeColumn";
import { SchedulerHeader } from "./SchedulerHeader";
import type { Position, Tour } from "~/types";

interface ScheduleGridProps {
  tours: Tour[];
  date: Date;
  onDateChange: (date: Date) => void;
  selectedSlot: {
    date: Date;
    startTime: string;
    coordinates: Position;
    columnPosition: number;
  } | null;
  onSlotClick: (
    date: Date,
    startTime: any,
    coordinates: Position,
    columnPosition: number
  ) => void;
  onTourUpdate: (tourId: number, updates: Partial<Tour>) => void;
  onTourDrop: (
    tourId: number,
    columnPosition: number,
    startTime: string
  ) => Promise<void>;
  onTourDelete: (tourId: number) => Promise<void>;
}

export function ScheduleGrid({
  tours,
  date,
  selectedSlot,
  onDateChange,
  onSlotClick,
  onTourUpdate,
  onTourDrop,
  onTourDelete,
}: ScheduleGridProps) {
  const [columns, setColumns] = useState<Array<{ id: string; tours: Tour[] }>>(
    []
  );

  // Update columns when tours prop changes
  useEffect(() => {
    const maxColumn = Math.max(...tours.map((tour) => tour.columnPosition), 0);
    const newColumns = Array.from({ length: maxColumn + 1 }, (_, i) => ({
      id: i.toString(),
      tours: tours.filter((tour) => tour.columnPosition === i),
    }));
    setColumns(newColumns);
  }, [tours]);

  const handleAddColumn = () => {
    setColumns((prev) => [
      ...prev,
      {
        id: prev.length.toString(),
        tours: [],
      },
    ]);
  };

  const handleDeleteColumn = async () => {
    if (columns.length <= 1) return;

    const lastColumnTours = columns[columns.length - 1].tours;
    if (lastColumnTours.length > 0) {
      const confirmDelete = window.confirm(
        "This column contains tours. Are you sure you want to delete it?"
      );
      if (!confirmDelete) return;

      try {
        await Promise.all(lastColumnTours.map((tour) => onTourDelete(tour.id)));
      } catch (error) {
        console.error("Failed to delete tours:", error);
        return;
      }
    }

    setColumns((prev) => prev.slice(0, -1));
  };

  return (
    <div className="flex flex-col h-full">
      <SchedulerHeader
        tours={tours}
        date={date}
        onPrevDay={() => onDateChange(subDays(date, 1))}
        onNextDay={() => onDateChange(addDays(date, 1))}
        // onAddTour={() => onSlotClick(date, "09:00")}
        onAddColumn={handleAddColumn}
        onDeleteColumn={handleDeleteColumn}
        columnCount={columns.length}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Wrapper div with hidden overflow to prevent scrollbar misalignment */}
        <div className="flex flex-1 overflow-auto">
          <TimeColumn />

          <div className="flex flex-1 min-w-0">
            {columns.map((column, index) => (
              <ScheduleColumn
                key={column.id}
                id={column.id}
                tours={column.tours}
                index={index}
                onTourDrop={onTourDrop}
                onTourDelete={onTourDelete}
                onSlotClick={onSlotClick}
                selectedSlot={selectedSlot}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
