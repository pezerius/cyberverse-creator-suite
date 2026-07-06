export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse bg-gradient-to-r from-white to-muted/60 border-2 border-ink/20 rounded-xl ${className}`}
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="rounded-2xl border-2 border-ink bg-white overflow-hidden shadow-[3px_3px_0_0_var(--ink)]">
      <Skeleton className="h-40 rounded-none border-0" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-3 w-1/3" />
      </div>
    </div>
  );
}

export function SkeletonRow() {
  return (
    <div className="flex items-center gap-3 p-3 border-b border-ink/10">
      <Skeleton className="h-10 w-10 rounded-full" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-3 w-1/3" />
        <Skeleton className="h-3 w-2/3" />
      </div>
    </div>
  );
}
