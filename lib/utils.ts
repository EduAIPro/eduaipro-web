import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatMoney = (amount: number, currency = "NGN") =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency,
  }).format(amount);

/** Money arrives as integer kobo. */
export const formatKobo = (kobo: number, currency = "NGN") =>
  formatMoney(kobo / 100, currency);
