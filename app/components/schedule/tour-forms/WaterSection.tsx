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
import { TourName } from "@prisma/client";

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

interface WaterSectionProps extends SectionProps {
  captains: Employee[];
  boats: Vehicle[];
}

export function WaterSection({
  control,
  captains,
  boats,
  tourType,
  className,
}: WaterSectionProps) {
  const isDisneyTour = tourType?.includes("DISNEY");

  return (
    <div className={`border rounded-lg p-4 space-y-4 ${className}`}>
      <h3 className="font-medium text-lg">Water Section</h3>

      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={control}
          name="water.captain"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Captain</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select captain" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {captains.map((captain) => (
                    <SelectItem key={captain.id} value={captain.id}>
                      {captain.name}
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
          name="water.boat"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Boat</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select boat" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {boats.map((boat) => (
                    <SelectItem key={boat.id} value={boat.id}>
                      {boat.name}
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
          name="water.timing.startTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lines Off Time</FormLabel>
              <FormControl>
                <Input {...field} disabled={field.value === "P"} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="water.timing.endTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Return Time</FormLabel>
              <FormControl>
                <Input {...field} disabled={field.value === "P"} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {isDisneyTour && (
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={control}
            name="water.crabPot"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Crab Pot</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select crab pot" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="pot1">Pot 1</SelectItem>
                    <SelectItem value="pot2">Pot 2</SelectItem>
                    {/* Add actual crab pot options */}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="water.tablet"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tablet</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select tablet" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="tablet1">Tablet 1</SelectItem>
                    <SelectItem value="tablet2">Tablet 2</SelectItem>
                    {/* Add actual tablet options */}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      )}
    </div>
  );
}
