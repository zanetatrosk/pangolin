import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/events/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Outlet />
    </>
  );
}
