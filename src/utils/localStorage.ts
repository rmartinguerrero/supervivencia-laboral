// LocalStorage utility functions

export function getStorageItem<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;

  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

export function setStorageItem<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn('Failed to save to localStorage:', e);
  }
}

// Salary config
export interface SalaryConfig {
  isConfigured: boolean;
  payDay: number; // 1-31
  monthlySalary: number;
  hasSummerExtra: boolean;
  summerExtraDate: string; // MM-DD format
  hasChristmasExtra: boolean;
  christmasExtraDate: string; // MM-DD format
}

export const defaultSalaryConfig: SalaryConfig = {
  isConfigured: false,
  payDay: 25,
  monthlySalary: 1500,
  hasSummerExtra: true,
  summerExtraDate: '06-15',
  hasChristmasExtra: true,
  christmasExtraDate: '12-15',
};

// Friday config
export interface FridayConfig {
  isConfigured: boolean;
  targetHour: number; // 0-23
  targetMinute: number; // 0-59
}

export const defaultFridayConfig: FridayConfig = {
  isConfigured: false,
  targetHour: 18,
  targetMinute: 0,
};

// Life Salary config
export interface LifeSalaryConfig {
  monthlySalary: number;
  weeklyHours: number;
  vacationDays: number;
  dailyCommuteMinutes: number;
  age?: number;
  yearsWorked?: number;
}

export const defaultLifeSalaryConfig: LifeSalaryConfig = {
  monthlySalary: 1500,
  weeklyHours: 40,
  vacationDays: 22,
  dailyCommuteMinutes: 30,
};

// Retirement config
export interface RetirementConfig {
  isConfigured: boolean;
  retirementAge: number;
  currentAge: number;
  yearsContributed: number;
}

export const defaultRetirementConfig: RetirementConfig = {
  isConfigured: false,
  retirementAge: 67,
  currentAge: 30,
  yearsContributed: 5,
};

// Boss hits record
export interface BossHitsRecord {
  totalHits: number;
  lastPlayed: string;
}

export const defaultBossHitsRecord: BossHitsRecord = {
  totalHits: 0,
  lastPlayed: '',
};
