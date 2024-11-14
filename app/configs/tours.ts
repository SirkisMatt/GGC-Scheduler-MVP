import type { TourType } from '~/types';

export const TourTypeConfig: Record<string, TourType> = {
  'WT-SF-AB': {
    id: 'WT-SF-AB',
    code: 'WT-SF-AB',
    name: 'Whales & Trails - Sea First - Auke Bay',
    duration: 300, // 5 hours in minutes
    minPassengers: 0,
    maxPassengers: 20,
    sections: ['transfer', 'water', 'land'],
    timing: {
      transfer: {
        duration: 45,
        startLocationFixed: 'dock',
        endLocationFixed: 'auke-bay'
      },
      water: {
        duration: 135,
        startDelay: 45,
        locationFixed: 'auke-bay'
      },
      land: {
        duration: 120,
        startAfter: 'water',
        startLocationFixed: 'auke-bay',
        endLocationFixed: 'dock'
      }
    }
  },
  // ... other tour types
};
