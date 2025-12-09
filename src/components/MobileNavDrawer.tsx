import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Link } from "@tanstack/react-router";
import { Menu, Moon, Sun } from "lucide-react";
import * as React from "react";
import { useTranslation } from "react-i18next";

type MenuItem = { href: string; label: string };

export function MobileNavDrawer({ menuItems }: { menuItems: MenuItem[] }) {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const [darkMode, setDarkMode] = React.useState<boolean>(false);

  React.useEffect(() => {
    const hasDark = document.documentElement.classList.contains("dark");
    setDarkMode(hasDark);
  }, []);

  const toggleTheme = () => {
    const el = document.documentElement;
    el.classList.toggle("dark");
    setDarkMode(el.classList.contains("dark"));
  };

  return (
    <div className="mx-auto flex items-center p-2">
      <Logo />
      <Drawer open={open} onOpenChange={setOpen} direction="right">
        <DrawerTrigger asChild>
          <Button
            className="ml-auto"
            variant="outline"
            aria-label="Menu"
            size="icon-lg"
          >
            <Menu className="text-muted-foreground" />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="w-screen h-screen p-4">
          <DrawerHeader>
            <DrawerTitle>Menu</DrawerTitle>
          </DrawerHeader>

          <div className="mt-4 flex flex-col gap-4">
            <nav className="flex flex-col gap-2">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="text-md font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="h-px bg-border" />

            <div className="flex items-center justify-between">
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
            </div>

            <div className="flex flex-col gap-2">
              <Button variant="outline" onClick={() => setOpen(false)}>
                {t("nav.login")}
              </Button>
              <Button onClick={() => setOpen(false)}>{t("nav.signup")}</Button>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
