import React, { useState } from "react";
import type { Position, Tour } from "~/types";
import TourBlock from "./TourBlock";
import { cn } from "~/lib/utils";
import { TourPlaceHolder } from "./TourPlaceHolder";

export interface ScheduleColumnProps {
  id: string;
  tours: Tour[];
  index: number;
  selectedSlot: {
    date: Date;
    startTime: string;
    coordinates: Position;
    columnPosition: number;
  } | null;
  onTourDrop: (
    tourId: number,
    newColumnPosition: number,
    newTime: string
  ) => Promise<void>;
  onTourDelete: (tourId: number) => Promise<void>;
  onSlotClick: (
    date: Date,
    startTime: any,
    coordinates: Position,
    columnPosition: number
  ) => void;
  onEditTour?: (tour: Tour) => void;
}

export function ScheduleColumn({
  id,
  tours,
  index,
  selectedSlot,
  onTourDrop,
  onTourDelete,
  onSlotClick,
  onEditTour = () => {},
}: ScheduleColumnProps) {
  const [showDropIndicator, setShowDropIndicator] = useState(false);
  const [dropPosition, setDropPosition] = useState(0);

  const handleDragStart = (e: React.DragEvent, tour: Tour) => {
    try {
      // Calculate precise offsets from both top and left of the element
      const tourElement = e.currentTarget as HTMLElement;
      const rect = tourElement.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const offsetY = e.clientY - rect.top;

      // Set drag data with offset included
      e.dataTransfer.setData(
        "application/json",
        JSON.stringify({
          ...tour,
          dragOffset: offsetY,
        })
      );

      // Create and style drag image to match original dimensions
      const dragImage = tourElement.cloneNode(true) as HTMLElement;
      Object.assign(dragImage.style, {
        position: "absolute",
        top: "-1000px",
        left: "-1000px",
        width: `${rect.width}px`,
        height: `${rect.height}px`,
        margin: "0",
        padding: "0",
        transform: "none",
        backgroundColor: "white",
        opacity: "0.9",
      });

      document.body.appendChild(dragImage);
      // Use the precise mouse position to position the drag image
      e.dataTransfer.setDragImage(dragImage, offsetX, offsetY);
      requestAnimationFrame(() => document.body.removeChild(dragImage));
    } catch (error) {
      console.error("Error starting drag:", error);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    try {
      // Try to get the drag data including offset
      const rawData = e.dataTransfer.getData("application/json");
      const data = rawData
        ? (JSON.parse(rawData) as Tour & { dragOffset: number })
        : null;

      const rect = e.currentTarget.getBoundingClientRect();
      const offsetY = data?.dragOffset ?? 0;
      const y = e.clientY - rect.top - offsetY;

      // Snap to 15-minute intervals
      const snappedY = Math.round(y / 15) * 15;

      setDropPosition(snappedY);
      setShowDropIndicator(true);
    } catch (error) {
      // Handle first dragover when data isn't available
      const rect = e.currentTarget.getBoundingClientRect();
      const y = e.clientY - rect.top;
      const snappedY = Math.round(y / 15) * 15;
      setDropPosition(snappedY);
      setShowDropIndicator(true);
    }
  };

  const handleDragLeave = () => {
    setShowDropIndicator(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setShowDropIndicator(false);

    try {
      const data = JSON.parse(
        e.dataTransfer.getData("application/json")
      ) as Tour & { dragOffset: number };

      const rect = e.currentTarget.getBoundingClientRect();
      const dropY = e.clientY - rect.top - (data.dragOffset ?? 0);

      // Snap to 15-minute intervals
      const slot = Math.round(dropY / 15);
      const hour = Math.floor(slot / 4) + 7;
      const minute = (slot % 4) * 15;

      if (hour < 7 || hour >= 23) {
        console.warn("Drop position outside valid time range");
        return;
      }

      const newTime = `${hour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")}:00`;

      await onTourDrop(data.id, index, newTime);
    } catch (error) {
      console.error("Error handling drop:", error);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left; // Get the x coordinate
    const y = e.clientY - rect.top; // Get the y coordinate
    const slot = Math.floor(y / 15);
    const hour = Math.floor(slot / 4) + 7;
    const minute = (slot % 4) * 15;
    const timeString = `${hour.toString().padStart(2, "0")}:${minute
      .toString()
      .padStart(2, "0")}`;
    const slotClick = {
      date: new Date(),
      startTime: timeString,
      coordinates: { x, y },
      columnPosition: index,
    };

    onSlotClick(
      slotClick.date,
      slotClick.startTime,
      slotClick.coordinates,
      slotClick.columnPosition
    );
  };

  return (
    <div className="flex-1 min-w-[200px] border-r bg-gray-50">
      {/* Column header */}
      <div className="h-16 border-b bg-white flex items-center justify-center">
        <span className="text-sm font-medium text-gray-700">
          Column {index + 1}
        </span>
      </div>

      {/* Tour grid area */}
      <div className="relative min-h-full">
        {/* Grid lines */}
        <div className="absolute inset-0">
          {Array.from({ length: 64 }).map((_, i) => (
            <div
              key={i}
              className={`h-[15px] ${
                i === 0 ? "" : "border-t border-gray-200"
              }`}
            />
          ))}
        </div>

        {/* Drop indicator */}
        <div
          className={cn(
            "absolute left-0 right-0 h-0.5 bg-blue-500 shadow-[0_0_4px_rgba(59,130,246,0.5)]",
            "pointer-events-none transition-all duration-150",
            showDropIndicator ? "opacity-100" : "opacity-0"
          )}
          style={{
            top: `${dropPosition}px`,
          }}
        />

        {/* Drop zone and tours */}
        <div
          className="absolute inset-0"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleClick}
          data-column-id={id}
        >
          {/* Show placeholder when this column is selected */}
          {selectedSlot && selectedSlot.columnPosition === index && (
            <TourPlaceHolder
              style={{
                position: "absolute",
                top: `${
                  (Math.floor(
                    (parseInt(selectedSlot.startTime.split(":")[0]) - 7) * 60 +
                      parseInt(selectedSlot.startTime.split(":")[1])
                  ) /
                    15) *
                  15
                }px`,
                left: 0,
                right: 0,
                width: "calc(100% - 16px)",
              }}
            />
          )}

          {tours.map((tour) => (
            <TourBlock
              key={tour.id}
              tour={tour}
              onEdit={onEditTour}
              onDelete={onTourDelete}
              onDragStart={(e) => handleDragStart(e, tour)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
