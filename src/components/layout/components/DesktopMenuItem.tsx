import { FC } from "react";
import { NavItem } from "../types";
import {
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Link } from "@tanstack/react-router";

const navItemClass = "text-md font-medium text-gray-700";
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
                  <NavigationMenuLink asChild>
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
      className={navigationMenuTriggerStyle() + " " + navItemClass}
    >
      <Link to={href}>{label}</Link>
    </NavigationMenuLink>
  );
};
