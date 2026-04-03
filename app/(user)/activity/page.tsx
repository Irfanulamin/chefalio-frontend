import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SavedRecipesSection from "./_components/SavedRecipe";
import LovedRecipesSection from "./_components/LovedRecipe";
import { BookmarkSimpleIcon, HeartIcon } from "@phosphor-icons/react/dist/ssr";
export default function ActivityPage() {
  return (
    <Tabs
      defaultValue="saved-recipes"
      className="max-w-7xl mx-auto my-3 md:my-6 lg:my-12"
    >
      <TabsList className=" p-1 mb-8" variant="line">
        <TabsTrigger value="saved-recipes">
          <BookmarkSimpleIcon weight="fill" /> Saved
        </TabsTrigger>
        <TabsTrigger value="loved-recipes">
          <HeartIcon weight="fill" /> Favourites
        </TabsTrigger>
      </TabsList>
      <TabsContent value="saved-recipes">
        <SavedRecipesSection />
      </TabsContent>
      <TabsContent value="loved-recipes">
        <LovedRecipesSection />
      </TabsContent>
    </Tabs>
  );
}
