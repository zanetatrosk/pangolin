import { FC } from "react";
import { LanguageSwitcher } from "../LanguageSwitcher";
import { Logo } from "../Logo";
import { Button } from "../ui/button";
import { DesktopMenuItem } from "./components/DesktopMenuItem";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
} from "../ui/navigation-menu";
import { useTranslation } from "react-i18next";
import { NavItem } from "./types";
import { ThemeButton } from "./components/ThemeButton";
import { RegisterButtons } from "./components/RegisterButtons";

export const DesktopNavbar: FC<{ menuItems: NavItem[] }> = ({ menuItems }) => {
  const { t } = useTranslation(); 
  
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
         <RegisterButtons  />
      </div>
    </div>
  );
};
