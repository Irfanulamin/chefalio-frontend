"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useRecipe } from "@/hooks/useRecipe";
import { Recipe } from "@/types/recipes.type";
import { Clock, Heart, Loader2, Share2 } from "lucide-react";
import Image from "next/image";

export default function RecipesPage() {
  const { recipes, isLoading } = useRecipe();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const data: Recipe[] | undefined = recipes?.data?.recipes;
  const difficultyColors = {
    beginner:
      "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-100",
    intermediate:
      "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100",
    advance: "bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-100",
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold">My Recipes</h1>
      <p className="text-sm text-gray-500">
        {JSON.stringify(recipes?.data?.recipes)}{" "}
      </p>
      {data?.map((recipe: Recipe) => (
        <>
          <div className="w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700 bg-accent/10 dark:bg-slate-950 shadow-lg dark:shadow-2xl transition-all duration-300 hover:shadow-xl dark:hover:shadow-2xl hover:border-slate-300 dark:hover:border-slate-600">
            {/* Image Section */}
            <div className="relative h-64 w-full overflow-hidden">
              <Image
                src={recipe.images[0]}
                alt={recipe.title}
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
              />

              {/* Badges Overlay */}
              <div className="absolute right-3 top-3 flex flex-col gap-2">
                <Badge
                  className={`${difficultyColors[recipe.difficulty]} border-0 font-semibold`}
                >
                  {recipe.difficulty.charAt(0).toUpperCase() +
                    recipe.difficulty.slice(1)}
                </Badge>
              </div>

              {/* Heart Button */}
              <button className="absolute bottom-3 right-3 rounded-full bg-white dark:bg-black p-2.5 shadow-md transition-all duration-200 hover:scale-110 active:scale-95">
                <Heart
                  className={`h-5 w-5 transition-colors ${
                    false
                      ? "fill-rose-500 text-rose-500"
                      : "text-slate-600 dark:text-slate-300"
                  }`}
                />
              </button>
            </div>

            {/* Content Section */}
            <div className="flex flex-col gap-4 p-6">
              {/* Author Info */}
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-primary to-accent text-white font-semibold text-sm">
                  {recipe.author.fullName.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-black dark:text-white">
                    {recipe.author.fullName}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    @{recipe.author.username}
                  </p>
                </div>
              </div>

              {/* Title & Description */}
              <div className="space-y-2">
                <h2 className="text-xl font-bold text-slate-950 dark:text-white line-clamp-2">
                  {recipe.title}
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                  {recipe.description}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {recipe.tags.slice(0, 3).map((tag, idx) => (
                  <Badge
                    key={idx}
                    className="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-0"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Ingredients Preview */}
              <div className="rounded-lg bg-slate-50 dark:bg-black p-3 space-y-2">
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Ingredients
                </p>
                <ul className="space-y-1">
                  {recipe.ingredients.slice(0, 3).map((ingredient, idx) => (
                    <li
                      key={idx}
                      className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-2"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-500 dark:bg-blue-400"></span>
                      {ingredient}
                    </li>
                  ))}
                  {recipe.ingredients.length > 3 && (
                    <p className="text-xs text-slate-500 dark:text-slate-500 font-medium pt-1">
                      +{recipe.ingredients.length - 3} more
                    </p>
                  )}
                </ul>
              </div>

              {/* Stats */}
              <div className="flex gap-4 pt-2 border-t border-slate-200 dark:border-slate-700">
                <div className="flex-1 flex items-center gap-2">
                  <Heart
                    className={`h-4 w-4 ${
                      false
                        ? "fill-rose-500 text-rose-500"
                        : "text-slate-400 dark:text-slate-500"
                    }`}
                  />
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    {recipe.lovedCount}
                  </span>
                </div>
                <div className="flex-1 flex items-center gap-2">
                  <Clock className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    {recipe.savedCount}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <Button
                  variant="outline"
                  className="flex-1 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-white"
                >
                  Save
                </Button>
                <Button
                  variant="default"
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0"
                >
                  View Recipe
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  className="border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <Share2 className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                </Button>
              </div>
            </div>
          </div>
        </>
      ))}
    </div>
  );
}
