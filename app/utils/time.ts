import { Tour } from "~/types/tour";

// TimeUtils.tsx
export const START_HOUR = 7;
export const END_HOUR = 23;
export const TOTAL_INTERVALS = (END_HOUR - START_HOUR) * 4; // 15-minute intervals
export const SLOT_HEIGHT = 15; // Height of each 15-minute slot in pixels
export const HEADER_HEIGHT = 64; // Height of the header in pixels

export const parseTime = (timeRange: string): number => {
  const [startTime] = timeRange.split(" - ");
  const [hours, minutes] = startTime.split(":").map(Number);
  const totalMinutes = hours * 60 + minutes;
  const startMinutes = START_HOUR * 60;
  return Math.floor((totalMinutes - startMinutes) / 15);
};

export const formatTime = (interval: number): string => {
  const totalMinutes = interval * 15 + START_HOUR * 60;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const endTotalMinutes = totalMinutes + 60; // Add one hour
  const endHours = Math.floor(endTotalMinutes / 60);
  const endMinutes = endTotalMinutes % 60;

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")} - ${endHours.toString().padStart(2, "0")}:${endMinutes
    .toString()
    .padStart(2, "0")}`;
};

export const generateTimeSlots = () =>
  Array.from({ length: TOTAL_INTERVALS }, (_, i) => {
    const totalMinutes = i * 15 + START_HOUR * 60;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  });

export function convertTimeToDateTime(time: string, date: Date): Date {
  const [hours, minutes] = time.split(':').map(Number);
  const dateTime = new Date(date);
  dateTime.setHours(hours, minutes, 0); // Set hours and minutes, seconds to 0
  return dateTime;
}

export function calculateSectionTimes(startTime: string, sections: Tour['sections']): Tour['sections'] {
  // Convert start time to minutes since midnight for easier calculation
  const [hours, minutes] = startTime.split(':').map(Number);
  let currentTimeInMinutes = hours * 60 + minutes;

  // Transfer section
  const transferStartTime = startTime;
  const transferEndTime = formatTime(currentTimeInMinutes + sections.transfer.timing.duration);
  currentTimeInMinutes += sections.transfer.timing.duration;

  // Water section
  const waterStartTime = formatTime(currentTimeInMinutes);
  const waterEndTime = formatTime(currentTimeInMinutes + sections.water.timing.duration);
  currentTimeInMinutes += sections.water.timing.duration;

  // Shuttle section
  const shuttleStartTime = formatTime(currentTimeInMinutes);
  const shuttleEndTime = formatTime(currentTimeInMinutes + sections.shuttle.timing.duration);

  return {
    transfer: {
      ...sections.transfer,
      timing: {
        ...sections.transfer.timing,
        startTime: transferStartTime,
        endTime: transferEndTime,
      },
    },
    water: {
      ...sections.water,
      timing: {
        ...sections.water.timing,
        startTime: waterStartTime,
        endTime: waterEndTime,
      },
    },
    shuttle: {
      ...sections.shuttle,
      timing: {
        ...sections.shuttle.timing,
        startTime: shuttleStartTime,
        endTime: shuttleEndTime,
      },
    },
  };
}

export function addMinutes(time: string, minutes: number): string {
  const [hours, mins] = time.split(':').map(Number);
  const date = new Date(2000, 0, 1, hours, mins);
  date.setMinutes(date.getMinutes() + minutes);
  return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
}