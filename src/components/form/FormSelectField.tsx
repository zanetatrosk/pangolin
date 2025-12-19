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

export interface FormSelectFieldProps {
  label: string;
  placeholder?: string;
  required?: boolean;
  options: SelectOption[];
  onValueChange?: (value: string) => void;
}

export const FormSelectField = ({
  label,
  placeholder = "Select an option",
  required = false,
  options,
  onValueChange,
}: FormSelectFieldProps) => {
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
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {hasError && <p className="text-sm text-destructive">{errors[0]}</p>}
    </div>
  );
};
