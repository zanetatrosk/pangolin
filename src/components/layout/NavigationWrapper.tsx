import { Logo } from "./Logo";

interface NavigationWrapperProps {
  children?: React.ReactNode;
  withoutContent?: boolean;
}

export function NavigationWrapper({ children, withoutContent }: NavigationWrapperProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background">
      {withoutContent ? (
        <div className="mx-auto max-w-7xl flex items-center p-2">
          <Logo />
        </div>
      ) : (
        children
      )}
    </header>
  );
}
