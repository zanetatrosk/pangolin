import { createFileRoute, redirect } from "@tanstack/react-router";
import { EditProfilePage } from "@/features/profile/EditProfilePage";

export const Route = createFileRoute("/profile/edit")({
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
  component: EditProfilePage,
});
