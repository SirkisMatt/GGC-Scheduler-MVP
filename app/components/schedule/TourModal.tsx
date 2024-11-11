import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const formSchema = z.object({
  shipId: z.string().min(1, "Please select a ship"),
  tourTypeId: z.string().min(1, "Please select a tour type"),
  cruisePassengers: z.number().min(0).max(100),
  compPassengers: z.number().min(0).default(0),
  cancelStatus: z.boolean().default(false),
});

interface TourModalProps {
  date: Date;
  time: string;
  ships: Array<{ id: string; name: string }>;
  tourTypes: Array<{
    id: string;
    name: string;
    code: string;
    minPassengers: number;
    maxPassengers: number;
  }>;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TourModal({
  date,
  time,
  ships,
  tourTypes,
  open,
  onOpenChange,
}: TourModalProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      shipId: "",
      tourTypeId: "",
      cruisePassengers: 0,
      compPassengers: 0,
      cancelStatus: false,
    },
  });

  const selectedTourType = tourTypes.find(
    (t) => t.id === form.watch("tourTypeId")
  );

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Handle form submission
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Tour</DialogTitle>
          <DialogDescription>
            Schedule a new tour for {date.toLocaleDateString()} at {time}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="shipId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ship</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a ship" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {ships.map((ship) => (
                          <SelectItem key={ship.id} value={ship.id}>
                            {ship.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tourTypeId"
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
                        {tourTypes.map((type) => (
                          <SelectItem key={type.id} value={type.id}>
                            {type.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {selectedTourType && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
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
                        <FormDescription>
                          Max: {selectedTourType.maxPassengers}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
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
                  control={form.control}
                  name="cancelStatus"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <input
                          type="checkbox"
                          checked={field.value}
                          onChange={field.onChange}
                          className="h-4 w-4 rounded border-gray-300"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Cancel Status</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              </>
            )}

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Continue</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
