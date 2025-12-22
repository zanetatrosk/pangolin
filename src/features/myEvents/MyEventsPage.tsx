import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarPlus, Calendar, Users } from "lucide-react";
import { useTranslation } from "react-i18next";
import { HostingTab } from "./HostingTab";
import { AttendingTab } from "./AttendingTab";
import { useNavigate } from "@tanstack/react-router";
import { PATHS } from "@/paths";

export function MyEventsPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div className="container mx-auto max-w-6xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">{t("nav.myEvents")}</h1>
        <Button onClick={() => navigate({to: PATHS.EVENTS.NEW_EVENT})}>
          <CalendarPlus className="h-4 w-4 mr-2" />
          Create New Event
        </Button>
      </div>

      <Tabs defaultValue="hosting" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="hosting">
            <Users className="h-4 w-4 mr-2" />
            Hosting
          </TabsTrigger>
          <TabsTrigger value="attending">
            <Calendar className="h-4 w-4 mr-2" />
            Attending
          </TabsTrigger>
        </TabsList>
        <HostingTab />
        <AttendingTab />
      </Tabs>
    </div>
  );
}
