export const CompactRecipeSkeletonCard = () => {
  return (
    <article className="group relative flex items-start gap-4 px-5 py-4 bg-white dark:bg-slate-950/50 border border-slate-200/50 dark:border-slate-800/50 rounded-lg animate-pulse">
      <div className="shrink-0 w-36 h-36 rounded-lg bg-slate-200 dark:bg-slate-800" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-5 w-40 bg-slate-200 dark:bg-slate-800 rounded" />
          <div className="h-4 w-14 bg-slate-200 dark:bg-slate-800 rounded" />
        </div>

        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800" />
          <div className="h-4 w-24 bg-slate-200 dark:bg-slate-800 rounded" />
        </div>

        <div className="space-y-1 mb-2">
          <div className="h-3 w-full bg-slate-200 dark:bg-slate-800 rounded" />
          <div className="h-3 w-5/6 bg-slate-200 dark:bg-slate-800 rounded" />
        </div>

        <div className="hidden md:flex gap-3">
          <div className="h-4 w-28 bg-slate-200 dark:bg-slate-800 rounded" />
          <div className="h-4 w-20 bg-slate-200 dark:bg-slate-800 rounded" />
        </div>
      </div>

      <div className="shrink-0 flex items-center gap-2 self-center">
        <div className="w-8 h-8 bg-slate-200 dark:bg-slate-800 rounded-lg" />
        <div className="w-8 h-8 bg-slate-200 dark:bg-slate-800 rounded-lg" />
      </div>
    </article>
  );
};
