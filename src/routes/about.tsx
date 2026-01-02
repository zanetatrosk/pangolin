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
  return (
    <div className="min-h-screen bg-gray-50/30 dark:bg-gray-900/30">
      
    </div>
  );
}
