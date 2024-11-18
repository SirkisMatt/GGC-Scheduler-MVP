import { TourDefaults } from '~/types/tour';

export const TOUR_DEFAULTS: TourDefaults = {
  WHALES_AND_TRAILS: {
    transfer: { defaultDuration: 45, priority: 1 },
    water: { defaultDuration: 135, priority: 2 },
    shuttle: { defaultDuration: 120, priority: 3 }
  },
  PHOTO_SAFARI: {
    transfer: { defaultDuration: 45, priority: 1 },
    water: { defaultDuration: 180, priority: 2 },
    shuttle: { defaultDuration: 120, priority: 3 }
  }
  // Add other tour types as needed
};

export class DurationManager {
  private static readonly DURATION_INCREMENT = 15;
  private static readonly MIN_DURATION_CHANGE = -60; // Can reduce duration by up to 1 hour
  private static readonly MAX_DURATION_CHANGE = 60;  // Can increase duration by up to 1 hour

  static validateDurationChange(change: number): boolean {
    // Check if the change is in 15-minute increments
    if (change % this.DURATION_INCREMENT !== 0) {
      return false;
    }

    // Check if the change is within allowed limits
    if (change < this.MIN_DURATION_CHANGE || change > this.MAX_DURATION_CHANGE) {
      return false;
    }

    return true;
  }

  static incrementDuration(currentChange: number): number {
    const newChange = currentChange + this.DURATION_INCREMENT;
    return newChange <= this.MAX_DURATION_CHANGE ? newChange : currentChange;
  }

  static decrementDuration(currentChange: number): number {
    const newChange = currentChange - this.DURATION_INCREMENT;
    return newChange >= this.MIN_DURATION_CHANGE ? newChange : currentChange;
  }

  static calculateActualDuration(defaultDuration: number, durationChange: number): number {
    return defaultDuration + durationChange;
  }

  static calculateSectionEndTime(startTime: string, defaultDuration: number, durationChange: number): string {
    const totalMinutes = this.calculateActualDuration(defaultDuration, durationChange);
    const [hours, minutes] = startTime.split(':').map(Number);
    
    const endDate = new Date(1970, 0, 1, hours, minutes);
    endDate.setMinutes(endDate.getMinutes() + totalMinutes);
    
    return `${String(endDate.getHours()).padStart(2, '0')}:${String(endDate.getMinutes()).padStart(2, '0')}`;
  }

  static calculateTourTimings(
    tourType: string, 
    startTime: string, 
    durationChanges: {
      transfer: number;
      water: number;
      shuttle: number;
    }
  ) {
    const defaults = TOUR_DEFAULTS[tourType];
    if (!defaults) {
      throw new Error(`Unknown tour type: ${tourType}`);
    }

    const transferStartTime = startTime;
    const transferEndTime = this.calculateSectionEndTime(
      transferStartTime,
      defaults.transfer.defaultDuration,
      durationChanges.transfer
    );

    const waterStartTime = transferEndTime;
    const waterEndTime = this.calculateSectionEndTime(
      waterStartTime,
      defaults.water.defaultDuration,
      durationChanges.water
    );

    const shuttleStartTime = waterEndTime;
    const shuttleEndTime = this.calculateSectionEndTime(
      shuttleStartTime,
      defaults.shuttle.defaultDuration,
      durationChanges.shuttle
    );

    return {
      transfer: {
        startTime: transferStartTime,
        actualDuration: this.calculateActualDuration(
          defaults.transfer.defaultDuration,
          durationChanges.transfer
        )
      },
      water: {
        startTime: waterStartTime,
        actualDuration: this.calculateActualDuration(
          defaults.water.defaultDuration,
          durationChanges.water
        )
      },
      shuttle: {
        startTime: shuttleStartTime,
        actualDuration: this.calculateActualDuration(
          defaults.shuttle.defaultDuration,
          durationChanges.shuttle
        )
      },
      totalDuration: this.calculateActualDuration(
        defaults.transfer.defaultDuration + 
        defaults.water.defaultDuration + 
        defaults.shuttle.defaultDuration,
        durationChanges.transfer + durationChanges.water + durationChanges.shuttle
      )
    };
  }
}