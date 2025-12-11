import { GlassCard } from "@/shared/ui";
import { vacancyApi } from "@/entities/vacancy";
import { VacancyListWidget } from "@/widgets/vacancy-list";
import { Sparkles } from "lucide-react";

export const revalidate = 60;

export default async function Home() {
  const initialData = await vacancyApi.getList({ take: 10 });

  return (
    <main className="min-h-screen py-10 px-4 flex flex-col items-center">
      <div className="w-full max-w-4xl space-y-8">
        {/* Заголовок */}
        <div className="text-center space-y-2 mb-10">
          <h1 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-linear-to-r from-white via-indigo-200 to-indigo-400">
            Знайди свою роботу мрії
          </h1>
          <p className="text-glass-text-muted">
            Актуальні вакансії для розробників
          </p>
        </div>

        {/* Перевірка на пустоту */}
        {!initialData || initialData.items.length === 0 ? (
          <GlassCard padding="lg" rounded="3xl" className="text-center">
            <Sparkles className="w-12 h-12 mx-auto mb-4 text-glass-accent opacity-50" />
            <p className="text-glass-text-muted">
              Наразі вакансій немає. Заходьте пізніше!
            </p>
          </GlassCard>
        ) : (
          <VacancyListWidget initialData={initialData} />
        )}
      </div>
    </main>
  );
}
