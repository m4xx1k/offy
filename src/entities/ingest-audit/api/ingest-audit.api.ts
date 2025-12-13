import { api } from "@/shared/api";

import { PaginatedResult } from "@/entities/vacancy";
import { IIngestAudit } from "../model/types";

const BASE_PATH = "/audit";
export type AuditIngestQuery = { from?: string; to?: string };

export const ingestAuditApi = {
  async getAuditHistory(
    cursor?: string | null,
    limit: number = 20,
    query: AuditIngestQuery = {}
  ): Promise<PaginatedResult<IIngestAudit>> {
    const { data } = await api.get<PaginatedResult<IIngestAudit>>(
      `${BASE_PATH}/history`,
      {
        params: { cursor, limit, ...query },
      }
    );
    return data;
  },
};
