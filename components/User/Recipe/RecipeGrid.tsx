import { Recipe } from "@/types/recipes.type";
import { RecipeCard } from "./RecipeCard";
import { MagnifyingGlassIcon } from "@phosphor-icons/react/dist/ssr";

export const RecipeGrid = ({
  isFetching,
  data,
}: {
  isFetching: boolean;
  data: Recipe[] | undefined;
}) => {
  return (
    <div className="flex justify-center">
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 place-content-evenly transition-opacity duration-200 py-3 md:py-6 lg:py-12 min-h-[80vh] ${
          isFetching ? "opacity-50" : "opacity-100"
        }`}
      >
        {data?.map((recipe: Recipe) => (
          <RecipeCard key={recipe._id} recipe={recipe} />
        ))}

        {!isFetching && data?.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-16 text-muted-foreground">
            <MagnifyingGlassIcon size={48} className="mb-3 opacity-30" />
            <p className="text-sm">No recipes found</p>
          </div>
        )}
      </div>
    </div>
  );
};
