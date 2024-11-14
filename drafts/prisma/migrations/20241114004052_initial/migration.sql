-- CreateTable
CREATE TABLE "ships" (
    "ship_id" SERIAL NOT NULL,
    "ship_name" VARCHAR(50) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ships_pkey" PRIMARY KEY ("ship_id")
);

-- CreateTable
CREATE TABLE "ship_dockings" (
    "ship_docking" SERIAL NOT NULL,
    "ship_id" INTEGER NOT NULL,
    "dock_id" INTEGER NOT NULL,
    "arrival_time" TIMESTAMP(3) NOT NULL,
    "all_aboard" TIMESTAMP(3) NOT NULL,
    "lines_off" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ship_dockings_pkey" PRIMARY KEY ("ship_docking")
);

-- CreateTable
CREATE TABLE "location_types" (
    "location_type_id" SERIAL NOT NULL,
    "location_type_name" VARCHAR(50) NOT NULL,

    CONSTRAINT "location_types_pkey" PRIMARY KEY ("location_type_id")
);

-- CreateTable
CREATE TABLE "locations" (
    "location_id" SERIAL NOT NULL,
    "location_type_id" INTEGER NOT NULL,
    "location_name" VARCHAR(50) NOT NULL,
    "coordinates" TEXT NOT NULL,

    CONSTRAINT "locations_pkey" PRIMARY KEY ("location_id")
);

-- CreateTable
CREATE TABLE "vehicle_types" (
    "vehicle_type_id" SERIAL NOT NULL,
    "vehicle_type_name" VARCHAR(50) NOT NULL,

    CONSTRAINT "vehicle_types_pkey" PRIMARY KEY ("vehicle_type_id")
);

-- CreateTable
CREATE TABLE "vehicle_statuses" (
    "vehicle_status_id" SERIAL NOT NULL,
    "status_description" VARCHAR(50) NOT NULL,

    CONSTRAINT "vehicle_statuses_pkey" PRIMARY KEY ("vehicle_status_id")
);

-- CreateTable
CREATE TABLE "vehicles" (
    "vehicle_id" SERIAL NOT NULL,
    "vehicle_type_id" INTEGER NOT NULL,
    "vehicle_status_id" INTEGER NOT NULL,
    "vehicle_name" VARCHAR(50) NOT NULL,
    "capacity" INTEGER NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vehicles_pkey" PRIMARY KEY ("vehicle_id")
);

-- CreateTable
CREATE TABLE "employees" (
    "employee_id" SERIAL NOT NULL,
    "first_name" VARCHAR(50) NOT NULL,
    "last_name" VARCHAR(50) NOT NULL,
    "first_day" DATE NOT NULL,
    "last_day" DATE,
    "cdl" BOOLEAN NOT NULL DEFAULT false,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employees_pkey" PRIMARY KEY ("employee_id")
);

-- CreateTable
CREATE TABLE "jobs" (
    "job_id" SERIAL NOT NULL,
    "job_name" VARCHAR(50) NOT NULL,
    "job_category" VARCHAR(50) NOT NULL,

    CONSTRAINT "jobs_pkey" PRIMARY KEY ("job_id")
);

-- CreateTable
CREATE TABLE "employee_jobs" (
    "employee_id" INTEGER NOT NULL,
    "job_id" INTEGER NOT NULL,
    "hourly_rate" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "employee_jobs_pkey" PRIMARY KEY ("employee_id","job_id")
);

-- CreateTable
CREATE TABLE "trails" (
    "trail_id" SERIAL NOT NULL,
    "trail_name" VARCHAR(50) NOT NULL,
    "trail_max" INTEGER,
    "permit" VARCHAR(50),
    "notes" TEXT,

    CONSTRAINT "trails_pkey" PRIMARY KEY ("trail_id")
);

-- CreateTable
CREATE TABLE "tour_types" (
    "tour_type_id" SERIAL NOT NULL,
    "tour_name" VARCHAR(50) NOT NULL,
    "min_pax" INTEGER,
    "max_pax" INTEGER,

    CONSTRAINT "tour_types_pkey" PRIMARY KEY ("tour_type_id")
);

-- CreateTable
CREATE TABLE "tour_components" (
    "tour_component_id" SERIAL NOT NULL,
    "tour_component_name" VARCHAR(50) NOT NULL,
    "duration" INTEGER NOT NULL,

    CONSTRAINT "tour_components_pkey" PRIMARY KEY ("tour_component_id")
);

-- CreateTable
CREATE TABLE "tour_type_components" (
    "tour_type_id" INTEGER NOT NULL,
    "tour_component_id" INTEGER NOT NULL,
    "priority" INTEGER NOT NULL,

    CONSTRAINT "tour_type_components_pkey" PRIMARY KEY ("tour_type_id","tour_component_id")
);

-- CreateTable
CREATE TABLE "tour_component_instances" (
    "tour_component_instance" SERIAL NOT NULL,
    "tour_id" INTEGER NOT NULL,
    "tour_component_id" INTEGER NOT NULL,
    "employee_id" INTEGER,
    "vehicle_id" INTEGER,
    "start_location_id" INTEGER,
    "end_location_id" INTEGER,
    "trail_id" INTEGER,
    "tour_component_start_time" TIMESTAMP(3),
    "tour_component_end_time" TIMESTAMP(3),
    "payroll_start_time" TIMESTAMP(3),
    "payroll_end_time" TIMESTAMP(3),

    CONSTRAINT "tour_component_instances_pkey" PRIMARY KEY ("tour_component_instance")
);

-- CreateTable
CREATE TABLE "tours" (
    "tour_id" SERIAL NOT NULL,
    "ship_id" INTEGER,
    "dock_id" INTEGER,
    "guide_id" INTEGER,
    "tour_type_id" INTEGER NOT NULL,
    "cruise_pax" INTEGER,
    "comp_pax" INTEGER,
    "start_time" TIMESTAMP(3) NOT NULL,
    "cx_status" BOOLEAN NOT NULL DEFAULT false,
    "column_level" INTEGER NOT NULL DEFAULT 0,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tours_pkey" PRIMARY KEY ("tour_id")
);

-- CreateTable
CREATE TABLE "trail_use" (
    "trail_id" INTEGER NOT NULL,
    "tour_id" INTEGER NOT NULL,
    "count" INTEGER NOT NULL,

    CONSTRAINT "trail_use_pkey" PRIMARY KEY ("trail_id","tour_id")
);

-- AddForeignKey
ALTER TABLE "ship_dockings" ADD CONSTRAINT "ship_dockings_ship_id_fkey" FOREIGN KEY ("ship_id") REFERENCES "ships"("ship_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ship_dockings" ADD CONSTRAINT "ship_dockings_dock_id_fkey" FOREIGN KEY ("dock_id") REFERENCES "locations"("location_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "locations" ADD CONSTRAINT "locations_location_type_id_fkey" FOREIGN KEY ("location_type_id") REFERENCES "location_types"("location_type_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_vehicle_type_id_fkey" FOREIGN KEY ("vehicle_type_id") REFERENCES "vehicle_types"("vehicle_type_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_vehicle_status_id_fkey" FOREIGN KEY ("vehicle_status_id") REFERENCES "vehicle_statuses"("vehicle_status_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_jobs" ADD CONSTRAINT "employee_jobs_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("employee_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_jobs" ADD CONSTRAINT "employee_jobs_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "jobs"("job_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tour_type_components" ADD CONSTRAINT "tour_type_components_tour_type_id_fkey" FOREIGN KEY ("tour_type_id") REFERENCES "tour_types"("tour_type_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tour_type_components" ADD CONSTRAINT "tour_type_components_tour_component_id_fkey" FOREIGN KEY ("tour_component_id") REFERENCES "tour_components"("tour_component_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tour_component_instances" ADD CONSTRAINT "tour_component_instances_tour_id_fkey" FOREIGN KEY ("tour_id") REFERENCES "tours"("tour_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tour_component_instances" ADD CONSTRAINT "tour_component_instances_tour_component_id_fkey" FOREIGN KEY ("tour_component_id") REFERENCES "tour_components"("tour_component_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tour_component_instances" ADD CONSTRAINT "tour_component_instances_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("employee_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tour_component_instances" ADD CONSTRAINT "tour_component_instances_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles"("vehicle_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tour_component_instances" ADD CONSTRAINT "tour_component_instances_start_location_id_fkey" FOREIGN KEY ("start_location_id") REFERENCES "locations"("location_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tour_component_instances" ADD CONSTRAINT "tour_component_instances_end_location_id_fkey" FOREIGN KEY ("end_location_id") REFERENCES "locations"("location_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tour_component_instances" ADD CONSTRAINT "tour_component_instances_trail_id_fkey" FOREIGN KEY ("trail_id") REFERENCES "trails"("trail_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tours" ADD CONSTRAINT "tours_ship_id_fkey" FOREIGN KEY ("ship_id") REFERENCES "ships"("ship_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tours" ADD CONSTRAINT "tours_dock_id_fkey" FOREIGN KEY ("dock_id") REFERENCES "locations"("location_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tours" ADD CONSTRAINT "tours_guide_id_fkey" FOREIGN KEY ("guide_id") REFERENCES "employees"("employee_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tours" ADD CONSTRAINT "tours_tour_type_id_fkey" FOREIGN KEY ("tour_type_id") REFERENCES "tour_types"("tour_type_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trail_use" ADD CONSTRAINT "trail_use_trail_id_fkey" FOREIGN KEY ("trail_id") REFERENCES "trails"("trail_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trail_use" ADD CONSTRAINT "trail_use_tour_id_fkey" FOREIGN KEY ("tour_id") REFERENCES "tours"("tour_id") ON DELETE RESTRICT ON UPDATE CASCADE;
