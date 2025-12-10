import { createFileRoute, redirect } from "@tanstack/react-router";
import { NewEventPage } from "@/features/events/NewEventPage";

export const Route = createFileRoute("/events/new")({
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
  component: NewEventPage,
});
