import { Label } from "@/components/ui/label";
import { AutoComplete } from "@/components/ui/autocomplete";
import { useFieldContext } from "@/lib/form-context";

export interface ComboboxOption {
  value: string;
  label: string;
}

interface FormComboboxFieldProps {
  value?: string;
  onChange?: (value: ComboboxOption | undefined) => void;
  onBlur?: () => void;
  onSearchChange?: (search: string) => void;
  options: ComboboxOption[];
  placeholder?: string;
  label?: string;
  required?: boolean;
  error?: string;
  emptyText?: string;
  isLoading?: boolean;
  isSuccess?: boolean;
  searchValue?: string;
}

export function FormComboboxField({
  value = "",
  onChange,
  isSuccess = false,
  onSearchChange,
  options,
  placeholder = "Search...",
  label,
  required = false,
  error,
  emptyText = "No results found.",
  searchValue,
  isLoading = false,
}: FormComboboxFieldProps) {
  const selectedOption = options.find((option) => option.value === value);
  const field = useFieldContext<string>();
  const id = field.name;

  const handleSearchChange = (search: string) => {
    onSearchChange?.(search);
  };

  return (
    <div className="space-y-2">
      {label && (
        <Label htmlFor={id} className="flex items-center gap-1">
          {label}
          {required && <span className="text-destructive">*</span>}
        </Label>
      )}
      <AutoComplete
        value={field.state.value ? selectedOption : undefined}
        onValueChange={(newValue) => {
          onChange?.(newValue);
        }}
        onSearchChange={handleSearchChange}
        options={options}
        placeholder={placeholder}
        emptyMessage={emptyText}
        isLoading={isLoading}
        isSuccess={isSuccess}
        searchValue={searchValue}

      />
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
