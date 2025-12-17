import { FC } from "react";
import { LanguageSwitcher } from "./LanguageSwitcher";
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
import { useStore } from "@tanstack/react-store";
import { authStore } from "@/stores/authStore";
import { UserProfileDropdown } from "./components/UserProfileDropdown";

export const DesktopNavbar: FC<{ menuItems: NavItem[], profileMenuItems: ProfileMenuItem[] }> = ({ menuItems, profileMenuItems }) => {
  const { isAuthenticated } = useStore(authStore);
  
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
        <LanguageSwitcher />
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
