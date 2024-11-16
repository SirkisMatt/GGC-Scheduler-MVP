// app/routes/_app.scheduler.tsx
import { useState } from "react";
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { ScheduleGrid } from "~/components/schedule/ScheduleGrid";
// import { TourCreationModal } from "~/components/schedule/TourCreationModal";
import { Tour } from "~/types";

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
      { id: "3", name: "Radiance of the Seas" },
      { id: "4", name: "Eurodam" },
      { id: "5", name: "Anthem of the Seas" },
    ],
    tourTypes: [
      {
        id: "wt-sf-ab",
        name: "Whales & Trails - Sea First - Auke Bay",
        code: "WT-SF-AB",
        minPassengers: 0,
        maxPassengers: 20,
      },
      {
        id: "ps-sf",
        name: "Photo Safari - Sea First",
        code: "PS-SF",
        minPassengers: 0,
        maxPassengers: 16,
      },
      {
        id: "dw",
        name: "Discover Whales",
        code: "DW",
        minPassengers: 0,
        maxPassengers: 20,
      },
    ],
  };
};

export default function SchedulerPage() {
  const { ships, tourTypes } = useLoaderData<LoaderData>();
  const [selectedSlot, setSelectedSlot] = useState<{
    date: Date;
    time: string;
  } | null>(null);

  const handleSlotClick = (slot: { date: Date; time: string }) => {
    setSelectedSlot(slot);
  };

  const handleModalClose = () => {
    setSelectedSlot(null);
  };

  const handleTourCreate = (tourData: any) => {
    // Here you would typically make an API call to create the tour
    setSelectedSlot(null);
  };

  return (
    <div className="h-full flex flex-col">
      <header className="bg-white border-b px-4 py-3">
        <h1 className="text-xl font-semibold text-gray-900">Tour Schedule</h1>
      </header>

      <div className="flex-1 overflow-auto">
        {/* <ScheduleGrid
          onSlotClick={handleSlotClick}
          tours={[]}
          onTourUpdate={function (
            tourId: number,
            updates: Partial<Tour>
          ): void {
            throw new Error("Function not implemented.");
          }}
          onTourDelete={function (tourId: number): void {
            throw new Error("Function not implemented.");
          }}
        /> */}
      </div>

      {/* {selectedSlot && (
        <TourCreationModal
          open={true}
          date={selectedSlot.date}
          time={selectedSlot.time}
          ships={ships}
          tourTypes={tourTypes}
          onOpenChange={handleModalClose}
        />
      )} */}
    </div>
  );
}
