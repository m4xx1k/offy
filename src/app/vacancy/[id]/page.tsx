import { notFound } from "next/navigation";
import { Metadata } from "next";
import { vacancyApi } from "@/entities/vacancy";
import { VacancyPageWidget } from "@/widgets/vacancy-page";

// Генеруємо метадані для SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const vacancy = await vacancyApi.getById(id);

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
  const vacancy = await vacancyApi.getById(id);

  if (!vacancy) {
    notFound();
  }

  return <VacancyPageWidget vacancy={vacancy} />;
}
