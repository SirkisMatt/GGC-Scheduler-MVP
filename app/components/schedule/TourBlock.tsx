import React from "react";
import { Edit2 } from "lucide-react";
import type { Tour } from "~/types";

// Utility function to get boat color
const getBoatColor = (boatName: string | null): string => {
  const boatColors: Record<string, string> = {
    Mariner: "bg-blue-200",
    Ranger: "bg-green-200",
    Zephyr: "bg-violet-200",
    Sounder: "bg-yellow-200",
    Explorer: "bg-red-200",
  };

  if (!boatName) return boatColors.DEFAULT;
  return boatColors[boatName] || boatColors.DEFAULT;
};

interface TourBlockProps {
  tour: Tour;
  onEdit: (tour: Tour) => void;
  onDelete: (tourId: number) => void;
}

export default function TourBlock({ tour, onEdit }: TourBlockProps) {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("application/json", JSON.stringify(tour));

    // Create drag image
    const originalRect = e.currentTarget.getBoundingClientRect();
    const dragImage = e.currentTarget.cloneNode(true) as HTMLElement;

    dragImage.style.width = `${originalRect.width}px`;
    dragImage.style.height = `${originalRect.height}px`;
    dragImage.style.position = "absolute";
    dragImage.style.top = "-1000px";
    dragImage.style.left = "-1000px";
    dragImage.style.margin = "0";
    dragImage.style.transform = "none";

    document.body.appendChild(dragImage);
    e.dataTransfer.setDragImage(
      dragImage,
      originalRect.width / 2,
      originalRect.height / 2
    );
    requestAnimationFrame(() => document.body.removeChild(dragImage));
  };

  // Calculate position and heights
  const [hours, minutes] = tour.startTime.split(":").map(Number);
  const startSlot = (hours - 7) * 4 + Math.floor(minutes / 15);
  const topPosition = startSlot * 15;

  // Convert durations to pixels (1 minute = 1px)
  const transferHeight = tour.sections.transfer.timing.duration;
  const waterHeight = tour.sections.water.timing.duration;
  const shuttleHeight = tour.sections.shuttle.timing.duration;
  const totalHeight = transferHeight + waterHeight + shuttleHeight;

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      style={{
        position: "absolute",
        top: `${topPosition}px`,
        left: 0,
        right: 0,
        height: `${totalHeight}px`,
        width: "calc(100% - 16px)",
      }}
      className="group mx-2 rounded-md shadow-sm hover:shadow-md transition-all overflow-hidden"
    >
      {/* Transfer Section */}
      <div
        style={{ height: `${transferHeight}px` }}
        className="w-full bg-gray-100 p-2 border-b"
      >
        <div className="text-xs text-gray-600">
          Transfer: {tour.sections.transfer.timing.startTime} -{" "}
          {tour.sections.transfer.timing.endTime}
        </div>
      </div>

      {/* Water Section */}
      <div
        style={{ height: `${waterHeight}px` }}
        className={`w-full p-2 border-b ${getBoatColor(
          tour.sections.water.boat
        )}`}
      >
        <div className="text-xs font-medium">
          {tour.shipName} - {tour.tourName}
        </div>
        <div className="text-xs text-gray-700">
          Boat: {tour.sections.water.boat || "Not assigned"}
        </div>
        <div className="text-xs text-gray-600">
          {tour.sections.water.timing.startTime} -{" "}
          {tour.sections.water.timing.endTime}
        </div>
      </div>

      {/* Shuttle Section */}
      <div
        style={{ height: `${shuttleHeight}px` }}
        className="w-full bg-gray-100 p-2"
      >
        <div className="text-xs text-gray-600">
          Shuttle: {tour.sections.shuttle.timing.startTime} -{" "}
          {tour.sections.shuttle.timing.endTime}
        </div>
      </div>

      {/* Edit Button */}
      <button
        onClick={() => onEdit(tour)}
        className="invisible group-hover:visible absolute top-2 right-2 p-1 rounded-md hover:bg-gray-100 bg-white"
      >
        <Edit2 className="h-3 w-3 text-gray-500" />
      </button>
    </div>
  );
}

// import React from "react";
// import { Edit2, Trash } from "lucide-react";
// import type { Tour } from "~/types";
// import { Button } from "../ui/button";
// import { Card } from "../ui/card";

// interface TourBlockProps {
//   tour: Tour;
//   onEdit: (tour: Tour) => void;
//   onDelete: (tourId: number) => void;
// }

// export function TourBlock({ tour, onEdit, onDelete }: TourBlockProps) {
//   const handleDragStart = (e: React.DragEvent) => {
//     e.dataTransfer.setData("application/json", JSON.stringify(tour));

//     // Create drag image
//     const originalRect = e.currentTarget.getBoundingClientRect();
//     const dragImage = e.currentTarget.cloneNode(true) as HTMLElement;

//     dragImage.style.width = `${originalRect.width}px`;
//     dragImage.style.height = `${originalRect.height}px`;
//     dragImage.style.position = "absolute";
//     dragImage.style.top = "-1000px";
//     dragImage.style.left = "-1000px";
//     dragImage.style.margin = "0";
//     dragImage.style.transform = "none";

//     document.body.appendChild(dragImage);
//     e.dataTransfer.setDragImage(
//       dragImage,
//       originalRect.width / 2,
//       originalRect.height / 2
//     );
//     requestAnimationFrame(() => document.body.removeChild(dragImage));
//   };

//   // Calculate position based on time
//   const getTimePosition = () => {
//     const [hours, minutes] = tour.startTime.split(":").map(Number);
//     const startSlot = (hours - 7) * 4 + Math.floor(minutes / 15);
//     return startSlot * 15;
//   };

//   return (
//     <Card
//       draggable
//       onDragStart={handleDragStart}
//       className="absolute bg-white border rounded-md p-2 cursor-move shadow-sm hover:shadow-md transition-all mx-2 group"
//       style={{
//         top: `${getTimePosition()}px`,
//         left: 0,
//         right: 0,
//         height: "120px",
//         width: "calc(100% - 16px)",
//       }}
//     >
//       <div className="absolute top-1 right-1 flex gap-1 invisible group-hover:visible">
//         <Button
//           variant="ghost"
//           size="sm"
//           className="h-6 w-6 p-0"
//           onClick={() => onEdit(tour)}
//         >
//           <Edit2 className="h-3 w-3" />
//         </Button>
//         <Button
//           variant="ghost"
//           size="sm"
//           className="h-6 w-6 p-0 text-red-500 hover:text-red-600"
//           onClick={() => onDelete(tour.id)}
//         >
//           <Trash className="h-3 w-3" />
//         </Button>
//       </div>

//       <div className="font-medium text-sm">{tour.tourName}</div>
//       <div className="text-xs text-gray-600">{tour.shipName}</div>
//       <div className="text-xs text-gray-500">{`${
//         tour.cruisePassengers + tour.compPassengers
//       } pax`}</div>
//     </Card>
//   );
// }
