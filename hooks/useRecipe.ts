import { useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "./axios/interceptors";
import { RecipeApiResponse } from "@/types/recipes.type";

export function useRecipe() {
  const queryClient = useQueryClient();

  const { data: recipes, isLoading } = useQuery({
    queryKey: ["recipes"],
    queryFn: () =>
      axiosInstance
        .get<RecipeApiResponse>("/recipes/all")
        .then((response) => response.data),
    select: (data) => {
      queryClient.setQueryData(["recipes"], data);
      return data;
    },
    retry: false,
    staleTime: Infinity,
  });

  return {
    recipes,
    isLoading,
  };
}
