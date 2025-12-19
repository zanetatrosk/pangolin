import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useFieldContext } from "@/lib/form-context";

export interface FormCheckboxFieldProps {
  label: string;
  description?: string;
}

export const FormCheckboxField = ({
  label,
  description,
}: FormCheckboxFieldProps) => {
  const field = useFieldContext<boolean>();
  const id = field.name;
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id={id}
        checked={field.state.value}
        onCheckedChange={(checked) => field.handleChange(checked as boolean)}
      />
      <div className="flex flex-col">
        <Label
          htmlFor={id}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
        >
          {label}
        </Label>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
    </div>
  );
};
