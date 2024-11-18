// import React from "react";
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
// } from "~/components/ui/sheet";
// import { Button } from "~/components/ui/button";
// import { Input } from "~/components/ui/input";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
// } from "~/components/ui/form";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "~/components/ui/select";
// import { Separator } from "~/components/ui/separator";
// import { ScrollArea } from "~/components/ui/scroll-area";
// import { Clock, Calendar, User, Users, Ship, Anchor } from "lucide-react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { format } from "date-fns";
// import { detailedFormSchema } from "~/schemas/tour-schemas";
// import type { DetailedFormValues, QuickFormValues } from "~/schemas/tour-schemas";
// import {Tour} from "~/types";
// import { TransferSection } from "./tour-forms/TransferSection";
// import { WaterSection } from "./tour-forms/WaterSection";
// import { ShuttleSection } from "./tour-forms/ShuttleSection";

// interface EditTourProps {
//   open: boolean;
//   onClose: () => void;
//   onSubmit: (data: DetailedFormValues) => void;
//   initialData: QuickFormValues;
//   tour?: Tour;
// }

// export function EditTour({
//   open,
//   onClose,
//   onSubmit,
//   initialData,
//   tour,
// }: EditTourProps) {
//   const form = useForm<DetailedFormValues>({
//     resolver: zodResolver(detailedFormSchema),
//     defaultValues: tour || initialData,
//   });

//   return (
//     <Sheet open={open} onOpenChange={onClose}>
//       <SheetContent side="right" className="w-[500px] p-0">
//         <SheetHeader className="p-6 pb-4 border-b">
//           <SheetTitle className="text-xl">
//             {tour ? "Edit Tour" : "New Tour"}
//           </SheetTitle>
//         </SheetHeader>

//         <ScrollArea className="h-[calc(100vh-10rem)]">
//           <Form {...form}>
//             <form
//               onSubmit={form.handleSubmit(onSubmit)}
//               className="space-y-6 p-6"
//             >
//               {/* Basic Info Section */}
//               <div className="space-y-4">
//                 <FormField
//                   control={form.control}
//                   name="tourName"
//                   render={({ field }) => (
//                     <FormItem className="flex items-center gap-3">
//                       <Anchor className="h-5 w-5 text-gray-500" />
//                       <Select
//                         onValueChange={field.onChange}
//                         value={field.value}
//                       >
//                         <FormControl>
//                           <SelectTrigger className="w-full">
//                             <SelectValue placeholder="Select tour type" />
//                           </SelectTrigger>
//                         </FormControl>
//                         <SelectContent>
//                           {Object.values(TourName).map((type) => (
//                             <SelectItem key={type} value={type}>
//                               {type.replace(/_/g, " ")}
//                             </SelectItem>
//                           ))}
//                         </SelectContent>
//                       </Select>
//                     </FormItem>
//                   )}
//                 />

//                 <div className="flex items-center gap-3">
//                   <Calendar className="h-5 w-5 text-gray-500" />
//                   <div className="flex gap-2 flex-1">
//                     <Input
//                       type="date"
//                       value={format(new Date(initialData.date), "yyyy-MM-dd")}
//                       className="flex-1"
//                       readOnly
//                     />
//                     <Input
//                       type="time"
//                       value={initialData.startTime}
//                       className="w-32"
//                       readOnly
//                     />
//                   </div>
//                 </div>
//               </div>

//               <Separator />

//               {/* Ship & Passenger Section */}
//               <div className="space-y-4">
//                 <FormField
//                   control={form.control}
//                   name="shipName"
//                   render={({ field }) => (
//                     <FormItem className="flex items-center gap-3">
//                       <Ship className="h-5 w-5 text-gray-500" />
//                       <Select
//                         onValueChange={field.onChange}
//                         value={field.value}
//                       >
//                         <FormControl>
//                           <SelectTrigger className="w-full">
//                             <SelectValue placeholder="Select ship" />
//                           </SelectTrigger>
//                         </FormControl>
//                         <SelectContent>
//                           {Object.values(ShipName).map((ship) => (
//                             <SelectItem key={ship} value={ship}>
//                               {ship.replace(/_/g, " ")}
//                             </SelectItem>
//                           ))}
//                         </SelectContent>
//                       </Select>
//                     </FormItem>
//                   )}
//                 />

//                 <div className="flex items-center gap-3">
//                   <Users className="h-5 w-5 text-gray-500" />
//                   <div className="grid grid-cols-2 gap-2 flex-1">
//                     <FormField
//                       control={form.control}
//                       name="cruisePassengers"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormControl>
//                             <Input
//                               type="number"
//                               placeholder="Cruise pax"
//                               {...field}
//                               onChange={(e) =>
//                                 field.onChange(Number(e.target.value))
//                               }
//                             />
//                           </FormControl>
//                         </FormItem>
//                       )}
//                     />
//                     <FormField
//                       control={form.control}
//                       name="compPassengers"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormControl>
//                             <Input
//                               type="number"
//                               placeholder="Comp pax"
//                               {...field}
//                               onChange={(e) =>
//                                 field.onChange(Number(e.target.value))
//                               }
//                             />
//                           </FormControl>
//                         </FormItem>
//                       )}
//                     />
//                   </div>
//                 </div>
//               </div>

//               <Separator />

//               {/* Transfer Section */}
//               <div className="space-y-4">
//                 <h3 className="font-medium text-sm text-gray-500">Transfer</h3>
//                 <TransferSection
//                   control={form.control}
//                   tourType={form.watch("tourName")}
//                 />
//               </div>

//               <Separator />

//               {/* Water Section */}
//               <div className="space-y-4">
//                 <h3 className="font-medium text-sm text-gray-500">Water</h3>
//                 <WaterSection
//                   control={form.control}
//                   tourType={form.watch("tourName")}
//                 />
//               </div>

//               <Separator />

//               {/* Shuttle Section */}
//               <div className="space-y-4">
//                 <h3 className="font-medium text-sm text-gray-500">Shuttle</h3>
//                 <ShuttleSection
//                   control={form.control}
//                   tourType={form.watch("tourName")}
//                 />
//               </div>
//             </form>
//           </Form>
//         </ScrollArea>

//         <div className="p-6 border-t bg-white">
//           <div className="flex justify-end gap-2">
//             <Button variant="outline" onClick={onClose}>
//               Cancel
//             </Button>
//             <Button onClick={form.handleSubmit(onSubmit)}>
//               {tour ? "Save Changes" : "Create Tour"}
//             </Button>
//           </div>
//         </div>
//       </SheetContent>
//     </Sheet>
//   );
// }
