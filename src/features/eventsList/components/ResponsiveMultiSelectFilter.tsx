import { LucideIcon } from "lucide-react";
import { useIsMobile } from "@/hooks/useIsMobile";
import { MultiSelectFilter } from "./MultiSelectFilter";
import { MobileMultiSelectFilter } from "./MobileMultiSelectFilter";
import { CodebookItem } from "@/services/types";



type ResponsiveMultiSelectFilterProps = {
  label: string;
  icon: LucideIcon;
  options: CodebookItem[];
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