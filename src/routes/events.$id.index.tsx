import { createFileRoute, redirect } from "@tanstack/react-router";
import { EventDetail } from "@/features/eventDetail/EventDetail";
import { EventDetailData } from "@/features/eventDetail/types";
import { getEventById } from "@/services/events-api";
import { useQuery } from "@tanstack/react-query";
import { authStore, selectIsAuthenticated } from "@/stores/authStore";
import { PATHS } from "@/paths";

export const Route = createFileRoute("/events/$id/")({
  beforeLoad: async ({ location }) => {
    const isAuthenticated = selectIsAuthenticated(authStore.state);
    
    if (!isAuthenticated) {
      throw redirect({
        to: PATHS.LOGIN,
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  const { data: event } = useQuery<EventDetailData>({
    queryKey: ["event", id],
    queryFn: () => getEventById(id),
  });
  if (!event) {
    return null;
  }
  return <EventDetail event={event} />;
}
