import { json } from "@remix-run/node";
import type { LoaderFunction, ActionFunction } from "@remix-run/node";
import { useLoaderData, useFetcher } from "@remix-run/react";
import invariant from "tiny-invariant";
import {
  getToursByDate,
  createTour,
  updateTour,
  deleteTour,
  updateTourPosition,
} from "~/models/tours.server";
import { isValidTimeIncrement } from "~/utils/tour-utils";
import { Trail } from "@prisma/client";
import type { DockLocation } from "~/types";
import type { ShipName } from "~/types";
import type { TourName } from "~/types";
import type { Tour } from "~/types";
import { ScheduleGrid } from "~/components/schedule/ScheduleGrid";
// import { TourCreationModal } from "~/components/schedule/TourCreationModal";
import { useState } from "react";

interface LoaderData {
  tours: Tour[];
  date: string;
}

export const loader: LoaderFunction = async ({ params }) => {
  const { date } = params;
  invariant(date, "Date is required");

  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) {
    throw new Response("Invalid date", { status: 400 });
  }

  const tours = await getToursByDate(parsedDate);

  return json<LoaderData>({ tours, date });
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const intent = formData.get("intent")?.toString();

  switch (intent) {
    case "create": {
      const data = JSON.parse(formData.get("tour") as string);
      const tourData = {
        tourName: data.tourName as TourName,
        date: new Date(data.date),
        startTime: data.startTime,
        guide: data.guide,
        shipName: data.shipName as ShipName,
        shipDock: data.shipDock as DockLocation,
        cruisePassengers: Number(data.cruisePassengers),
        compPassengers: Number(data.compPassengers),
        minCapacity: 8, // Default values - adjust as needed
        maxCapacity: 20,
        sections: {
          transfer: {
            startLocation: data.shipDock as DockLocation,
            endLocation: data.shipDock as DockLocation,
            driver: data.transferDriver,
            vehicle: data.transferVehicle,
            timing: {
              startTime: data.startTime, // Adjust as needed
              endTime: data.startTime, // Adjust as needed
              duration: 0, // Adjust as needed
              priority: 0, // Adjust as needed
            },
          },
          water: {
            startLocation: "Auke Bay",
            endLocation: "Auke Bay",
            captain: data.captain,
            boat: data.boat,
            timing: {
              startTime: data.startTime, // Adjust as needed
              endTime: data.startTime, // Adjust as needed
              duration: 0, // Adjust as needed
              priority: 0, // Adjust as needed
            },
          },
          shuttle: {
            startLocation: "Auke Bay",
            endLocation: data.shipDock,
            driver: data.shuttleDriver,
            vehicle: data.shuttleVehicle,
            trail: data.shuttleTrail,
            timing: {
              startTime: data.startTime, // Adjust as needed
              endTime: data.startTime, // Adjust as needed
              duration: 0, // Adjust as needed
              priority: 0, // Adjust as needed
            },
          },
        },
        columnPosition: Number(data.columnPosition),
      };

      if (!isValidTimeIncrement(data.startTime)) {
        return json(
          { error: "Tour start time must be in 15-minute increments" },
          { status: 400 }
        );
      }

      const tour = await createTour(tourData);
      return json({ tour });
    }

    case "update": {
      const tourId = Number(formData.get("tourId"));
      const updates = JSON.parse(formData.get("updates") as string);
      const tour = await updateTour(tourId, updates);
      return json({ tour });
    }

    case "move": {
      const tourId = Number(formData.get("tourId"));
      const columnPosition = Number(formData.get("columnPosition"));
      const startTime = formData.get("startTime") as string;

      if (!isValidTimeIncrement(startTime)) {
        return json(
          { error: "Tour start time must be in 15-minute increments" },
          { status: 400 }
        );
      }

      const tour = await updateTourPosition(tourId, columnPosition, startTime);
      return json({ tour });
    }

    case "delete": {
      const tourId = Number(formData.get("tourId"));
      await deleteTour(tourId);
      return json({ success: true });
    }

    default:
      return json({ error: "Invalid intent" }, { status: 400 });
  }
};

export default function SchedulerPage() {
  const { tours, date } = useLoaderData<LoaderData>();
  const fetcher = useFetcher();
  const [selectedSlot, setSelectedSlot] = useState<{
    date: Date;
    time: string;
  } | null>(null);

  const handleTourUpdate = async (tourId: number, updates: Partial<Tour>) => {
    fetcher.submit(
      {
        intent: "update",
        tourId: tourId.toString(),
        updates: JSON.stringify(updates),
      },
      { method: "post" }
    );
  };

  const handleTourDelete = (tourId: number) => {
    if (window.confirm("Are you sure you want to delete this tour?")) {
      fetcher.submit(
        {
          intent: "delete",
          tourId: tourId.toString(),
        },
        { method: "post" }
      );
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-auto">
        <ScheduleGrid
          tours={tours.map((tour) => ({
            ...tour,
            date: new Date(tour.date),
            createdAt: new Date(tour.createdAt),
            updatedAt: new Date(tour.updatedAt),
          }))}
          onSlotClick={setSelectedSlot}
          onTourUpdate={handleTourUpdate}
          onTourDelete={handleTourDelete}
        />
      </div>

      {/* {selectedSlot && (
        <TourCreationModal
          date={new Date(date)}
          time={selectedSlot.time}
          open={!!selectedSlot}
          onOpenChange={() => setSelectedSlot(null)}
          onSubmit={(data) => {
            fetcher.submit(
              {
                intent: "create",
                tour: JSON.stringify({
                  ...data,
                  date: date,
                  startTime: selectedSlot.time,
                }),
              },
              { method: "post" }
            );
            setSelectedSlot(null);
          }}
        />
      )} */}
    </div>
  );
}
