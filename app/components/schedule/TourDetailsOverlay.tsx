import { useState, useEffect } from "react";
import { Sheet, SheetContent } from "../ui/sheet";
import { Button } from "~/components/ui/button";
import { TourTypeConfig } from "../../configs/tours";
import { WTSeaFirstForm } from "./tour-forms/WTSeaFirstForm";
// import { WTLandFirstForm } from "./tour-forms/WTLandFirstForm";
// import { PhotoSafariForm } from "./tour-forms/PhotoSafariForm";
// import { DisneyForm } from "./tour-forms/DisneyForm";
// import { DiscoverWhalesForm } from "./tour-forms/DiscoverWhalesForm";
// import { GuidesChoiceForm } from "./tour-forms/GuidesChoiceForm";

interface TourDetailsOverlayProps {
  tourType: {
    id: string;
    code: string;
    name: string;
  };
  initialData: {
    date: Date;
    startTime: string;
    shipId: string;
    cruisePassengers: number;
    compPassengers: number;
  };
  onClose: () => void;
  onSave: (data: any) => void;
}

export function TourDetailsOverlay({
  tourType,
  initialData,
  onClose,
  onSave,
}: TourDetailsOverlayProps) {
  const [formData, setFormData] = useState<any>(initialData);

  const renderForm = () => {
    switch (tourType.code) {
      case "WT-SF-AB":
      case "WT-SF-ND":
        return (
          <WTSeaFirstForm
            data={formData}
            onChange={setFormData}
            location={tourType.code.includes("AB") ? "AB" : "ND"}
          />
        );

      //   case "WT-LF-AB":
      //   case "WT-LF-ND":
      //     return (
      //       <WTLandFirstForm
      //         data={formData}
      //         onChange={setFormData}
      //         location={tourType.code.includes("AB") ? "AB" : "ND"}
      //       />
      //     );

      //   case "PS-SF":
      //     return (
      //       <PhotoSafariForm
      //         data={formData}
      //         onChange={setFormData}
      //         isSeaFirst={true}
      //       />
      //     );

      //   case "PS-LF":
      //     return (
      //       <PhotoSafariForm
      //         data={formData}
      //         onChange={setFormData}
      //         isSeaFirst={false}
      //       />
      //     );

      //   case "DISNEY-SF":
      //     return (
      //       <DisneyForm
      //         data={formData}
      //         onChange={setFormData}
      //         isSeaFirst={true}
      //       />
      //     );

      //   case "DISNEY-LF":
      //     return (
      //       <DisneyForm
      //         data={formData}
      //         onChange={setFormData}
      //         isSeaFirst={false}
      //       />
      // );

      //   case "DAW":
      //     return <DiscoverWhalesForm data={formData} onChange={setFormData} />;

      //   case "GC":
      //     return <GuidesChoiceForm data={formData} onChange={setFormData} />;

      default:
        return <div>Unsupported tour type</div>;
    }
  };

  return (
    <Sheet open onOpenChange={onClose}>
      <SheetContent
        side="right"
        className="w-full sm:w-[540px] overflow-y-auto"
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center py-4 border-b">
            <h2 className="text-lg font-semibold">{tourType.name}</h2>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>

          <div className="flex-1 py-4">{renderForm()}</div>

          <div className="flex justify-end space-x-4 py-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={() => onSave(formData)}>Save Tour</Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
