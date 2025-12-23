import { Badge } from "@/components/ui/badge";
import { FC } from "react";

export const getBadgeByStatus = (status: string) => {
  switch (status) {
    case "Scheduled":
      return "bg-green-100 text-green-800";
    case "Cancelled":
      return "bg-red-100 text-red-800";
    case "Completed":
      return "bg-blue-100 text-blue-800";
    case "Joined":
      return "bg-purple-100 text-purple-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}
export const StatusBadges: FC<{status?: string, userStatus?: string, className?: string}> = ({status, userStatus, className}) => {
  return (
    <span className={className}>
    {status && <Badge className={getBadgeByStatus(status)}>{status}</Badge>}
     {userStatus && <Badge className={getBadgeByStatus(userStatus) + " ml-2"}>{userStatus}</Badge>}
    </span>
  )  
};