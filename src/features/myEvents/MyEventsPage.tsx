import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CalendarPlus, Calendar, Users, Heart } from "lucide-react";
import { useTranslation } from "react-i18next";
import { HostingTab } from "./HostingTab";
import { AttendingTab } from "./AttendingTab";
import { useNavigate } from "@tanstack/react-router";
import { PATHS } from "@/paths";

export function MyEventsPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div className="container mx-auto max-w-6xl p-4 md:p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">{t("nav.myEvents")}</h1>
        <Button onClick={() => navigate({to: PATHS.EVENTS.NEW_EVENT})} className="w-full md:w-auto">
          <CalendarPlus className="h-4 w-4 mr-2" />
          Create New Event
        </Button>
      </div>

      <Tabs defaultValue="hosting" className="w-full">
        <TabsList className="grid w-full md:max-w-md grid-cols-3 h-auto">
          <TabsTrigger value="hosting" className="text-xs md:text-sm py-2 md:py-1.5">
            <Users className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
            Hosting
          </TabsTrigger>
          <TabsTrigger value="attending" className="text-xs md:text-sm py-2 md:py-1.5">
            <Calendar className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
            Attending
          </TabsTrigger>
          <TabsTrigger value="interested" className="text-xs md:text-sm py-2 md:py-1.5">
            <Heart className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
            Interested
          </TabsTrigger>
        </TabsList>
        <HostingTab />
        <AttendingTab />
        <TabsContent value="interested" className="mt-6">
          <div className="flex flex-col items-center justify-center min-h-[300px] border rounded-lg border-dashed p-8 text-center animate-in fade-in-50">
            <Heart className="h-10 w-10 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold">Interested Events</h3>
            <p className="text-sm text-muted-foreground mt-2 max-w-sm">
              Events you mark as interested will appear here.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
