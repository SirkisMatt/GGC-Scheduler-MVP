// import React from 'react';
// import { useForm } from "react-hook-form";
// import { Form, FormControl, FormField, FormItem } from "~/components/ui/form";
// import { Input } from "~/components/ui/input";
// import { Button } from "~/components/ui/button";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "~/components/ui/select";
// import { TourTimingManager } from "~/utils/time-manager";
// import { X } from "lucide-react";

// import { boats } from "../../../data/tour-data";
// import { QuickFormValues } from '~/schemas/tour-schemas';

// interface NewTourModalProps {
//   position: Position;
//   columnPosition: number;
//   date: Date;
//   time: string;
//   tourTypes: string[];
//   ships: string[];
//   onClose: () => void;
//   onSubmit: (data: QuickFormValues & { columnPosition: number }) => void;
//   onMoreDetails: (data: QuickFormValues & { columnPosition: number }) => void;
// }

// const TOUR_DEFAULTS = {
//   WHALES_AND_TRAILS: {
//     transfer: { defaultDuration: 45, priority: 1 },
//     water: { defaultDuration: 135, priority: 2 },
//     shuttle: { defaultDuration: 120, priority: 3 }
//   },
//   PHOTO_SAFARI: {
//     transfer: { defaultDuration: 30, priority: 1 },
//     water: { defaultDuration: 180, priority: 2 },
//     shuttle: { defaultDuration: 90, priority: 3 }
//   }
// };

// export default function NewTourForm({
//   startTime,
//   columnPosition,
//   tourTypes,
//   ships,
//   boats,
//   onSubmit,
//   onMoreDetails,
//   onClose
// }: NewTourModalProps){
//   const form = useForm({
//     defaultValues: {
//       startTime,
//       columnPosition,
//       cruisePassengers: 0,
//       compPassengers: 0,
//     }
//   });

//   const handleTourTypeChange = (tourType) => {
//     // When tour type changes, calculate section timings
//     const defaults = TOUR_DEFAULTS[tourType];
//     if (!defaults) return;

//     try {
//       const timings = TourTimingManager.calculateTourTimings(startTime, {
//         transfer: {
//           defaultDuration: defaults.transfer.defaultDuration,
//           durationChange: 0
//         },
//         water: {
//           defaultDuration: defaults.water.defaultDuration,
//           durationChange: 0
//         },
//         shuttle: {
//           defaultDuration: defaults.shuttle.defaultDuration,
//           durationChange: 0
//         }
//       });

//       // Update form with the calculated section timings
//       form.setValue('tourName', tourType);
//       form.setValue('sections', {
//         transfer: {
//           timing: {
//             startTime: timings.transfer.startTime,
//             endTime: TourTimingManager.addToTime(timings.transfer.startTime, defaults.transfer.defaultDuration),
//             defaultDuration: defaults.transfer.defaultDuration,
//             durationChange: 0,
//             priority: defaults.transfer.priority,
//             currentDuration: defaults.transfer.defaultDuration
//           }
//         },
//         water: {
//           timing: {
//             startTime: timings.water.startTime,
//             endTime: TourTimingManager.addToTime(timings.water.startTime, defaults.water.defaultDuration),
//             defaultDuration: defaults.water.defaultDuration,
//             durationChange: 0,
//             priority: defaults.water.priority,
//             currentDuration: defaults.water.defaultDuration
//           }
//         },
//         shuttle: {
//           timing: {
//             startTime: timings.shuttle.startTime,
//             endTime: TourTimingManager.addToTime(timings.shuttle.startTime, defaults.shuttle.defaultDuration),
//             defaultDuration: defaults.shuttle.defaultDuration,
//             durationChange: 0,
//             priority: defaults.shuttle.priority,
//             currentDuration: defaults.shuttle.defaultDuration
//           }
//         }
//       });
//     } catch (error) {
//       console.error('Error calculating tour timings:', error);
//     }
//   };

//   const handleSubmit = (data) => {
//     onSubmit({
//       ...data,
//       columnPosition,
//       sections: form.getValues('sections')
//     });
//   };

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
//         <FormField
//           control={form.control}
//           name="startTime"
//           render={({ field }) => (
//             <FormItem>
//               <FormControl>
//                 <Input type="time" {...field} className="w-full" />
//               </FormControl>
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="tourName"
//           render={({ field }) => (
//             <FormItem>
//               <Select
//                 onValueChange={(value) => {
//                   field.onChange(value);
//                   handleTourTypeChange(value);
//                 }}
//                 value={field.value}
//               >
//                 <FormControl>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select tour type" />
//                   </SelectTrigger>
//                 </FormControl>
//                 <SelectContent>
//                   {tourTypes.map((type) => (
//                     <SelectItem key={type} value={type}>
//                       {type.replace(/_/g, " ")}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </FormItem>
//           )}
//         />

//         {/* Optional fields */}
//         <div className="space-y-4 opacity-50">
//           <FormField
//             control={form.control}
//             name="shipName"
//             render={({ field }) => (
//               <FormItem>
//                 <Select onValueChange={field.onChange} value={field.value}>
//                   <FormControl>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select ship (optional)" />
//                     </SelectTrigger>
//                   </FormControl>
//                   <SelectContent>
//                     {ships.map((ship) => (
//                       <SelectItem key={ship} value={ship}>
//                         {ship.replace(/_/g, " ")}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="boat"
//             render={({ field }) => (
//               <FormItem>
//                 <Select onValueChange={field.onChange} value={field.value}>
//                   <FormControl>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select boat (optional)" />
//                     </SelectTrigger>
//                   </FormControl>
//                   <SelectContent>
//                     {boats.map((boat) => (
//                       <SelectItem key={boat} value={boat}>
//                         {boat}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </FormItem>
//             )}
//           />

//           <div className="grid grid-cols-2 gap-2">
//             <FormField
//               control={form.control}
//               name="cruisePassengers"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormControl>
//                     <Input
//                       type="number"
//                       placeholder="Cruise pax"
//                       {...field}
//                       onChange={(e) => field.onChange(Number(e.target.value))}
//                     />
//                   </FormControl>
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="compPassengers"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormControl>
//                     <Input
//                       type="number"
//                       placeholder="Comp pax"
//                       {...field}
//                       onChange={(e) => field.onChange(Number(e.target.value))}
//                     />
//                   </FormControl>
//                 </FormItem>
//               )}
//             />
//           </div>
//         </div>

//         <div className="flex justify-end space-x-2 pt-2">
//           <Button
//             type="button"
//             variant="outline"
//             size="sm"
//             onClick={() => onMoreDetails(form.getValues())}
//           >
//             More Details
//           </Button>
//           <Button type="submit" size="sm">
//             Save
//           </Button>
//         </div>
//       </form>
//     </Form>
//   );
// }
