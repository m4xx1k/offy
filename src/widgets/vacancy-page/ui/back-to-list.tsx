import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface BackToListProps {
  href?: string;
  label?: string;
}

export function BackToList({
  href = "/",
  label = "Назад до списку",
}: BackToListProps) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 text-glass-text-subtle hover:text-glass-accent mb-6 transition-colors font-medium group"
    >
      <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
      {label}
    </Link>
  );
}

