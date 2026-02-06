import { createFileRoute } from "@tanstack/react-router";
import { ProfilePage } from "@/features/profile/ProfilePage";
import { getUserById } from "@/services/user-api";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/profile/$userId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { userId } = Route.useParams();
  
  const { data, isLoading, error } = useQuery({
    queryKey: ["profile", userId],
    queryFn: () => getUserById(userId),
    enabled: !!userId,
  });
  
  if (isLoading) {
    return (
      <div className="container mx-auto max-w-4xl p-4 md:p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container mx-auto max-w-4xl p-4 md:p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-destructive">Error loading profile. Please try again.</p>
        </div>
      </div>
    );
  }
  
  if (!data) {
    return (
      <div className="container mx-auto max-w-4xl p-4 md:p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-muted-foreground">Profile not found.</p>
        </div>
      </div>
    );
  }
  
  return <ProfilePage userId={userId} profileDataDefault={data} key={userId} />;
}
