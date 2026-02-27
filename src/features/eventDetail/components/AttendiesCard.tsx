import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";
import { useState } from "react";
import { AttendeeStats } from "../types";
import { RegistrationModeEnum } from "../publish-actions/PublishEventOptions";
import { AttendeeListModal } from "./AttendeeListModal";

interface AttendeeStatsCardProps {
  eventId: string;
  attendeeStats: AttendeeStats;
  registrationMode: RegistrationModeEnum;
  maxCapacity?: number;
}

export function AttendeeStatsCard({ 
  eventId,
  attendeeStats, 
  registrationMode,
  maxCapacity 
}: AttendeeStatsCardProps) {
  const [showAttendeeList, setShowAttendeeList] = useState(false);

  const isCoupleMode = registrationMode === RegistrationModeEnum.COUPLE;
  const totalGoing = attendeeStats.going.total;

  return (
    <>
      <Card className="overflow-hidden border-primary/20 shadow-md pt-0">
        <CardHeader className="bg-primary/5 pb-4 pt-6">
          <CardTitle className="flex items-center justify-between text-lg">
            <span>Who's Coming</span>
            <Users className="w-5 h-5 text-primary" />
          </CardTitle>
          <CardDescription>
            {totalGoing} {totalGoing === 1 ? 'person' : 'people'} going • {attendeeStats.interested} interested
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {/* Visual Bar for Leaders/Followers - Only for COUPLE mode */}
            {isCoupleMode && (
              <div className="space-y-2">
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm font-medium">
                    <span className="text-blue-600">Leaders</span>
                    <span className="text-blue-600">{attendeeStats.going.leaders}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm font-medium">
                    <span className="text-pink-600">Followers</span>
                    <span className="text-pink-600">{attendeeStats.going.followers}</span>
                  </div>
                  {attendeeStats.going.both > 0 && (
                    <div className="flex items-center justify-between text-sm font-medium">
                      <span className="text-purple-600">Both</span>
                      <span className="text-purple-600">{attendeeStats.going.both}</span>
                    </div>
                  )}
                </div>
                {maxCapacity && (
                  <div className="text-xs text-muted-foreground text-right">
                    {totalGoing} / {maxCapacity} capacity
                  </div>
                )}
                <div className="h-3 w-full bg-muted rounded-full overflow-hidden flex">
                  <div 
                    className="h-full bg-blue-500" 
                    style={{ width: `${maxCapacity ? (attendeeStats.going.leaders / maxCapacity) * 100 : (totalGoing > 0 ? (attendeeStats.going.leaders / totalGoing) * 100 : 0)}%` }}
                  />
                  <div 
                    className="h-full bg-pink-500" 
                    style={{ width: `${maxCapacity ? (attendeeStats.going.followers / maxCapacity) * 100 : (totalGoing > 0 ? (attendeeStats.going.followers / totalGoing) * 100 : 0)}%` }}
                  />
                  <div 
                    className="h-full bg-purple-500" 
                    style={{ width: `${maxCapacity ? (attendeeStats.going.both / maxCapacity) * 100 : (totalGoing > 0 ? (attendeeStats.going.both / totalGoing) * 100 : 0)}%` }}
                  />
                </div>
              </div>
            )}

            {/* Capacity indicator for OPEN and GOOGLE_FORM modes */}
            {!isCoupleMode && maxCapacity && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-medium">
                  <span>Capacity</span>
                  <span className={totalGoing >= maxCapacity ? "text-red-600" : "text-primary"}>
                    {totalGoing} / {maxCapacity}
                  </span>
                </div>
                <div className="h-3 w-full bg-muted rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${totalGoing >= maxCapacity ? 'bg-red-500' : 'bg-primary'}`}
                    style={{ width: `${Math.min((totalGoing / maxCapacity) * 100, 100)}%` }}
                  />
                </div>
              </div>
            )}

            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => setShowAttendeeList(true)}
            >
              See who is coming
            </Button>
          </div>
        </CardContent>
      </Card>

      <AttendeeListModal
        isOpen={showAttendeeList}
        onClose={() => setShowAttendeeList(false)}
        eventId={eventId}
        registrationMode={registrationMode}
        leadersCount={attendeeStats.going.leaders}
        followersCount={attendeeStats.going.followers}
        bothCount={attendeeStats.going.both}
      />
    </>
  );
}