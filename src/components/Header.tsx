import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuContent,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useIsMobile } from "@/hooks/useIsMobile";
import { MobileNavDrawer } from "./MobileNavDrawer";
import { ListItem } from "./ListItem";

export function Header() {
  const { t } = useTranslation();
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const isMobile = useIsMobile();
  const navItemClass = "text-md font-medium text-gray-700";

  const menuItems = [
    {
      href: "/events",
      label: t("nav.events"),
      subItems: [
        {
          href: "/events",
          label: t("nav.allEvents"),
          description: t("nav.allEventsDesc"),
        },
        {
          href: "/events/new",
          label: t("nav.addEvent"),
          description: t("nav.addEventDesc"),
        },

        {
          href: "/events/my-events",
          label: t("nav.myEvents"),
          description: t("nav.myEventsDesc"),
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
    <header className="sticky top-0 z-50 w-full border-b border-border/60 backdrop-blur supports-backdrop-filter:bg-background/70">
      {isMobile ? (
        <MobileNavDrawer menuItems={menuItems} />
      ) : (
        <div className="mx-auto flex max-w-7xl items-center p-2">
          <Logo />
          <NavigationMenu viewport={false} className="ml-6">
            <NavigationMenuList className="flex-wrap">
              {menuItems.map((menuItem) => (
               <NavigationMenuItem key={menuItem.href}>
                  {!menuItem.subItems ? (
                    
                      <NavigationMenuLink
                        asChild
                        className={
                          navigationMenuTriggerStyle() + " " + navItemClass
                        }
                      >
                        <Link to={menuItem.href}>{menuItem.label}</Link>
                      </NavigationMenuLink>
                  ) : (
                    <>
                      <NavigationMenuTrigger className={navItemClass}>
                        {menuItem.label}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[300px] gap-4">
                          <li>
                            {menuItem.subItems.map((subItem) => (
                              <NavigationMenuLink asChild>
                                <Link to={subItem.href}>
                                  <div className="font-medium">
                                    {subItem.label}
                                  </div>
                                  <div className="text-muted-foreground">
                                    {subItem.description}
                                  </div>
                                </Link>
                              </NavigationMenuLink>
                            ))}
                          </li>
                        </ul>
                      </NavigationMenuContent>
                    </>
                  )}
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
