import { FC } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ProfileMenuItem } from "../types";
import { getInitials } from "../utils/getInitials";
import { useProfileMenu } from "../hooks/useProfileMenu";
import { useAuth } from "@/features/auth/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { getUserById } from "@/services/user-api";

interface UserProfileDropdownProps {
  profileMenuItems: ProfileMenuItem[];
}

export const UserProfileDropdown: FC<UserProfileDropdownProps> = ({
  profileMenuItems,
}) => {
  const { user } = useAuth();
  const { handleMenuItemClick } = useProfileMenu();
  const { data } = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: () => getUserById(user?.id!),
    enabled: !!user?.id,
  })

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="relative rounded-full transition-normal hover:ring-2 hover:ring-ring hover:ring-offset-2 mx-1">
          <Avatar>
            <AvatarImage src={data?.avatar?.url} alt={data?.avatar?.url} className="object-cover"/>
            <AvatarFallback>{getInitials(data?.firstName + " " + data?.lastName)}</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{data?.firstName + " " + data?.lastName}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {profileMenuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <DropdownMenuItem
              key={index}
              onClick={() => handleMenuItemClick(item)}
              className={
                item.variant === "destructive"
                  ? "text-destructive focus:text-destructive"
                  : ""
              }
            >
              {Icon && <Icon className="mr-2 h-4 w-4" />}
              <span>{item.label}</span>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
