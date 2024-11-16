export const locations = ["AJ", "Franklin", "Cruise Ship Terminal", "Marine Park"] as const;
export type Location = typeof locations[number];
export const drivers = [
  "Aiden E.",
  "Matty S.",
  "Malia S.",
  "Misha P.",
  "Scott M.",
  "Dana G.",
  "Robbie J.",
  "Katie J."
] as const;
export type Driver = typeof drivers[number];
export const vehicles = [
  "Katie Bug",
  "Flame",
  "Cornicopia",
  "Sasha",
  "Chuck",
  "Spot",
  "Optimus"
] as const;
export type Vehicle = typeof vehicles[number];
export const waterLocations = ["Auke Bay", "North Douglas"] as const;
export type WaterLocation = typeof waterLocations[number];
export const captains = [
  "Krichelle K.",
  "Andy F.",
  "Joe G.",
  "Jenna S.",
  "Tyler S."
] as const;
export type Captain = typeof captains[number];
export const boats = [
  "Zephyr",
  "Mariner",
  "Sounder",
  "Explorer",
  "Ranger"
] as const;
export type Boat = typeof boats[number];
export const trails = ["Moraine Ecology", "Trail of Time"] as const;
export type Trail = typeof trails[number];