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
import { TourName, DockLocation } from "@prisma/client";

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

interface TransferSectionProps extends SectionProps {
  drivers: Employee[];
  vehicles: Vehicle[];
}

export function TransferSection({
  control,
  drivers,
  vehicles,
  tourType,
  className,
}: TransferSectionProps) {
  return (
    <div className={`border rounded-lg p-4 space-y-4 ${className}`}>
      <h3 className="font-medium text-lg">Transfer Section</h3>

      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={control}
          name="transfer.startLocation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Location</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={field.value === "P"} // For prefilled values
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(DockLocation).map((location) => (
                    <SelectItem key={location} value={location}>
                      {location.replace(/_/g, " ")}
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
          name="transfer.endLocation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>End Location</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={field.value === "P"}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="AUKE_BAY">Auke Bay</SelectItem>
                  <SelectItem value="NORTH_DOUGLAS">North Douglas</SelectItem>
                  {Object.values(DockLocation).map((location) => (
                    <SelectItem key={location} value={location}>
                      {location.replace(/_/g, " ")}
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
          control={control}
          name="transfer.driver"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Driver</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select driver" />
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
          name="transfer.vehicle"
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

      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={control}
          name="transfer.timing.startTime"
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
          name="transfer.timing.endTime"
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
    </div>
  );
}
