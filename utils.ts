import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Difficulty, BadgeRarity } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  beginner:     "Principiante",
  intermediate: "Intermedio",
  advanced:     "Avanzado",
};

export const DIFFICULTY_COLORS: Record<Difficulty, string> = {
  beginner:     "bg-green-50 text-green-700 border-green-200",
  intermediate: "bg-yellow-50 text-yellow-700 border-yellow-200",
  advanced:     "bg-red-50 text-red-700 border-red-200",
};

export const RARITY_LABELS: Record<BadgeRarity, string> = {
  common:    "Común",
  rare:      "Raro",
  epic:      "Épico",
  legendary: "Legendario",
  ultimate:  "Definitivo",
};

export const RARITY_COLORS: Record<BadgeRarity, string> = {
  common:    "text-gray-500",
  rare:      "text-blue-500",
  epic:      "text-purple-500",
  legendary: "text-yellow-500",
  ultimate:  "text-red-500",
};

export function formatXp(xp: number): string {
  if (xp >= 1000) return `${(xp / 1000).toFixed(1)}k`;
  return xp.toLocaleString("es-ES");
}

export function formatRelativeDate(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  if (diffDays === 0) return "Hoy";
  if (diffDays === 1) return "Ayer";
  if (diffDays < 7)  return `Hace ${diffDays} días`;
  if (diffDays < 14) return "Hace 1 semana";
  if (diffDays < 30) return `Hace ${Math.floor(diffDays / 7)} semanas`;
  if (diffMonths === 1) return "Hace 1 mes";
  if (diffMonths < 12) return `Hace ${diffMonths} meses`;
  if (diffYears === 1) return "Hace 1 año";
  return `Hace ${diffYears} años`;
}

export function formatJoinDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("es-ES", { month: "long", year: "numeric" });
}

// YouTube helpers
export function getYouTubeEmbedUrl(videoId: string, restricted = false): string {
  const params = new URLSearchParams({
    rel: "0",
    modestbranding: "1",
    ...(restricted ? { cc_load_policy: "0" } : {}),
  });
  return `https://www.youtube-nocookie.com/embed/${videoId}?${params}`;
}

// Cloudflare Stream helpers
export function getCloudflareStreamUrl(videoId: string): string {
  return `https://customer-${videoId}.cloudflarestream.com/iframe`;
}
