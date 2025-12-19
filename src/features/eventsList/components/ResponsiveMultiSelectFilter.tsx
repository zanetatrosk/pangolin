import { LucideIcon } from "lucide-react";
import { useIsMobile } from "@/hooks/useIsMobile";
import { MultiSelectFilter } from "./MultiSelectFilter";
import { MobileMultiSelectFilter } from "./MobileMultiSelectFilter";

type Option = {
  value: string;
  label: string;
};

type ResponsiveMultiSelectFilterProps = {
  label: string;
  icon: LucideIcon;
  options: Option[];
  selectedValues: string[];
  onValuesChange: (values: string[]) => void;
};

export function ResponsiveMultiSelectFilter(
  props: ResponsiveMultiSelectFilterProps
) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <MobileMultiSelectFilter {...props} />;
  }

  return <MultiSelectFilter {...props} />;
}