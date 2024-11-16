import React from "react";
import {
  Trash2,
  Plus,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import { format } from "date-fns";

interface SchedulerHeaderProps {
  date: Date;
  onPrevDay: () => void;
  onNextDay: () => void;
  onAddTour: () => void;
  onAddColumn: () => void;
  onDeleteColumn: () => void;
  columnCount?: number;
}

export const SchedulerHeader: React.FC<SchedulerHeaderProps> = ({
  date,
  onPrevDay,
  onNextDay,
  onAddTour,
  onAddColumn,
  onDeleteColumn,
  columnCount = 0,
}) => {
  return (
    <div className="sticky top-0 z-20 flex border-b bg-white">
      {/* Time column header */}
      <div className="w-20 flex-shrink-0 border-r p-4">
        <div className="flex items-center justify-between">
          {/* <CalendarDays className="h-5 w-5 text-gray-500" /> */}
          <div className="text-sm font-medium">
            {format(new Date(date), "MMM d")}
          </div>
        </div>
      </div>

      {/* Main header content */}
      <div className="flex-1 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {/* Navigation */}
            <div className="flex items-center space-x-1 mr-4">
              <Button variant="ghost" size="icon" onClick={onPrevDay}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={onNextDay}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Tour and Column Actions */}
            <Button onClick={onAddTour} className="mr-2">
              <Plus className="h-4 w-4 mr-2" />
              New Tour
            </Button>
            <Button variant="outline" onClick={onAddColumn}>
              <Plus className="h-4 w-4 mr-2" />
              Add Column
            </Button>
          </div>

          {/* Delete Column Button - only shown if there are columns */}
          {columnCount > 0 && (
            <Button
              variant="outline"
              onClick={onDeleteColumn}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Column
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
