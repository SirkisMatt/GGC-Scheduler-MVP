import React from "react";
import type { Tour } from "~/types";
import TourBlock from "./TourBlock";
import { formatTime } from "~/utils/time";

export interface ScheduleColumnProps {
  id: string;
  tours: Tour[];
  index: number;
  onTourDrop: (
    tourId: number,
    newColumnPosition: number,
    newTime: string
  ) => Promise<void>;
  onTourDelete: (tourId: number) => void;
  onSlotClick: (slot: { date: Date; time: string }) => void;
  onEditTour?: (tour: Tour) => void;
}

export function ScheduleColumn({
  id,
  tours,
  index,
  onTourDrop,
  onTourDelete,
  onSlotClick,
  onEditTour = () => {},
}: ScheduleColumnProps) {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData("application/json")) as Tour;

    // Calculate drop position
    const rect = e.currentTarget.getBoundingClientRect();
    const y = e.clientY - rect.top;

    // Calculate new time based on drop position
    const slot = Math.floor(y / 15); // 15px per slot
    const hour = Math.floor(slot / 4) + 7; // 7 is start hour
    const minute = (slot % 4) * 15;
    const newTime = `${hour.toString().padStart(2, "0")}:${minute
      .toString()
      .padStart(2, "0")}:00`;

    // Submit the move action
    onTourDrop(data.id, index, newTime);
  };

  const handleClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const slot = Math.floor(y / 15);
    const hour = Math.floor(slot / 4) + 7;
    const minute = (slot % 4) * 15;
    const timeString = `${hour.toString().padStart(2, "0")}:${minute
      .toString()
      .padStart(2, "0")}`;

    onSlotClick({
      date: new Date(), // You might want to pass the actual date from props
      time: timeString,
    });
  };

  return (
    <div className="flex-1 min-w-[200px] border-r bg-gray-50 flex flex-col">
      <div className="relative flex-1">
        <div className="grid grid-rows-[repeat(64,15px)]">
          {Array.from({ length: 64 }).map((_, i) => (
            <div key={i} className="border-t border-gray-200" />
          ))}
        </div>
        <div
          className="absolute inset-0"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={handleClick}
          data-column-id={id}
        >
          {tours.map((tour) => (
            <TourBlock
              key={tour.id}
              tour={tour}
              onEdit={onEditTour}
              onDelete={onTourDelete}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
