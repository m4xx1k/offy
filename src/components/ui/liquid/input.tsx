import { cn } from "@/lib/utils";

export const LiquidInput = ({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    className={cn(
      "flex h-10 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50 focus-visible:border-indigo-500/50 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300",
      className
    )}
    {...props}
  />
);
