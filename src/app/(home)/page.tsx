// src/app/page.tsx
import { vacancyService } from "@/services/vacancies.service";
import { Sparkles } from "lucide-react";
import { VacancyList } from "./_components/vacancy-list";

export const revalidate = 60;

export default async function Home() {
  const initialData = await vacancyService.getPaginated({ take: 10 });

  return (
    <main className="min-h-screen py-10 px-4 flex flex-col items-center">
      <div className="w-full max-w-4xl space-y-8">
        {/* Заголовок */}
        <div className="text-center space-y-2 mb-10">
          <h1 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-linear-to-r from-white via-indigo-200 to-indigo-400">
            Знайди свою роботу мрії
          </h1>
          <p className="text-slate-400">Актуальні вакансії для розробників</p>
        </div>

        {/* Перевірка на пустоту */}
        {!initialData || initialData.items.length === 0 ? (
          <div className="glass-panel p-10 rounded-3xl text-center text-slate-400">
            <Sparkles className="w-12 h-12 mx-auto mb-4 text-indigo-400/50" />
            <p>Наразі вакансій немає. Заходьте пізніше!</p>
          </div>
        ) : (
          /* 2. Передаємо дані у клієнтський список */
          <VacancyList initialData={initialData} />
        )}
      </div>
    </main>
  );
}
