import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";

import { vacancyService } from "@/services/vacancies.service";
import { VacancyHeader } from "./_components/vacancy-header";
import { VacancyDescription } from "./_components/vacancy-description";
import { VacancyMeta } from "./_components/vacancy-meta";
import { CompanyCard } from "./_components/company-card";
import { GlassBadge } from "@/components/ui/glass-badge";
import { VacancySkills } from "./_components/vacancy-skills";

// Генеруємо метадані для SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const vacancy = await vacancyService.getById(id);

  if (!vacancy) return { title: "Вакансія не знайдена" };

  return {
    title: `${vacancy.title} at ${vacancy.company?.name}`,
    description: `Вакансія ${vacancy.title}. Зарплата: ${
      vacancy.salaryFrom || "DOGOVIRNA"
    }.`,
  };
}

// Головний компонент сторінки
export default async function VacancyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Фетчимо дані на сервері
  const vacancy = await vacancyService.getById(id);

  // Якщо вакансії немає — 404
  if (!vacancy) {
    notFound();
  }

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 md:px-8">
      {/* Навігація */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-400 mb-6 transition-colors font-medium group"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        Назад до списку
      </Link>

      {/* Хедер */}
      <VacancyHeader vacancy={vacancy} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* ЛІВА КОЛОНКА (Опис + Скіли) */}
        <div className="lg:col-span-8 space-y-6">
          <VacancySkills vacancy={vacancy} />
          <VacancyDescription
            content={vacancy.descriptionMd || vacancy.description}
          />
        </div>

        {/* ПРАВА КОЛОНКА (Сайдбар) */}
        <div className="lg:col-span-4 space-y-6 sticky top-6 h-fit">
          <CompanyCard company={vacancy.company} />
          <VacancyMeta vacancy={vacancy} />

          {/* CTA Блок */}
          <div className="glass-panel p-6 rounded-2xl text-center border border-indigo-500/20 shadow-[0_0_30px_-10px_rgba(99,102,241,0.2)]">
            <p className="text-sm text-slate-400 mb-4">
              Сподобалась вакансія? Не зволікай!
            </p>
            <a
              href={vacancy.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-button w-full py-3 rounded-xl block text-center font-semibold hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Подати заявку на {vacancy.source}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
