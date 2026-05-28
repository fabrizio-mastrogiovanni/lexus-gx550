import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const clamp = (n: number, lo: number, hi: number) =>
  Math.max(lo, Math.min(hi, n));

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
