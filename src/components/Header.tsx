import { useIsMobile } from '@/hooks/useIsMobile'
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu'
import { Button } from '@/components/ui/button'
import { Music3, Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'

export function Header() {
  const isMobile = useIsMobile()
  const [darkMode, setDarkMode] = useState<boolean>(false)

  useEffect(() => {
    const hasDark = document.documentElement.classList.contains('dark')
    setDarkMode(hasDark)
  }, [])

  const toggleTheme = () => {
    const el = document.documentElement
    el.classList.toggle('dark')
    setDarkMode(el.classList.contains('dark'))
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 backdrop-blur supports-backdrop-filter:bg-background/70">
      <div className="mx-auto flex h-14 max-w-7xl items-center px-4">
        <div className="flex items-center gap-2">
          <span className="inline-flex size-8 items-center justify-center rounded-md bg-linear-to-br from-rose-500 to-violet-950 text-white shadow-sm">
            <Music3 className="size-4" />
          </span>
          <span className="font-semibold tracking-tight">Connect2Dance</span>
        </div>

        <div className="mx-6 hidden flex-1 md:block">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink href="#" className="">
                  Home
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Events</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[500px] grid-cols-2 gap-2">
                    <NavigationMenuLink href="#" className="">
                      Salsa Nights
                    </NavigationMenuLink>
                    <NavigationMenuLink href="#" className="">
                      Bachata Social
                    </NavigationMenuLink>
                    <NavigationMenuLink href="#" className="">
                      Kizomba Weekender
                    </NavigationMenuLink>
                    <NavigationMenuLink href="#" className="">
                      Tango Milonga
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="#artists">Artists</NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="#tickets">Tickets</NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="#about">About</NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="ml-auto flex items-center gap-2">
          {!isMobile && (
            <Button variant="ghost" className="hidden md:inline-flex" onClick={toggleTheme} aria-label="Toggle theme">
              {darkMode ? <Sun className="text-muted-foreground" /> : <Moon className="text-muted-foreground" />}
            </Button>
          )}
          <Button variant="outline" className="hidden sm:inline-flex">Submit Event</Button>
          <Button>Login</Button>
        </div>
      </div>
    </header>
  )
}

