import type { Tour } from "../types/tour";
import {TourTimingManager} from "./time-manager";
import {Tour as DBTour} from "@prisma/client";


export const dbTourToUiTour = (dbTour: DBTour): Tour => {
  
  return {
    id: dbTour.id,
    tourName: dbTour.tourName,
    date: new Date(dbTour.tourDate),
    startTime: dbTour.startTime,
    guide: dbTour.guide,
    shipName: dbTour.shipName,
    shipDock: dbTour.shipDock,
    cruisePassengers: dbTour.cruisePassengers,
    compPassengers: dbTour.compPassengers,
    minCapacity: dbTour.minCapacity,
    maxCapacity: dbTour.maxCapacity,
    boat: dbTour.boat,
    sections: {
      transfer: {
        startLocation: dbTour.transferStartLocation,
        endLocation: dbTour.transferEndLocation,
        driver: dbTour.transferDriver,
        vehicle: dbTour.transferVehicle,
        timing: {
          defaultDuration: dbTour.transferDefaultDuration,
          priority: dbTour.transferPriority,
          startTime: dbTour.transferStartTime,  // Use the actual times from DB
          endTime: TourTimingManager.calculateSectionEndTime(dbTour.transferStartTime, dbTour.transferDefaultDuration, dbTour.transferDurationChange),
          durationChange: dbTour.transferDurationChange,
          currentDuration: TourTimingManager.calculateActualDuration(dbTour.transferDefaultDuration, dbTour.transferDurationChange),    
        },
      },
      water: {
        startLocation: dbTour.waterStartLocation,
        endLocation: dbTour.waterEndLocation,
        captain: dbTour.captain,
        timing: {
          defaultDuration: dbTour.waterDefaultDuration,
          priority: dbTour.waterPriority,
          startTime: dbTour.waterStartTime,     // Use the actual times from DB
          endTime: TourTimingManager.calculateSectionEndTime(dbTour.waterStartTime, dbTour.waterDefaultDuration, dbTour.waterDurationChange),
          durationChange: dbTour.waterDurationChange,
          currentDuration: TourTimingManager.calculateActualDuration(dbTour.waterDefaultDuration, dbTour.waterDurationChange),        
        },
      },
      shuttle: {
        startLocation: dbTour.shuttleStartLocation,
        endLocation: dbTour.shuttleEndLocation,
        driver: dbTour.shuttleDriver,
        vehicle: dbTour.shuttleVehicle,
        trail: dbTour.shuttleTrail,
        timing: {
          defaultDuration: dbTour.shuttleDefaultDuration,
          priority: dbTour.shuttlePriority,
          startTime: dbTour.shuttleStartTime,   // Use the actual times from DB
          endTime: TourTimingManager.calculateSectionEndTime(dbTour.shuttleStartTime, dbTour.shuttleDefaultDuration, dbTour.shuttleDurationChange),
          durationChange: dbTour.shuttleDurationChange,  
          currentDuration: TourTimingManager.calculateActualDuration(dbTour.shuttleDefaultDuration, dbTour.shuttleDurationChange),
        },
      },
    },
    columnPosition: dbTour.columnPosition,
    createdAt: new Date(dbTour.createdAt),
    updatedAt: new Date(dbTour.updatedAt),
  };
};
/**
 * Formats a Date object to HH:mm time string
 */
export const formatTime = (date: Date): string => {
  return date.toTimeString().slice(0, 5);
};

