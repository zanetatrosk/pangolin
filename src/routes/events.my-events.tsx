import { createFileRoute, redirect } from "@tanstack/react-router";
import { MyEventsPage } from "@/features/myEvents/MyEventsPage";

export const Route = createFileRoute("/events/my-events")({
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
  component: MyEventsPage,
});
