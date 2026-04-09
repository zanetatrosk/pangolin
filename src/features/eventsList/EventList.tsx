import { FC } from "react";
import { EventCard } from "./components/EventCard";
import { getAllEvents } from "@/services/events-api";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Loading } from "@/components/ui/loading";
import { SearchProps } from "@/routes/events.index";
import { useTranslation } from "react-i18next";

export const EventList: FC<{ searchParams: SearchProps | undefined }> = ({ searchParams }) => {
  const { t } = useTranslation();
  const { data, error, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["events", searchParams],
    queryFn: ({ pageParam }) => getAllEvents(pageParam, searchParams),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length;
      return lastPage.totalPages > nextPage ? nextPage : undefined;
    },
  });

  if (error) {
    return <div>{t("eventsList.errorLoading")}</div>;
  }

  if (isLoading || !data) {
    return <Loading/>;
  }

  return (
    <div className="space-y-4 p-4 md:p-6">
      <div className="space-y-4">
        {data.pages.map((page) => 
          page.content.map((event) => (
            <EventCard key={event.id} {...event} />
          ))
        )}
      </div>
      {hasNextPage && (
        <div className="flex justify-center mt-4 space-x-2">
          <Button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? t("common.loading") : t("eventsList.showMore")}
          </Button>
        </div>
      )}
    </div>
  );
};
