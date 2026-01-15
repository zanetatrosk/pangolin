import { createFileRoute } from "@tanstack/react-router";
import { EventSearch } from "@/features/eventsList/EventSearch";
import { EventList } from "@/features/eventsList/EventList";
import { useState } from "react";

export const Route = createFileRoute("/events/")({
  component: RouteComponent,
});

export interface SearchProps {
  eventName?: string;
  city?: string;
  country?: string;
  county?: string;
  state?: string;
  eventTypes: string[];
  danceStyles: string[];
}

function RouteComponent() {
  const [searchedParams, setSearchedParams] = useState<SearchProps | undefined>(undefined);
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="relative py-12 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-white-600/20 to-white-200/20 dark:from-gray-900 dark:via-gray-950 dark:to-black" />
        {/* Content */}
        <div className="relative px-4 mt-6">
          <div className="max-w-6xl mx-auto">
              <EventSearch onSearch={setSearchedParams} />
              <EventList searchParams={searchedParams} />
          </div>
        </div>
      </div>
    </div>
  );
}
