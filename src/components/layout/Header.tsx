import { CalendarPlus, PersonStanding, Users, UserCircle, Settings, LogOut } from "lucide-react";
import { useTranslation } from "react-i18next";
import { MobileNavDrawer } from "./MobileNavDrawer";
import { DesktopNavbar } from "./DesktopNavbar";
import { logout } from "@/stores/authStore";

export function Header() {
  const { t } = useTranslation();

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
