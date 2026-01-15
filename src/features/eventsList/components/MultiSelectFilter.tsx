import { MultiSelect, MultiSelectTrigger, MultiSelectValue, MultiSelectContent, MultiSelectGroup, MultiSelectItem } from "@/components/ui/multi-select";
import { InputIconAndTitle } from "./InputIconAndTitle";
import { CodebookItem } from "@/services/types";

export const MultiSelectFilter: React.FC<{
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  options: CodebookItem[];
  selectedValues: string[];
  onValuesChange: (values: string[]) => void;
}> = ({ label, icon: Icon, options, selectedValues, onValuesChange }) => (
  <InputIconAndTitle icon={Icon} title={label}>
    <MultiSelect values={selectedValues} onValuesChange={onValuesChange}>
      <MultiSelectTrigger className="w-full h-12 bg-white/70 dark:bg-gray-800/70 backdrop-blur rounded-lg shadow-sm relative z-0 focus:ring-2 focus:ring-rose-600">
        <MultiSelectValue placeholder="Select options..." />
      </MultiSelectTrigger>
      <MultiSelectContent>
        <MultiSelectGroup>
          {options.map((option) => (
            <MultiSelectItem key={option.id} value={option.id}>
              {option.name}
            </MultiSelectItem>
          ))}
        </MultiSelectGroup>
      </MultiSelectContent>
    </MultiSelect>
  </InputIconAndTitle>
);