export const START_HOUR = 7; // 7 AM
export const END_HOUR = 22; // 10 PM

export function generateTimeSlots() {
  const slots = [];
  for (let hour = START_HOUR; hour <= END_HOUR; hour++) {
    const hourLabel = hour % 12 || 12;
    const period = hour < 12 ? 'AM' : 'PM';
    slots.push({
      index: hour - START_HOUR,
      label: `${hourLabel}:00 ${period}`,
      hour
    });
  }
  return slots;
}