import { createFileRoute } from "@tanstack/react-router";
import { ProfilePage } from "@/features/profile/ProfilePage";
import { useUser } from "@/hooks/useUser";
import { getUserById } from "@/services/user-api";
import { useQuery } from "@tanstack/react-query";
import { requireAuth } from "@/utils/requireAuth";
import { Loading } from "@/components/ui/loading";

export const Route = createFileRoute("/my-profile")({
  beforeLoad: requireAuth,
  component: RouteComponent,
  ssr: false,
});

function RouteComponent() {
  const { user } = useUser();
  const { data, isLoading } = useQuery({
    queryKey: ["profile", user?.userId],
    queryFn: () => getUserById(user?.userId),
  })
  
  if(isLoading) {
    return <Loading/>
  }
  
  if (!user || !data) {
    return null;
  }

  return <ProfilePage userId={user.userId} profileDataDefault={data} key={user.userId} />;
}
