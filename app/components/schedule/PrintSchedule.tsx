import React from "react";
import { format } from "date-fns";
import { Printer } from "lucide-react";
import { Button } from "~/components/ui/button";

interface Tour {
  id: number;
  shipName: string;
  shipDock: string | null;
  startTime: string;
  tourName: string;
  columnPosition: number;
  cruisePassengers: number;
  compPassengers: number;
  guide?: string | null;
  boat?: string | null;
  sections: {
    transfer: {
      driver?: string | null;
      timing: {
        startTime: string;
        endTime: string;
      };
      endLocation?: string;
      vehicle?: string | null;
    };
    water: {
      captain?: string | null;
      timing: {
        startTime: string;
        endTime: string;
      };
      startLocation?: string | null;
      endLocation?: string | null;
    };
    shuttle: {
      driver?: string | null;
      timing: {
        startTime: string;
        endTime: string;
      };
      startLocation?: string;
      vehicle?: string | null;
    };
  };
}

const getTourAcronym = (tourName: string): string => {
  const words = tourName.split("_");
  if (words.length === 1) return words[0].substring(0, 2).toUpperCase();
  return words.map((word) => word[0]).join("");
};

const TourSection = ({ tour }: { tour: Tour }) => {
  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  return (
    <div className="tour-section">
      {/* Header row */}
      <div className="header-row">
        <div className="left-content">
          <span className="ship-name">{tour.shipName.replace(/_/g, " ")}</span>
          <span className="start-time">{formatTime(tour.startTime)}</span>
        </div>
        <div className="right-content">
          <span className="dock-name">{tour.shipDock}</span>
        </div>
      </div>

      {/* Info row */}
      <div className="info-row">
        <div className="left-side">
          <span className="passenger-count">
            {tour.cruisePassengers + tour.compPassengers}
          </span>
          <span className="total-label">TOTAL</span>
        </div>
        <div className="middle">
          <label className="checkbox-label">
            <input type="checkbox" checked={true} readOnly /> Sea First
          </label>
          <label className="checkbox-label">
            <input type="checkbox" checked={false} readOnly /> Land First
          </label>
        </div>
        <div className="right-side">
          <span className="end-time">
            Ends: {formatTime(tour.sections.shuttle.timing.endTime)}
          </span>
        </div>
      </div>

      {/* List section */}
      <div className="tour-list">
        {/* Guide row */}
        <div className="list-row">
          <span className="crew-name">{tour.guide}</span>
          <span className="tour-type">{getTourAcronym(tour.tourName)}</span>
        </div>

        {/* Transfer row */}
        <div className="list-row">
          <span className="crew-name">{tour.sections.transfer.driver}</span>
          <span className="role">Transfer</span>
          <span className="vehicle">{tour.sections.transfer.vehicle}</span>
          <span className="timing">
            Pier: {formatTime(tour.sections.transfer.timing.startTime)} To{" "}
            {tour.sections.transfer.endLocation}{" "}
            {formatTime(tour.sections.transfer.timing.endTime)}
          </span>
        </div>

        {/* Captain row */}
        <div className="list-row">
          <span className="crew-name">{tour.sections.water.captain}</span>
          <span className="role">Captain</span>
          <span className="vehicle">{tour.boat}</span>
          <span className="timing">
            Lines Off: {tour.sections.water.startLocation}{" "}
            {formatTime(tour.sections.water.timing.startTime)}; RT{" "}
            {tour.sections.water.endLocation}{" "}
            {formatTime(tour.sections.water.timing.endTime)}
          </span>
        </div>

        {/* Shuttle row */}
        <div className="list-row">
          <span className="crew-name">{tour.sections.shuttle.driver}</span>
          <span className="role">Shuttle</span>
          <span className="vehicle">{tour.sections.shuttle.vehicle}</span>
          <span className="timing">
            {tour.sections.shuttle.startLocation}{" "}
            {formatTime(tour.sections.shuttle.timing.startTime)} To Pier:{" "}
            {formatTime(tour.sections.shuttle.timing.endTime)}
          </span>
        </div>
      </div>

      {/* Footer section */}
      <div className="footer-section">
        <div>Adult___ Child____ Indy____ Comp___ Tickets____Total____</div>
        <div>Ind Pax {tour.compPassengers}</div>
        <div>TRAIL____ Min__</div>
      </div>
    </div>
  );
};

const PrintSchedule = ({ tours, date }: { tours: Tour[]; date: string }) => {
  const sortedTours = [...tours].sort((a, b) => {
    const timeCompare = a.startTime.localeCompare(b.startTime);
    if (timeCompare !== 0) return timeCompare;
    return a.columnPosition - b.columnPosition;
  });

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const content = document.getElementById("print-content")?.innerHTML;
    if (!content) return;

    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Daily Schedule - ${format(
              new Date(date),
              "EEEE, MMMM d, yyyy"
            )}</title>
            <style>
              @page {
                size: letter;
                margin: 0.5in;
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
              }
              
              body {
                font-family: Arial, sans-serif;
                line-height: 1.2;
                margin: 0;
                padding: 0;
                font-size: 11pt;
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
                color-adjust: exact;
              }
  
              .tour-section {
                margin-bottom: 24px;
                page-break-inside: avoid;
              }
  
              .header-row {
                display: flex;
                justify-content: space-between;
                align-items: baseline;
                margin-bottom: 4px;
                background-color: #FFFDE7 !important;
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
                color-adjust: exact;
              }
  
              .left-content {
                display: flex;
                gap: 12px;
              }
  
              .ship-name {
                font-weight: bold;
              }
  
              .info-row {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 8px;
              }
  
              .left-side {
                display: flex;
                align-items: center;
                gap: 8px;
              }
  
              .passenger-count {
                font-size: 12pt;
              }
  
              .middle {
                display: flex;
                gap: 16px;
              }
  
              .checkbox-label {
                display: flex;
                align-items: center;
                gap: 4px;
              }
  
              .tour-list {
                margin-left: 12px;
              }
  
              .list-row {
                margin: 4px 0;
                display: flex;
                gap: 12px;
              }
  
              .crew-name {
                min-width: 100px;
              }
  
              .role {
                min-width: 80px;
              }
  
              .vehicle {
                min-width: 100px;
              }
  
              .timing {
                flex: 1;
              }
  
              .footer-section {
                margin-top: 12px;
                padding-bottom: 12px;
                border-bottom: 1px solid #000;
              }
  
              .page-break {
                page-break-before: always;
              }
  
              /* Header styles */
              .page-header {
                text-align: center;
                margin-bottom: 20px;
              }
  
              .daily-reminder {
                text-align: center;
                margin-bottom: 20px;
              }
  
              input[type="checkbox"] {
                margin: 0;
                vertical-align: middle;
              }
            </style>
          </head>
          <body>
            <div class="daily-reminder">
              <p>Daily Reminder:<br>
              Rooted Logic builds the right thing</p>
            </div>
            <div class="page-header">
              <h1>Gastineau Guiding Daily Tour Schedule</h1>
              <h2>${format(new Date(date), "EEEE, MMMM d, yyyy")}</h2>
            </div>
            ${content}
          </body>
        </html>
      `);

    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div>
      <Button onClick={handlePrint}>
        <Printer className="w-4 h-4 mr-2" />
        Print Schedule
      </Button>

      <div id="print-content" className="hidden">
        {sortedTours.map((tour, index) => (
          <React.Fragment key={tour.id}>
            {index > 0 && index % 6 === 0 && <div className="page-break"></div>}
            <TourSection tour={tour} />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default PrintSchedule;
