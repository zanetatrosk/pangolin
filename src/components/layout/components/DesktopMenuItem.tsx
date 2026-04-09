import { FC } from "react";
import { NavItem } from "../types";
import {
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuTrigger
} from "@/components/ui/navigation-menu";
import { Link } from "@tanstack/react-router";

const navItemClass = "text-md font-medium text-gray-700 hover:text-gray-900 dark:text-gray-200 dark:hover:text-white";
export const DesktopMenuItem: FC<NavItem> = ({ label, href, children }) => {

  if (children) {
    return (
      <>
        <NavigationMenuTrigger className={navItemClass}>
          {label}
        </NavigationMenuTrigger>
        <NavigationMenuContent>
          {children && (
            <ul className="grid w-[300px] gap-4">
              <li>
                {children.map((subItem) => (
                  <NavigationMenuLink asChild key={subItem.href}>
                    <Link to={subItem.href}>
                      <div className="font-medium">{subItem.label}</div>
                      <div className="text-muted-foreground">
                        {subItem.description}
                      </div>
                    </Link>
                  </NavigationMenuLink>
                ))}
              </li>
            </ul>
          )}
        </NavigationMenuContent>
      </>
    );
  }

  return (
    <NavigationMenuLink
      asChild
      className={navItemClass}
    >
      <Link to={href}>{label}</Link>
    </NavigationMenuLink>
  );
};
