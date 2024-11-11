export interface Tour {
    id: string;
    tourTypeId: string;
    shipId: string;
    date: Date;
    startTime: string;
    cruisePassengers: number;
    compPassengers: number;
    cancelStatus: boolean;
    sections: Record<string, TourSection>;
  }
  
  export interface TourSection {
    employees: string[];
    vehicles: string[];
    equipment?: string[];
    locations?: {
      start: string;
      end: string;
    };
  }
  
  export interface TourType {
    id: string;
    code: string;
    name: string;
    duration: number;
    minPassengers: number;
    maxPassengers: number;
    sections: string[];
    timing: Record<string, SectionTiming>;
    extraEquipment?: string[];
  }
  
  export interface SectionTiming {
    duration: number;
    startDelay?: number;
    startAfter?: string;
    startLocationFixed?: string;
    endLocationFixed?: string;
    locationFixed?: string;
  }
  