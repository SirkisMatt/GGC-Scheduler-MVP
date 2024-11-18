import { json } from "@remix-run/node";
import type { LoaderFunction, ActionFunction } from "@remix-run/node";
import {
  useLoaderData,
  useFetcher,
  useNavigate,
  Outlet,
} from "@remix-run/react";
import invariant from "tiny-invariant";
import {
  getToursByDate,
  createTour,
  updateTour,
  deleteTour,
  updateTourPosition,
} from "~/models/tours.server";
import { TourTimingManager } from "~/utils/time-manager";
import { DockLocation, ShipName, TourName } from "@prisma/client";
import type { Position, Tour } from "~/types";
import { ScheduleGrid } from "~/components/schedule/ScheduleGrid";
import { TourCreationFlow } from "~/components/schedule/TourCreationModal";
import { useState } from "react";
import { TourCreate, QuickFormData } from "~/types";
import { QuickTourModal } from "~/components/schedule/QuickTourModal";

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
      const tourData: TourCreate = {
        tourName: data.tourName as TourName,
        date: new Date(data.date),
        startTime: data.startTime,
        shipName: (data.shipName as ShipName) || null,
        shipDock: (data.shipDock as DockLocation) || "AJ",
        cruisePassengers: Number(data.cruisePassengers) || 0,
        compPassengers: Number(data.compPassengers) || 0,
        columnPosition: Number(data.columnPosition),
        boat: data.boat || null,
        // Remove the sections object completely - let server handle it
      };

      if (!TourTimingManager.isValidTimeIncrement(data.startTime)) {
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

      if (!TourTimingManager.isValidTimeIncrement(startTime)) {
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
  const navigate = useNavigate();
  const fetcher = useFetcher();
  const [selectedSlot, setSelectedSlot] = useState<{
    date: Date;
    startTime: string;
    coordinates: Position;
    columnPosition: number;
  } | null>(null);
  const parsedDate = new Date(date);
  const [showQuickTourModal, setsShowQuickTourModal] = useState(false);
  const [showDetailedModal, setShowDetailedModal] = useState(false);

  const handleQuickSubmit = (data: QuickFormData) => {
    // Handle quick form submission
    fetcher.submit(
      {
        intent: "create",
        tour: JSON.stringify({
          ...data,
          date: date,
          columnPosition: data.columnPosition,
        }),
      },
      { method: "post" }
    );
    setSelectedSlot(null);
  };

  const handleMoreDetails = (
    data: QuickFormData & { columnPosition: number }
  ) => {
    // Navigate to the nested route with query params
    navigate(
      `/scheduler/${date}/new?${new URLSearchParams(
        Object.entries({
          ...data,
          columnPosition: data.columnPosition.toString(),
          time: data.startTime,
        }).reduce((acc, [key, value]) => {
          acc[key] = value.toString();
          return acc;
        }, {} as Record<string, string>)
      ).toString()}`
    );
  };

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
  const handleTourMove = async (
    tourId: number,
    columnPosition: number,
    startTime: string
  ) => {
    fetcher.submit(
      {
        intent: "move",
        tourId: tourId,
        columnPosition: columnPosition,
        startTime: startTime.toString(),
      },
      { method: "post" }
    );
  };

  const handleTourDelete = async (tourId: number): Promise<void> => {
    if (window.confirm("Are you sure you want to delete this tour?")) {
      await fetcher.submit(
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
          selectedSlot={selectedSlot}
          onSlotClick={(
            date: Date,
            startTime: any,
            coordinates: Position,
            columnPosition: number
          ) =>
            setSelectedSlot({ date, startTime, coordinates, columnPosition })
          }
          onTourUpdate={handleTourUpdate}
          onTourDrop={handleTourMove}
          onTourDelete={handleTourDelete}
          date={parsedDate}
          onDateChange={function (date: Date): void {
            throw new Error("Function not implemented.");
          }}
        />
      </div>
      {selectedSlot && (
        <QuickTourModal
          position={selectedSlot.coordinates}
          columnPosition={selectedSlot.columnPosition}
          date={new Date(date)}
          time={selectedSlot.startTime}
          tourTypes={Object.values(TourName)}
          ships={Object.values(ShipName)}
          onClose={() => setSelectedSlot(null)}
          onSubmit={handleQuickSubmit}
          onMoreDetails={handleMoreDetails}
        />
      )}
      <Outlet /> {/* This will render the nested route modal */}
    </div>
  );
}
