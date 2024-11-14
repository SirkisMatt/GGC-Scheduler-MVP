import { PrismaClient } from '@prisma/client';
import { TourName, DockLocation, Trail, ShipName } from '@prisma/client';


function combineDateTime(date: Date, timeStr: string): Date {
  const [hours, minutes] = timeStr.split(':').map(Number);
  const combined = new Date(date);
  combined.setHours(hours, minutes, 0);
  return combined;
}


const prisma = new PrismaClient();

async function seed() {
  // Clear existing data
  await prisma.tour.deleteMany({});

  const baseDate = new Date('2024-07-20');

  // Seed data
  const tours = [
    {
        tourName: TourName.WHALES_AND_TRAILS,
        tourDate: new Date('2024-07-20'),
        startTime: combineDateTime(baseDate, '08:45:00'),
        guide: 'Robbie J.',
        shipName: ShipName.CARNIVAL_SPIRIT,
        shipDock: DockLocation.MARINE_PARK,
        cruisePassengers: 12,
        compPassengers: 0,
        minCapacity: 8,
        maxCapacity: 20,
        transferStartLocation: DockLocation.MARINE_PARK,
        transferDriver: 'Katie J.',
        transferVehicle: 'Optimus',
        waterStartLocation: 'Auke Bay',
        waterEndLocation: 'Auke Bay',
        captain: 'Joe G.',
        boat: 'Mariner',
        shuttleStartLocation: 'Auke Bay',
        shuttleEndLocation: 'Marine Park',
        shuttleTrail: Trail.MORAINE_ECOLOGY,
        shuttleDriver: 'Dana G.',
        shuttleVehicle: 'Cornicopia',
        columnPosition: 1
      },
      {
        tourName: TourName.WHALES_AND_TRAILS,
        tourDate: new Date('2024-07-20'),
        startTime: combineDateTime(baseDate, '10:30:00'),
        guide: 'Matty S.',
        shipName: ShipName.RADIANCE_OF_THE_SEAS,
        shipDock: DockLocation.MARINE_PARK,
        cruisePassengers: 8,
        compPassengers: 4,
        minCapacity: 8,
        maxCapacity: 20,
        transferStartLocation: DockLocation.MARINE_PARK,
        transferDriver: 'Malia S.',
        transferVehicle: 'Chuck',
        waterStartLocation: 'Auke Bay',
        waterEndLocation: 'Auke Bay',
        captain: 'Andy F.',
        boat: 'Sounder',
        shuttleStartLocation: 'Auke Bay',
        shuttleEndLocation: 'Marine Park',
        shuttleTrail: Trail.MORAINE_ECOLOGY,
        shuttleDriver: 'Scott M.',
        shuttleVehicle: 'Sasha',
        columnPosition: 2
      },
      {
        tourName: TourName.WHALES_AND_TRAILS,
        tourDate: new Date('2024-07-20'),
        startTime: combineDateTime(baseDate, '14:45:00'),
        guide: 'Katie J.',
        shipName: ShipName.WESTERDAM,
        shipDock: DockLocation.FRANKLIN,
        cruisePassengers: 20,
        compPassengers: 0,
        minCapacity: 8,
        maxCapacity: 20,
        transferStartLocation: DockLocation.FRANKLIN,
        transferDriver: 'Matty S.',
        transferVehicle: 'Spot',
        waterStartLocation: 'Auke Bay',
        waterEndLocation: 'Auke Bay',
        captain: 'Krichelle K.',
        boat: 'Zephyr',
        shuttleStartLocation: 'Auke Bay',
        shuttleEndLocation: 'Franklin',
        shuttleTrail: Trail.MORAINE_ECOLOGY,
        shuttleDriver: 'Robbie J.',
        shuttleVehicle: 'Spot',
        columnPosition: 3
      },
      {
        tourName: TourName.PHOTO_SAFARI,
        tourDate: new Date('2024-07-20'),
        startTime: combineDateTime(baseDate, '08:30:00'),
        guide: 'Scott M.',
        shipName: ShipName.NOORDAM,
        shipDock: DockLocation.FRANKLIN,
        cruisePassengers: 18,
        compPassengers: 4,
        minCapacity: 8,
        maxCapacity: 20,
        transferStartLocation: DockLocation.FRANKLIN,
        transferDriver: 'Malia S.',
        transferVehicle: 'Flame',
        waterStartLocation: 'Auke Bay',
        waterEndLocation: 'Auke Bay',
        captain: 'Tyler S.',
        boat: 'Explorer',
        shuttleStartLocation: 'Auke Bay',
        shuttleEndLocation: 'Franklin',
        shuttleTrail: Trail.MORAINE_ECOLOGY,
        shuttleDriver: 'Dana G.',
        shuttleVehicle: 'Spot',
        columnPosition: 4
      },
      {
        tourName: TourName.PHOTO_SAFARI,
        tourDate: new Date('2024-07-20'),
        startTime: combineDateTime(baseDate, '19:15:00'),
        guide: 'Aiden E.',
        shipName: ShipName.WESTERDAM,
        shipDock: DockLocation.AJ,
        cruisePassengers: 15,
        compPassengers: 3,
        minCapacity: 8,
        maxCapacity: 20,
        transferStartLocation: DockLocation.AJ,
        transferDriver: 'Dana G.',
        transferVehicle: 'Katie Bug',
        waterStartLocation: 'Auke Bay',
        waterEndLocation: 'Auke Bay',
        captain: 'Tyler S.',
        boat: 'Mariner',
        shuttleStartLocation: 'Auke Bay',
        shuttleEndLocation: 'AJ',
        shuttleTrail: Trail.MORAINE_ECOLOGY,
        shuttleDriver: 'Katie J.',
        shuttleVehicle: 'Flame',
        columnPosition: 5
      },
      {
        tourName: TourName.PHOTO_SAFARI,
        tourDate: new Date('2024-07-20'),
        startTime: combineDateTime(baseDate, '10:30:00'),
        guide: 'Dana G.',
        shipName: ShipName.CARNIVAL_SPIRIT,
        shipDock: DockLocation.MARINE_PARK,
        cruisePassengers: 11,
        compPassengers: 3,
        minCapacity: 8,
        maxCapacity: 20,
        transferStartLocation: DockLocation.MARINE_PARK,
        transferDriver: 'Matty S.',
        transferVehicle: 'Cornicopia',
        waterStartLocation: 'Auke Bay',
        waterEndLocation: 'Auke Bay',
        captain: 'Tyler S.',
        boat: 'Mariner',
        shuttleStartLocation: 'Auke Bay',
        shuttleEndLocation: 'Marine Park',
        shuttleTrail: Trail.MORAINE_ECOLOGY,
        shuttleDriver: 'Scott M.',
        shuttleVehicle: 'Sasha',
        columnPosition: 6
      },
      {
        tourName: TourName.WHALES_AND_TRAILS,
        tourDate: new Date('2024-07-20'),
        startTime: combineDateTime(baseDate, '16:30:00'),
        guide: 'Aiden E.',
        shipName: ShipName.CARNIVAL_SPIRIT,
        shipDock: DockLocation.MARINE_PARK,
        cruisePassengers: 16,
        compPassengers: 5,
        minCapacity: 8,
        maxCapacity: 20,
        transferStartLocation: DockLocation.MARINE_PARK,
        transferDriver: 'Scott M.',
        transferVehicle: 'Spot',
        waterStartLocation: 'Auke Bay',
        waterEndLocation: 'Auke Bay',
        captain: 'Andy F.',
        boat: 'Explorer',
        shuttleStartLocation: 'Auke Bay',
        shuttleEndLocation: 'Marine Park',
        shuttleTrail: Trail.MORAINE_ECOLOGY,
        shuttleDriver: 'Matty S.',
        shuttleVehicle: 'Katie Bug',
        columnPosition: 7
      },
      {
        tourName: TourName.PHOTO_SAFARI,
        tourDate: new Date('2024-07-20'),
        startTime: combineDateTime(baseDate, '16:15:00'),
        guide: 'Aiden E.',
        shipName: ShipName.CARNIVAL_SPIRIT,
        shipDock: DockLocation.MARINE_PARK,
        cruisePassengers: 16,
        compPassengers: 1,
        minCapacity: 8,
        maxCapacity: 20,
        transferStartLocation: DockLocation.MARINE_PARK,
        transferDriver: 'Dana G.',
        transferVehicle: 'Sasha',
        waterStartLocation: 'Auke Bay',
        waterEndLocation: 'Auke Bay',
        captain: 'Andy F.',
        boat: 'Explorer',
        shuttleStartLocation: 'Auke Bay',
        shuttleEndLocation: 'Marine Park',
        shuttleTrail: Trail.MORAINE_ECOLOGY,
        shuttleDriver: 'Malia S.',
        shuttleVehicle: 'Spot',
        columnPosition: 8
      },
      {
        tourName: TourName.PHOTO_SAFARI,
        tourDate: new Date('2024-07-20'),
        startTime: combineDateTime(baseDate, '09:15:00'),
        guide: 'Misha P.',
        shipName: ShipName.DISNEY_WONDER,
        shipDock: DockLocation.FRANKLIN,
        cruisePassengers: 16,
        compPassengers: 3,
        minCapacity: 8,
        maxCapacity: 20,
        transferStartLocation: DockLocation.FRANKLIN,
        transferDriver: 'Katie J.',
        transferVehicle: 'Spot',
        waterStartLocation: 'Auke Bay',
        waterEndLocation: 'Auke Bay',
        captain: 'Jenna S.',
        boat: 'Ranger',
        shuttleStartLocation: 'Auke Bay',
        shuttleEndLocation: 'Franklin',
        shuttleTrail: Trail.MORAINE_ECOLOGY,
        shuttleDriver: 'Malia S.',
        shuttleVehicle: 'Spot',
        columnPosition: 9
      },
      {
        tourName: TourName.PHOTO_SAFARI,
        tourDate: new Date('2024-07-20'),
        startTime: combineDateTime(baseDate, '18:00:00'),
        guide: 'Robbie J.',
        shipName: ShipName.DISNEY_WONDER,
        shipDock: DockLocation.AJ,
        cruisePassengers: 18,
        compPassengers: 4,
        minCapacity: 8,
        maxCapacity: 20,
        transferStartLocation: DockLocation.AJ,
        transferDriver: 'Matty S.',
        transferVehicle: 'Optimus',
        waterStartLocation: 'Auke Bay',
        waterEndLocation: 'Auke Bay',
        captain: 'Tyler S.',
        boat: 'Zephyr',
        shuttleStartLocation: 'Auke Bay',
        shuttleEndLocation: 'AJ',
        shuttleTrail: Trail.MORAINE_ECOLOGY,
        shuttleDriver: 'Dana G.',
        shuttleVehicle: 'Katie Bug',
        columnPosition: 10
      },
      {
        tourName: TourName.WHALES_AND_TRAILS,
        tourDate: new Date('2024-07-20'),
        startTime: combineDateTime(baseDate, '15:30:00'),
        guide: 'Malia S.',
        shipName: ShipName.CARNIVAL_SPIRIT,
        shipDock: DockLocation.CRUISE_SHIP_TERMINAL,
        cruisePassengers: 11,
        compPassengers: 1,
        minCapacity: 8,
        maxCapacity: 20,
        transferStartLocation: DockLocation.CRUISE_SHIP_TERMINAL,
        transferDriver: 'Aiden E.',
        transferVehicle: 'Optimus',
        waterStartLocation: 'Auke Bay',
        waterEndLocation: 'Auke Bay',
        captain: 'Jenna S.',
        boat: 'Sounder',
        shuttleStartLocation: 'Auke Bay',
        shuttleEndLocation: 'Cruise Ship Terminal',
        shuttleTrail: Trail.MORAINE_ECOLOGY,
        shuttleDriver: 'Dana G.',
        shuttleVehicle: 'Optimus',
        columnPosition: 11
      },
      {
        tourName: TourName.WHALES_AND_TRAILS,
        tourDate: new Date('2024-07-20'),
        startTime: combineDateTime(baseDate, '10:30:00'),
        guide: 'Matty S.',
        shipName: ShipName.DISNEY_WONDER,
        shipDock: DockLocation.CRUISE_SHIP_TERMINAL,
        cruisePassengers: 16,
        compPassengers: 0,
        minCapacity: 8,
        maxCapacity: 20,
        transferStartLocation: DockLocation.CRUISE_SHIP_TERMINAL,
        transferDriver: 'Katie J.',
        transferVehicle: 'Katie Bug',
        waterStartLocation: 'Auke Bay',
        waterEndLocation: 'Auke Bay',
        captain: 'Andy F.',
        boat: 'Mariner',
        shuttleStartLocation: 'Auke Bay',
        shuttleEndLocation: 'Cruise Ship Terminal',
        shuttleTrail: Trail.MORAINE_ECOLOGY,
        shuttleDriver: 'Malia S.',
        shuttleVehicle: 'Sasha',
        columnPosition: 12
      },
      {
        tourName: TourName.WHALES_AND_TRAILS,
        tourDate: new Date('2024-07-20'),
        startTime: combineDateTime(baseDate, '19:30:00'),
        guide: 'Robbie J.',
        shipName: ShipName.NOORDAM,
        shipDock: DockLocation.MARINE_PARK,
        cruisePassengers: 17,
        compPassengers: 4,
        minCapacity: 8,
        maxCapacity: 20,
        transferStartLocation: DockLocation.MARINE_PARK,
        transferDriver: 'Matty S.',
        transferVehicle: 'Katie Bug',
        waterStartLocation: 'Auke Bay',
        waterEndLocation: 'Auke Bay',
        captain: 'Tyler S.',
        boat: 'Mariner',
        shuttleStartLocation: 'Auke Bay',
        shuttleEndLocation: 'Marine Park',
        shuttleTrail: Trail.MORAINE_ECOLOGY,
        shuttleDriver: 'Katie J.',
        shuttleVehicle: 'Optimus',
        columnPosition: 13
      },
      {
        tourName: TourName.PHOTO_SAFARI,
        tourDate: new Date('2024-07-20'),
        startTime: combineDateTime(baseDate, '21:15:00'),
        guide: 'Robbie J.',
        shipName: ShipName.NOORDAM,
        shipDock: DockLocation.FRANKLIN,
        cruisePassengers: 9,
        compPassengers: 3,
        minCapacity: 8,
        maxCapacity: 20,
        transferStartLocation: DockLocation.FRANKLIN,
        transferDriver: 'Katie J.',
        transferVehicle: 'Chuck',
        waterStartLocation: 'Auke Bay',
        waterEndLocation: 'Auke Bay',
        captain: 'Joe G.',
        boat: 'Ranger',
        shuttleStartLocation: 'Auke Bay',
        shuttleEndLocation: 'Franklin',
        shuttleTrail: Trail.MORAINE_ECOLOGY,
        shuttleDriver: 'Matty S.',
        shuttleVehicle: 'Cornicopia',
        columnPosition: 14
      }
  ];

  for (const tour of tours) {
    await prisma.tour.create({
      data: tour
    });
  }

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });