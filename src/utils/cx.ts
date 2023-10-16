import { twMerge, type ClassNameValue } from 'tailwind-merge';

export function cx(...classes: ClassNameValue[]) {
  return twMerge(classes);
}
