import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/events/$id/stats")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div></div>;
}
