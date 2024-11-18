import { cn } from "~/lib/utils";

interface TourPlaceholderProps {
  style: React.CSSProperties;
}

export function TourPlaceHolder({ style }: TourPlaceholderProps) {
  return (
    <div
      style={style}
      className={cn(
        "group mx-2", // Same spacing as TourBlock
        "rounded-lg shadow-sm",
        "transition-all border border-slate-200",
        "flex flex-col overflow-hidden",
        "pointer-events-none"
      )}
    >
      {/* Water Section */}
      <div className="w-full p-2.5 border-b border-slate-200 relative z-20 bg-blue-50 flex-1">
        <div className="flex flex-col h-full">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="min-w-0 flex-1">
              <div className="font-semibold text-sm text-blue-400">
                New Tour
              </div>
              <div className="text-xs font-medium text-blue-400">
                Select Type
              </div>
            </div>
          </div>

          <div className="space-y-1 text-blue-400">
            <div className="text-sm">Captain: Pending</div>
            <div className="text-sm">Boat: Pending</div>
            <div className="text-xs">Passengers: --</div>
          </div>
        </div>
      </div>
    </div>
  );
}
