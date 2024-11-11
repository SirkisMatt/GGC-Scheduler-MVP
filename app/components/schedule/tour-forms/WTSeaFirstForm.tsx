import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { formatTime } from "~/utils/date";
import { addMinutes } from "date-fns";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Input } from "../../ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";

const formSchema = z.object({
  transfer: z.object({
    driverId: z.string().min(1, "Driver is required"),
    vehicleId: z.string().min(1, "Vehicle is required"),
  }),
  water: z.object({
    captainId: z.string().min(1, "Captain is required"),
    boatId: z.string().min(1, "Boat is required"),
  }),
  land: z.object({
    shuttleGuideId: z.string().min(1, "Shuttle guide is required"),
    vehicleId: z.string().min(1, "Vehicle is required"),
  }),
});

interface WTSeaFirstFormProps {
  data: {
    date: Date;
    startTime: string;
  };
  onChange: (data: z.infer<typeof formSchema>) => void;
  location: "AB" | "ND";
}

export function WTSeaFirstForm({
  data,
  onChange,
  location,
}: WTSeaFirstFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      transfer: {
        driverId: "",
        vehicleId: "",
      },
      water: {
        captainId: "",
        boatId: "",
      },
      land: {
        shuttleGuideId: "",
        vehicleId: "",
      },
    },
  });

  // Calculate timing for all sections
  const startTime = new Date(
    `${data.date.toISOString().split("T")[0]}T${data.startTime}`
  );
  const transferEndTime = addMinutes(startTime, 45);
  const waterEndTime = addMinutes(transferEndTime, 135); // 2.25 hours
  const tourEndTime = addMinutes(waterEndTime, 120); // 2 hours

  // Watch form changes and propagate to parent
  const formValues = form.watch();
  useEffect(() => {
    onChange(formValues);
  }, [formValues, onChange]);

  return (
    <Form {...form}>
      <form className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Transfer Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="transfer.driverId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Driver</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select driver" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {/* Add driver options here */}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="transfer.vehicleId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vehicle</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select vehicle" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {/* Add vehicle options here */}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormItem>
                <FormLabel>Start Location</FormLabel>
                <Input value="Dock" disabled />
              </FormItem>

              <FormItem>
                <FormLabel>End Location</FormLabel>
                <Input value={location} disabled />
              </FormItem>

              <FormItem>
                <FormLabel>Start Time</FormLabel>
                <Input value={formatTime(startTime)} disabled />
              </FormItem>

              <FormItem>
                <FormLabel>End Time</FormLabel>
                <Input value={formatTime(transferEndTime)} disabled />
              </FormItem>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Water Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="water.captainId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Captain</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select captain" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {/* Add captain options here */}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="water.boatId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Boat</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select boat" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {/* Add boat options here */}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormItem>
                <FormLabel>Lines Off Time</FormLabel>
                <Input value={formatTime(transferEndTime)} disabled />
              </FormItem>

              <FormItem>
                <FormLabel>Return Time</FormLabel>
                <Input value={formatTime(waterEndTime)} disabled />
              </FormItem>

              <FormItem>
                <FormLabel>Start Location</FormLabel>
                <Input value={location} disabled />
              </FormItem>

              <FormItem>
                <FormLabel>End Location</FormLabel>
                <Input value={location} disabled />
              </FormItem>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Land Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="land.shuttleGuideId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Shuttle Guide</FormLabel>
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
                        {/* Add guide options here */}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="land.vehicleId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vehicle</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select vehicle" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {/* Add vehicle options here */}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormItem>
                <FormLabel>Start Location</FormLabel>
                <Input value={location} disabled />
              </FormItem>

              <FormItem>
                <FormLabel>End Location</FormLabel>
                <Input value="Dock" disabled />
              </FormItem>

              <FormItem>
                <FormLabel>Start Time</FormLabel>
                <Input value={formatTime(waterEndTime)} disabled />
              </FormItem>

              <FormItem>
                <FormLabel>End Time</FormLabel>
                <Input value={formatTime(tourEndTime)} disabled />
              </FormItem>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
