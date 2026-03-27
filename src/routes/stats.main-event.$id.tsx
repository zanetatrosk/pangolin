import { EventStats } from "@/features/eventStats/EventStats";
import { getEventStats } from "@/services/events-api";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { requireAuth } from "@/utils/requireAuth";

export const Route = createFileRoute("/stats/main-event/$id")({
  beforeLoad: requireAuth,
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
