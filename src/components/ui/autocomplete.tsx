import {
  CommandGroup,
  CommandItem,
  CommandList,
  CommandInput,
} from "./command";
import { Command as CommandPrimitive } from "cmdk";
import { useState, useRef, type KeyboardEvent } from "react";

import { Skeleton } from "./skeleton";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { ComboboxOption } from "../form/FormComboboxField";
import { Input } from "./input";

type AutoCompleteProps<T> = {
  options: T[];
  emptyMessage: string;
  value?: T;
  searchValue?: string;
  onValueChange?: (value: T) => void;
  onSearchChange?: (value: string) => void;
  isLoading?: boolean;
  isSuccess?: boolean;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  getValue?: (option: T) => string;
  getLabel?: (option: T) => string;
};

export const AutoComplete = <T,>({
  options,
  placeholder,
  emptyMessage,
  value,
  onValueChange,
  onSearchChange,
  searchValue,
  disabled,
  isSuccess = false,
  isLoading = false,
  className,
  getValue,
  getLabel,
}: AutoCompleteProps<T>) => {
  const [isOpen, setOpen] = useState(false);
  const [selected, setSelected] = useState<T | undefined>(value);

  // Default getter functions for ComboboxOption compatibility
  const getOptionValue = (option: T): string => {
    if (getValue) return getValue(option);
    if (typeof option === 'object' && option !== null && 'value' in option) {
      return String((option as any).value);
    }
    return String(option);
  };

  const getOptionLabel = (option: T): string => {
    if (getLabel) return getLabel(option);
    if (typeof option === 'object' && option !== null && 'label' in option) {
      return String((option as any).label);
    }
    return String(option);
  };


  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const input = searchValue;
    if (!input) {
      return;
    }

    // Keep the options displayed when the user is typing
    if (!isOpen) {
      setOpen(true);
    }

    // This is not a default behaviour of the <input /> field
    if (event.key === "Enter" && input !== "") {
      const optionToSelect = options.find(
        (option) => getOptionLabel(option) === input
      );
      if (optionToSelect) {
        setSelected(optionToSelect);
        onValueChange?.(optionToSelect);
      }
    }
  };

  const handleBlur = () => {
    setOpen(false);
  };

  const handleSelectOption = (selectedOption: T) => {
    setSelected(selectedOption);
    onValueChange?.(selectedOption);
    onSearchChange?.(getOptionLabel(selectedOption));
    setOpen(false);
  };

  return (
    <CommandPrimitive onKeyDown={handleKeyDown}>
      <div>
        <Input
          value={searchValue}
          onChange={
            isLoading ? undefined : (e) => onSearchChange?.(e.target.value)
          }
          onBlur={handleBlur}
          onFocus={() => setOpen(true)}
          placeholder={placeholder}
          disabled={disabled}
          className={className}
        />
      </div>
      <div className="relative mt-1">
        <div
          className={cn(
            "animate-in fade-in-0 zoom-in-95 absolute top-0 z-10 w-full rounded-xl bg-popover outline-none",
            isOpen ? "block" : "hidden"
          )}
        >
          <CommandList className="rounded-lg ring-1 ring-border">
            {isLoading ? (
              <CommandPrimitive.Loading>
                <div className="p-1">
                  <Skeleton className="h-8 w-full" />
                </div>
              </CommandPrimitive.Loading>
            ) : null}
            {options.length > 0 && !isLoading ? (
              <CommandGroup>
                {options.map((option) => {
                  const optionValue = getOptionValue(option);
                  const optionLabel = getOptionLabel(option);
                  const isSelected = selected ? getOptionValue(selected) === optionValue : false;
                  return (
                    <CommandItem
                      key={optionValue}
                      value={optionValue}
                      onMouseDown={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                      }}
                      onSelect={() => handleSelectOption(option)}
                      className={cn(
                        "flex w-full items-center gap-2",
                        !isSelected ? "pl-8" : null
                      )}
                    >
                      {isSelected ? <Check className="w-4" /> : null}
                      {optionLabel}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            ) : null}
            {!isLoading && isSuccess ? (
              <CommandPrimitive.Empty className="select-none rounded-sm px-2 py-3 text-center text-sm">
                {emptyMessage}
              </CommandPrimitive.Empty>
            ) : null}
          </CommandList>
        </div>
      </div>
    </CommandPrimitive>
  );
};
