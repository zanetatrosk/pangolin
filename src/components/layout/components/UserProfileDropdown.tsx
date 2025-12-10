import { FC } from "react";
import { useAuthStore } from "@/stores/authStore";
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

interface UserProfileDropdownProps {
  profileMenuItems: ProfileMenuItem[];
}

export const UserProfileDropdown: FC<UserProfileDropdownProps> = ({
  profileMenuItems,
}) => {
  const { user } = useAuthStore();
  const { handleMenuItemClick } = useProfileMenu();

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="relative h-10 w-10 rounded-full overflow-hidden ring-offset-background transition-all hover:ring-2 hover:ring-ring hover:ring-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
          <Avatar>
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
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
