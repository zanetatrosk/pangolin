import { FC } from "react";
import { NavItem } from "../types";
import { SubMenuLink } from "./SubMenuLink";
import { Link } from "@tanstack/react-router";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface MobileMenuItemProps extends NavItem {
    setOpen: (open: boolean) => void;
}
export const MobileMenuItem: FC<MobileMenuItemProps> = ({ label, href, children, setOpen }) => {
    
    if (children) {
      return (
        <AccordionItem
          key={label}
          value={label}
          className="border-b-0"
        >
          <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">{label}</AccordionTrigger>
          <AccordionContent className="mt-2">
            {children.map((subItem) => (
              <SubMenuLink key={subItem.label} item={subItem} setOpen={setOpen}/>
            ))}
          </AccordionContent>
        </AccordionItem>
      );
    }

    return (
      <Link
        key={href}
        to={href}
        className="text-md font-semibold"
        onClick={() => setOpen(false)}
      >
        {label}
      </Link>
    );
}