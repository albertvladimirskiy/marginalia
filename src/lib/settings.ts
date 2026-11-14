import { useSyncExternalStore } from 'react';
import type { Usage } from '../data/types';
import type { Slot } from './scheduler';
import { DEFAULT_ROTATION } from './scheduler';

export type Intensity = 'gentle' | 'standard' | 'blunt';

export interface Settings {
  name: string;
  writingTime: string;
  intensity: Intensity;
  theme: 'system' | 'light' | 'dark';
  fontSize: number;
  warmup: boolean;
  nudge: boolean;
  timerMinutes: number;
  model: string;
  lessonModel: string;
  /** Indexed by Date.getDay(): 0 = Sunday. */
  rotation: Slot[];
  onboarded: boolean;
  lastBackupAt: number | null;
  usageTotal: Usage;
}

export const DEFAULT_SETTINGS: Settings = {
  name: '',
  writingTime: '21:00',
  intensity: 'standard',
  theme: 'system',
  fontSize: 20,
  warmup: true,
  nudge: true,
  timerMinutes: 25,
  model: 'claude-sonnet-5-5',
  lessonModel: 'claude-haiku-5-5',
  rotation: DEFAULT_ROTATION,
  onboarded: false,
  lastBackupAt: null,
  usageTotal: { inputTokens: 0, outputTokens: 0, costUsd: 0 },
};

const KEY = 'marginalia.settings';
const API_KEY = 'marginalia.apiKey';
/** localStorage can be missing, stubbed, or throw (private modes, blocked storage). */
function read(key: string): string | null {
  try {
    return typeof localStorage?.getItem === 'function' ? localStorage.getItem(key) : null;
  } catch {
    return null;
  }
}
function write(key: string, value: string | null): void {
  try {
    if (typeof localStorage?.setItem !== 'function') return;
    if (value === null) localStorage.removeItem(key);
    else localStorage.setItem(key, value);
  } catch {
    // storage unavailable: settings live in memory for this visit
  }
}

function load(): Settings {
  try {
    return { ...DEFAULT_SETTINGS, ...(JSON.parse(read(KEY) ?? '{}') as Partial<Settings>) };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

let current = load();
const listeners = new Set<() => void>();

export function getSettings(): Settings {
  return current;
}

export function updateSettings(patch: Partial<Settings>): void {
  current = { ...current, ...patch };
  write(KEY, JSON.stringify(current));
  listeners.forEach((l) => l());
}

export function useSettings(): Settings {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => current,
  );
}

/** The API key lives only in this browser's localStorage, under its own key, never in backups. */
export function getApiKey(): string {
  return read(API_KEY) ?? '';
}

export function setApiKey(key: string): void {
  write(API_KEY, key.trim() || null);
  listeners.forEach((l) => l());
}

export function useApiKey(): string {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    getApiKey,
  );
}
