import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  useRecipeStats,
  useToggleLove,
  useToggleSave,
} from "@/hooks/useRecipe";
import { cn } from "@/lib/utils";
import { Recipe } from "@/types/recipes.type";
import {
  BookmarkSimpleIcon,
  EyeIcon,
  HeartIcon,
  ShareFatIcon,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";

export const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
  const { stats } = useRecipeStats(recipe._id);
  const { mutate: toggleSave } = useToggleSave();
  const { mutate: toggleLove } = useToggleLove();

  const difficultyColors = {
    beginner:
      "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-100",
    intermediate:
      "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100",
    advance: "bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-100",
  };

  const handleLoveToggle = () => {
    toggleLove(recipe._id);
  };

  const handleSaveToggle = () => {
    toggleSave(recipe._id);
  };

  const handleShareLinkToClipboard = () => {
    const url = `${window.location.origin}/recipes/${recipe._id}`;
    navigator.clipboard.writeText(url);
    if (navigator.share) {
      void navigator
        .share({
          title: recipe.title,
          text: recipe.description,
          url,
        })
        .catch(() => undefined);
    }
  };

  return (
    <div
      className="group w-full max-w-sm overflow-hidden rounded-2xl 
border border-blue-200/40 dark:border-blue-400/20 
bg-linear-to-br from-white/60 via-blue-50/40 to-blue-100/30 
dark:from-black/80 dark:via-blue-900/20 dark:to-black/30
backdrop-blur-xl backdrop-saturate-150
shadow-[0_10px_30px_rgba(59,130,246,0.15)] 
dark:shadow-[0_10px_30px_rgba(59,130,246,0.10)]
transition-all duration-300 
hover:-translate-y-1 
hover:shadow-[0_15px_40px_rgba(59,130,246,0.25)] 
dark:hover:shadow-[0_15px_40px_rgba(59,130,246,0.20)]
flex flex-col"
    >
      {/* Image */}
      <div className="relative h-50 w-full overflow-hidden bg-slate-100 dark:bg-slate-900">
        <Image
          src={recipe.images[0]}
          alt={recipe.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Difficulty */}
        <div className="absolute left-3 top-3">
          <Badge
            className={cn(
              "border-0 text-[10px] font-medium uppercase tracking-widest px-2.5 py-1",
              difficultyColors[recipe.difficulty],
            )}
          >
            {recipe.difficulty}
          </Badge>
        </div>

        {/* Love button */}
        <button
          onClick={() => handleLoveToggle()}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 dark:bg-black/70 backdrop-blur-sm transition-all duration-200 hover:scale-110 active:scale-95"
        >
          <HeartIcon
            weight={stats?.isLoved ? "fill" : "bold"}
            className={cn(
              "h-4 w-4 transition-all duration-200",
              stats?.isLoved
                ? "fill-rose-500 text-rose-500 scale-110"
                : "text-slate-500 dark:text-slate-400",
            )}
          />
        </button>
      </div>

      {/* Body */}
      <div className="flex flex-col gap-4 p-5 flex-1">
        {/* Author */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-semibold text-accent-foreground">
            {(recipe.author.fullName || "")
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)
              .toUpperCase()}
          </div>
          <div>
            <p className="text-sm font-medium text-slate-900 dark:text-white leading-none">
              {recipe.author.fullName}
            </p>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
              @{recipe.author.username}
            </p>
          </div>
        </div>

        {/* Title & Description */}
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white leading-snug line-clamp-2 mb-1.5">
            {recipe.title}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2 font-light">
            {recipe.description}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {recipe.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-slate-100 dark:bg-slate-800 px-2.5 py-1 text-[11px] text-slate-600 dark:text-slate-400 capitalize"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Ingredients */}
        <div className="border-y border-slate-100 dark:border-slate-800 py-3 space-y-2">
          <p className="text-[10px] font-medium uppercase tracking-widest text-slate-400 dark:text-slate-500">
            Ingredients
          </p>
          <ul className="space-y-1.5">
            {recipe.ingredients.slice(0, 3).map((item, idx) => (
              <li
                key={idx}
                className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                {item}
              </li>
            ))}
          </ul>
          {recipe.ingredients.length > 3 && (
            <p className="text-[11px] text-slate-400 dark:text-slate-500 pl-3.5">
              +{recipe.ingredients.length - 3} more
            </p>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1.5">
            <HeartIcon
              weight={stats?.isLoved ? "fill" : "bold"}
              className={cn(
                "h-3.5 w-3.5",
                stats?.isLoved && "fill-rose-400 text-rose-400",
              )}
            />
            <span className="font-medium text-slate-700 dark:text-slate-300">
              {recipe.lovedCount.toLocaleString()}
            </span>{" "}
            loves
          </span>
          <span className="flex items-center gap-1.5">
            <BookmarkSimpleIcon
              className={cn(
                "h-3.5 w-3.5",
                stats?.isSaved && "fill-green-800 text-green-800",
              )}
              weight={stats?.isSaved ? "fill" : "bold"}
            />
            <span className="font-medium text-slate-700 dark:text-slate-300">
              {recipe.savedCount.toLocaleString()}
            </span>{" "}
            saved
          </span>
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-auto">
          <Button
            onClick={() => {
              handleSaveToggle();
            }}
            variant="outline"
            className="flex-1 capitalize h-10"
          >
            <BookmarkSimpleIcon
              className="h-4 w-4"
              weight={stats?.isSaved ? "fill" : "bold"}
            />
            {stats?.isSaved ? "Saved" : "Save"}
          </Button>
          <Link href={`/recipes/${recipe._id}`} className="flex-1">
            <Button className="flex-1 capitalize h-10 w-full">
              <EyeIcon className="h-4 w-4 text-secondary" weight="fill" /> View
            </Button>
          </Link>
          <Button
            size="icon"
            variant="default"
            onClick={() => handleShareLinkToClipboard()}
            className="h-10 w-10 shrink-0 border-slate-200 dark:border-slate-700 cursor-pointer"
          >
            <ShareFatIcon className="h-4 w-4 text-black" weight="fill" />
          </Button>
        </div>
      </div>
    </div>
  );
};
