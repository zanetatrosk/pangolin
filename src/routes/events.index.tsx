import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { EventSearch } from "@/features/eventsList/EventSearch";
import { EventList } from "@/features/eventsList/EventList";
import { PATHS } from "@/paths";

export const Route = createFileRoute("/events/")({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>) => {
    const normalizeOptionalString = (value: unknown): string | undefined => {
      if (typeof value !== "string") return undefined;
      const trimmed = value.trim();
      return trimmed.length ? trimmed : undefined;
    };

    const normalizeStringArray = (value: unknown): string[] => {
      const fromString = (str: string) =>
        str
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);

      if (Array.isArray(value)) {
        return value.flatMap((v) => (typeof v === "string" ? fromString(v) : []));
      }

      if (typeof value === "string") {
        return fromString(value);
      }

      return [];
    };

    return {
      eventName: normalizeOptionalString(search.eventName),
      city: normalizeOptionalString(search.city),
      country: normalizeOptionalString(search.country),
      county: normalizeOptionalString(search.county),
      state: normalizeOptionalString(search.state),
      eventTypes: normalizeStringArray(search.eventTypes),
      danceStyles: normalizeStringArray(search.danceStyles),
    } satisfies SearchProps;
  },
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
  const navigate = useNavigate();
  const searchedParams = Route.useSearch();
  const searchedParamsKey = JSON.stringify(searchedParams);

  const handleSearchChange = (params: SearchProps) => {
    navigate({
      to: PATHS.EVENTS.LIST,
      search: {
        eventName: params.eventName?.trim() ? params.eventName.trim() : undefined,
        city: params.city?.trim() ? params.city.trim() : undefined,
        country: params.country?.trim() ? params.country.trim() : undefined,
        county: params.county?.trim() ? params.county.trim() : undefined,
        state: params.state?.trim() ? params.state.trim() : undefined,
        eventTypes: params.eventTypes ?? [],
        danceStyles: params.danceStyles ?? [],
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="relative py-12 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-white-600/20 to-white-200/20 dark:from-gray-900 dark:via-gray-950 dark:to-black" />
        {/* Content */}
        <div className="relative px-4 mt-6">
          <div className="max-w-6xl mx-auto">
              <EventSearch key={searchedParamsKey} onSearch={handleSearchChange} initialSearchParams={searchedParams} />
              <EventList searchParams={searchedParams} />
          </div>
        </div>
      </div>
    </div>
  );
}
