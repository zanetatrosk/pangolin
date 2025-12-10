import { FC } from "react";
import { useAuthStore } from "@/stores/authStore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ProfileMenuItem } from "../types";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { getInitials } from "../utils/getInitials";
import { useProfileMenu } from "../hooks/useProfileMenu";

interface MobileProfileMenuProps {
  profileMenuItems: ProfileMenuItem[];
  onMenuItemClick?: () => void;
}

export const MobileProfileMenu: FC<MobileProfileMenuProps> = ({
  profileMenuItems,
  onMenuItemClick,
}) => {
  const { user } = useAuthStore();
  const { handleMenuItemClick } = useProfileMenu();

  if (!user) return null;

  const handleItemClick = (item: ProfileMenuItem) => {
    onMenuItemClick?.();
    handleMenuItemClick(item);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3 px-2">
        <Avatar className="h-12 w-12">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <p className="text-sm font-medium">{user.name}</p>
          <p className="text-xs text-muted-foreground">{user.email}</p>
        </div>
      </div>
      <Separator />
      <div className="flex flex-col gap-2">
        {profileMenuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <Button
              key={index}
              variant={item.variant === "destructive" ? "destructive" : "ghost"}
              className="justify-start"
              onClick={() => handleItemClick(item)}
            >
              {Icon && <Icon className="mr-2 h-4 w-4" />}
              <span>{item.label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};
