import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "~/components/ui/sheet";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format, addMinutes } from "date-fns";
import type { Tour } from "~/types/tour";
import { TourName, ShipName, DockLocation, Trail } from "@prisma/client";
import { TransferSection } from "./tour-forms/TransferSection";
import { WaterSection } from "./tour-forms/WaterSection";
import { ShuttleSection } from "./tour-forms/ShuttleSection";

// Initial form schema matches our Tour type
const initialFormSchema = z.object({
  tourName: z.nativeEnum(TourName),
  shipName: z.nativeEnum(ShipName),
  shipDock: z.nativeEnum(DockLocation),
  cruisePassengers: z.number().min(0),
  compPassengers: z.number().min(0),
  guide: z.string(),
  columnPosition: z.number().min(0),
});

type InitialFormValues = z.infer<typeof initialFormSchema>;

// Detailed form schema for sections
const transferSectionSchema = z.object({
  startLocation: z.nativeEnum(DockLocation),
  endLocation: z.string(),
  driver: z.string(),
  vehicle: z.string(),
  timing: z.object({
    startTime: z.string(),
    endTime: z.string(),
    duration: z.number(),
    priority: z.number(),
  }),
});

const waterSectionSchema = z.object({
  startLocation: z.string(),
  endLocation: z.string(),
  captain: z.string(),
  boat: z.string(),
  timing: z.object({
    startTime: z.string(),
    endTime: z.string(),
    duration: z.number(),
    priority: z.number(),
  }),
  // Optional fields for Disney tours
  crabPot: z.string().optional(),
  tablet: z.string().optional(),
});

const shuttleSectionSchema = z.object({
  startLocation: z.string(),
  endLocation: z.string(),
  driver: z.string(),
  vehicle: z.string(),
  trail: z.nativeEnum(Trail),
  timing: z.object({
    startTime: z.string(),
    endTime: z.string(),
    duration: z.number(),
    priority: z.number(),
  }),
  // Optional field for Disney tours
  waterSampleSite: z.string().optional(),
});

const detailedFormSchema = z.object({
  transfer: transferSectionSchema,
  water: waterSectionSchema,
  shuttle: shuttleSectionSchema,
});

type DetailedFormValues = z.infer<typeof detailedFormSchema>;

interface TourCreationFlowProps {
  date: Date;
  time: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: Tour) => void;
  employees: Array<{
    id: string;
    name: string;
    roles: string[];
    hasCDL: boolean;
  }>;
  vehicles: Array<{
    id: string;
    name: string;
    type: "bus" | "boat" | "van";
  }>;
}

export function TourCreationFlow({
  date,
  time,
  open,
  onOpenChange,
  onSubmit,
  employees,
  vehicles,
}: TourCreationFlowProps) {
  const [showDetailedForm, setShowDetailedForm] = useState(false);
  const [initialValues, setInitialValues] = useState<InitialFormValues | null>(
    null
  );

  // Initial form
  const initialForm = useForm<InitialFormValues>({
    resolver: zodResolver(initialFormSchema),
    defaultValues: {
      cruisePassengers: 0,
      compPassengers: 0,
      columnPosition: 0,
    },
  });

  // Detailed form with computed default values based on tour type
  const detailedForm = useForm<DetailedFormValues>({
    resolver: zodResolver(detailedFormSchema),
  });

  const handleInitialSubmit = (values: InitialFormValues) => {
    setInitialValues(values);
    setShowDetailedForm(true);
  };

  const handleDetailedSubmit = (values: DetailedFormValues) => {
    // if (!initialValues) return;

    // // Combine both forms' data into final Tour object
    // const tourData: Tour = {
    //   ...initialValues,
    //   tourDate: date,
    //   startTime: time,
    //   sections: values,
    //   minCapacity: 8, // Default values - could be made dynamic based on tour type
    //   maxCapacity: 20,
    // };

    // onSubmit(tourData);
    // onOpenChange(false);
    console.log("Tour data:", values);
  };

  // Filter helpers
  const getCDLDrivers = () => employees.filter((e) => e.hasCDL);
  const getCaptains = () =>
    employees.filter((e) => e.roles.includes("captain"));
  const getBuses = () => vehicles.filter((v) => v.type === "bus");
  const getBoats = () => vehicles.filter((v) => v.type === "boat");

  const getSectionTimes = (tourType: TourName, baseTime: string) => {
    const baseDate = new Date(`1970-01-01T${baseTime}`);

    switch (tourType) {
      case TourName.WHALES_AND_TRAILS:
        return {
          transfer: {
            start: baseTime,
            end: format(addMinutes(baseDate, 45), "HH:mm"),
          },
          water: {
            start: format(addMinutes(baseDate, 45), "HH:mm"),
            end: format(addMinutes(baseDate, 180), "HH:mm"),
          },
          shuttle: {
            start: format(addMinutes(baseDate, 180), "HH:mm"),
            end: format(addMinutes(baseDate, 300), "HH:mm"),
          },
        };
      // Add other tour type timings
      default:
        return null;
    }
  };

  return (
    <>
      {/* Initial Modal */}
      <Dialog open={open && !showDetailedForm} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Tour</DialogTitle>
          </DialogHeader>
          <Form {...initialForm}>
            <form
              onSubmit={initialForm.handleSubmit(handleInitialSubmit)}
              className="space-y-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={initialForm.control}
                  name="tourName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tour Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select tour type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.values(TourName).map((type) => (
                            <SelectItem key={type} value={type}>
                              {type.replace(/_/g, " ")}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={initialForm.control}
                  name="shipName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ship</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select ship" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.values(ShipName).map((ship) => (
                            <SelectItem key={ship} value={ship}>
                              {ship.replace(/_/g, " ")}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={initialForm.control}
                  name="cruisePassengers"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cruise Passengers</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={initialForm.control}
                  name="compPassengers"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Comp Passengers</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={initialForm.control}
                name="guide"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Guide</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select guide" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {employees
                          .filter((e) => e.roles.includes("guide"))
                          .map((guide) => (
                            <SelectItem key={guide.id} value={guide.id}>
                              {guide.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={initialForm.control}
                name="columnPosition"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Column</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit">Next</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Detailed Overlay */}
      <Sheet
        open={showDetailedForm}
        onOpenChange={() => setShowDetailedForm(false)}
      >
        <SheetContent side="right" className="w-full max-w-3xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Tour Details</SheetTitle>
          </SheetHeader>

          <Form {...detailedForm}>
            <form
              onSubmit={detailedForm.handleSubmit(handleDetailedSubmit)}
              className="space-y-6 py-4"
            >
              {/* Section Forms */}
              <TransferSection
                control={detailedForm.control}
                drivers={getCDLDrivers()}
                vehicles={getBuses()}
                tourType={initialValues?.tourName}
              />

              <WaterSection
                control={detailedForm.control}
                captains={getCaptains()}
                boats={getBoats()}
                tourType={initialValues?.tourName}
              />

              <ShuttleSection
                control={detailedForm.control}
                drivers={getCDLDrivers()}
                vehicles={getBuses()}
                tourType={initialValues?.tourName}
              />

              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setShowDetailedForm(false)}
                >
                  Back
                </Button>
                <Button type="submit">Create Tour</Button>
              </div>
            </form>
          </Form>
        </SheetContent>
      </Sheet>
    </>
  );
}

// Section components would go here...
// I can add those next if you'd like to see them!
