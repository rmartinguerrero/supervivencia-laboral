// Date calculation utilities

/**
 * Get the actual pay date for a given month, handling months with fewer days
 */
export function getPayDate(year: number, month: number, payDay: number): Date {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const actualDay = Math.min(payDay, daysInMonth);
  return new Date(year, month, actualDay);
}

/**
 * Get the next pay date from now
 */
export function getNextPayDate(payDay: number): Date {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  // Try current month first
  let payDate = getPayDate(currentYear, currentMonth, payDay);

  // If pay date has passed, try next month
  if (payDate < now) {
    const nextMonth = currentMonth + 1;
    const nextYear = nextMonth > 11 ? currentYear + 1 : currentYear;
    const adjustedMonth = nextMonth > 11 ? 0 : nextMonth;
    payDate = getPayDate(nextYear, adjustedMonth, payDay);
  }

  return payDate;
}

/**
 * Calculate time remaining between now and a target date
 */
export function getTimeRemaining(target: Date): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalSeconds: number;
  percentRemaining: number;
  totalDaysInMonth: number;
} {
  const now = new Date();
  const diff = target.getTime() - now.getTime();

  if (diff <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      totalSeconds: 0,
      percentRemaining: 0,
      totalDaysInMonth: 30,
    };
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  // Calculate percent of month remaining
  const totalDaysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  const dayOfMonth = now.getDate();
  const percentRemaining = ((totalDaysInMonth - dayOfMonth) / totalDaysInMonth) * 100;

  return {
    days,
    hours,
    minutes,
    seconds,
    totalSeconds,
    percentRemaining: Math.round(percentRemaining * 100) / 100,
    totalDaysInMonth,
  };
}

/**
 * Calculate time until Friday target
 */
export function getTimeUntilFriday(targetHour: number, targetMinute: number): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isFriday: boolean;
  isPast: boolean;
} {
  const now = new Date();
  const currentDay = now.getDay(); // 0=Sunday, 6=Saturday

  // Calculate days until Friday (day 5)
  let daysUntilFriday = 5 - currentDay;
  if (daysUntilFriday < 0) {
    daysUntilFriday += 7;
  }

  // If it's Friday, check if target time has passed
  if (currentDay === 5) {
    const target = new Date(now);
    target.setHours(targetHour, targetMinute, 0, 0);

    if (now >= target) {
      // Target has passed, count to next Friday
      daysUntilFriday = 7;
    } else {
      daysUntilFriday = 0;
    }
  }

  // Create target date
  const target = new Date(now);
  target.setDate(target.getDate() + daysUntilFriday);
  target.setHours(targetHour, targetMinute, 0, 0);

  const diff = target.getTime() - now.getTime();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isFriday: currentDay === 5, isPast: true };
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    days,
    hours,
    minutes,
    seconds,
    isFriday: currentDay === 5,
    isPast: false,
  };
}

/**
 * Calculate retirement countdown
 */
export function calculateRetirement(
  currentAge: number,
  retirementAge: number,
  _yearsContributed: number
): {
  yearsRemaining: number;
  monthsRemaining: number;
  daysRemaining: number;
  totalDays: number;
  isRetired: boolean;
  exactRetirementDate: Date;
} {
  const yearsLeft = retirementAge - currentAge;

  if (yearsLeft <= 0) {
    return {
      yearsRemaining: 0,
      monthsRemaining: 0,
      daysRemaining: 0,
      totalDays: 0,
      isRetired: true,
      exactRetirementDate: new Date(),
    };
  }

  // Estimate retirement date (assuming roughly 12 months per year)
  const now = new Date();
  const retirementDate = new Date(now);
  retirementDate.setFullYear(retirementDate.getFullYear() + yearsLeft);

  const diff = retirementDate.getTime() - now.getTime();
  const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
  const yearsRemaining = Math.floor(totalDays / 365);
  const monthsRemaining = Math.floor((totalDays % 365) / 30);
  const daysRemaining = totalDays % 30;

  return {
    yearsRemaining,
    monthsRemaining,
    daysRemaining,
    totalDays,
    isRetired: false,
    exactRetirementDate: retirementDate,
  };
}

/**
 * Format a time remaining object to a readable string
 */
export function formatTimeRemaining(time: {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}): string {
  const parts: string[] = [];
  if (time.days > 0) parts.push(`${time.days} día${time.days !== 1 ? 's' : ''}`);
  if (time.hours > 0) parts.push(`${time.hours} hora${time.hours !== 1 ? 's' : ''}`);
  if (time.minutes > 0) parts.push(`${time.minutes} minuto${time.minutes !== 1 ? 's' : ''}`);
  if (time.seconds > 0 && time.days === 0) parts.push(`${time.seconds} segundo${time.seconds !== 1 ? 's' : ''}`);
  return parts.join(', ') || '¡Ahora mismo!';
}

/**
 * Format time remaining in Italian
 */
export function formatTimeRemainingIT(time: {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}): string {
  const parts: string[] = [];
  if (time.days > 0) parts.push(`${time.days} giorn${time.days !== 1 ? 'i' : 'o'}`);
  if (time.hours > 0) parts.push(`${time.hours} or${time.hours !== 1 ? 'e' : 'a'}`);
  if (time.minutes > 0) parts.push(`${time.minutes} minut${time.minutes !== 1 ? 'i' : 'o'}`);
  if (time.seconds > 0 && time.days === 0) parts.push(`${time.seconds} second${time.seconds !== 1 ? 'i' : 'o'}`);
  return parts.join(', ') || 'Proprio ora!';
}
