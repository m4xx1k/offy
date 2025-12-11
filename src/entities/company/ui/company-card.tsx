import { GlassCard } from "@/shared/ui";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import type { Company } from "../model/types";
import { CompanyLogo } from "./company-logo";

interface CompanyCardProps {
  company?: Company;
}

export function CompanyCard({ company }: CompanyCardProps) {
  return (
    <GlassCard
      variant="interactive"
      hoverable
      asGroup
      padding="md"
      rounded="2xl"
      className="flex items-center gap-4"
    >
      <CompanyLogo company={company} size="md" />

      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-bold text-glass-text truncate group-hover:text-glass-accent transition-colors">
          {company?.name || "Компанія"}
        </h3>
        {company?.website && (
          <Link
            href={company.website}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-glass-text-subtle flex items-center gap-1 hover:text-indigo-300 transition-colors"
          >
            Сайт компанії <ExternalLink className="w-3 h-3" />
          </Link>
        )}
      </div>
    </GlassCard>
  );
}

