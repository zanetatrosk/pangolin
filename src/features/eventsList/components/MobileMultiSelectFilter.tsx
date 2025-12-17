import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileMultiSelectFilterProps {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  options: { value: string; label: string }[];
  selectedValues: string[];
  onValuesChange: (values: string[]) => void;
}

export function MobileMultiSelectFilter({
  label,
  icon: Icon,
  options,
  selectedValues,
  onValuesChange,
}: MobileMultiSelectFilterProps) {
  const [open, setOpen] = useState(false);
  const [tempSelected, setTempSelected] = useState<string[]>(selectedValues);

  const handleToggle = (value: string) => {
    setTempSelected((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value]
    );
  };

  const handleApply = () => {
    onValuesChange(tempSelected);
    setOpen(false);
  };

  const handleCancel = () => {
    setTempSelected(selectedValues);
    setOpen(false);
  };

  const handleClearAll = () => {
    setTempSelected([]);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
        <Icon className="h-4 w-4 text-pink-500" />
        <span>{label}</span>
      </div>

      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button
            variant="outline"
            className="w-full h-12 justify-between bg-white/70 dark:bg-gray-800/70 backdrop-blur rounded-lg shadow-sm border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100"
          >
            <span className="text-left truncate text-gray-600 dark:text-gray-300">
              {selectedValues.length === 0
                ? "Select options..."
                : `${selectedValues.length} selected`}
            </span>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </DrawerTrigger>

        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle className="flex items-center gap-2">
              <Icon className="h-5 w-5 text-pink-500" />
              {label}
            </DrawerTitle>
            <DrawerDescription>
              Select all that apply. Tap to toggle.
            </DrawerDescription>
          </DrawerHeader>

          <div className="px-4 pb-4 max-h-[60vh] overflow-y-auto">
            <div className="grid grid-cols-1 gap-2">
              {options.map((option) => {
                const isSelected = tempSelected.includes(option.value);
                return (
                  <button
                    key={option.value}
                    onClick={() => handleToggle(option.value)}
                    className={cn(
                      "flex items-center justify-between p-4 rounded-lg border-2 transition-all",
                      isSelected
                        ? "border-pink-500 bg-pink-50 dark:bg-pink-950/30"
                        : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                    )}
                  >
                    <span
                      className={cn(
                        "font-medium",
                        isSelected
                          ? "text-pink-700 dark:text-pink-300"
                          : "text-gray-700 dark:text-gray-300"
                      )}
                    >
                      {option.label}
                    </span>
                    <div
                      className={cn(
                        "flex items-center justify-center w-6 h-6 rounded-full border-2 transition-all",
                        isSelected
                          ? "border-pink-500 bg-pink-500"
                          : "border-gray-300 dark:border-gray-600"
                      )}
                    >
                      {isSelected && <Check className="h-4 w-4 text-white" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <DrawerFooter className="flex flex-row gap-2">
            <Button
              variant="outline"
              onClick={handleClearAll}
              className="flex-1"
              disabled={tempSelected.length === 0}
            >
              Clear All
            </Button>
            <DrawerClose asChild>
              <Button variant="outline" onClick={handleCancel} className="flex-1">
                Cancel
              </Button>
            </DrawerClose>
            <Button onClick={handleApply} className="flex-1">
              Apply ({tempSelected.length})
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      {/* Selected badges preview */}
      {selectedValues.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {selectedValues.slice(0, 3).map((value) => {
            const option = options.find((opt) => opt.value === value);
            return (
              <Badge
                key={value}
                variant="secondary"
                className="text-xs bg-pink-100 dark:bg-pink-950/50 text-pink-700 dark:text-pink-300"
              >
                {option?.label}
              </Badge>
            );
          })}
          {selectedValues.length > 3 && (
            <Badge
              variant="secondary"
              className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
            >
              +{selectedValues.length - 3} more
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}
