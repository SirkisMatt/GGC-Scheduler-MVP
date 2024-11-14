-- CreateEnum
CREATE TYPE "TourName" AS ENUM ('WHALES_AND_TRAILS', 'PHOTO_SAFARI');

-- CreateEnum
CREATE TYPE "DockLocation" AS ENUM ('AJ', 'FRANKLIN', 'CRUISE_SHIP_TERMINAL', 'MARINE_PARK');

-- CreateEnum
CREATE TYPE "Trail" AS ENUM ('MORAINE_ECOLOGY');

-- CreateEnum
CREATE TYPE "ShipName" AS ENUM ('WESTERDAM', 'CARNIVAL_SPIRIT', 'RADIANCE_OF_THE_SEAS', 'NOORDAM', 'DISNEY_WONDER');

-- CreateTable
CREATE TABLE "tours" (
    "tour_id" SERIAL NOT NULL,
    "tour_name" "TourName" NOT NULL,
    "tour_date" DATE NOT NULL,
    "start_time" TIME NOT NULL,
    "guide" VARCHAR(50),
    "ship_name" "ShipName" NOT NULL,
    "ship_dock" "DockLocation" NOT NULL,
    "cruise_passengers" INTEGER NOT NULL,
    "comp_passengers" INTEGER NOT NULL,
    "min_capacity" INTEGER NOT NULL,
    "max_capacity" INTEGER NOT NULL,
    "transfer_duration" INTEGER NOT NULL DEFAULT 45,
    "transfer_start_location" "DockLocation" NOT NULL,
    "transfer_end_location" VARCHAR(50) NOT NULL DEFAULT 'Auke Bay',
    "transfer_driver" VARCHAR(50),
    "transfer_vehicle" VARCHAR(50),
    "transfer_priority" INTEGER NOT NULL DEFAULT 1,
    "water_duration" INTEGER NOT NULL DEFAULT 135,
    "water_start_location" VARCHAR(50) NOT NULL DEFAULT 'Auke Bay',
    "water_end_location" VARCHAR(50) NOT NULL DEFAULT 'Auke Bay',
    "captain" VARCHAR(50),
    "boat" VARCHAR(50),
    "water_priority" INTEGER NOT NULL DEFAULT 2,
    "shuttle_duration" INTEGER NOT NULL DEFAULT 120,
    "shuttle_start_location" VARCHAR(50) NOT NULL DEFAULT 'Auke Bay',
    "shuttle_end_location" VARCHAR(50),
    "shuttle_trail" "Trail" NOT NULL DEFAULT 'MORAINE_ECOLOGY',
    "shuttle_driver" VARCHAR(50),
    "shuttle_vehicle" VARCHAR(50),
    "shuttle_priority" INTEGER NOT NULL DEFAULT 3,
    "column_position" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "tours_pkey" PRIMARY KEY ("tour_id")
);
