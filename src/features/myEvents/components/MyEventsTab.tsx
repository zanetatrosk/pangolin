import { Button } from "@/components/ui/button";
import { EventTimeline, userEventFilter } from "@/services/users-events-api";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { EventCardType, MyEventCard } from "./MyEventCard";
import { TabCard } from "./TabCard";
import { useUserEvents } from "../hooks/useUserEvents";
import { Spinner } from "@/components/ui/spinner";
import { Loading } from "@/components/ui/loading";

type MyEventsTabProps = {
  value: string;
  filter: userEventFilter;
  cardType: EventCardType;
  timeline?: EventTimeline;
  noItemComponent: React.ReactNode;
};

export const MyEventsTab: FC<MyEventsTabProps> = ({
  value,
  filter,
  cardType,
  timeline,
  noItemComponent,
}) => {
  const { t } = useTranslation();

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useUserEvents(filter, timeline);

  const events = data?.pages.flatMap((page) => page.content) ?? [];
  const numberOfItems = error
    ? undefined
    : isLoading
      ? undefined
      : events.length;

  return (
    <TabCard
      value={value}
      noItemComponent={noItemComponent}
      numberOfItems={numberOfItems}
    >
      {error ? (
        <div>{t("common.error")}</div>
      ) : isLoading && events.length === 0 ? (
        <Loading />
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6">
            {events.map((event) => (
              <MyEventCard key={event.id} event={event} cardType={cardType} />
            ))}
          </div>
          {hasNextPage && (
            <div className="flex justify-center mt-4">
              <Button
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
              >
                {isFetchingNextPage
                  ? t("common.loading")
                  : t("eventsList.showMore")}
              </Button>
            </div>
          )}
        </>
      )}
    </TabCard>
  );
};
