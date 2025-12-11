import { createFileRoute, redirect } from "@tanstack/react-router";
import { ProfilePage } from "@/features/profile/ProfilePage";
import { authStore } from "@/stores/authStore";

export const Route = createFileRoute("/profile")({
  beforeLoad: async ({ location }) => {
    const { isAuthenticated } = authStore.state;
    
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
