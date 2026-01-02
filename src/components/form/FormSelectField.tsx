import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useFieldContext } from "@/lib/form-context";

export interface SelectOption {
  value: string;
  label: string;
}

export interface FormSelectFieldProps<T = SelectOption> {
  label: string;
  placeholder?: string;
  required?: boolean;
  options: T[];
  getValue?: (item: T) => string;
  getLabel?: (item: T) => string;
  onValueChange?: (value: string) => void;
}

export const FormSelectField = <T = SelectOption>({
  label,
  placeholder = "Select an option",
  required = false,
  options,
  getValue = (item) => (item as SelectOption).value,
  getLabel = (item) => (item as SelectOption).label,
  onValueChange,
}: FormSelectFieldProps<T>) => {
  const field = useFieldContext<string>();
  const errors = field.state.meta.errors || [];
  const hasError = errors.length > 0;
  const id = field.name;

  const handleChange = (value: string) => {
    field.handleChange(value);
    onValueChange?.(value);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="flex items-center gap-1">
        {label}
        {required && <span className="text-destructive">*</span>}
      </Label>
      <Select value={field.state.value} onValueChange={handleChange}>
        <SelectTrigger
          id={id}
          className={`w-full ${hasError ? "border-destructive" : ""}`}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option, index) => {
            const value = getValue(option);
            const label = getLabel(option);
            return (
              <SelectItem key={value || index} value={value}>
                {label}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
      {hasError && <p className="text-sm text-destructive">{errors[0]}</p>}
    </div>
  );
};
