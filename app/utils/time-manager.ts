import { parse, format, addMinutes, isValid } from 'date-fns';


export class TourTimingManager {
  // Constants for validation
  private static readonly VALID_TIME_FORMATS = ['HH:mm', 'HH:mm:ss'];
  private static readonly MIN_HOUR = 7; // Operations start at 7:00
  private static readonly MAX_HOUR = 23;
  private static readonly DURATION_INCREMENT = 15;
  private static readonly MAX_DURATION_CHANGE = 60;
  private static readonly MIN_DURATION_CHANGE = -60;

  static normalizeTimeString(time: string): string {
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

    return format(parsedTime, 'HH:mm');
  }

  static validateTimeString(time: string): boolean {
    try {
      this.normalizeTimeString(time);
      return true;
    } catch {
      return false;
    }
  }

  static validateDurationChange(change: number): boolean {
    if (change % this.DURATION_INCREMENT !== 0) {
      return false;
    }

    if (change < this.MIN_DURATION_CHANGE || change > this.MAX_DURATION_CHANGE) {
      return false;
    }

    return true;
  }

  static isValidTimeIncrement(time: string): boolean {
    const [hours, minutes] = time.split(':').map(Number);
    return minutes % 15 === 0;
  };

  static calculateActualDuration(defaultDuration: number, durationChange: number): number {
    const totalDuration = defaultDuration + durationChange;
    if (totalDuration <= 0) {
      throw new Error('Total duration must be greater than 0');
    }
    return totalDuration;
  }

  static addToTime(timeString: string, minutesToAdd: number): string {
    const normalizedTime = this.normalizeTimeString(timeString);
    const [hours, minutes] = normalizedTime.split(':').map(Number);
    const date = new Date(1970, 0, 1, hours, minutes);
    
    if (!isValid(date)) {
      throw new Error(`Invalid time: ${timeString}`);
    }

    const newTime = addMinutes(date, minutesToAdd);
    const newHours = newTime.getHours();
    
    if (newHours < this.MIN_HOUR || newHours > this.MAX_HOUR) {
      throw new Error('Resulting time is outside operational hours (7:00-23:00)');
    }

    return format(newTime, 'HH:mm');
  }

  static calculateSectionEndTime(startTime: string, defaultDuration: number, durationChange: number): string {
    if (!this.validateDurationChange(durationChange)) {
      throw new Error('Invalid duration change value');
    }

    const totalDuration = this.calculateActualDuration(defaultDuration, durationChange);
    return this.addToTime(startTime, totalDuration);
  }

  static calculateTourTimings(
    startTime: string,
    sections: {
      transfer: { defaultDuration: number; durationChange: number };
      water: { defaultDuration: number; durationChange: number };
      shuttle: { defaultDuration: number; durationChange: number };
    }
  ) {
    try {
      const normalizedStart = this.normalizeTimeString(startTime);
      
      // Calculate transfer section
      const transferStart = normalizedStart;
      const transferEnd = this.calculateSectionEndTime(
        transferStart,
        sections.transfer.defaultDuration,
        sections.transfer.durationChange
      );
      
      // Calculate water section
      const waterStart = transferEnd;
      const waterEnd = this.calculateSectionEndTime(
        waterStart,
        sections.water.defaultDuration,
        sections.water.durationChange
      );
      
      // Calculate shuttle section
      const shuttleStart = waterEnd;
      const shuttleEnd = this.calculateSectionEndTime(
        shuttleStart,
        sections.shuttle.defaultDuration,
        sections.shuttle.durationChange
      );

      // Validate final end time is within operational hours
      const [endHours] = shuttleEnd.split(':').map(Number);
      if (endHours > this.MAX_HOUR) {
        throw new Error('Tour extends beyond operational hours');
      }

      return {
        transfer: { startTime: transferStart, endTime: transferEnd },
        water: { startTime: waterStart, endTime: waterEnd },
        shuttle: { startTime: shuttleStart, endTime: shuttleEnd }
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to calculate tour timings: ${error.message}`);
      } else {
        throw new Error('Failed to calculate tour timings due to an unknown error');
      }
    }
  }

  static incrementDuration(currentChange: number): number {
    const newChange = currentChange + this.DURATION_INCREMENT;
    return newChange <= this.MAX_DURATION_CHANGE ? newChange : currentChange;
  }

  static decrementDuration(currentChange: number): number {
    const newChange = currentChange - this.DURATION_INCREMENT;
    return newChange >= this.MIN_DURATION_CHANGE ? newChange : currentChange;
  }

  static timeToSlot(time: string): number {
    try {
      const normalizedTime = this.normalizeTimeString(time);
      const [hours, minutes] = normalizedTime.split(':').map(Number);
      return (hours - this.MIN_HOUR) * 4 + Math.floor(minutes / 15);
    } catch {
      throw new Error(`Invalid time for slot conversion: ${time}`);
    }
  }

  static slotToTime(slot: number): string {
    const totalMinutes = (slot * 15) + (this.MIN_HOUR * 60);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    
    if (hours < this.MIN_HOUR || hours > this.MAX_HOUR) {
      throw new Error(`Invalid slot number: ${slot}`);
    }

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }

  static getTotalDuration(sections: {
    transfer: { defaultDuration: number; durationChange: number };
    water: { defaultDuration: number; durationChange: number };
    shuttle: { defaultDuration: number; durationChange: number };
  }): number {
    return (
      this.calculateActualDuration(sections.transfer.defaultDuration, sections.transfer.durationChange) +
      this.calculateActualDuration(sections.water.defaultDuration, sections.water.durationChange) +
      this.calculateActualDuration(sections.shuttle.defaultDuration, sections.shuttle.durationChange)
    );
  }
}