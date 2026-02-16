import { PATHS } from "@/paths";
import { useNavigate } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { FC } from "react";

interface RecurringDate {
  id: string;
  date: string;
}

type RoutePattern = "detail" | "stats";

interface EventDateDisplayProps {
  date: string;
  endDate?: string;
  recurringDates?: RecurringDate[];
  showAllDatesOption?: boolean;
  routePattern?: RoutePattern;
}

export const EventDateDisplay: FC<EventDateDisplayProps> = ({
  date,
  endDate,
  recurringDates,
  showAllDatesOption = false,
  routePattern = "detail",
}) => {
  const navigate = useNavigate();

  const getRoutePath = (eventId: string): string => {
    switch (routePattern) {
      case "stats":
        return PATHS.EVENTS.STATS(eventId);
      case "detail":
      default:
        return PATHS.EVENTS.DETAIL(eventId);
    }
  };

  const handleDateChange = (eventId: string) => {    
      navigate({ to: getRoutePath(eventId) });
  };

  if (recurringDates && recurringDates.length > 0) {
    return (
      <div className="relative flex items-center gap-1 group cursor-pointer hover:text-primary transition-colors max-w-max">
        <span>{date}</span>
        <ChevronDown className="w-4 h-4 opacity-50" />
        <select
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={(e) => handleDateChange(e.target.value)}
          value=""
        >
          <option value="" disabled>
            Select date
          </option>
          {recurringDates.map((rd) => (
            <option key={rd.id} value={rd.id}>
              {rd.date}
            </option>
          ))}
        </select>
      </div>
    );
  }

  if (recurringDates && endDate) {
    return <>{`${date} until ${endDate}`}</>;
  }

  return <>{date}</>;
};
