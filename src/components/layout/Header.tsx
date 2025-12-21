import { CalendarPlus, PersonStanding, Users, UserCircle, Settings, LogOut } from "lucide-react";
import { useTranslation } from "react-i18next";
import { MobileNavDrawer } from "./MobileNavDrawer";
import { DesktopNavbar } from "./DesktopNavbar";
import { logout } from "@/stores/authStore";
import { PATHS } from "@/paths";

export function Header() {
  const { t } = useTranslation();

  const menuItems = [
    {
      href: PATHS.EVENTS.LIST,
      label: t("nav.events"),
      children: [
        {
          href: PATHS.EVENTS.LIST,
          label: t("nav.allEvents"),
          description: t("nav.allEventsDesc"),
          icon: Users,
        },
        {
          href: PATHS.EVENTS.NEW_EVENT,
          label: t("nav.addEvent"),
          description: t("nav.addEventDesc"),
          icon: CalendarPlus,
        },

        {
          href: PATHS.MY_EVENTS,
          label: t("nav.myEvents"),
          description: t("nav.myEventsDesc"),
          icon: PersonStanding,
        },
      ],
    },
    { href: PATHS.ABOUT, label: t("nav.about") },
  ];

  const profileMenuItems = [
    {
      href: "/profile",
      label: t("nav.profile"),
      icon: UserCircle,
    },
    {
      href: "/profile/edit",
      label: t("nav.editProfile"),
      icon: Settings,
    },
    {
      label: t("nav.logout"),
      icon: LogOut,
      onClick: logout,
      variant: "destructive" as const,
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background">
      <MobileNavDrawer menuItems={menuItems} profileMenuItems={profileMenuItems} />
      <DesktopNavbar menuItems={menuItems} profileMenuItems={profileMenuItems} />
    </header>
  );
}
