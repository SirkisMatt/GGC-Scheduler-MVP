import React from "react";
import { Clock, Plus } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

interface SchedulerHeaderProps {
  onAddColumn: () => void;
  index: number;
  onDelete: (index: number) => void;
}

export function SchedulerHeader({ onAddColumn }: SchedulerHeaderProps) {
  return (
    <div className="flex items-center justify-between p-4 border-b bg-white">
      <div className="flex items-center space-x-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Tour
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Tour</DialogTitle>
            </DialogHeader>
            {/* Tour form will go here */}
          </DialogContent>
        </Dialog>

        <Button variant="outline" onClick={onAddColumn}>
          <Plus className="w-4 h-4 mr-2" />
          Add Column
        </Button>
      </div>
      <Button variant="outline">
        <Clock className="w-4 h-4 mr-2" />
        Today
      </Button>
    </div>
  );
}
