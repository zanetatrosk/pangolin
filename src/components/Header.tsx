import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Header() {
  const { t } = useTranslation();
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const MenuItems = [
    { href: "/events", label: t('nav.events') },
    { href: "/about", label: t('nav.about') },
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
      <div className="mx-auto flex max-w-7xl items-center p-2">
        <NavigationMenu>
          <NavigationMenuList className="gap-8">
            <Logo />
            {MenuItems.map((item) => (
              <NavigationMenuItem key={item.href}>
                <Link
                  to={item.href}
                  className="text-md font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="ml-auto flex items-center gap-2">
          <LanguageSwitcher />
          <Button
            variant="ghost"
            onClick={toggleTheme}
            aria-label={t('header.toggleTheme')}
            size="icon-lg"
          >
            {darkMode ? (
              <Sun className="text-muted-foreground" />
            ) : (
              <Moon className="text-muted-foreground" />
            )}
          </Button>
          <Button variant="outline">{t('nav.login')}</Button>
          <Button>{t('nav.signup')}</Button>
        </div>
      </div>
    </header>
  );
}
