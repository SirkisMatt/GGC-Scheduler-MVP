// export interface Tour {
//     id: string;
//     tourType: string;
//     ship: string;
//     boat: string;
//     date: Date;
//     startTime: string;
//     cruisePassengers: number;
//     compPassengers: number;
//     cancelStatus: boolean;
//     sections: Record<string, TourSection>;
//     columnNumber: number;
//   }
// // export interface Tour {
// //     id: string;
// //     tourTypeId: string;
// //     shipId: string;
// //     date: Date;
// //     startTime: string;
// //     cruisePassengers: number;
// //     compPassengers: number;
// //     cancelStatus: boolean;
// //     sections: Record<string, TourSection>;
// //   }
  
//   export interface TourSection {
//     employees: string[];
//     vehicles: string[];
//     equipment?: {
//         crabPotId?: string;
//         tabletId?: string;
//         waterSampleSiteId?: string;
//       };
//     locations?: {
//       start: string;
//       end: string;
//     };
//     timing: {
//         startTime: string;
//         endTime: string;
//     }
//   }
  
//   export interface TourType {
//     id: string;
//     code: string;
//     name: string;
//     duration: number;
//     minPassengers: number;
//     maxPassengers: number;
//     sections: string[];
//     timing: Record<string, SectionTiming>;
//     extraEquipment?: string[];
//   }
  
//   export interface SectionTiming {
//     duration: number;
//     startDelay?: number;
//     startAfter?: string;
//     startLocationFixed?: string;
//     endLocationFixed?: string;
//     locationFixed?: string;
//   }
  
// app/types/tours.ts

// Enums
export enum TourName {
    WHALES_AND_TRAILS = "WHALES_AND_TRAILS",
    PHOTO_SAFARI = "PHOTO_SAFARI"
  }
  
  export enum DockLocation {
    AJ = "AJ",
    FRANKLIN = "FRANKLIN",
    CRUISE_SHIP_TERMINAL = "CRUISE_SHIP_TERMINAL",
    MARINE_PARK = "MARINE_PARK"
  }
  
  export enum ShipName {
    WESTERDAM = "WESTERDAM",
    CARNIVAL_SPIRIT = "CARNIVAL_SPIRIT",
    RADIANCE_OF_THE_SEAS = "RADIANCE_OF_THE_SEAS",
    NOORDAM = "NOORDAM",
    DISNEY_WONDER = "DISNEY_WONDER"
  }
  
  export enum Trail {
    MORAINE_ECOLOGY = "MORAINE_ECOLOGY"
  }
  
  // Base interfaces
  export interface SectionTiming {
    startTime: string;
    endTime: string;
    duration: number;
    priority: number;
  }
  
  // Section interfaces
  export interface TransferSection {
    startLocation: DockLocation;
    endLocation: string;
    driver: string | null;
    vehicle: string | null;
    timing: SectionTiming;
  }
  
  export interface WaterSection {
    startLocation: string;
    endLocation: string;
    captain: string | null;
    boat: string | null;
    timing: SectionTiming;
  }
  
  export interface ShuttleSection {
    startLocation: string;
    endLocation: string | null;
    driver: string | null;
    vehicle: string | null;
    trail: Trail;
    timing: SectionTiming;
  }
  
  // Main tour interface
  export interface Tour {
    id: number;
    tourName: TourName;
    date: Date;
    startTime: string;
    guide: string | null;
    
    shipName: ShipName;
    shipDock: DockLocation;
    
    cruisePassengers: number;
    compPassengers: number;
    minCapacity: number;
    maxCapacity: number;
    
    sections: {
      transfer: TransferSection;
      water: WaterSection;
      shuttle: ShuttleSection;
    };
    
    columnPosition: number;
    createdAt: Date;
    updatedAt: Date;
  }
  
  // Helper types
  export type TourCreate = Omit<Tour, 'id' | 'createdAt' | 'updatedAt'>;
  export type TourUpdate = Partial<Omit<Tour, 'id' | 'createdAt' | 'updatedAt'>>;
  
  export interface TourTiming {
    startTime: string;
    sections: {
      transfer: SectionTiming;
      water: SectionTiming;
      shuttle: SectionTiming;
    };
  }