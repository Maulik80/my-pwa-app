import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function formatTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function calculateStrikeRate(runs: number, balls: number): string {
  if (balls === 0) return '0.00';
  return ((runs / balls) * 100).toFixed(2);
}

export function calculateEconomy(runs: number, balls: number): string {
  if (balls === 0) return '0.00';
  const overs = balls / 6;
  return (runs / overs).toFixed(2);
}

export function calculateNRR(
  runsFor: number,
  oversFor: number,
  runsAgainst: number,
  oversAgainst: number
): string {
  if (oversFor === 0 || oversAgainst === 0) return '0.000';
  const rrf = runsFor / oversFor;
  const rra = runsAgainst / oversAgainst;
  return (rrf - rra).toFixed(3);
}

export function isIOS(): boolean {
  if (typeof window === 'undefined') return false;
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !('MSStream' in window);
}
