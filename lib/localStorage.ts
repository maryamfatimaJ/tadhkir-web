"use client";

import { DailyPrayers, Habit, VirtueRecord } from "./types";

// Check if we're in a browser environment
const isBrowser = typeof window !== "undefined";

// Prayer Storage
export const savePrayers = (prayers: DailyPrayers[]) => {
  if (!isBrowser) return;
  localStorage.setItem("tadhkir-prayers", JSON.stringify(prayers));
};

export const getPrayers = (): DailyPrayers[] => {
  if (!isBrowser) return [];
  const stored = localStorage.getItem("tadhkir-prayers");
  return stored ? JSON.parse(stored) : [];
};

// Habit Storage
export const saveHabits = (habits: Habit[]) => {
  if (!isBrowser) return;
  localStorage.setItem("tadhkir-habits", JSON.stringify(habits));
};

export const getHabits = (): Habit[] => {
  if (!isBrowser) return [];
  const stored = localStorage.getItem("tadhkir-habits");
  return stored ? JSON.parse(stored) : [];
};

// Favorite Ayat Storage
export const saveFavoriteAyat = (ayatIds: number[]) => {
  if (!isBrowser) return;
  localStorage.setItem("tadhkir-favorite-ayat", JSON.stringify(ayatIds));
};

export const getFavoriteAyat = (): number[] => {
  if (!isBrowser) return [];
  const stored = localStorage.getItem("tadhkir-favorite-ayat");
  return stored ? JSON.parse(stored) : [];
};

// Virtue Points Storage
export const saveVirtueRecords = (records: VirtueRecord[]) => {
  if (!isBrowser) return;
  localStorage.setItem("tadhkir-virtue-records", JSON.stringify(records));
};

export const getVirtueRecords = (): VirtueRecord[] => {
  if (!isBrowser) return [];
  const stored = localStorage.getItem("tadhkir-virtue-records");
  return stored ? JSON.parse(stored) : [];
};

// Tasbeeh Counter Storage
export const saveTasbeehCount = (counts: { subhanAllah: number; alhamdulillah: number; allahuAkbar: number }) => {
  if (!isBrowser) return;
  localStorage.setItem("tadhkir-tasbeeh", JSON.stringify(counts));
};

export const getTasbeehCount = () => {
  if (!isBrowser) return { subhanAllah: 0, alhamdulillah: 0, allahuAkbar: 0 };
  const stored = localStorage.getItem("tadhkir-tasbeeh");
  return stored 
    ? JSON.parse(stored) 
    : { subhanAllah: 0, alhamdulillah: 0, allahuAkbar: 0 };
};

// Last Seen Date (for daily features)
export const setLastSeenDate = () => {
  if (!isBrowser) return;
  localStorage.setItem("tadhkir-last-seen", new Date().toISOString().split("T")[0]);
};

export const getLastSeenDate = (): string | null => {
  if (!isBrowser) return null;
  return localStorage.getItem("tadhkir-last-seen");
};

// Helper to check if we need to show a new daily item
export const shouldShowNewDaily = (): boolean => {
  if (!isBrowser) return false;
  
  const today = new Date().toISOString().split("T")[0];
  const lastSeen = getLastSeenDate();
  
  return lastSeen !== today;
};

// Helper to get current date in YYYY-MM-DD format
export const getTodayDateString = (): string => {
  return new Date().toISOString().split("T")[0];
};