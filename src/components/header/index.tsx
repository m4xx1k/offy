// components/header.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="mb-8 mx-4 md:mx-auto max-w-5xl rounded-2xl glass-panel px-6 py-3 flex items-center justify-between">
      {/* Логотип */}
      <Link href="/" className="hover:text-white transition-colors">
        <div className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-blue-200 to-purple-200">
          offy
        </div>
      </Link>

      {/* Навігація */}
      <nav className="hidden md:flex gap-6 text-sm font-medium text-slate-200">
        <Link href="#" className="hover:text-white transition-colors">
          Вакансії
        </Link>
        <Link href="#" className="hover:text-white transition-colors">
          Компанії
        </Link>
        <Link href="#" className="hover:text-white transition-colors">
          Аналітика
        </Link>
      </nav>

      {/* Кнопки */}
      <div className="flex gap-3">
        <Button
          variant="ghost"
          className="text-slate-200 hover:text-white hover:bg-white/10"
        >
          Вхід
        </Button>
        <Button className="glass-button rounded-full">Скоро...</Button>
      </div>
    </header>
  );
}
