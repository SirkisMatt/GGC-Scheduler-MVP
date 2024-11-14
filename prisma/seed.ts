// import { PrismaClient } from '@prisma/client';
// import { TourName, DockLocation, Trail, ShipName } from '@prisma/client';
// import { TimeManager } from '~/utils/time-manager';


// function combineDateTime(date: Date, timeStr: string): Date {
//   const [hours, minutes] = timeStr.split(':').map(Number);
//   const combined = new Date(date);
//   combined.setHours(hours, minutes, 0);
//   return combined;
// }


// const prisma = new PrismaClient();

// async function seed() {
//   // Clear existing data
//   await prisma.tour.deleteMany({});

//   const baseDate = new Date('2024-07-20');

//     // Function to calculate section times
//     const calculateTimes = (startTime: string) => {
//       const times = TimeManager.calculateTourTimings(startTime, {
//         transfer: { duration: 45 },
//         water: { duration: 135 },
//         shuttle: { duration: 120 }
//       });
  
//       return {
//         startTime: TimeManager.normalizeTimeString(startTime),
//         transferStartTime: times.transfer.startTime,
//         transferEndTime: times.transfer.endTime,
//         waterStartTime: times.water.startTime,
//         waterEndTime: times.water.endTime,
//         shuttleStartTime: times.shuttle.startTime,
//         shuttleEndTime: times.shuttle.endTime,
//       };
//     };

//   // Seed data
//   const tours = [
//     {
//       tourName: TourName.WHALES_AND_TRAILS,
//       tourDate: baseDate,
//       ...calculateTimes('08:45'),
//       guide: 'Robbie J.',
//       shipName: ShipName.CARNIVAL_SPIRIT,
//       shipDock: DockLocation.MARINE_PARK,
//       cruisePassengers: 12,
//       compPassengers: 0,
//       minCapacity: 8,
//       maxCapacity: 20,
//       transferStartLocation: DockLocation.MARINE_PARK,
//       transferDriver: 'Katie J.',
//       transferVehicle: 'Optimus',
//       waterStartLocation: 'Auke Bay',
//       waterEndLocation: 'Auke Bay',
//       captain: 'Joe G.',
//       boat: 'Mariner',
//       shuttleStartLocation: 'Auke Bay',
//       shuttleEndLocation: 'Marine Park',
//       shuttleTrail: Trail.MORAINE_ECOLOGY,
//       shuttleDriver: 'Dana G.',
//       shuttleVehicle: 'Cornicopia',
//       columnPosition: 1
//     },
//     {
//       tourName: TourName.WHALES_AND_TRAILS,
//       tourDate: baseDate,
//       ...calculateTimes('10:30'),
//       guide: 'Matty S.',
//       shipName: ShipName.RADIANCE_OF_THE_SEAS,
//       shipDock: DockLocation.MARINE_PARK,
//       cruisePassengers: 8,
//       compPassengers: 4,
//       minCapacity: 8,
//       maxCapacity: 20,
//       transferStartLocation: DockLocation.MARINE_PARK,
//       transferDriver: 'Malia S.',
//       transferVehicle: 'Chuck',
//       waterStartLocation: 'Auke Bay',
//       waterEndLocation: 'Auke Bay',
//       captain: 'Andy F.',
//       boat: 'Sounder',
//       shuttleStartLocation: 'Auke Bay',
//       shuttleEndLocation: 'Marine Park',
//       shuttleTrail: Trail.MORAINE_ECOLOGY,
//       shuttleDriver: 'Scott M.',
//       shuttleVehicle: 'Sasha',
//       columnPosition: 2
//     },
//     {
//       tourName: TourName.WHALES_AND_TRAILS,
//       tourDate: baseDate,
//       ...calculateTimes('14:45'),
//       guide: 'Katie J.',
//       shipName: ShipName.WESTERDAM,
//       shipDock: DockLocation.FRANKLIN,
//       cruisePassengers: 20,
//       compPassengers: 0,
//       minCapacity: 8,
//       maxCapacity: 20,
//       transferStartLocation: DockLocation.FRANKLIN,
//       transferDriver: 'Matty S.',
//       transferVehicle: 'Spot',
//       waterStartLocation: 'Auke Bay',
//       waterEndLocation: 'Auke Bay',
//       captain: 'Krichelle K.',
//       boat: 'Zephyr',
//       shuttleStartLocation: 'Auke Bay',
//       shuttleEndLocation: 'Franklin',
//       shuttleTrail: Trail.MORAINE_ECOLOGY,
//       shuttleDriver: 'Robbie J.',
//       shuttleVehicle: 'Spot',
//       columnPosition: 3
//     },
//     {
//       tourName: TourName.PHOTO_SAFARI,
//       tourDate: baseDate,
//       ...calculateTimes('08:30'),
//       guide: 'Scott M.',
//       shipName: ShipName.NOORDAM,
//       shipDock: DockLocation.FRANKLIN,
//       cruisePassengers: 18,
//       compPassengers: 4,
//       minCapacity: 8,
//       maxCapacity: 20,
//       transferStartLocation: DockLocation.FRANKLIN,
//       transferDriver: 'Malia S.',
//       transferVehicle: 'Flame',
//       waterStartLocation: 'Auke Bay',
//       waterEndLocation: 'Auke Bay',
//       captain: 'Tyler S.',
//       boat: 'Explorer',
//       shuttleStartLocation: 'Auke Bay',
//       shuttleEndLocation: 'Franklin',
//       shuttleTrail: Trail.MORAINE_ECOLOGY,
//       shuttleDriver: 'Dana G.',
//       shuttleVehicle: 'Spot',
//       columnPosition: 4
//     },
//     {
//       tourName: TourName.PHOTO_SAFARI,
//       tourDate: baseDate,
//       ...calculateTimes('19:15'),
//       guide: 'Aiden E.',
//       shipName: ShipName.WESTERDAM,
//       shipDock: DockLocation.AJ,
//       cruisePassengers: 15,
//       compPassengers: 3,
//       minCapacity: 8,
//       maxCapacity: 20,
//       transferStartLocation: DockLocation.AJ,
//       transferDriver: 'Dana G.',
//       transferVehicle: 'Katie Bug',
//       waterStartLocation: 'Auke Bay',
//       waterEndLocation: 'Auke Bay',
//       captain: 'Tyler S.',
//       boat: 'Mariner',
//       shuttleStartLocation: 'Auke Bay',
//       shuttleEndLocation: 'AJ',
//       shuttleTrail: Trail.MORAINE_ECOLOGY,
//       shuttleDriver: 'Katie J.',
//       shuttleVehicle: 'Flame',
//       columnPosition: 5
//     },
//     {
//       tourName: TourName.PHOTO_SAFARI,
//       tourDate: baseDate,
//       ...calculateTimes('16:30'),
//       guide: 'Dana G.',
//       shipName: ShipName.CARNIVAL_SPIRIT,
//       shipDock: DockLocation.MARINE_PARK,
//       cruisePassengers: 11,
//       compPassengers: 3,
//       minCapacity: 8,
//       maxCapacity: 20,
//       transferStartLocation: DockLocation.MARINE_PARK,
//       transferDriver: 'Matty S.',
//       transferVehicle: 'Cornicopia',
//       waterStartLocation: 'Auke Bay',
//       waterEndLocation: 'Auke Bay',
//       captain: 'Tyler S.',
//       boat: 'Mariner',
//       shuttleStartLocation: 'Auke Bay',
//       shuttleEndLocation: 'Marine Park',
//       shuttleTrail: Trail.MORAINE_ECOLOGY,
//       shuttleDriver: 'Scott M.',
//       shuttleVehicle: 'Sasha',
//       columnPosition: 6
//     },
//     {
//       tourName: TourName.WHALES_AND_TRAILS,
//       tourDate: baseDate,
//       ...calculateTimes('16:15'),
//       guide: 'Kate E.',
//       shipName: ShipName.CARNIVAL_SPIRIT,
//       shipDock: DockLocation.MARINE_PARK,
//       cruisePassengers: 16,
//       compPassengers: 5,
//       minCapacity: 8,
//       maxCapacity: 20,
//       transferStartLocation: DockLocation.MARINE_PARK,
//       transferDriver: 'Scott M.',
//       transferVehicle: 'Spot',
//       waterStartLocation: 'Auke Bay',
//       waterEndLocation: 'Auke Bay',
//       captain: 'Andy F.',
//       boat: 'Explorer',
//       shuttleStartLocation: 'Auke Bay',
//       shuttleEndLocation: 'Marine Park',
//       shuttleTrail: Trail.MORAINE_ECOLOGY,
//       shuttleDriver: 'Matty S.',
//       shuttleVehicle: 'Katie Bug',
//       columnPosition: 7
//     },
//     {
//       tourName: TourName.PHOTO_SAFARI,
//       tourDate: baseDate,
//       ...calculateTimes('09:15'),
//       guide: 'Jesse E.',
//       shipName: ShipName.CARNIVAL_SPIRIT,
//       shipDock: DockLocation.MARINE_PARK,
//       cruisePassengers: 16,
//       compPassengers: 1,
//       minCapacity: 8,
//       maxCapacity: 20,
//       transferStartLocation: DockLocation.MARINE_PARK,
//       transferDriver: 'Dana G.',
//       transferVehicle: 'Sasha',
//       waterStartLocation: 'Auke Bay',
//       waterEndLocation: 'Auke Bay',
//       captain: 'Andy F.',
//       boat: 'Explorer',
//       shuttleStartLocation: 'Auke Bay',
//       shuttleEndLocation: 'Marine Park',
//       shuttleTrail: Trail.MORAINE_ECOLOGY,
//       shuttleDriver: 'Malia S.',
//       shuttleVehicle: 'Spot',
//       columnPosition: 8
//     },
//     {
//       tourName: TourName.PHOTO_SAFARI,
//       tourDate: baseDate,
//       ...calculateTimes('18:00'),
//       guide: 'Misha P.',
//       shipName: ShipName.DISNEY_WONDER,
//       shipDock: DockLocation.FRANKLIN,
//       cruisePassengers: 16,
//       compPassengers: 3,
//       minCapacity: 8,
//       maxCapacity: 20,
//       transferStartLocation: DockLocation.FRANKLIN,
//       transferDriver: 'Katie J.',
//       transferVehicle: 'Spot',
//       waterStartLocation: 'Auke Bay',
//       waterEndLocation: 'Auke Bay',
//       captain: 'Jenna S.',
//       boat: 'Ranger',
//       shuttleStartLocation: 'Auke Bay',
//       shuttleEndLocation: 'Franklin',
//       shuttleTrail: Trail.MORAINE_ECOLOGY,
//       shuttleDriver: 'Malia S.',
//       shuttleVehicle: 'Spot',
//       columnPosition: 9
//     },
//     {
//       tourName: TourName.PHOTO_SAFARI,
//       tourDate: baseDate,
//       ...calculateTimes('16:00'),
//       guide: 'Robbie J.',
//       shipName: ShipName.DISNEY_WONDER,
//       shipDock: DockLocation.AJ,
//       cruisePassengers: 18,
//       compPassengers: 4,
//       minCapacity: 8,
//       maxCapacity: 20,
//       transferStartLocation: DockLocation.AJ,
//       transferDriver: 'Matty S.',
//       transferVehicle: 'Optimus',
//       waterStartLocation: 'Auke Bay',
//       waterEndLocation: 'Auke Bay',
//       captain: 'Tyler S.',
//       boat: 'Zephyr',
//       shuttleStartLocation: 'Auke Bay',
//       shuttleEndLocation: 'AJ',
//       shuttleTrail: Trail.MORAINE_ECOLOGY,
//       shuttleDriver: 'Dana G.',
//       shuttleVehicle: 'Katie Bug',
//       columnPosition: 10
//     }
//   ];

//   for (const tour of tours) {
//     await prisma.tour.create({
//       data: tour
//     });
//   }

//   console.log(`Database has been seeded. 🌱`);
// }

// seed()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });

import { PrismaClient } from '@prisma/client';
import { TourName, DockLocation, Trail, ShipName } from '@prisma/client';
import { TimeManager } from '~/utils/time-manager';


function combineDateTime(date: Date, timeStr: string): Date {
  const [hours, minutes] = timeStr.split(':').map(Number);
  const combined = new Date(date);
  combined.setHours(hours, minutes, 0);
  return combined;
}


const prisma = new PrismaClient();


  // Helper to format time from HH:mm:ss to HH:mm
function formatTime(time: string): string {
  return time.slice(0, 5);
 }
 
 async function seed() {
  // Clear existing data
  await prisma.tour.deleteMany({});
 
  const baseDate = new Date('2024-07-20');
 
  // Seed data
  const tours = [
    {
      tourName: TourName.WHALES_AND_TRAILS,
      tourDate: new Date('2024-07-20'),
      startTime: formatTime('08:45:00'),
      transferStartTime: formatTime('08:45:00'),
      transferEndTime: formatTime('09:30:00'),
      waterStartTime: formatTime('09:30:00'),
      waterEndTime: formatTime('11:45:00'),
      shuttleStartTime: formatTime('11:45:00'),
      shuttleEndTime: formatTime('13:45:00'),
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
      startTime: formatTime('10:30:00'),
      transferStartTime: formatTime('10:30:00'),
      transferEndTime: formatTime('11:15:00'),
      waterStartTime: formatTime('11:15:00'),
      waterEndTime: formatTime('13:30:00'),
      shuttleStartTime: formatTime('13:30:00'),
      shuttleEndTime: formatTime('15:30:00'),
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
      startTime: formatTime('14:45:00'),
      transferStartTime: formatTime('14:45:00'),
      transferEndTime: formatTime('15:30:00'),
      waterStartTime: formatTime('15:30:00'),
      waterEndTime: formatTime('17:45:00'),
      shuttleStartTime: formatTime('17:45:00'),
      shuttleEndTime: formatTime('19:45:00'),
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
      startTime: formatTime('08:30:00'),
      transferStartTime: formatTime('08:30:00'),
      transferEndTime: formatTime('09:15:00'),
      waterStartTime: formatTime('09:15:00'),
      waterEndTime: formatTime('11:30:00'),
      shuttleStartTime: formatTime('11:30:00'),
      shuttleEndTime: formatTime('13:30:00'),
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
      startTime: formatTime('19:15:00'),
      transferStartTime: formatTime('19:15:00'),
      transferEndTime: formatTime('20:00:00'),
      waterStartTime: formatTime('20:00:00'),
      waterEndTime: formatTime('22:15:00'),
      shuttleStartTime: formatTime('22:15:00'),
      shuttleEndTime: formatTime('00:15:00'),
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
      startTime: formatTime('10:30:00'),
      transferStartTime: formatTime('10:30:00'),
      transferEndTime: formatTime('11:15:00'),
      waterStartTime: formatTime('11:15:00'),
      waterEndTime: formatTime('13:30:00'),
      shuttleStartTime: formatTime('13:30:00'),
      shuttleEndTime: formatTime('15:30:00'),
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
      startTime: formatTime('16:30:00'),
      transferStartTime: formatTime('16:30:00'),
      transferEndTime: formatTime('17:15:00'),
      waterStartTime: formatTime('17:15:00'),
      waterEndTime: formatTime('19:30:00'),
      shuttleStartTime: formatTime('19:30:00'),
      shuttleEndTime: formatTime('21:30:00'),
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
      startTime: formatTime('16:15:00'),
      transferStartTime: formatTime('16:15:00'),
      transferEndTime: formatTime('17:00:00'),
      waterStartTime: formatTime('17:00:00'),
      waterEndTime: formatTime('19:15:00'),
      shuttleStartTime: formatTime('19:15:00'),
      shuttleEndTime: formatTime('21:15:00'),
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
      startTime: formatTime('09:15:00'),
      transferStartTime: formatTime('09:15:00'),
      transferEndTime: formatTime('10:00:00'),
      waterStartTime: formatTime('10:00:00'),
      waterEndTime: formatTime('12:15:00'),
      shuttleStartTime: formatTime('12:15:00'),
      shuttleEndTime: formatTime('14:15:00'),
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
      startTime: formatTime('18:00:00'),
      transferStartTime: formatTime('18:00:00'),
      transferEndTime: formatTime('18:45:00'),
      waterStartTime: formatTime('18:45:00'),
      waterEndTime: formatTime('21:00:00'),
      shuttleStartTime: formatTime('21:00:00'),
      shuttleEndTime: formatTime('23:00:00'),
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