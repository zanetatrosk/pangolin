import { SeriesEventDTO } from "@/features/myEvents/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Calendar, MapPin, Eye } from "lucide-react";
import React from "react";
import { StatusBadges } from "./StatusBadges";
import { EventCardType } from "./MyEventCard";
import { renderAddress } from "@/utils/renderAdress";
import { useNavigate } from "@tanstack/react-router";
import { PATHS } from "@/paths";


export const ReocurringEventCard: React.FC<{event: SeriesEventDTO, cardType: EventCardType}> = ({ event, cardType }) => {
  const navigate = useNavigate();
  // This component only handles series events
  if (event.displayMode !== 'SERIES') {
    return null;
  }

  const { eventName, occurrences, overallStartDate, overallEndDate, organizer } = event;

  const isUserOrganizer = cardType === EventCardType.HOSTING;
  return (
    <Card className="w-full border-0 shadow-2xl rounded-md bg-white dark:bg-zinc-900 dark:border dark:border-zinc-800">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2 px-2 md:px-6">
        <div className="space-y-1 pl-4 md:pl-0">
          <CardTitle className="text-xl font-bold">{eventName}</CardTitle>
          {!isUserOrganizer && <div className="text-sm">
            Organized by {organizer.firstName && organizer.lastName ? `${organizer.firstName} ${organizer.lastName}` : organizer.username}
          </div>}
          <div className="text-sm text-muted-foreground">
            {overallStartDate && overallEndDate && `${overallStartDate} until ${overallEndDate}`}
          </div>
          
        </div>
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
                {occurrences?.map((occurrence) => (
                  <TableRow key={occurrence.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4 text-primary/70" />
                        {occurrence.date} at {occurrence.time}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-muted-foreground">
                        <MapPin className="mr-2 h-4 w-4 opacity-70" />
                        {renderAddress(occurrence.location)}
                      </div>
                    </TableCell>
                    <TableCell>
                      {occurrence.attendeeStats?.going.total || 0}
                    </TableCell>
                    <TableCell>
                      <StatusBadges
                        status={occurrence.status}
                        userStatus={cardType === EventCardType.GOING ? occurrence.userStatus : undefined}
                      />
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="secondary" 
                        size="sm"
                        onClick={() => navigate({ to: PATHS.EVENTS.DETAIL(occurrence.id) })}
                      >
                        View
                        <Eye className="h-4 w-4 ml-2" />
                      </Button>
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
