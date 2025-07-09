import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format duration from seconds to "mm:ss" or "h:mm:ss" if >= 1 hour.
 * @param seconds - Duration in seconds
 * @returns Formatted time string
 */
export function formatDuration(seconds: number): string {
  if (seconds < 0 || isNaN(seconds)) return "0:00";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);

  // If duration is less than 1 hour, show "m:ss"
  if (h === 0) {
    return `${m}:${s.toString().padStart(2, "0")}`;
  }
  // If duration is 1 hour or more, show "h:mm:ss"
  return `${h}:${m.toString().padStart(2, "0")}:${s
    .toString()
    .padStart(2, "0")}`;
}
