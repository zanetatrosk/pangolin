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
    <div className="min-h-screen bg-gray-50/30 dark:bg-gray-900/30">
      {/* Search Section */}
      <div className="relative px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-3">
              {t('events.title')}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {t('events.subtitle')}
            </p>
          </div>

          {/* Search Component */}
          <EventSearch />
          <EventList />
        </div>
      </div>
    </div>
  );
}