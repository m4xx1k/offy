export interface IIngestSourceStat {
  source: string;
  status?: string;
  itemsFound: number;
  itemsSaved: number;
  error?: string | null;
}

export interface IIngestAudit {
  id: string;
  status: string;
  startedAt: string;
  endedAt?: string | null;
  durationMs?: number | null;
  errorMessage?: string | null;
  sourceStats: IIngestSourceStat[];
}
