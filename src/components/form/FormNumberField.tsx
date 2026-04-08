import { FC } from "react";
import { FormTextFieldProps } from "./FormTextField";
import { useFieldContext } from "@/lib/form-context";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { getFirstErrorMessage } from "./getErrorMessage";

interface FormNumberFieldProps extends Omit<FormTextFieldProps, "type"> {
  min?: string;
  max?: string;
  step?: string;
}
export const FormNumberField: FC<FormNumberFieldProps> = ({
  label,
  required,
  icon: Icon,
  placeholder,
  min,
  max,
  step,
  ...inputProps
}) => {
  const field = useFieldContext<number>();
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
          type="number"
          name={field.name}
          value={field.state.value}
          onBlur={field.handleBlur}
          onChange={(e) => field.handleChange(e.target.valueAsNumber)}
          placeholder={placeholder}
          min={min}
          max={max}
          step={step}
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
