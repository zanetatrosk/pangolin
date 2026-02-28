import { EventStats } from "@/features/eventStats/EventStats";
import { getEventStats } from "@/services/events-api";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { authStore, selectIsAuthenticated } from "@/stores/authStore";
import { PATHS } from "@/paths";

export const Route = createFileRoute("/stats/main-event/$id")({
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
  
  const { data } = useQuery({
    queryKey: ["event-stats", id],
    queryFn: () => getEventStats(id),
    enabled: !!id,
  });
  
  if (!data) {
    return <div>Loading...</div>;
  }

  return <EventStats stats={data} />;
}
