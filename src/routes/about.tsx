import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="min-h-screen bg-gray-50/30 dark:bg-gray-900/30">
      TODO
    </div>
  );
}