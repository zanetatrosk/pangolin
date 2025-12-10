import { Button } from "@/components/ui/button";
import { Logo } from "../Logo";
import { Menu, Moon, Sun } from "lucide-react";
import * as React from "react";
import { useTranslation } from "react-i18next";
import {
  Accordion
} from "@/components/ui/accordion";
import { LanguageSwitcher } from "../LanguageSwitcher";
import {
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  Drawer,
} from "../ui/drawer";
import { NavItem } from "./types";
import { MobileMenuItem } from "./components/MobileMenuItem";

export function MobileNavDrawer({ menuItems }: { menuItems: NavItem[] }) {
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
    <div className="mx-auto flex items-center justify-between p-2">
      <Logo />
      <Drawer open={open} onOpenChange={setOpen} direction="right">
        <div className="flex items-center justify-end gap-2">
          <>
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
          </>
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
        </div>
        <DrawerContent className="p-4">
          <DrawerHeader>
            <DrawerTitle>Menu</DrawerTitle>
          </DrawerHeader>

          <div className="mt-4 flex flex-col gap-4">
            <Accordion
              type="single"
              collapsible
              className="flex w-full flex-col gap-4"
            >
              {menuItems.map((item) => (
                <MobileMenuItem {...item} setOpen={setOpen} />
              ))}
            </Accordion>

            <div className="h-px bg-border" />
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
