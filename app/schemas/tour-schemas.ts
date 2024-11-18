import { z } from 'zod';
import { TourName, ShipName, DockLocation, Trail } from '@prisma/client';


// Detailed form schemas
const timingSchema = z.object({
  startTime: z.string(),
  endTime: z.string(),
  duration: z.number(),
  priority: z.number(),
});

export const transferSectionSchema = z.object({
  startLocation: z.nativeEnum(DockLocation),
  endLocation: z.string(),
  driver: z.string(),
  vehicle: z.string(),
  timing: timingSchema,
});

export const waterSectionSchema = z.object({
  startLocation: z.string(),
  endLocation: z.string(),
  captain: z.string(),
  boat: z.string(),
  timing: timingSchema,
});

export const shuttleSectionSchema = z.object({
  startLocation: z.string(),
  endLocation: z.string(),
  driver: z.string(),
  vehicle: z.string(),
  trail: z.nativeEnum(Trail),
  timing: timingSchema,
});

export const detailedFormSchema = z.object({
  guide: z.string(),
  columnPosition: z.number().min(0),
  transfer: transferSectionSchema,
  water: waterSectionSchema,
  shuttle: shuttleSectionSchema,
});

// Quick form schema
export const quickFormSchema = z.object({
    tourName: z.nativeEnum(TourName),
    shipName: z.nativeEnum(ShipName),
    boat: z.string(),
    startTime: z.string(),
    cruisePassengers: z.number().min(0),
    compPassengers: z.number().min(0),
    columnPosition: z.number()
  });
  

export type QuickFormValues = z.infer<typeof quickFormSchema>;
export type DetailedFormValues = z.infer<typeof detailedFormSchema>;