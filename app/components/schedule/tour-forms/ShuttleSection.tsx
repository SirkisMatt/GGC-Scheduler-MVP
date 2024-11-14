import { Control } from "react-hook-form";
import {
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
import { TourName, Trail } from "@prisma/client";

interface Employee {
  id: string;
  name: string;
  roles: string[];
  hasCDL: boolean;
}

interface Vehicle {
  id: string;
  name: string;
  type: "bus" | "boat" | "van";
}

interface SectionProps {
  control: Control<any>;
  tourType?: TourName;
  className?: string;
}

interface ShuttleSectionProps extends SectionProps {
  drivers: Employee[];
  vehicles: Vehicle[];
}

export function ShuttleSection({
  control,
  drivers,
  vehicles,
  tourType,
  className,
}: ShuttleSectionProps) {
  const isDisneyTour = tourType?.includes("DISNEY");

  return (
    <div className={`border rounded-lg p-4 space-y-4 ${className}`}>
      <h3 className="font-medium text-lg">Shuttle Section</h3>

      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={control}
          name="shuttle.driver"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Shuttle Guide</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select guide" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {drivers.map((driver) => (
                    <SelectItem key={driver.id} value={driver.id}>
                      {driver.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="shuttle.vehicle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vehicle</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select vehicle" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {vehicles.map((vehicle) => (
                    <SelectItem key={vehicle.id} value={vehicle.id}>
                      {vehicle.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={control}
        name="shuttle.trail"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Trail</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select trail" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {Object.values(Trail).map((trail) => (
                  <SelectItem key={trail} value={trail}>
                    {trail.replace(/_/g, " ")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={control}
          name="shuttle.timing.startTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Time</FormLabel>
              <FormControl>
                <Input {...field} disabled={field.value === "P"} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="shuttle.timing.endTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>End Time</FormLabel>
              <FormControl>
                <Input {...field} disabled={field.value === "P"} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {isDisneyTour && (
        <FormField
          control={control}
          name="shuttle.waterSampleSite"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Water Sample Site</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select site" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="site1">Site 1</SelectItem>
                  <SelectItem value="site2">Site 2</SelectItem>
                  {/* Add actual water sample site options */}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </div>
  );
}
