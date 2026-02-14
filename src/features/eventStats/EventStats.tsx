import { FC } from "react";
import { AttendeeStats, RecurringDate } from "../eventDetail/types";
import { RegistrationTable } from "./RegistrationTable";
import { RegistrationFormData } from "./types";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { EventDateDisplay } from "../eventDetail/components/EventDateDisplay";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { syncRegisterations } from "@/services/events-api";

export interface EventStatsData {
  eventId: string;
  eventName: string;
  date: string;
  parentEventId?: string;
  recurringDates: RecurringDate[];
  attendeeStats: AttendeeStats;
  registrationData: RegistrationFormData;
}

export const EventStats: FC<{ stats: EventStatsData }> = ({ stats }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (eventId: string) => syncRegisterations(eventId),
    onSuccess: () => {
      console.log("Registrations synced successfully");
      queryClient.invalidateQueries({ queryKey: ["event-stats", stats.eventId] });
    },
    onError: (error) => {
      console.error("Error syncing registrations:", error);
    },
  });
  return (
    <div className="container mx-auto max-w-6xl p-4 md:p-6 my-12">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{stats.eventName}</h1>
          <p className="text-muted-foreground mt-1">
            <EventDateDisplay
              date={stats.date}
              recurringDates={stats.recurringDates}
              showAllDatesOption={stats.recurringDates.length > 0}
              routePattern="stats"
              mainEventId={stats.parentEventId}
            />
          </p>
        </div>        
        
        <div className="space-y-4">
          <div className="flex justify-between pt-4">
          <h2 className="text-2xl font-semibold">Registrations</h2>
          <Button
            className="w-full sm:w-auto"
            variant="default"
            type="button"
            onClick={() => mutation.mutate(stats.eventId)}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? (
              <span className="flex items-center justify-center">
                <Spinner className="mr-2 h-5 w-5" />
                Syncing...
              </span>
            ) : (
              "Sync Data"
            )}
          </Button>
          </div>
          <RegistrationTable data={stats.registrationData} eventId={stats.eventId} />
        </div>
      </div>
    </div>
  );
};
