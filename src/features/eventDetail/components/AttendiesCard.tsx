import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Users, X } from "lucide-react";
import { useState } from "react";
import { AttendeeStats } from "./anotherSeeevents";

export function AttendeeStatsCard({ attendeeStats }: { attendeeStats: AttendeeStats }) {
  const [showAttendeeList, setShowAttendeeList] = useState(false);
  const [attendeeTab, setAttendeeTab] = useState<"leaders" | "followers">("leaders");

  // Mock list for the modal
  const mockAttendees = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    name: `Dancer ${i + 1}`,
    role: i % 2 === 0 ? "Leader" : "Follower",
    avatar: `https://i.pravatar.cc/150?u=${i}`,
  }));

  const filteredAttendees = mockAttendees.filter((a) =>
    attendeeTab === "leaders" ? a.role === "Leader" : a.role === "Follower"
  );

  return (
    <>
      <Card className="overflow-hidden border-primary/20 shadow-md pt-0">
        <CardHeader className="bg-primary/5 pb-4 pt-6">
          <CardTitle className="flex items-center justify-between text-lg">
            <span>Who's Coming</span>
            <Users className="w-5 h-5 text-primary" />
          </CardTitle>
          <CardDescription>
            {attendeeStats.going.total} people going • {attendeeStats.interested} interested
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {/* Visual Bar for Leaders/Followers */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-medium">
                <span className="text-blue-600">Leaders ({attendeeStats.going.leaders})</span>
                <span className="text-pink-600">Followers ({attendeeStats.going.followers})</span>
              </div>
              <div className="h-3 w-full bg-muted rounded-full overflow-hidden flex">
                <div 
                  className="h-full bg-blue-500" 
                  style={{ width: `${(attendeeStats.going.leaders / attendeeStats.going.total) * 100}%` }}
                />
                <div 
                  className="h-full bg-pink-500" 
                  style={{ width: `${(attendeeStats.going.followers / attendeeStats.going.total) * 100}%` }}
                />
              </div>
            </div>

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

      {/* --- "Who is Coming" Modal/Overlay --- */}
      {showAttendeeList && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/50 backdrop-blur-sm p-0 md:p-4 animate-in fade-in duration-200">
          <div className="bg-background w-full max-w-md md:rounded-xl rounded-t-xl shadow-2xl flex flex-col max-h-[85vh] animate-in slide-in-from-bottom-10 duration-300">
            
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="font-semibold text-lg">Guest List</h3>
              <Button variant="ghost" size="icon" onClick={() => setShowAttendeeList(false)}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="p-2 grid grid-cols-2 gap-2 border-b bg-muted/30">
              <button
                onClick={() => setAttendeeTab("leaders")}
                className={`py-2 text-sm font-medium rounded-md transition-colors ${
                  attendeeTab === "leaders" 
                    ? "bg-white shadow text-blue-600" 
                    : "text-muted-foreground hover:bg-white/50"
                }`}
              >
                Leaders ({attendeeStats?.going.leaders})
              </button>
              <button
                onClick={() => setAttendeeTab("followers")}
                className={`py-2 text-sm font-medium rounded-md transition-colors ${
                  attendeeTab === "followers" 
                    ? "bg-white shadow text-pink-600" 
                    : "text-muted-foreground hover:bg-white/50"
                }`}
              >
                Followers ({attendeeStats?.going.followers})
              </button>
            </div>

            <div className="overflow-y-auto p-4 space-y-3 flex-1">
              {filteredAttendees.map((attendee) => (
                <div key={attendee.id} className="flex items-center gap-3 p-2 hover:bg-muted/50 rounded-lg transition-colors">
                  <img src={attendee.avatar} alt={attendee.name} className="w-10 h-10 rounded-full bg-slate-200" />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{attendee.name}</p>
                    <p className="text-xs text-muted-foreground">{attendee.role}</p>
                  </div>
                  {attendee.role === "Leader" ? (
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-pink-500" />
                  )}
                </div>
              ))}
              <div className="text-center text-xs text-muted-foreground pt-4">
                Showing {filteredAttendees.length} people
              </div>
            </div>

            <div className="p-4 border-t md:hidden">
               <Button className="w-full" onClick={() => setShowAttendeeList(false)}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}