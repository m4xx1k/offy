export const revalidate = 60;

export default async function Home() {
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
      </div>
    </main>
  );
}
