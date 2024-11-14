import type { Tour, TourTiming } from "../types/tour";

/**
 * Calculates section times based on tour start time
 */
export const calculateSectionTimes = (startTime: string, sections: Tour['sections']): TourTiming => {
  const parsedStart = new Date(`1970-01-01T${startTime}`);
  
  const transferStart = new Date(parsedStart);
  const transferEnd = new Date(transferStart.getTime() + sections.transfer.timing.duration * 60000);
  
  const waterStart = new Date(transferEnd);
  const waterEnd = new Date(waterStart.getTime() + sections.water.timing.duration * 60000);
  
  const shuttleStart = new Date(waterEnd);
  const shuttleEnd = new Date(shuttleStart.getTime() + sections.shuttle.timing.duration * 60000);
  
  return {
    startTime,
    sections: {
      transfer: {
        ...sections.transfer.timing,
        startTime: formatTime(transferStart),
        endTime: formatTime(transferEnd),
      },
      water: {
        ...sections.water.timing,
        startTime: formatTime(waterStart),
        endTime: formatTime(waterEnd),
      },
      shuttle: {
        ...sections.shuttle.timing,
        startTime: formatTime(shuttleStart),
        endTime: formatTime(shuttleEnd),
      },
    },
  };
};

/**
 * Validates if a time is on a 15-minute increment
 */
export const isValidTimeIncrement = (time: string): boolean => {
  const [hours, minutes] = time.split(':').map(Number);
  return minutes % 15 === 0;
};

/**
 * Converts a database tour record to the UI tour format
 */
// export const dbTourToUiTour = (dbTour: any): Tour => {
//   const tour = {
//     id: dbTour.id,
//     tourName: dbTour.tourName,
//     date: new Date(dbTour.tourDate),
//     startTime: formatTime(new Date(dbTour.startTime)),
//     guide: dbTour.guide,
//     shipName: dbTour.shipName,
//     shipDock: dbTour.shipDock,
//     cruisePassengers: dbTour.cruisePassengers,
//     compPassengers: dbTour.compPassengers,
//     minCapacity: dbTour.minCapacity,
//     maxCapacity: dbTour.maxCapacity,
//     sections: {
//       transfer: {
//         startLocation: dbTour.transferStartLocation,
//         endLocation: dbTour.transferEndLocation,
//         driver: dbTour.transferDriver,
//         vehicle: dbTour.transferVehicle,
//         timing: {
//           duration: dbTour.transferDuration,
//           priority: dbTour.transferPriority,
//           startTime: '', // Will be calculated
//           endTime: '', // Will be calculated
//         },
//       },
//       water: {
//         startLocation: dbTour.waterStartLocation,
//         endLocation: dbTour.waterEndLocation,
//         captain: dbTour.captain,
//         boat: dbTour.boat,
//         timing: {
//           duration: dbTour.waterDuration,
//           priority: dbTour.waterPriority,
//           startTime: '', // Will be calculated
//           endTime: '', // Will be calculated
//         },
//       },
//       shuttle: {
//         startLocation: dbTour.shuttleStartLocation,
//         endLocation: dbTour.shuttleEndLocation,
//         driver: dbTour.shuttleDriver,
//         vehicle: dbTour.shuttleVehicle,
//         trail: dbTour.shuttleTrail,
//         timing: {
//           duration: dbTour.shuttleDuration,
//           priority: dbTour.shuttlePriority,
//           startTime: '', // Will be calculated
//           endTime: '', // Will be calculated
//         },
//       },
//     },
//     columnPosition: dbTour.columnPosition,
//     createdAt: new Date(dbTour.createdAt),
//     updatedAt: new Date(dbTour.updatedAt),
//   };

//   // Calculate section times based on start time
//   const timings = calculateSectionTimes(tour.startTime, tour.sections);
//   tour.sections = {
//     transfer: {
//       ...tour.sections.transfer,
//       timing: timings.sections.transfer,
//     },
//     water: {
//       ...tour.sections.water,
//       timing: timings.sections.water,
//     },
//     shuttle: {
//       ...tour.sections.shuttle,
//       timing: timings.sections.shuttle,
//     },
//   };

//   return tour;
// };

export const dbTourToUiTour = (dbTour: any): Tour => {
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
    sections: {
      transfer: {
        startLocation: dbTour.transferStartLocation,
        endLocation: dbTour.transferEndLocation,
        driver: dbTour.transferDriver,
        vehicle: dbTour.transferVehicle,
        timing: {
          duration: dbTour.transferDuration,
          priority: dbTour.transferPriority,
          startTime: dbTour.transferStartTime,  // Use the actual times from DB
          endTime: dbTour.transferEndTime,      // instead of calculating
        },
      },
      water: {
        startLocation: dbTour.waterStartLocation,
        endLocation: dbTour.waterEndLocation,
        captain: dbTour.captain,
        boat: dbTour.boat,
        timing: {
          duration: dbTour.waterDuration,
          priority: dbTour.waterPriority,
          startTime: dbTour.waterStartTime,     // Use the actual times from DB
          endTime: dbTour.waterEndTime,         // instead of calculating
        },
      },
      shuttle: {
        startLocation: dbTour.shuttleStartLocation,
        endLocation: dbTour.shuttleEndLocation,
        driver: dbTour.shuttleDriver,
        vehicle: dbTour.shuttleVehicle,
        trail: dbTour.shuttleTrail,
        timing: {
          duration: dbTour.shuttleDuration,
          priority: dbTour.shuttlePriority,
          startTime: dbTour.shuttleStartTime,   // Use the actual times from DB
          endTime: dbTour.shuttleEndTime,       // instead of calculating
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

/**
 * Validates tour timing constraints
 */
export const validateTourTiming = (tour: Tour): string[] => {
  const errors: string[] = [];
  
  if (!isValidTimeIncrement(tour.startTime)) {
    errors.push("Tour start time must be in 15-minute increments");
  }

  // Add additional timing validations as needed
  
  return errors;
};

/**
 * Checks for timing conflicts between tours
 */
export const checkTourConflicts = (tour: Tour, existingTours: Tour[]): Tour[] => {
  return existingTours.filter(existingTour => {
    if (existingTour.id === tour.id) return false;
    if (existingTour.columnPosition !== tour.columnPosition) return false;
    
    // Compare section times
    const tourTimes = calculateSectionTimes(tour.startTime, tour.sections);
    const existingTimes = calculateSectionTimes(existingTour.startTime, existingTour.sections);
    
    // Check for overlaps in each section
    for (const section of ['transfer', 'water', 'shuttle'] as const) {
      const newStart = tourTimes.sections[section].startTime;
      const newEnd = tourTimes.sections[section].endTime;
      const existingStart = existingTimes.sections[section].startTime;
      const existingEnd = existingTimes.sections[section].endTime;
      
      if (
        (newStart >= existingStart && newStart < existingEnd) ||
        (newEnd > existingStart && newEnd <= existingEnd) ||
        (newStart <= existingStart && newEnd >= existingEnd)
      ) {
        return true;
      }
    }
    
    return false;
  });
};