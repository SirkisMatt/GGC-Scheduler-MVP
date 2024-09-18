-- CreateTable
CREATE TABLE "Boats" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "max_capacity" INTEGER NOT NULL,
    "license_required" TEXT NOT NULL,
    "notes" TEXT,

    CONSTRAINT "Boats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vehicles" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "max_capacity" INTEGER NOT NULL,
    "license_required" TEXT NOT NULL,
    "notes" TEXT,

    CONSTRAINT "Vehicles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BoatMaintenance" (
    "id" SERIAL NOT NULL,
    "boatId" INTEGER NOT NULL,
    "hull_maintenance_due" TIMESTAMP(3) NOT NULL,
    "usgs_certification" TIMESTAMP(3) NOT NULL,
    "engine_starboard" TEXT NOT NULL,
    "engine_middle" TEXT NOT NULL,
    "engine_port" TEXT NOT NULL,
    "oil_change_id" INTEGER NOT NULL,
    "boat_engine_maintenance_id" INTEGER NOT NULL,
    "priority_level_id" INTEGER NOT NULL,

    CONSTRAINT "BoatMaintenance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VehicleMaintenance" (
    "id" SERIAL NOT NULL,
    "vehicleId" INTEGER NOT NULL,
    "oil_change_id" INTEGER NOT NULL,
    "cleaned" TIMESTAMP(3) NOT NULL,
    "priority_level_id" INTEGER NOT NULL,

    CONSTRAINT "VehicleMaintenance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OilChanges" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "OilChanges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MaintenancePriority" (
    "id" SERIAL NOT NULL,
    "level" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "MaintenancePriority_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BoatMaintenance" ADD CONSTRAINT "BoatMaintenance_boatId_fkey" FOREIGN KEY ("boatId") REFERENCES "Boats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoatMaintenance" ADD CONSTRAINT "BoatMaintenance_oil_change_id_fkey" FOREIGN KEY ("oil_change_id") REFERENCES "OilChanges"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoatMaintenance" ADD CONSTRAINT "BoatMaintenance_priority_level_id_fkey" FOREIGN KEY ("priority_level_id") REFERENCES "MaintenancePriority"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VehicleMaintenance" ADD CONSTRAINT "VehicleMaintenance_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VehicleMaintenance" ADD CONSTRAINT "VehicleMaintenance_oil_change_id_fkey" FOREIGN KEY ("oil_change_id") REFERENCES "OilChanges"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VehicleMaintenance" ADD CONSTRAINT "VehicleMaintenance_priority_level_id_fkey" FOREIGN KEY ("priority_level_id") REFERENCES "MaintenancePriority"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
