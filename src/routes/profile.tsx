import { createFileRoute, redirect } from "@tanstack/react-router";
import { ProfilePage } from "@/features/profile/ProfilePage";

export const Route = createFileRoute("/profile")({
  beforeLoad: async ({ location }) => {
    const { useAuthStore } = await import('@/stores/authStore');
    const { isAuthenticated } = useAuthStore.getState();
    
    if (!isAuthenticated) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: ProfilePage,
});
