import { useIsMobile } from "@/hooks/useIsMobile";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Music3, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

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
        <div className="flex items-center gap-2">
          <div className="relative">
            <span className="inline-flex size-10 items-center justify-center rounded-xl bg-linear-to-br from-purple-500 via-pink-500 to-orange-500 text-white shadow-lg">
              <Music3 className="size-5" />
            </span>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          </div>
          <div>
            <span className="font-bold text-xl bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Connect2Dance
            </span>
            <div className="text-xs text-gray-500 dark:text-gray-400 -mt-1">
              Social Dance Events
            </div>
          </div>
        </div>

        <div className="flex-1 md:flex ml-8 items-center">
          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList className="gap-8">
                <NavigationMenuItem>
                  <NavigationMenuLink href="#events" className="text-lg text-gray-700 dark:text-gray-300">Events</NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink href="#artists" className="text-lg text-gray-700 dark:text-gray-300">Dancers</NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink href="#about" className="text-lg text-gray-700 dark:text-gray-300">About</NavigationMenuLink>
                </NavigationMenuItem>
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
            >
              {darkMode ? (
                <Sun className="text-muted-foreground" />
              ) : (
                <Moon className="text-muted-foreground" />
              )}
            </Button>
          )}
          <Button variant="outline" className="hidden sm:inline-flex">
            Submit Event
          </Button>
          <Button>Login</Button>
        </div>
      </div>
    </header>
  );
}
