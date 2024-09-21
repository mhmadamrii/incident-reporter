import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateRandomNumber(max: number): number {
  return Math.floor(Math.random() * max) + 1;
}

export function removeAsterisks(str: string): string {
  return str.replace(/\*/g, "");
}
