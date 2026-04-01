// hooks/useRecipe.ts
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "./axios/interceptors";
import { RecipeApiResponse } from "@/types/recipes.type";

export function useRecipe(params?: {
  search?: string;
  page?: number;
  limit?: number;
  tags?: string;
  difficulty?: string;
  author?: string;
}) {
  const {
    data: recipes,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["recipes", params],
    queryFn: () =>
      axiosInstance
        .get<RecipeApiResponse>("/recipes/all", { params })
        .then((res) => res.data),

    staleTime: 1000 * 60,
    placeholderData: (prev) => prev,
  });

  return { recipes, isLoading, isFetching };
}
