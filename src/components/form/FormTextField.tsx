import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LucideIcon } from "lucide-react";
import { ComponentProps } from "react";
import { useFieldContext } from "@/lib/form-context";
import { getFirstErrorMessage } from "./getErrorMessage";

export interface FormTextFieldProps {
  label: string;
  placeholder?: string;
  required?: boolean;
  icon?: LucideIcon;
  type?: ComponentProps<typeof Input>["type"];
  disabled?: boolean;
  inputProps?: Omit<
    ComponentProps<typeof Input>,
    "value" | "onChange" | "onBlur" | "name" | "type" 
  >;
}

export const FormTextField = ({
  label,
  placeholder,
  required = false,
  disabled = false,
  icon: Icon,
  type = "text",
  inputProps = {},
}: FormTextFieldProps) => {
  const field = useFieldContext<string>();
  const errors = field.state.meta.errors || [];
  const firstErrorMessage = getFirstErrorMessage(errors);
  const hasError = Boolean(firstErrorMessage);
  const id = field.name;

  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="flex items-center gap-1">
        {label}
        {required && <span className="text-destructive">*</span>}
      </Label>
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground pointer-events-none" />
        )}
        <Input
          id={id}
          type={type}
          name={field.name}
          value={field.state.value}
          onBlur={field.handleBlur}
          onChange={(e) => field.handleChange(e.target.value)}
          disabled={disabled}
          placeholder={placeholder}
          className={`${Icon ? "pl-10" : ""} ${
            hasError ? "border-destructive" : ""
          }`}
          {...inputProps}
        />
      </div>
      {hasError && <p className="text-sm text-destructive">{firstErrorMessage}</p>}
    </div>
  );
};
