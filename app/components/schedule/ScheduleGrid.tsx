import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { formatTime } from "~/utils/time";
import { ScheduleColumn } from "./ScheduleColumn";
import { TimeColumn } from "./TimeColumn";
import type { Tour } from "~/types";

interface ScheduleGridProps {
  tours: Tour[];
  onSlotClick: (slot: { date: Date; time: string }) => void;
  onTourUpdate: (tourId: number, updates: Partial<Tour>) => void;
  onTourDrop: (
    tourId: number,
    columnPosition: number,
    startTime: string
  ) => void;
  onTourDelete: (tourId: number) => void;
}

export function ScheduleGrid({
  tours,
  onSlotClick,
  onTourUpdate,
  onTourDrop,
  onTourDelete,
}: ScheduleGridProps) {
  const [columns, setColumns] = useState<
    Array<{
      id: string;
      tours: Tour[];
    }>
  >([]);

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

  const handleTourDrop = async (
    tourId: number,
    newColumnPosition: number,
    newTime: string
  ) => {
    try {
      // Validate inputs before updating
      if (!tourId || newColumnPosition < 0 || !newTime) {
        throw new Error("Invalid tour update parameters");
      }
      await onTourDrop(tourId, newColumnPosition, newTime);

      // Create the update object
      const updates: Partial<Tour> = {
        columnPosition: newColumnPosition,
        startTime: newTime,
      };

      // Call the update function
      // await onTourUpdate(tourId, updates);
    } catch (error) {
      console.error("Failed to update tour position:", error);
      // Optionally show a user-friendly error message
      // You might want to add a toast notification here
    }
  };

  return (
    <div className="flex h-full overflow-auto">
      <TimeColumn />

      <div className="flex flex-1">
        {columns.map((column, index) => (
          <div key={column.id} className="flex flex-1">
            <ScheduleColumn
              id={column.id}
              tours={column.tours}
              index={index}
              onTourDrop={handleTourDrop}
              onTourDelete={onTourDelete}
              onSlotClick={onSlotClick}
            />
            {index === columns.length - 1 && (
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 my-2"
                onClick={handleAddColumn}
              >
                <Plus className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
