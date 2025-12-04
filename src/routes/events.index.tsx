import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { EventSearch } from "@/features/eventsList/EventSearch";
import { EventList } from "@/features/eventsList/EventList";

export const Route = createFileRoute("/events/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="relative py-12 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-white-600/20 to-white-200/20 dark:from-gray-900 dark:via-gray-950 dark:to-black" />
        {/* Content */}
        <div className="relative px-4 mt-6">
          <div className="max-w-6xl mx-auto">
              <EventSearch />
              <EventList />
          </div>
        </div>
      </div>
    </div>
  );
}
