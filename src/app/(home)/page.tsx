import { vacancyApi } from "@/entities/vacancy";
import { VacanciesFeed } from "@/widgets/vacancies-feed/ui/vacancies-feed";

export default async function Home() {
  const initialData = await vacancyApi.getList({ take: 10 });

  return (
    <main className="min-h-screen">
      <div className="py-8 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <div className="w-full max-w-7xl space-y-6">
          <div className="text-center space-y-2 mb-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-linear-to-r from-white via-indigo-200 to-indigo-400">
              Знайди свою роботу мрії
            </h1>
            <p className="text-sm sm:text-base text-glass-text-muted">
              Актуальні вакансії для розробників
            </p>
          </div>

          <VacanciesFeed initialData={initialData} />
        </div>
      </div>
    </main>
  );
}
