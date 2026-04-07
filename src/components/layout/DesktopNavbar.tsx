import { FC } from "react";
import { Logo } from "./Logo";
import { DesktopMenuItem } from "./components/DesktopMenuItem";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "../ui/navigation-menu";
import { NavItem, ProfileMenuItem } from "./types";
import { ThemeButton } from "./components/ThemeButton";
import { RegisterButtons } from "./components/RegisterButtons";
import { UserProfileDropdown } from "./components/UserProfileDropdown";
import { useAuth } from "@/features/auth/AuthProvider";

export const DesktopNavbar: FC<{ menuItems: NavItem[], profileMenuItems: ProfileMenuItem[] }> = ({ menuItems, profileMenuItems }) => {
  const { isAuthenticated } = useAuth();
  
  return (
    <div className="hidden lg:flex mx-auto max-w-7xl items-center p-2">
      <Logo />
      <NavigationMenu viewport={false} className="ml-6">
        <NavigationMenuList className="flex-wrap">
          {menuItems.map((menuItem) => (
            <NavigationMenuItem key={menuItem.href}>
              <DesktopMenuItem {...menuItem} />
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>

      <div className="ml-auto flex items-center gap-2">
        <ThemeButton />
        {isAuthenticated ? (
          <UserProfileDropdown profileMenuItems={profileMenuItems} />
        ) : (
          <RegisterButtons />
        )}
      </div>
    </div>
  );
};
