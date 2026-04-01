import { AuthenticatedFooter } from "@/components/common/AuthenticatedFooter";
import ProtectedRoute from "@/components/common/ProtectedRoute";
import { UserHeader } from "@/components/common/UserHeader";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute allowedRoles={["user"]}>
      <UserHeader />
      <div className="min-h-screen container mx-auto px-1.5 md:px-0 ">
        {children}
      </div>
      <AuthenticatedFooter
        links={[
          { label: "Recipes", href: "/recipes" },
          { label: "Cookbooks", href: "/cookbooks" },
          { label: "Saved Recipes", href: "/saved-recipes" },
          { label: "Loved Recipes", href: "/loved-recipes" },
        ]}
      />
    </ProtectedRoute>
  );
}
