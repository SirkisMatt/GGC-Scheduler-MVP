import React from "react";
import { Edit2 } from "lucide-react";
import type { Tour } from "~/types";
import { TimeManager } from "~/utils/time-manager";
import { cn } from "~/lib/utils";

// Boat color mapping with explicit default
const BOAT_COLORS: Record<string, string> = {
  Mariner: "bg-blue-200 border-blue-300",
  Ranger: "bg-green-200 border-green-300",
  Zephyr: "bg-violet-200 border-violet-300",
  Sounder: "bg-yellow-200 border-yellow-300",
  Explorer: "bg-red-200 border-red-300",
  DEFAULT: "bg-gray-200 border-gray-300",
};

const getBoatColor = (boatName: string | null): string => {
  if (!boatName) return BOAT_COLORS.DEFAULT;
  return BOAT_COLORS[boatName] || BOAT_COLORS.DEFAULT;
};

interface TourBlockProps {
  tour: Tour;
  onEdit: (tour: Tour) => void;
  onDelete?: (tourId: number) => void;
}

export default function TourBlock({ tour, onEdit }: TourBlockProps) {
  const handleDragStart = (e: React.DragEvent) => {
    try {
      e.dataTransfer.setData("application/json", JSON.stringify(tour));

      // Create drag image
      const originalRect = e.currentTarget.getBoundingClientRect();
      const dragImage = e.currentTarget.cloneNode(true) as HTMLElement;

      Object.assign(dragImage.style, {
        width: `${originalRect.width}px`,
        height: `${originalRect.height}px`,
        position: "absolute",
        top: "-1000px",
        left: "-1000px",
        margin: "0",
        transform: "none",
      });

      document.body.appendChild(dragImage);
      e.dataTransfer.setDragImage(
        dragImage,
        originalRect.width / 2,
        originalRect.height / 2
      );
      requestAnimationFrame(() => document.body.removeChild(dragImage));
    } catch (error) {
      console.error("Error starting drag:", error);
    }
  };

  // Calculate positions and dimensions
  const position = React.useMemo(() => {
    try {
      const slot = TimeManager.timeToSlot(tour.startTime);
      return slot * 15; // 15px per slot
    } catch (error) {
      console.error("Invalid time calculation:", error);
      return 0;
    }
  }, [tour.startTime]);

  // Get section durations
  const durations = React.useMemo(
    () => ({
      transfer: tour.sections.transfer.timing.duration,
      water: tour.sections.water.timing.duration,
      shuttle: tour.sections.shuttle.timing.duration,
      total:
        tour.sections.transfer.timing.duration +
        tour.sections.water.timing.duration +
        tour.sections.shuttle.timing.duration,
    }),
    [tour.sections]
  );

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      style={{
        position: "absolute",
        top: `${position}px`,
        left: 0,
        right: 0,
        height: `${durations.total}px`,
        width: "calc(100% - 16px)",
      }}
      className={cn(
        "group mx-2 rounded-md shadow-sm hover:shadow-md",
        "transition-all overflow-hidden border border-gray-200"
      )}
    >
      {/* Transfer Section */}
      <div
        style={{ height: `${durations.transfer}px` }}
        className="w-full bg-gray-50 p-2 border-b relative"
      >
        <div className="flex justify-between items-start">
          <div className="text-xs text-gray-600">
            <div className="font-medium">Transfer</div>
            <div>{tour.sections.transfer.driver || "No driver"}</div>
            <div>{tour.sections.transfer.vehicle || "No vehicle"}</div>
          </div>
          <div className="text-xs text-gray-500">
            {tour.sections.transfer.timing.startTime} -{" "}
            {tour.sections.transfer.timing.endTime}
          </div>
        </div>
      </div>

      {/* Water Section */}
      <div
        style={{ height: `${durations.water}px` }}
        className={cn(
          "w-full p-2 border-b relative",
          getBoatColor(tour.sections.water.boat)
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-sm font-medium">{tour.shipName}</div>
              <div className="text-xs font-medium">{tour.tourName}</div>
            </div>
            <div className="text-xs text-gray-600">
              {tour.sections.water.timing.startTime} -{" "}
              {tour.sections.water.timing.endTime}
            </div>
          </div>

          <div className="mt-1 text-xs text-gray-700">
            <div>Captain: {tour.sections.water.captain || "Unassigned"}</div>
            <div>Boat: {tour.sections.water.boat || "Unassigned"}</div>
            <div>
              Pax: {tour.cruisePassengers + tour.compPassengers} (
              {tour.cruisePassengers} cruise / {tour.compPassengers} comp)
            </div>
          </div>
        </div>
      </div>

      {/* Shuttle Section */}
      <div
        style={{ height: `${durations.shuttle}px` }}
        className="w-full bg-gray-50 p-2 relative"
      >
        <div className="flex justify-between items-start">
          <div className="text-xs text-gray-600">
            <div className="font-medium">Shuttle</div>
            <div>{tour.sections.shuttle.driver || "No driver"}</div>
            <div>{tour.sections.shuttle.vehicle || "No vehicle"}</div>
            <div>{tour.sections.shuttle.trail}</div>
          </div>
          <div className="text-xs text-gray-500">
            {tour.sections.shuttle.timing.startTime} -{" "}
            {tour.sections.shuttle.timing.endTime}
          </div>
        </div>
      </div>

      {/* Edit Button - Always visible but more prominent on hover */}
      <button
        onClick={() => onEdit(tour)}
        className={cn(
          "absolute top-2 right-2 p-1 rounded-md",
          "bg-white/50 hover:bg-white",
          "opacity-0 group-hover:opacity-100",
          "transition-opacity duration-200",
          "shadow-sm hover:shadow"
        )}
      >
        <Edit2 className="h-3 w-3 text-gray-500" />
      </button>
    </div>
  );
}
