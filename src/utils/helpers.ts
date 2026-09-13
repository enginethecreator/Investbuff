import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export function formatDateTime(date: string | Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(date));
}

let _idCounter = 0;
export function generateId(prefix = "id"): string {
  _idCounter += 1;
  return `${prefix}_${Date.now()}_${_idCounter}_${Math.random().toString(36).slice(2, 7)}`;
}

export function calculateProfit(
  amount: number,
  dailyPercentage: number,
  days: number,
): number {
  return amount * (dailyPercentage / 100) * days;
}
