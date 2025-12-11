import { GlassButton, GlassCard } from "@/shared/ui";
import Link from "next/link";

export function Header() {
  return (
    <header className="mb-8 mx-4 md:mx-auto max-w-5xl">
      <GlassCard
        padding="sm"
        rounded="2xl"
        className="px-6 py-3 flex items-center justify-between"
      >
        {/* Логотип */}
        <Link href="/" className="hover:text-glass-text transition-colors">
          <div className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-blue-200 to-purple-200">
            offy
          </div>
        </Link>

        {/* Кнопки */}
        <div className="flex gap-3">
          <Link
            href="/analytics"
            className="hover:text-glass-accent transition-colors cursor-pointer"
          >
            <GlassButton className="rounded-full">Аналітика</GlassButton>
          </Link>
        </div>
      </GlassCard>
    </header>
  );
}
