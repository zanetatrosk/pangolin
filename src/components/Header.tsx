import { useIsMobile } from "@/hooks/useIsMobile";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem, NavigationMenuLink
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";

const MenuItems = [
  { href: "#events", label: "Events" },
  { href: "#artists", label: "Dancers" },
  { href: "#about", label: "About" },
];

export function Header() {
  const isMobile = useIsMobile();
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const hasDark = document.documentElement.classList.contains("dark");
    setDarkMode(hasDark);
  }, []);

  const toggleTheme = () => {
    const el = document.documentElement;
    el.classList.toggle("dark");
    setDarkMode(el.classList.contains("dark"));
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 backdrop-blur supports-backdrop-filter:bg-background/70">
      <div className="mx-auto flex h-14 max-w-7xl items-center px-4">
        <Logo />
        <div className="flex-1 md:flex ml-8 items-center">
          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList className="gap-8">
                {MenuItems.map((item) => (
                  <NavigationMenuItem key={item.href}>
                    <NavigationMenuLink
                      href={item.href}
                      className="text-md font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                    >
                      {item.label}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>

        <div className="ml-auto flex items-center gap-2">
          {!isMobile && (
            <Button
              variant="ghost"
              className="hidden md:inline-flex"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              size="icon-lg"
            >
              {darkMode ? (
                <Sun className="text-muted-foreground" />
              ) : (
                <Moon className="text-muted-foreground" />
              )}
            </Button>
          )}
          <Button variant="outline" className="hidden sm:inline-flex" >
            Submit Event
          </Button>
          <Button>Login</Button>
        </div>
      </div>
    </header>
  );
}
