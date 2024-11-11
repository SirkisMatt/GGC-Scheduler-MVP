import { useState } from "react";
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Dialog } from "~/components/ui/dialog";
import { TourModal } from "~/components/schedule/TourModal";
import { ScheduleGrid } from "~/components/schedule/ScheduleGrid";

interface LoaderData {
  ships: Array<{
    id: string;
    name: string;
  }>;
  tourTypes: Array<{
    id: string;
    name: string;
    code: string;
    minPassengers: number;
    maxPassengers: number;
  }>;
}

export const loader: LoaderFunction = async () => {
  // This will be replaced with actual data loading
  return {
    ships: [
      { id: "1", name: "Coral Princess" },
      { id: "2", name: "Royal Princess" },
    ],
    tourTypes: [
      {
        id: "1",
        name: "Whales & Trails - Sea First - Auke Bay",
        code: "WT-SF-AB",
        minPassengers: 0,
        maxPassengers: 20,
      },
      // Add other tour types
    ],
  };
};

export default function SchedulePage() {
  const { ships, tourTypes } = useLoaderData<LoaderData>();
  const [selectedSlot, setSelectedSlot] = useState<{
    date: Date;
    time: string;
  } | null>(null);

  return (
    <div className="h-full flex flex-col">
      <header className="bg-white border-b px-4 py-3">
        <h1 className="text-xl font-semibold text-gray-900">Tour Schedule</h1>
      </header>

      <div className="flex-1 overflow-auto">
        <ScheduleGrid onSlotClick={setSelectedSlot} />
      </div>

      <Dialog open={!!selectedSlot} onOpenChange={() => setSelectedSlot(null)}>
        {selectedSlot && (
          <TourModal
            date={selectedSlot.date}
            time={selectedSlot.time}
            ships={ships}
            tourTypes={tourTypes}
            open={false}
            onOpenChange={function (open: boolean): void {
              throw new Error("Function not implemented.");
            }} // onClose={() => setSelectedSlot(null)}
          />
        )}
      </Dialog>
    </div>
  );
}
