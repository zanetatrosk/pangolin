import { useInfiniteQuery } from "@tanstack/react-query";
import {
  EventTimeline,
  getUsersEvents,
  userEventFilter,
} from "@/services/users-events-api";
import { useUser } from "@/hooks/useUser";

export const useUserEvents = (
  filter: userEventFilter,
  timeline?: EventTimeline,
  size: number = 5,
) => {
  const { user } = useUser();

  return useInfiniteQuery({
    queryKey: ["user-events", user?.userId, filter, timeline, size],
    queryFn: ({ pageParam }) => {
      if (!user?.userId) {
        throw new Error("User ID is required");
      }
      return getUsersEvents(user.userId, {
        filter,
        timeline,
        page: pageParam,
        size,
      });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length;
      return lastPage.totalPages > nextPage ? nextPage : undefined;
    },
    enabled: !!user?.userId,
  });
};
