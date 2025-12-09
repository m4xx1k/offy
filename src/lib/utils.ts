import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function getValue<T extends Record<string, unknown>, K extends keyof T>(
  data: T,
  key: K
): T[K] {
  return data[key];
}

// export function activeParams<T extends Record<string, unknown>>(
//   params: T
// ): Required<T> {
//   return Object.fromEntries(
//     Object.entries(params).filter(([_, val]) => val !== null)
//   ) as Required<T>;
// }

export function activeParams<T extends Record<string, unknown>>(
  params: T
): { [K in keyof T]: T[K] extends null ? never : T[K] } {
  return Object.fromEntries(
    Object.entries(params).filter(([_, val]) => val !== null)
  ) as { [K in keyof T]: T[K] extends null ? never : T[K] };
}
