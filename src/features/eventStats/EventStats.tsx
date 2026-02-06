import { FC } from "react";
import { AttendeeStats, RecurringDate } from "../eventDetail/types";
import { RegistrationTable } from "./RegistrationTable";
import { RegistrationFormData } from "./types";

export interface EventStatsData {
  eventName: string;
  date: string;
  recurringDates: RecurringDate[];
  attendeeStats: AttendeeStats;
  registrationData: RegistrationFormData;
}

export const EventStats: FC<{ stats: EventStatsData }> = ({ stats }) => {
  return (
    <div className="container mx-auto max-w-6xl p-4 md:p-6 my-12">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{stats.eventName}</h1>
          <p className="text-muted-foreground mt-1">{new Date(stats.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>        
        
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Registrations</h2>
          <RegistrationTable data={stats.registrationData} />
        </div>
      </div>
    </div>
  );
};
