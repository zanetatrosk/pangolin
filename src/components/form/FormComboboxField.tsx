import * as React from "react";
import { Label } from "@/components/ui/label";
import { AutoComplete } from "@/components/ui/autocomplete";

export interface ComboboxOption {
  value: string;
  label: string;
}

interface FormComboboxFieldProps {
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  options: ComboboxOption[];
  placeholder?: string;
  label?: string;
  required?: boolean;
  error?: string;
  emptyText?: string;
  isLoading?: boolean;
}

export function FormComboboxField({
  value = "",
  onChange,
  onBlur,
  options,
  placeholder = "Search...",
  label,
  required = false,
  error,
  emptyText = "No results found.",
  isLoading = false,
}: FormComboboxFieldProps) {
  const selectedOption = options.find((option) => option.value === value);

  return (
    <div className="space-y-2">
      {label && (
        <Label>
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </Label>
      )}
      <AutoComplete
        value={selectedOption}
        onValueChange={(newValue) => {
          onChange?.(newValue.value);
        }}
        options={options}
        placeholder={placeholder}
        emptyMessage={emptyText}
        isLoading={isLoading}
      />
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
