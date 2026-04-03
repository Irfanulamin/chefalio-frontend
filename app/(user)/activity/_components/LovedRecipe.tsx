"use client";

import { useLovedRecipes } from "@/hooks/useRecipe";
import { CompactRecipeCard } from "@/components/User/Recipe/CompactRecipeCard";
import {
  BookmarkSimpleIcon,
  ChefHatIcon,
} from "@phosphor-icons/react/dist/ssr";

function SkeletonCard() {
  return (
    <div className="flex gap-5 px-6 py-5 animate-pulse">
      <div className="shrink-0 w-20 h-20 rounded-xl bg-slate-200 dark:bg-slate-700" />
      <div className="flex-1 space-y-3 py-1">
        <div className="flex items-center gap-3">
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-2/5" />
          <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded-full w-20" />
        </div>
        <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded w-3/4" />
        <div className="flex gap-2">
          <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded w-24" />
          <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded w-16" />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-9 h-9 rounded-xl bg-slate-200 dark:bg-slate-700" />
        <div className="w-9 h-9 rounded-xl bg-slate-200 dark:bg-slate-700" />
      </div>
    </div>
  );
}

export default function LovedRecipesSection() {
  const { lovedRecipes, isLoading, isFetching, error } = useLovedRecipes();

  if (isLoading || isFetching) {
    return (
      <section>
        <div className="rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden bg-white dark:bg-slate-900 divide-y divide-slate-100 dark:divide-slate-800">
          {Array.from({ length: 2 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section>
        <div className="rounded-2xl border border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-rose-950/30 px-8 py-12 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-rose-100 dark:bg-rose-900/50 mb-4">
            <ChefHatIcon className="w-6 h-6 text-rose-500" />
          </div>
          <h3 className="text-base font-semibold text-rose-800 dark:text-rose-200 mb-1">
            Something went wrong
          </h3>
          <p className="text-sm text-rose-600 dark:text-rose-400">
            We couldn&apos;t load your loved recipes. Please try again later.
          </p>
        </div>
      </section>
    );
  }

  const recipes = lovedRecipes?.data;

  if (!recipes || recipes.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-8 py-16 text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 mb-5">
          <BookmarkSimpleIcon className="w-7 h-7 text-slate-400" />
        </div>
        <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200 mb-2">
          No loved recipes yet
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
          Recipes you love will appear here. Start exploring and like the ones
          you like.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden bg-white dark:bg-slate-900 divide-y divide-slate-100 dark:divide-slate-800 shadow-sm">
        {recipes.map((recipe) => {
          return (
            <CompactRecipeCard key={recipe._id} recipe={recipe} button="love" />
          );
        })}
      </div>
    </>
  );
}
