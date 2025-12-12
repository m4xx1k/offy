"use client";
import { useAuditHistory } from "@/entities";
import { IngestAudit } from "./ingest-audit";

export function IngestAuditSection() {
  const { data } = useAuditHistory();
  const allData = data?.pages.flatMap((p) => p.items);
  return (
    <div className="w-full my-4 space-y-2">
      {(allData || [])?.map((audit) => (
        <IngestAudit key={audit.id} audit={audit} />
      ))}
    </div>
  );
}
