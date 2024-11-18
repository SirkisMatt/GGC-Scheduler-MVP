import { format } from "date-fns";
import { X } from "lucide-react";
import { Card, CardContent } from "~/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "~/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { quickFormSchema } from "~/schemas/tour-schemas";
import type { QuickFormValues } from "~/schemas/tour-schemas";
import type { Position } from "~/types/tour";
import { useEffect, useRef } from "react";
import { boats } from "../../../data/tour-data";

interface QuickTourModalProps {
  position: Position;
  columnPosition: number;
  date: Date;
  time: string;
  tourTypes: string[];
  ships: string[];
  onClose: () => void;
  onSubmit: (data: QuickFormValues & { columnPosition: number }) => void;
  onMoreDetails: (data: QuickFormValues & { columnPosition: number }) => void;
}

export function QuickTourModal({
  position,
  columnPosition,
  date,
  time,
  tourTypes,
  ships,
  onClose,
  onSubmit,
  onMoreDetails,
}: QuickTourModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  const form = useForm<QuickFormValues & { columnPosition: number }>({
    resolver: zodResolver(quickFormSchema),
    defaultValues: {
      startTime: time,
      cruisePassengers: 0,
      compPassengers: 0,
      columnPosition: columnPosition,
    },
  });

  useEffect(() => {
    const positionModal = () => {
      const columnElement = document.querySelector(
        `[data-column-id="${columnPosition}"]`
      );
      if (!columnElement || !modalRef.current) return;

      const columnRect = columnElement.getBoundingClientRect();
      const modalWidth = 320; // w-80 = 320px
      const modalHeight = modalRef.current.offsetHeight;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const padding = 16;

      // Calculate horizontal position
      let left = columnRect.right + padding; // Default to right side
      if (left + modalWidth > viewportWidth) {
        // If no room on right, try left side
        left = columnRect.left - modalWidth - padding;
      }

      // Calculate vertical position
      let top = position.y + window.scrollY;

      // Check if modal would extend below viewport
      if (top + modalHeight > viewportHeight + window.scrollY) {
        // Adjust upward to fit
        top = viewportHeight + window.scrollY - modalHeight - padding;
      }

      // Ensure modal doesn't go above viewport
      top = Math.max(padding + window.scrollY, top);

      // Apply position
      modalRef.current.style.left = `${left}px`;
      modalRef.current.style.top = `${top}px`;
    };

    positionModal();
    window.addEventListener("resize", positionModal);
    window.addEventListener("scroll", positionModal);

    return () => {
      window.removeEventListener("resize", positionModal);
      window.removeEventListener("scroll", positionModal);
    };
  }, [columnPosition, position.y]);

  const handleSubmit = (data: QuickFormValues & { columnPosition: number }) => {
    try {
      onSubmit(data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleMoreDetails = () => {
    const values = form.getValues();
    onMoreDetails(values);
  };

  return (
    <div className="fixed inset-0 z-40" onClick={onClose}>
      {/* Modal */}
      <Card
        ref={modalRef}
        className="fixed w-80 shadow-lg bg-white z-50"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal content remains the same */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="text-sm font-medium">
            {format(date, "EEEE, MMMM d")}
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <CardContent className="p-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4"
            >
              {/* Form fields remain the same */}
              <FormField
                control={form.control}
                name="startTime"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="time" {...field} className="w-full" />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* ... rest of the form fields ... */}
              <FormField
                control={form.control}
                name="tourName"
                render={({ field }) => (
                  <FormItem>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select tour type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {tourTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type.replace(/_/g, " ")}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="shipName"
                render={({ field }) => (
                  <FormItem>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select ship" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {ships.map((ship) => (
                          <SelectItem key={ship} value={ship}>
                            {ship.replace(/_/g, " ")}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="boat"
                render={({ field }) => (
                  <FormItem>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select boat" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {boats.map((boat) => (
                          <SelectItem key={boat} value={boat}>
                            {boat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-2">
                <FormField
                  control={form.control}
                  name="cruisePassengers"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Cruise pax"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="compPassengers"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Comp pax"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleMoreDetails}
                >
                  More Details
                </Button>
                <Button type="submit" size="sm">
                  Save
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
