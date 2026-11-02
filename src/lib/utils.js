import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind class names conditionally without duplicates or conflicts
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
