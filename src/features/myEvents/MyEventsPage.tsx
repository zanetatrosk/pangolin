import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarPlus, Calendar, Users } from "lucide-react";
import { useTranslation } from "react-i18next";

export function MyEventsPage() {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto max-w-6xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">{t("nav.myEvents")}</h1>
        <Button>
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

        <TabsContent value="hosting" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Events You're Hosting</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  No hosted events yet
                </h3>
                <p className="text-muted-foreground mb-4">
                  Create your first event and start building your dance
                  community!
                </p>
                <Button>
                  <CalendarPlus className="h-4 w-4 mr-2" />
                  Create Event
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attending" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Events You're Attending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  No registered events
                </h3>
                <p className="text-muted-foreground mb-4">
                  Browse events and register to join the fun!
                </p>
                <Button variant="outline">Browse Events</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
