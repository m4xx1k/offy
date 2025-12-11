import { GlassCard, Skeleton } from "@/shared/ui";

export function VacancySkeleton() {
  return (
    <GlassCard variant="interactive" padding="md" rounded="2xl" className="space-y-4">
      <div className="flex gap-4">
        <Skeleton className="w-12 h-12 rounded-lg" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        <Skeleton className="h-4 w-16" />
      </div>
      <div className="flex gap-2">
        <Skeleton className="h-6 w-16 rounded-md" />
        <Skeleton className="h-6 w-24 rounded-md" />
        <Skeleton className="h-6 w-20 rounded-md" />
      </div>
      <div className="flex gap-2">
        <Skeleton className="h-6 w-14 rounded-full" />
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-12 rounded-full" />
      </div>
    </GlassCard>
  );
}

export function VacancyPageSkeleton() {
  return (
    <div className="max-w-6xl mx-auto py-10 px-4 md:px-8 space-y-8">
      <Skeleton className="h-6 w-32" />

      <GlassCard padding="lg" rounded="3xl" className="space-y-4">
        <Skeleton className="h-10 w-3/4" />
        <div className="flex gap-4">
          <Skeleton className="h-8 w-24 rounded-lg" />
          <Skeleton className="h-8 w-20 rounded-lg" />
          <Skeleton className="h-8 w-28 rounded-lg" />
        </div>
      </GlassCard>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
          <GlassCard padding="md" rounded="2xl">
            <Skeleton className="h-6 w-40 mb-4" />
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-8 w-20 rounded-full" />
              ))}
            </div>
          </GlassCard>
          <GlassCard padding="lg" rounded="2xl" className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </GlassCard>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <GlassCard
            variant="interactive"
            padding="md"
            rounded="2xl"
            className="flex items-center gap-4"
          >
            <Skeleton className="w-12 h-12 rounded-xl" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-24" />
            </div>
          </GlassCard>
          <GlassCard padding="md" rounded="2xl" className="space-y-4">
            <Skeleton className="h-5 w-32 mb-4" />
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="w-9 h-9 rounded-lg" />
                <div className="space-y-1">
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            ))}
          </GlassCard>
        </div>
      </div>
    </div>
  );
}

