import { FC } from "react";

interface CardDataWithIconProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  value: string | number;
  bold?: boolean;
}

export const DataWithIcon: FC<CardDataWithIconProps> = ({
  icon: Icon,
  value,
  bold = false,
}) => {
  return (
    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
      <Icon className="w-4 h-4" />
      <span className={`text-sm ${bold ? "font-bold" : ""}`}>{value}</span>
    </div>
  );
};
