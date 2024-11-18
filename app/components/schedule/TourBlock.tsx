import React from "react";
import { Edit2 } from "lucide-react";
import type { Tour } from "~/types";
import { TourTimingManager } from "~/utils/time-manager";
import { cn } from "~/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";

const BOAT_COLORS: Record<string, string> = {
  Mariner: "bg-blue-50 border-blue-200 text-blue-950",
  Ranger: "bg-emerald-50 border-emerald-200 text-emerald-950",
  Zephyr: "bg-purple-50 border-purple-200 text-purple-950",
  Sounder: "bg-amber-50 border-amber-200 text-amber-950",
  Explorer: "bg-rose-50 border-rose-200 text-rose-950",
  DEFAULT: "bg-slate-50 border-slate-200 text-slate-950",
};

const getBoatColor = (boatName: string | null): string => {
  if (!boatName) return BOAT_COLORS.DEFAULT;
  return BOAT_COLORS[boatName] || BOAT_COLORS.DEFAULT;
};

const getShipAcronym = (shipName: string): string => {
  const words = shipName.split("_");
  if (words.length === 1) return words[0].substring(0, 2).toUpperCase();
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
};

const getTourAcronym = (tourName: string): string => {
  const words = tourName.split("_");
  if (words.length === 1) return words[0].substring(0, 2).toUpperCase();
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
};

function TruncatedText({
  text,
  label,
}: {
  text: string | null;
  label?: string;
}) {
  const TextContent = (
    <span className="inline-flex min-w-0">
      {label && <span className="font-medium whitespace-pre">{label}</span>}
      <span className="truncate">{text || "Unassigned"}</span>
    </span>
  );

  return (
    <Tooltip>
      <TooltipTrigger className="inline-flex min-w-0 cursor-default">
        {TextContent}
      </TooltipTrigger>
      <TooltipContent>
        {label && <span className="font-medium whitespace-pre">{label}</span>}
        {text || "Unassigned"}
      </TooltipContent>
    </Tooltip>
  );
}

function CrewSection({
  driver,
  vehicle,
}: {
  driver: string | null;
  vehicle: string | null;
}) {
  return (
    <div className="flex items-center gap-20 text-xs text-slate-500">
      <div className="flex-1 min-w-0">
        <TruncatedText text={driver} label="D: " />
      </div>
      <div className="flex-1 min-w-0">
        <TruncatedText text={vehicle} label="V: " />
      </div>
    </div>
  );
}
interface TourBlockProps {
  tour: Tour;
  onEdit: (tour: Tour) => void;
  onDelete?: (tourId: number) => void;
  onDragStart: (e: React.DragEvent) => void;
}

export default function TourBlock({
  tour,
  onEdit,
  onDragStart,
}: TourBlockProps) {
  const position = React.useMemo(() => {
    try {
      const slot = TourTimingManager.timeToSlot(tour.startTime);
      return slot * 15;
    } catch (error) {
      console.error("Invalid time calculation:", error);
      return 0;
    }
  }, [tour.startTime]);

  const durations = React.useMemo(
    () => ({
      transfer: tour.sections.transfer.timing.currentDuration,
      water: tour.sections.water.timing.currentDuration,
      shuttle: tour.sections.shuttle.timing.currentDuration,
      total:
        tour.sections.transfer.timing.currentDuration +
        tour.sections.water.timing.currentDuration +
        tour.sections.shuttle.timing.currentDuration,
    }),
    [tour.sections]
  );

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? "pm" : "am";
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes}${ampm}`;
  };

  return (
    <TooltipProvider>
      <div
        draggable
        onDragStart={onDragStart}
        style={{
          position: "absolute",
          top: `${TourTimingManager.timeToSlot(tour.startTime) * 15}px`,
          left: 0,
          right: 0,
          height: `${durations.total}px`,
          width: "calc(100% - 16px)",
        }}
        className={cn(
          "group mx-2 rounded-lg shadow-sm hover:shadow-md",
          "transition-all border border-slate-200",
          "flex flex-col overflow-hidden"
        )}
      >
        {/* <div
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
          "group mx-2 rounded-lg shadow-sm hover:shadow-md",
          "transition-all border border-slate-200",
          "flex flex-col overflow-hidden"
        )}
      > */}
        {/* Transfer Section */}
        <div
          style={{ height: `${durations.transfer}px`, minHeight: "40px" }}
          className="w-full bg-slate-50/80 p-2.5 border-b border-slate-200 relative z-10 flex-none"
        >
          <div className="flex items-start justify-between h-full">
            <div className="min-w-0 flex-1">
              <div className="min-w-0 flex-1">
                <div className="font-medium text-xs text-slate-600 mb-0.5">
                  Transfer
                </div>
                <CrewSection
                  driver={tour.sections.transfer.driver || "Unassigned"}
                  vehicle={tour.sections.transfer.vehicle || "Unassigned"}
                />
              </div>
            </div>
            <div className="text-[10px] font-medium text-slate-500 flex-shrink-0">
              {formatTime(tour.sections.transfer.timing.startTime)} -{" "}
              {formatTime(tour.sections.transfer.timing.endTime)}
            </div>
          </div>
        </div>

        {/* Water Section */}
        <div
          style={{ height: `${durations.water}px` }}
          className={cn(
            "w-full p-2.5 border-b border-slate-200 relative z-20 flex-1",
            getBoatColor(tour.boat)
          )}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="min-w-0 flex-1">
                <div className="font-semibold text-sm">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="cursor-default">
                        {getShipAcronym(tour.shipName)}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{tour.shipName.replace(/_/g, " ")}</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <div className="text-xs font-medium">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="cursor-default">
                        {getTourAcronym(tour.tourName)}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{tour.tourName.replace(/_/g, " ")}</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
              <div className="text-[10px] font-medium flex-shrink-0">
                {formatTime(tour.sections.water.timing.startTime)} -{" "}
                {formatTime(tour.sections.water.timing.endTime)}
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-sm">
                <TruncatedText
                  text={`Captain: ${
                    tour.sections.water.captain || "Unassigned"
                  }`}
                />
                <TruncatedText text={`Boat: ${tour.boat || "Unassigned"}`} />
              </div>

              <div className="text-xs">
                Passengers: {tour.cruisePassengers + tour.compPassengers}
              </div>
            </div>
          </div>
        </div>

        {/* Shuttle Section */}
        <div
          style={{ height: `${durations.shuttle}px`, minHeight: "50px" }}
          className="w-full bg-slate-50/80 p-2.5 relative z-30 flex-none"
        >
          <div className="flex items-start justify-between h-full">
            <div className="min-w-0 flex-1">
              <div className="font-medium text-xs text-slate-600 mb-0.5">
                Shuttle
              </div>
              <CrewSection
                driver={tour.sections.shuttle.driver}
                vehicle={tour.sections.shuttle.vehicle}
              />
            </div>
            <div className="text-[10px] font-medium text-slate-500 flex-shrink-0 ml-2">
              {formatTime(tour.sections.shuttle.timing.startTime)} -{" "}
              {formatTime(tour.sections.shuttle.timing.endTime)}
            </div>
          </div>
        </div>

        {/* Edit Button */}
        <button
          onClick={() => onEdit(tour)}
          className={cn(
            "absolute top-2 right-2 p-1.5 rounded-md z-40",
            "bg-white/80 hover:bg-white",
            "opacity-0 group-hover:opacity-100",
            "transition-all duration-200",
            "shadow-sm hover:shadow",
            "border border-slate-200"
          )}
        >
          <Edit2 className="h-3.5 w-3.5 text-slate-500" />
        </button>
      </div>
    </TooltipProvider>
  );
}
