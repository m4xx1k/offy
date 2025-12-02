import { cn } from "@/lib/utils";

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  onClear?: () => void;
}

// 2. UI-Компоненти (Обгортки над ShadCN для стилю Liquid Glass)

// 3. Структурний компонент секції
export const FilterSection = ({
  title,
  children,
  className,
  onClear,
}: FilterSectionProps) => {
  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-200 tracking-wide uppercase opacity-80">
          {title}
        </h3>
        {onClear && (
          <button
            onClick={onClear}
            className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors opacity-0 group-hover:opacity-100"
          >
            Скинути
          </button>
        )}
      </div>
      {children}
    </div>
  );
};
