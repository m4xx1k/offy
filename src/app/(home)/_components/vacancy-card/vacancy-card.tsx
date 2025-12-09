import Link from "next/link";
import { IVacancy } from "@/shared/types/vacancies.types";

// Імпорт під-компонентів
import { VacancyCardHeader } from "./vacancy-card-header";
import { VacancyCardInfo } from "./vacancy-card-info";
import { VacancyCardSkills } from "./vacancy-card-skills";

interface VacancyCardProps {
  vacancy: IVacancy;
}

export const VacancyCard = ({ vacancy }: VacancyCardProps) => {
  return (
    <Link href={`/vacancy/${vacancy.id}`} className="group outline-none">
      <div className="glass-card relative p-5 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/[0.07] hover:border-white/10 transition-all duration-300 flex flex-col">
        <VacancyCardHeader
          title={vacancy.title}
          company={vacancy.company}
          postedAt={vacancy.postedAt}
        />

        <VacancyCardInfo vacancy={vacancy} />

        <VacancyCardSkills skills={vacancy.skills} />
      </div>
    </Link>
  );
};
