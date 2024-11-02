import { twMerge } from 'tailwind-merge';
import { clsx, type ClassValue } from 'clsx';

export function mergeClassName(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
