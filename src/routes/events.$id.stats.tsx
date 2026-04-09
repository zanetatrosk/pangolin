import { EventStats } from "@/features/eventStats/EventStats";
import { mockEventStats } from "@/mocks/eventStats";
import { getEventStats } from "@/services/events-api";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { requireAuth } from "@/utils/requireAuth";
import { Loading } from "@/components/ui/loading";

export const Route = createFileRoute("/events/$id/stats")({
  beforeLoad: requireAuth,
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  //todo fetch stats data using id
  const { data } = useQuery({
    queryKey: ["event-stats", id],
    queryFn: () => getEventStats(id),
    enabled: !!id,
  });
  if (!data) {
    return <Loading />;
  }

  return <EventStats stats={data} />;
}
