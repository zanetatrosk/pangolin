import { FC } from "react";
import { NavLink } from "../types";
import { Link } from "@tanstack/react-router";

interface SubMenuLinkProps {
  item: NavLink;
  setOpen: (open: boolean) => void;
}
export const SubMenuLink: FC<SubMenuLinkProps> = ({ item, setOpen }) => {
  const Icon = item.icon;
  return (
    <Link
      className="hover:bg-muted hover:text-accent-foreground flex w-full select-none flex-row gap-4 rounded-md py-3 px-1 leading-none no-underline outline-none transition-colors"
      to={item.href}
      onClick={() => setOpen(false)}
      key={item.href}
    >
      <div className="flex flex-row gap-2 items-start">
      {Icon && <Icon className="size-5 shrink-0 mt-1" />}
      <div className="max-w-md">
        <div className="text-sm font-semibold">{item.label}</div>
        {item.description && (
            <p className="text-muted-foreground text-sm leading-snug">
              {item.description}
            </p>
        )}
        </div>
      </div>
    </Link>
  );
};