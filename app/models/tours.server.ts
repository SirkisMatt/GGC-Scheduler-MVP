import { prisma } from "~/db.server";
import type { Tour, TourCreate, TourUpdate } from "../types";
import { dbTourToUiTour, checkTourConflicts, calculateSectionTimes } from "~/utils/tour-utils";
import type { Prisma } from "@prisma/client";

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
  // Get existing tours for conflict check
  const existingTours = await getToursByDate(data.date);
  const conflicts = checkTourConflicts(data as Tour, existingTours);
  
  if (conflicts.length > 0) {
    throw new Error('Tour conflicts with existing tours');
  }

  const tour = await prisma.tour.create({
    data: {
      tourName: data.tourName,
      tourDate: data.date,
      startTime: data.startTime,
      guide: data.guide,
      shipName: data.shipName,
      shipDock: data.shipDock,
      cruisePassengers: data.cruisePassengers,
      compPassengers: data.compPassengers,
      minCapacity: data.minCapacity,
      maxCapacity: data.maxCapacity,
      
      // Transfer section
      transferStartLocation: data.sections.transfer.startLocation,
      transferEndLocation: data.sections.transfer.endLocation,
      transferStartTime: data.sections.transfer.timing.startTime,
      transferEndTime: data.sections.transfer.timing.endTime,
      transferDriver: data.sections.transfer.driver,
      transferVehicle: data.sections.transfer.vehicle,
      transferDuration: data.sections.transfer.timing.duration,
      transferPriority: data.sections.transfer.timing.priority,
      
      // Water section
      waterStartLocation: data.sections.water.startLocation,
      waterEndLocation: data.sections.water.endLocation,
      waterStartTime: data.sections.water.timing.startTime,
      waterEndTime: data.sections.water.timing.endTime,
      captain: data.sections.water.captain,
      boat: data.sections.water.boat,
      waterDuration: data.sections.water.timing.duration,
      waterPriority: data.sections.water.timing.priority,
      
      // Shuttle section
      shuttleStartLocation: data.sections.shuttle.startLocation,
      shuttleEndLocation: data.sections.shuttle.endLocation,
      shuttleStartTime: data.sections.shuttle.timing.startTime,
      shuttleEndTime: data.sections.shuttle.timing.endTime,
      shuttleDriver: data.sections.shuttle.driver,
      shuttleVehicle: data.sections.shuttle.vehicle,
      shuttleTrail: data.sections.shuttle.trail,
      shuttleDuration: data.sections.shuttle.timing.duration,
      shuttlePriority: data.sections.shuttle.timing.priority,
      
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
  startTime: string
) {
  // First get the current tour to access its sections
  const currentTour = await prisma.tour.findUnique({
    where: { id },
  });

  if (!currentTour) {
    throw new Error('Tour not found');
  }

  // Convert DB tour to UI format to access sections
  const uiTour = dbTourToUiTour(currentTour);

  // Calculate new section times
  const updatedSections = calculateSectionTimes(startTime, uiTour.sections);

  // Update the tour with new position and all section times
  const tour = await prisma.tour.update({
    where: { id },
    data: {
      columnPosition,
      startTime,
      // Transfer section
      transferStartTime: updatedSections.sections.transfer.startTime,
      transferEndTime: updatedSections.sections.transfer.endTime,
      
      // Water section
      waterStartTime: updatedSections.sections.water.startTime,
      waterEndTime: updatedSections.sections.water.endTime,
      
      // Shuttle section
      shuttleStartTime: updatedSections.sections.shuttle.startTime,
      shuttleEndTime: updatedSections.sections.shuttle.endTime,
    },
  });

  return dbTourToUiTour(tour);
}