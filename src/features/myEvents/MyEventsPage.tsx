import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarPlus, Calendar, Users, Heart } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "@tanstack/react-router";
import { PATHS } from "@/paths";
import { EventTimeline } from "@/services/users-events-api";
import { userEventFilter } from "@/services/users-events-api";
import { NoEvents } from "./components/NoEvents";
import { EventCardType } from "./components/MyEventCard";
import { MyEventsTab } from "./components/MyEventsTab";

export function MyEventsPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [timeline, setTimeline] = useState<EventTimeline>(EventTimeline.UPCOMING);

  const tabs = [
    {
      value: "hosting",
      icon: Users,
      label: t("myEvents.tabs.hosting"),
      filter: userEventFilter.HOSTING,
      cardType: EventCardType.HOSTING,
      noItemComponent: (
        <NoEvents
          title={t("myEvents.noEvents.hosting.title")}
          description={t("myEvents.noEvents.hosting.description")}
          buttonText={t("myEvents.noEvents.hosting.buttonText")}
          icon={<Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />}
          buttonIcon={<CalendarPlus className="h-4 w-4 mr-2" />}
          onButtonClick={() => navigate({ to: PATHS.EVENTS.NEW_EVENT })}
        />
      ),
    },
    {
      value: "attending",
      icon: Calendar,
      label: t("myEvents.tabs.attending"),
      filter: userEventFilter.GOING,
      cardType: EventCardType.GOING,
      noItemComponent: (
        <NoEvents
          title={t("myEvents.noEvents.attending.title")}
          description={t("myEvents.noEvents.attending.description")}
          buttonText={t("myEvents.noEvents.attending.buttonText")}
          buttonVariant="outline"
          icon={<Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />}
          onButtonClick={() => navigate({ to: PATHS.EVENTS.LIST, search: {} })}
        />
      ),
    },
    {
      value: "interested",
      icon: Heart,
      label: t("myEvents.tabs.interested"),
      filter: userEventFilter.INTERESTED,
      cardType: EventCardType.INTERESTED,
      noItemComponent: (
        <NoEvents
          title={t("myEvents.noEvents.interested.title")}
          description={t("myEvents.noEvents.interested.description")}
          buttonText={t("myEvents.noEvents.interested.buttonText")}
          icon={<Heart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />}
          buttonIcon={<CalendarPlus className="h-4 w-4 mr-2" />}
          onButtonClick={() => navigate({ to: PATHS.EVENTS.LIST, search: {} })}
        />
      ),
    },
  ] as const;

  return (
    <div className="container mx-auto max-w-6xl p-4 md:p-6 mb-12">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">{t("nav.myEvents")}</h1>
        <Button onClick={() => navigate({to: PATHS.EVENTS.NEW_EVENT})} className="w-full md:w-auto">
          <CalendarPlus className="h-4 w-4 mr-2" />
          {t("myEvents.createNewEvent")}
        </Button>
      </div>

      <Tabs defaultValue="hosting" className="w-full">
        <TabsList className="grid w-full md:max-w-md grid-cols-3 h-auto">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="text-xs md:text-sm py-2 md:py-1.5"
            >
              <tab.icon className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="mt-3">
          <Tabs
            value={timeline}
            onValueChange={(value) => setTimeline(value as EventTimeline)}
            className="w-full"
          >
            <TabsList className="grid w-full md:w-[260px] grid-cols-2">
              <TabsTrigger value={EventTimeline.UPCOMING}>
                {t("myEvents.timeline.upcoming")}
              </TabsTrigger>
              <TabsTrigger value={EventTimeline.PAST}>
                {t("myEvents.timeline.past")}
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {tabs.map((tab) => (
          <MyEventsTab
            key={tab.value}
            value={tab.value}
            filter={tab.filter}
            cardType={tab.cardType}
            timeline={timeline}
            noItemComponent={tab.noItemComponent}
          />
        ))}
      </Tabs>
    </div>
  );
}
