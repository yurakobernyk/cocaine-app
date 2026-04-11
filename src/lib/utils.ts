import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Format ms → "Xd Yh Zmin" */
export function formatDuration(ms: number): string {
  const totalMin = Math.floor(ms / 60000)
  const min = totalMin % 60
  const totalHrs = Math.floor(totalMin / 60)
  const hrs = totalHrs % 24
  const days = Math.floor(totalHrs / 24)
  if (days > 0) return `${days}d ${hrs}h ${min}min`
  if (hrs > 0) return `${hrs}h ${min}min`
  return `${min}min`
}

/** Format NOK → "12 640 kr" */
export function formatNOK(amount: number): string {
  return `${amount.toLocaleString("no-NO")} kr`
}
