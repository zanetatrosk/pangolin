import { Label } from "@/components/ui/label";
import {
  MultiSelect,
  MultiSelectTrigger,
  MultiSelectValue,
  MultiSelectContent,
  MultiSelectGroup,
  MultiSelectItem,
} from "@/components/ui/multi-select";
import { useFieldContext } from "@/lib/form-context";

export interface MultiSelectOption {
  value: string;
  label: string;
}

export interface FormMultiSelectFieldProps {
  label: string;
  placeholder?: string;
  required?: boolean;
  options: MultiSelectOption[];
}

export const FormMultiSelectField = ({
  label,
  placeholder = "Select options...",
  required = false,
  options,
}: FormMultiSelectFieldProps) => {
  const field = useFieldContext<string[]>();
  const errors = field.state.meta.errors || [];
  const hasError = errors.length > 0;
  const id = field.name;

  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="flex items-center gap-1">
        {label}
        {required && <span className="text-destructive">*</span>}
      </Label>
      <MultiSelect
        values={field.state.value}
        onValuesChange={(values) => field.handleChange(values)}
      >
        <MultiSelectTrigger
          id={id}
          className={`w-full ${hasError ? "border-destructive" : ""}`}
        >
          <MultiSelectValue placeholder={placeholder} />
        </MultiSelectTrigger>
        <MultiSelectContent>
          <MultiSelectGroup>
            {options.map((option) => (
              <MultiSelectItem key={option.value} value={option.value}>
                {option.label}
              </MultiSelectItem>
            ))}
          </MultiSelectGroup>
        </MultiSelectContent>
      </MultiSelect>
      {hasError && (
        <p className="text-sm text-destructive">{errors[0]}</p>
      )}
    </div>
  );
};
