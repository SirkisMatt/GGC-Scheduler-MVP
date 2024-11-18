import { prisma } from "~/db.server";
import type { Tour, TourCreate, TourUpdate } from "../types";
import { dbTourToUiTour } from "~/utils/tour-utils";
import { addMinutes } from "~/utils/time";

export async function getToursByDate(date: Date) {
  const tours = await prisma.tour.findMany({
    where: {
      tourDate: date,
    },
    orderBy: [
      { columnPosition: 'asc' },
      { startTime: 'asc' }
    ],
  });

  return tours.map(dbTourToUiTour);
}

export async function getTourById(id: number) {
  const tour = await prisma.tour.findUnique({
    where: { id },
  });

  if (!tour) return null;
  return dbTourToUiTour(tour);
}

export async function createTour(data: TourCreate) {
  // Define default durations and priorities based on tour type
  const TOUR_DEFAULTS = {
    WHALES_AND_TRAILS: {
      transfer: { defaultDuration: 45, priority: 1 },
      water: { defaultDuration: 135, priority: 2 },
      shuttle: { defaultDuration: 120, priority: 3 }
    },
    PHOTO_SAFARI: {
      transfer: { defaultDuration: 30, priority: 1 },
      water: { defaultDuration: 180, priority: 2 },
      shuttle: { defaultDuration: 90, priority: 3 }
    }
  };

  // Get defaults for the selected tour type
  const defaults = TOUR_DEFAULTS[data.tourName] || TOUR_DEFAULTS.WHALES_AND_TRAILS;

  // Calculate section times
  const transferStartTime = data.startTime;
  const waterStartTime = addMinutes(transferStartTime, defaults.transfer.defaultDuration);
  const shuttleStartTime = addMinutes(waterStartTime, defaults.water.defaultDuration);

  const tour = await prisma.tour.create({
    data: {
      tourName: data.tourName,
      tourDate: data.date,
      startTime: data.startTime,
      guide: null,
      shipName: data.shipName,
      shipDock: data.shipDock || null, 
      cruisePassengers: data.cruisePassengers || 0,
      compPassengers: data.compPassengers || 0,
      minCapacity: 8,
      maxCapacity: 20,
      
      // Transfer section
      transferStartTime,
      transferDurationChange: 0,
      transferPriority: defaults.transfer.priority,
      transferDefaultDuration: defaults.transfer.defaultDuration,
      
      // Water section
      waterStartTime,
      boat: data?.boat,
      waterDurationChange: 0,
      waterPriority: defaults.water.priority,
      waterDefaultDuration: defaults.water.defaultDuration,
      
      // Shuttle section
      shuttleStartTime,
      shuttleDurationChange: 0,
      shuttlePriority: defaults.shuttle.priority,
      shuttleDefaultDuration: defaults.shuttle.defaultDuration,
      
      columnPosition: data.columnPosition,
    },
  });

  return dbTourToUiTour(tour);
}

export async function updateTour(id: number, data: TourUpdate) {
  const tour = await prisma.tour.update({
    where: { id },
    data
  });
  return dbTourToUiTour(tour);
}

export async function deleteTour(id: number) {
  await prisma.tour.delete({
    where: { id },
  });
}

export async function updateTourPosition(
  id: number,
  columnPosition: number,
  startTime: string,
) {
  // Calculate new section times based on the new start time
  const transferStartTime = startTime;
  const transferEndTime = addMinutes(transferStartTime, 45); // 45 min duration
  
  const waterStartTime = transferEndTime;
  const waterEndTime = addMinutes(waterStartTime, 135); // 135 min duration
  
  const shuttleStartTime = waterEndTime;

  const tour = await prisma.tour.update({
    where: { id },
    data: {
      columnPosition,
      startTime,
      // Update all section times
      transferStartTime,
      waterStartTime,
      shuttleStartTime,
    },
  });

  return dbTourToUiTour(tour);
}
