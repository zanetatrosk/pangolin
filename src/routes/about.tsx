import { Input } from "@/components/ui/input";
import { getPlaces } from "@/services/get-places-api";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useDebounce } from "@uidotdev/usehooks";
import { use, useState } from "react";

export const Route = createFileRoute("/about")({
  component: RouteComponent,
});

function RouteComponent() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const debouncedQuery = useDebounce(searchQuery, 800);
  const { data: locationOptions = [], isLoading, isError } = useQuery({
    queryKey: ["locations", debouncedQuery],
    queryFn: () => getPlaces(debouncedQuery),
    enabled: debouncedQuery.length > 2,
    staleTime: 10 * 1000, // 10 seconds
  });
  return (
    <div className="min-h-screen bg-gray-50/30 dark:bg-gray-900/30">
      <Input
        value={searchQuery}
        onChange={(e) => {
          console.log("Input changed to:", e.target.value, searchQuery);
          setSearchQuery(e.target.value);
        }}
        placeholder="Search for a venue..."
      />
    </div>
  );
}
