import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateRandomCircles() {
  const count = 3 + Math.floor(Math.random() * 3);
  return Array.from({ length: count }).map((_, i) => ({
    id: i,
    size: 6 + Math.random() * 16,
    top: Math.random() * 100,
    right: Math.random() * 100,
    opacity: 0.1 + Math.random() * 0.2,
  }));
}
