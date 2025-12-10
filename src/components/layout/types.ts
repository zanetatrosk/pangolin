export interface NavItem {
  href?: string;
  label: string;
  children?: NavLink[];
}

export interface NavLink {
  href: string;
  label: string;
  description?: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export interface ProfileMenuItem {
  href?: string;
  label: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  onClick?: () => void;
  variant?: 'default' | 'destructive';
}
