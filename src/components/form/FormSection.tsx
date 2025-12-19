import { ReactNode } from "react";

export interface FormSectionProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export const FormSection = ({ title, children, className = "" }: FormSectionProps) => {
  return (
    <div className={`space-y-4 ${className}`}>
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
        {title}
      </h3>
      <div className="space-y-4">{children}</div>
    </div>
  );
};
