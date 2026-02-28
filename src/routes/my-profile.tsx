import { createFileRoute, redirect } from "@tanstack/react-router";
import { ProfilePage } from "@/features/profile/ProfilePage";
import { authStore, selectIsAuthenticated } from "@/stores/authStore";
import { useUser } from "@/hooks/useUser";
import { getUserById } from "@/services/user-api";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/my-profile")({
  beforeLoad: async ({ location }) => {
    const isAuthenticated = selectIsAuthenticated(authStore.state);
    
    if (!isAuthenticated) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = useUser();
  const { data } = useQuery({
    queryKey: ["profile", user.userId],
    queryFn: () => getUserById(user.userId),
  })
  
  if (!user || !data) {
    return null;
  }
  return <ProfilePage userId={user.userId} profileDataDefault={data} key={user.userId} />;
}
