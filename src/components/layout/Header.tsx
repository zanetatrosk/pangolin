import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { CalendarPlus, Moon, PersonStanding, Sun, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Logo } from "../Logo";
import { LanguageSwitcher } from "../LanguageSwitcher";
import { useIsMobile } from "@/hooks/useIsMobile";
import { MobileNavDrawer } from "./MobileNavDrawer";
import { DesktopMenuItem } from "./components/DesktopMenuItem";

export function Header() {
  const { t } = useTranslation();
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const isMobile = useIsMobile();

  const menuItems = [
    {
      href: "/events",
      label: t("nav.events"),
      children: [
        {
          href: "/events",
          label: t("nav.allEvents"),
          description: t("nav.allEventsDesc"),
          icon: Users,
        },
        {
          href: "/events/new",
          label: t("nav.addEvent"),
          description: t("nav.addEventDesc"),
          icon: CalendarPlus,
        },

        {
          href: "/events/my-events",
          label: t("nav.myEvents"),
          description: t("nav.myEventsDesc"),
          icon: PersonStanding,
        },
      ],
    },
    { href: "/about", label: t("nav.about") },
  ];

  useEffect(() => {
    const hasDark = document.documentElement.classList.contains("dark");
    setDarkMode(hasDark);
  }, []);

  const toggleTheme = () => {
    const el = document.documentElement;
    el.classList.toggle("dark");
    setDarkMode(el.classList.contains("dark"));
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-white">
      {isMobile ? (
        <MobileNavDrawer menuItems={menuItems} />
      ) : (
        <div className="mx-auto flex max-w-7xl items-center p-2">
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
            <Button
              variant="ghost"
              onClick={toggleTheme}
              aria-label={t("header.toggleTheme")}
              size="icon-lg"
            >
              {darkMode ? (
                <Sun className="text-muted-foreground" />
              ) : (
                <Moon className="text-muted-foreground" />
              )}
            </Button>
            <Button variant="outline">{t("nav.login")}</Button>
            <Button>{t("nav.signup")}</Button>
          </div>
        </div>
      )}
    </header>
  );
}
