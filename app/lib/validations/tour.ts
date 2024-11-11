import { z } from 'zod';

export const tourDataSchema = z.object({
  tourTypeId: z.string(),
  shipId: z.string(),
  date: z.date(),
  startTime: z.string(),
  cruisePassengers: z.number().min(0),
  compPassengers: z.number().min(0),
  cancelStatus: z.boolean(),
  sections: z.record(z.object({
    employees: z.array(z.string()),
    vehicles: z.array(z.string()),
    equipment: z.array(z.string()).optional(),
    locations: z.object({
      start: z.string(),
      end: z.string()
    }).optional()
  }))
});

export type TourData = z.infer<typeof tourDataSchema>;