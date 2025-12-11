import { Skeleton } from "@/shared/ui";

export function FiltersSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <Skeleton className="h-4 w-20" />
      <Skeleton className="h-8 w-full rounded-xl" />
      <Skeleton className="h-20 w-full rounded-xl" />
    </div>
  );
}

