import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import type { ReactNode } from "react";

interface ErrorAlertProps {
  title?: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

export function ErrorAlert({
  title,
  description,
  icon = <AlertCircle className="h-4 w-4" />,
  className,
  titleClassName,
  descriptionClassName,
}: ErrorAlertProps) {
  return (
    <Alert variant="destructive" className={className}>
      {icon}
      {title && <AlertTitle className={titleClassName}>{title}</AlertTitle>}
      {description && (
        <AlertDescription className={descriptionClassName}>
          {description}
        </AlertDescription>
      )}
    </Alert>
  );
}
