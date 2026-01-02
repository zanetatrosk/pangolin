import {
  CommandGroup,
  CommandItem,
  CommandList,
  CommandInput,
} from "./command";
import { Command as CommandPrimitive } from "cmdk";
import { useState, useRef, useCallback, type KeyboardEvent } from "react";

import { Skeleton } from "./skeleton";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { ComboboxOption } from "../form/FormComboboxField";
import { Input } from "./input";

type AutoCompleteProps = {
  options: ComboboxOption[];
  emptyMessage: string;
  value?: ComboboxOption;
  searchValue?: string;
  onValueChange?: (value: ComboboxOption) => void;
  onSearchChange?: (value: string) => void;
  isLoading?: boolean;
  disabled?: boolean;
  placeholder?: string;
};

export const AutoComplete = ({
  options,
  placeholder,
  emptyMessage,
  value,
  onValueChange,
  onSearchChange,
  searchValue,
  disabled,
  isLoading = false,
}: AutoCompleteProps) => {
  const [isOpen, setOpen] = useState(false);
  const [selected, setSelected] = useState<ComboboxOption | undefined>(value);


  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
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
          (option) => option.label === input
        );
        if (optionToSelect) {
          setSelected(optionToSelect);
          onValueChange?.(optionToSelect);
        }
      }
    },
    [isOpen, options, onValueChange]
  );

  const handleBlur = useCallback(() => {
    setOpen(false);
  }, [selected]);

  const handleSelectOption = useCallback(
    (selectedOption: ComboboxOption) => {
      setSelected(selectedOption);
      onValueChange?.(selectedOption);
      onSearchChange?.(selectedOption.label);
      setOpen(false);
      console.log("Option selected:", selectedOption);
    },
    [onValueChange, onSearchChange]
  );

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
        />
      </div>
      <div className="relative mt-1">
        <div
          className={cn(
            "animate-in fade-in-0 zoom-in-95 absolute top-0 z-10 w-full rounded-xl bg-white outline-none",
            isOpen ? "block" : "hidden"
          )}
        >
          <CommandList className="rounded-lg ring-1 ring-slate-200">
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
                  const isSelected = selected?.value === option.value;
                  return (
                    <CommandItem
                      key={option.value}
                      value={option.label}
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
                      {option.label}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            ) : null}
            {!isLoading ? (
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
