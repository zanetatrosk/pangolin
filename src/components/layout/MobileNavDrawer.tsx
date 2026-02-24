import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";
import { Menu } from "lucide-react";
import * as React from "react";
import { Accordion } from "@/components/ui/accordion";
import { LanguageSwitcher } from "./LanguageSwitcher";
import {
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  Drawer,
} from "../ui/drawer";
import { NavItem, ProfileMenuItem } from "./types";
import { MobileMenuItem } from "./components/MobileMenuItem";
import { ThemeButton } from "./components/ThemeButton";
import { RegisterButtons } from "./components/RegisterButtons";
import { MobileProfileMenu } from "./components/MobileProfileMenu";
import { useAuth } from "@/features/auth/AuthProvider";

export function MobileNavDrawer({ menuItems, profileMenuItems }: { menuItems: NavItem[], profileMenuItems: ProfileMenuItem[] }) {
  const [open, setOpen] = React.useState(false);
  const { isAuthenticated } = useAuth();

  return (
    <div className="lg:hidden mx-auto flex items-center justify-between p-2">
      <Logo />
      <Drawer open={open} onOpenChange={setOpen} direction="right">
        <div className="flex items-center justify-end gap-2">
          <>
            <ThemeButton />
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
            <Logo />
          </DrawerHeader>

          <div className="mt-4 flex flex-col gap-4">
            <Accordion
              type="single"
              collapsible
              className="flex w-full flex-col gap-4"
            >
              {menuItems.map((item) => (
                <MobileMenuItem key={item.href || item.label} {...item} setOpen={setOpen} />
              ))}
            </Accordion>

            <div className="h-px bg-border" />
            {isAuthenticated ? (
              <MobileProfileMenu
                profileMenuItems={profileMenuItems}
                onMenuItemClick={() => setOpen(false)}
              />
            ) : (
              <div className="flex flex-col gap-2">
                <RegisterButtons beforeLogInCallback={() => setOpen(false)} />
              </div>
            )}
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
