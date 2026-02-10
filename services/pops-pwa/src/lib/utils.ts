/**
 * Utility functions for the PWA
 */
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combine class names with Tailwind class merging
 * Used by shadcn/ui components
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
