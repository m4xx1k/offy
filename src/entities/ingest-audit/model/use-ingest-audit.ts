"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import type { IIngestAudit } from "./types";
import { PaginatedResult } from "@/entities/vacancy";
import { AuditIngestQuery, ingestAuditApi } from "../api/ingest-audit.api";

export const ingestAuditKeys = {
  all: ["audit"] as const,
  history: (
    params?: { cursor?: string | null; limit?: number } & AuditIngestQuery
  ) => [...ingestAuditKeys.all, "history", params] as const,
};
const STALE_TIME = 1000 * 60 * 5;

export function useAuditHistory(query: AuditIngestQuery = {}, limit = 20) {
  return useInfiniteQuery<PaginatedResult<IIngestAudit>>({
    queryKey: ingestAuditKeys.history({ cursor: undefined, limit, ...query }),
    queryFn: ({ pageParam }) =>
      ingestAuditApi.getAuditHistory(
        pageParam as string | undefined,
        limit,
        query
      ),
    getNextPageParam: (lastPage) => {
      if (!lastPage.metadata?.hasMore || !lastPage.metadata?.nextCursor) {
        return undefined;
      }
      return lastPage.metadata.nextCursor;
    },
    initialPageParam: undefined as string | undefined,
    staleTime: STALE_TIME,
  });
}
