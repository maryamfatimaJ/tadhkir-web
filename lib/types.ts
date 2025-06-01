// Prayer Types
export type PrayerName = "Fajr" | "Dhuhr" | "Asr" | "Maghrib" | "Isha";

export type PrayerStatus = "performed" | "qadha" | "missed" | "jamaat";

export interface Prayer {
  name: PrayerName;
  status: PrayerStatus;
}

export interface DailyPrayers {
  date: string; // ISO format date string
  prayers: Record<PrayerName, PrayerStatus>;
}

// Habit Types
export interface Habit {
  id: string;
  name: string;
  icon?: string;
  color?: string;
  streak: number;
  completedDates: string[]; // ISO format date strings
  createdAt: string; // ISO format date string
}

// Ayat Types
export interface Ayat {
  id: number;
  surah: string;
  ayatNumber: number;
  arabicText: string;
  translation: string;
  explanation: string;
  tags?: string[];
}

// Intention Types
export interface Intention {
  id: number;
  text: string;
  category?: string;
}

// Virtue Points
export interface VirtueAction {
  id: string;
  name: string;
  points: number;
  description?: string;
  icon?: string;
}

export interface VirtueRecord {
  id: string;
  actionId: string;
  date: string; // ISO format date string
  points: number;
}

// Quiz Types
export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: "easy" | "medium" | "hard";
}

// Islamic Calendar Event
export interface IslamicEvent {
  id: number;
  name: string;
  hijriDate: string;
  gregorianDate: string;
  description: string;
  importance: "major" | "minor";
}