import { useQuery } from "@tanstack/react-query";
import { getUsersEvents, userEventFilter } from "@/services/users-events-api";
import { useUser } from "@/hooks/useUser";

export const useUserEvents = (filter: userEventFilter) => {
  const { user } = useUser();

  return useQuery({
    queryKey: ["user-events", user?.userId, filter],
    queryFn: () => {
      if (!user?.userId) {
        throw new Error("User ID is required");
      }
      return getUsersEvents(user.userId, filter);
    },
    enabled: !!user?.userId,
  });
};
