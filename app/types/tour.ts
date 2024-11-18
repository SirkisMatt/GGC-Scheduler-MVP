import type { TourName, ShipName, DockLocation, Trail } from '@prisma/client';

export interface Position {
  x: number;
  y: number;
}

export interface SectionTiming {
  startTime: string;
  endTime: string;
  defaultDuration?: number;
  durationChange: number;
  priority: number;
  currentDuration: number; 
}

interface BaseSection {
  timing: SectionTiming;
}

export interface TransferSection extends BaseSection {
  startLocation: DockLocation | null;
  endLocation: string;
  driver: string | null;
  vehicle: string | null;
}

export interface WaterSection extends BaseSection {
  startLocation: string | null;
  endLocation: string | null;
  captain: string | null;
}

export interface ShuttleSection extends BaseSection {
  startLocation: string;
  endLocation: string | null;
  driver: string | null;
  vehicle: string | null;
  trail: Trail;
}

export interface TourSections {
  transfer: TransferSection;
  water: WaterSection;
  shuttle: ShuttleSection;
}

export interface Tour {
  id: number;
  tourName: TourName;
  date: Date;
  startTime: string;
  guide: string | null;
  shipName: ShipName;
  shipDock: DockLocation | null;
  cruisePassengers: number;
  compPassengers: number;
  minCapacity: number;
  maxCapacity: number;
  boat: string | null;
  sections:{
    transfer: TransferSection;
    water: WaterSection;
    shuttle: ShuttleSection;
  };
  columnPosition: number;
  createdAt: Date;
  updatedAt: Date;
}


export interface TourDefaults {
  [key: string]: {
    transfer: { defaultDuration: number; priority: number; };
    water: { defaultDuration: number; priority: number; };
    shuttle: { defaultDuration: number; priority: number; };
  };
}

export interface DurationChange {
  value: number;
  validate(newValue: number): boolean;
  increment(): number;
  decrement(): number;
}


// Define CreateSectionTiming first
type CreateSectionTiming = {
  startTime: string;
  durationChange: number;
  priority: number;
};

// Define section types for creation
interface CreateTransferSection {
  startLocation: DockLocation;
  endLocation: string;
  driver: string;
  vehicle: string;
  timing: CreateSectionTiming;
}

interface CreateWaterSection {
  startLocation: string;
  endLocation: string;
  captain: string;
  boat: string;
  timing: CreateSectionTiming;
}

interface CreateShuttleSection {
  startLocation: string;
  endLocation: string;
  driver: string;
  vehicle: string;
  trail: Trail;
  timing: CreateSectionTiming;
}

// Update TourCreate definition
export type TourCreate = Omit<Tour, 'id' | 'createdAt' | 'updatedAt' | 'sections' | 'guide' | 'minCapacity' | 'maxCapacity'>;


export type TourUpdate = Partial<Omit<Tour, 'id' | 'createdAt' | 'updatedAt'>>;

export interface QuickFormData {
  tourName?: TourName;
  shipName?: ShipName;
  columnPosition: number;
  boat?: string;
  startTime: string;
  cruisePassengers?: number;
  compPassengers?: number;
}