import { createFileRoute } from "@tanstack/react-router";
import { EventSearch } from "@/features/eventsList/EventSearch";

export const Route = createFileRoute("/events")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="min-h-screen bg-gray-50/30 dark:bg-gray-900/30">
      {/* Search Section */}
      <div className="relative px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-3">
              Dance Events
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Find and join dance events in your area
            </p>
          </div>
          
          {/* Search Component */}
          <EventSearch />
        </div>
      </div>
    </div>
  );
}
