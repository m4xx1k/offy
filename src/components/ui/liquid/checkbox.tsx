import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export const LiquidCheckbox = ({
  checked,
  onCheckedChange,
  label,
}: {
  checked: boolean;
  onCheckedChange: (c: boolean) => void;
  label: string;
}) => (
  <label className="flex items-center space-x-3 cursor-pointer group select-none">
    <div
      className={cn(
        "w-5 h-5 rounded-md border border-white/20 flex items-center justify-center transition-all duration-200",
        checked
          ? "bg-indigo-500 border-indigo-500"
          : "bg-white/5 group-hover:border-indigo-400/50"
      )}
      onClick={() => onCheckedChange(!checked)}
    >
      {checked && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
    </div>
    <span
      className={cn(
        "text-sm transition-colors",
        checked
          ? "text-white font-medium"
          : "text-slate-400 group-hover:text-slate-200"
      )}
    >
      {label}
    </span>
  </label>
);
