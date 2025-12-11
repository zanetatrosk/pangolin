import { createFileRoute, redirect } from "@tanstack/react-router";
import { EditProfilePage } from "@/features/profile/EditProfilePage";
import { authStore } from "@/stores/authStore";

export const Route = createFileRoute("/profile/edit")({
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
  component: EditProfilePage,
});
