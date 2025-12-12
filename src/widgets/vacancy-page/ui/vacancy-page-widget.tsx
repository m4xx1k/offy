import {
  VacancyHeader,
  VacancyDescription,
  VacancyMeta,
  VacancySkills,
  type IVacancy,
} from "@/entities/vacancy";
import { CompanyCard } from "@/entities/company";
import { ApplyCard } from "@/features/apply-vacancy";
import { BackToList } from "./back-to-list";

interface VacancyPageWidgetProps {
  vacancy: IVacancy;
}

export function VacancyPageWidget({ vacancy }: VacancyPageWidgetProps) {
  return (
    <div className="max-w-6xl mx-auto py-10 px-4 md:px-8">
      <BackToList />

      <VacancyHeader vacancy={vacancy} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
          <VacancyDescription
            content={vacancy.descriptionMd || vacancy.description}
          />
        </div>

        <div className="lg:col-span-4 space-y-6 sticky top-6 h-fit">
          <CompanyCard company={vacancy.company} />
          <VacancyMeta vacancy={vacancy} />
          <VacancySkills skills={vacancy.skills} asSection />
          <ApplyCard sourceUrl={vacancy.sourceUrl} source={vacancy.source} />
        </div>
      </div>
    </div>
  );
}
