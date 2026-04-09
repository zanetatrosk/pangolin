import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

interface LoadingProps {
  text?: string;
  className?: string;
  spinnerClassName?: string;
  textClassName?: string;
}

export function Loading({ text, className, spinnerClassName, textClassName }: LoadingProps) {
  return (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      <Spinner className={cn("h-10 w-10", spinnerClassName)} />
      {text ? <p className={cn("text-center", textClassName)}>{text}</p> : null}
    </div>
  );
}
