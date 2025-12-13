"use client";

import { useQuery } from "@tanstack/react-query";
import { analyticsApi } from "../api/analytics.api";
import type { AnalyticsQuery } from "./types";

export const analyticsKeys = {
  all: ["analytics"] as const,
  overview: () => [...analyticsKeys.all, "overview"] as const,
  sources: () => [...analyticsKeys.all, "sources"] as const,
  daily: (query?: AnalyticsQuery) =>
    [...analyticsKeys.all, "daily", query] as const,
  descriptions: (source?: string) =>
    [...analyticsKeys.all, "descriptions", source] as const,
  workFormats: (source?: string) =>
    [...analyticsKeys.all, "work-formats", source] as const,
  topCompanies: (query?: AnalyticsQuery) =>
    [...analyticsKeys.all, "top-companies", query] as const,
  topLocations: (query?: AnalyticsQuery) =>
    [...analyticsKeys.all, "top-locations", query] as const,
  englishLevels: (source?: string) =>
    [...analyticsKeys.all, "english-levels", source] as const,
  experience: (source?: string) =>
    [...analyticsKeys.all, "experience", source] as const,
  salaries: (source?: string) =>
    [...analyticsKeys.all, "salaries", source] as const,
  auditHistory: (params?: { cursor?: string | null; limit?: number }) =>
    [...analyticsKeys.all, "audit", "history", params] as const,
};

const STALE_TIME = 1000 * 60 * 5; // 5 хвилин

export function useOverview() {
  return useQuery({
    queryKey: analyticsKeys.overview(),
    queryFn: () => analyticsApi.getOverview(),
    staleTime: STALE_TIME,
  });
}

export function useSourceStats() {
  return useQuery({
    queryKey: analyticsKeys.sources(),
    queryFn: () => analyticsApi.getSourceStats(),
    staleTime: STALE_TIME,
  });
}

export function useDailyStats(query?: AnalyticsQuery) {
  return useQuery({
    queryKey: analyticsKeys.daily(query),
    queryFn: () => analyticsApi.getDailyStats(query),
    staleTime: STALE_TIME,
  });
}

export function useDescriptionStats(source?: string) {
  return useQuery({
    queryKey: analyticsKeys.descriptions(source),
    queryFn: () => analyticsApi.getDescriptionStats(source),
    staleTime: STALE_TIME,
  });
}

export function useWorkFormatStats(source?: string) {
  return useQuery({
    queryKey: analyticsKeys.workFormats(source),
    queryFn: () => analyticsApi.getWorkFormatStats(source),
    staleTime: STALE_TIME,
  });
}

export function useTopCompanies(query?: AnalyticsQuery) {
  return useQuery({
    queryKey: analyticsKeys.topCompanies(query),
    queryFn: () => analyticsApi.getTopCompanies(query),
    staleTime: STALE_TIME,
  });
}

export function useTopLocations(query?: AnalyticsQuery) {
  return useQuery({
    queryKey: analyticsKeys.topLocations(query),
    queryFn: () => analyticsApi.getTopLocations(query),
    staleTime: STALE_TIME,
  });
}

export function useEnglishLevelStats(source?: string) {
  return useQuery({
    queryKey: analyticsKeys.englishLevels(source),
    queryFn: () => analyticsApi.getEnglishLevelStats(source),
    staleTime: STALE_TIME,
  });
}

export function useExperienceStats(source?: string) {
  return useQuery({
    queryKey: analyticsKeys.experience(source),
    queryFn: () => analyticsApi.getExperienceStats(source),
    staleTime: STALE_TIME,
  });
}

export function useSalaryStats(source?: string) {
  return useQuery({
    queryKey: analyticsKeys.salaries(source),
    queryFn: () => analyticsApi.getSalaryStats(source),
    staleTime: STALE_TIME,
  });
}
