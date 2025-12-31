import { EventDetailData } from "@/features/eventDetail/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Calendar, MapPin, MoreVertical } from "lucide-react";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { StatusBadges } from "./StatusBadges";
import { EventCardType } from "./MyEventCard";

export interface MyEventCardProps {
  event: EventDetailData;
  cardType?: EventCardType;
}

interface DropdownOption {
  label: string;
  variant?: "destructive" | "default" | undefined;
}
export const getOptionsByCardType = (cardType?: EventCardType): DropdownOption[] => {
  switch (cardType) {
    case EventCardType.HOSTING:
      return [
        {label: "View Details"},
        {label: "Manage Event"},
        {label: "Cancel Event", variant: "destructive"},
      ];
    case EventCardType.INTERESTED:
      return [
        {label: "View Details"},
        {label: "Join Event"},
        {label: "Cancel Interest", variant: "destructive"},
      ];
    case EventCardType.GOING:
      return [
        {label: "View Details"},
        {label: "Cancel Registration", variant: "destructive"},
      ];
    default:
      return [{label: "View Details"}];
  }
};

export const EventActions = ({ cardType }: { cardType?: EventCardType }) => {
  const options = getOptionsByCardType(cardType);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {options.map((option) => (
          <DropdownMenuItem key={option.label} variant={option.variant}>{option.label}</DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const ReocurringEventCard: React.FC<MyEventCardProps> = ({ event, cardType }) => {
  const { basicInfo } = event;
  const { eventName, location, recurringDates, date, time, endDate } =
    basicInfo;

  const isUserOrganizer = cardType === EventCardType.HOSTING;
  return (
    <Card className="w-full border-0 shadow-2xl rounded-md bg-white dark:bg-zinc-900 dark:border dark:border-zinc-800">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2 px-2 md:px-6">
        <div className="space-y-1 pl-4 md:pl-0">
          <CardTitle className="text-xl font-bold">{eventName}</CardTitle>
          {!isUserOrganizer && <div className="text-sm">
            Organized by John Doe
          </div>}
          <div className="text-sm text-muted-foreground">
            {date && endDate && `${date} until ${endDate}`}
          </div>
          
        </div>
        <EventActions cardType={cardType} />
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="text-sm font-semibold text-foreground/80">
            Upcoming Dates
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date and Time</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Attendees</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recurringDates?.map((rd) => (
                  <TableRow key={rd.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4 text-primary/70" />
                        {rd.date} at {time}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-muted-foreground">
                        <MapPin className="mr-2 h-4 w-4 opacity-70" />
                        {location}
                      </div>
                    </TableCell>
                    <TableCell>
                      {event.attendeeStats?.going?.total || 0}
                    </TableCell>
                    <TableCell>
                      <StatusBadges
                        status={rd?.status}
                        userStatus={rd?.statusUser}
                      />
                    </TableCell>
                    <TableCell></TableCell>
                    <TableCell>
                      <EventActions cardType={cardType} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
