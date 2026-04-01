import { Button } from "@/components/ui/button";

interface NoEventsProps {
  title: string;
  description: string;
  buttonText: string;
  buttonVariant?:
    | "default"
    | "link"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
  icon: React.ReactNode;
  buttonIcon?: React.ReactNode;
  onButtonClick?: () => void;
}
export const NoEvents: React.FC<NoEventsProps> = ({
  title,
  description,
  buttonText,
  buttonVariant,
  icon,
  buttonIcon,
  onButtonClick,
}) => {
  return (
    <div className="text-center py-12">
      {icon}
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4">{description}</p>
      <Button variant={buttonVariant} onClick={onButtonClick}>
        {buttonIcon}
        {buttonText}
      </Button>
    </div>
  );
};
