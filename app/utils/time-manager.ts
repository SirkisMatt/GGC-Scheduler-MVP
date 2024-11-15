// src/utils/time-manager.ts

import { parse, format, addMinutes, isValid } from 'date-fns';

export class TimeManager {
  // Constants for validation
  private static readonly VALID_TIME_FORMATS = ['HH:mm', 'HH:mm:ss'];
  private static readonly MIN_HOUR = 0;
  private static readonly MAX_HOUR = 23;
  private static readonly MIN_MINUTE = 0;
  private static readonly MAX_MINUTE = 59;
  
  /**
   * Validates and normalizes a time string to HH:mm format
   */
  static normalizeTimeString(time: string): string {
    // Try parsing with different formats
    let parsedTime: Date | null = null;
    
    for (const formatString of this.VALID_TIME_FORMATS) {
      const attemptedParse = parse(time, formatString, new Date());
      if (isValid(attemptedParse)) {
        parsedTime = attemptedParse;
        break;
      }
    }

    if (!parsedTime) {
      throw new Error(`Invalid time format: ${time}`);
    }

    // Return normalized HH:mm format
    return format(parsedTime, 'HH:mm');
  }

  /**
   * Adds minutes to a time string and returns a new time string
   */
  static addToTime(timeString: string, minutesToAdd: number): string {
    const parsedTime = parse(timeString, 'HH:mm', new Date());
    if (!isValid(parsedTime)) {
      throw new Error(`Invalid time: ${timeString}`);
    }

    const newTime = addMinutes(parsedTime, minutesToAdd);
    return format(newTime, 'HH:mm');
  }

  /**
   * Validates a section timing configuration
   */
  static validateSectionTiming(timing: {
    startTime: string;
    duration: number;
    endTime: string;
  }): boolean {
    try {
      const normalizedStart = this.normalizeTimeString(timing.startTime);
      const calculatedEnd = this.addToTime(normalizedStart, timing.duration);
      const normalizedEnd = this.normalizeTimeString(timing.endTime);

      return calculatedEnd === normalizedEnd;
    } catch {
      return false;
    }
  }

  /**
   * Calculates all section timings for a tour
   */
  static calculateTourTimings(startTime: string, sections: {
    transfer: { duration: number };
    water: { duration: number };
    shuttle: { duration: number };
  }): {
    transfer: { startTime: string; endTime: string };
    water: { startTime: string; endTime: string };
    shuttle: { startTime: string; endTime: string };
  } {
    try {
      const normalizedStart = this.normalizeTimeString(startTime);
      
      // Calculate transfer times
      const transferStart = normalizedStart;
      const transferEnd = this.addToTime(transferStart, sections.transfer.duration);
      
      // Calculate water times
      const waterStart = transferEnd;
      const waterEnd = this.addToTime(waterStart, sections.water.duration);
      
      // Calculate shuttle times
      const shuttleStart = waterEnd;
      const shuttleEnd = this.addToTime(shuttleStart, sections.shuttle.duration);

      return {
        transfer: {
          startTime: transferStart,
          endTime: transferEnd
        },
        water: {
          startTime: waterStart,
          endTime: waterEnd
        },
        shuttle: {
          startTime: shuttleStart,
          endTime: shuttleEnd
        }
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to calculate tour timings: ${error.message}`);
      } else {
        throw new Error('Failed to calculate tour timings due to an unknown error');
      }
    }
  }

  /**
   * Converts a time string to a slot number (for positioning)
   */
  static timeToSlot(time: string): number {
    try {
      const normalizedTime = this.normalizeTimeString(time);
      const [hours, minutes] = normalizedTime.split(':').map(Number);
      return (hours - 7) * 4 + Math.floor(minutes / 15);
    } catch {
      throw new Error(`Invalid time for slot conversion: ${time}`);
    }
  }

  /**
   * Converts a slot number back to a time string
   */
  static slotToTime(slot: number): string {
    const totalMinutes = (slot * 15) + (7 * 60); // Start at 7:00
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    
    if (hours < this.MIN_HOUR || hours > this.MAX_HOUR) {
      throw new Error(`Invalid slot number: ${slot}`);
    }

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }
}