import { CalendarPlus, Heart } from "lucide-react";
import { FC } from "react";
import { EventCardType, MyEventCard } from "./components/MyEventCard";
import { NoEvents } from "./components/NoEvents";
import { TabCard } from "./components/TabCard";
import { useUserEvents } from "./hooks/useUserEvents";
import { EventTimeline, userEventFilter } from "@/services/users-events-api";
import { useTranslation } from "react-i18next";
import { useNavigate } from "@tanstack/react-router";
import { PATHS } from "@/paths";
import { Button } from "@/components/ui/button";

export const InterestedTab: FC<{ timeline?: EventTimeline }> = ({ timeline }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useUserEvents(userEventFilter.INTERESTED, timeline);

  const events = data?.pages.flatMap((page) => page.content) ?? [];

  return (
    <TabCard
      value="interested"
      noItemComponent={
        <NoEvents
          title={t("myEvents.noEvents.interested.title")}
          description={t("myEvents.noEvents.interested.description")}
          buttonText={t("myEvents.noEvents.interested.buttonText")}
          icon={
            <Heart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          }
          buttonIcon={<CalendarPlus className="h-4 w-4 mr-2" />}
          onButtonClick={() =>
            navigate({
              to: PATHS.EVENTS.LIST,
              search: {},
            })
          }
        />
      }
      numberOfItems={isLoading ? undefined : events.length}
    >
      {error ? (
        <div>{t("common.error")}</div>
      ) : isLoading && events.length === 0 ? (
        <div>{t("common.loading")}</div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6">
            {events.map((event) => (
              <MyEventCard
                key={event.id}
                event={event}
                cardType={EventCardType.INTERESTED}
              />
            ))}
          </div>
          {hasNextPage && (
            <div className="flex justify-center mt-4">
              <Button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
                {isFetchingNextPage ? t("common.loading") : t("eventsList.showMore")}
              </Button>
            </div>
          )}
        </>
      )}
    </TabCard>
  );
};
