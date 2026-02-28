import { CalendarPlus, PersonStanding, Users, UserCircle, LogOut } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useRouterState, useNavigate } from "@tanstack/react-router";
import { MobileNavDrawer } from "./MobileNavDrawer";
import { DesktopNavbar } from "./DesktopNavbar";
import { NavigationWrapper } from "./NavigationWrapper";
import { PATHS } from "@/paths";

export function Header() {
  const { t } = useTranslation();
  const routerState = useRouterState();
  const navigate = useNavigate();
  const withoutContent = routerState.matches.some((match) => match.pathname === PATHS.LOGIN);

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
      href: PATHS.PROFILE.MINE,
      label: t("nav.profile"),
      icon: UserCircle,
    },
    {
      label: t("nav.logout"),
      icon: LogOut,
      onClick: () => navigate({ to: PATHS.LOGOUT }),
      variant: "destructive" as const,
    },
  ];

  return (
    <NavigationWrapper withoutContent={withoutContent}>
      <MobileNavDrawer menuItems={menuItems} profileMenuItems={profileMenuItems} />
      <DesktopNavbar menuItems={menuItems} profileMenuItems={profileMenuItems} />
    </NavigationWrapper>
  );
}
