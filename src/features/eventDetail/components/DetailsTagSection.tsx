import { cn } from "@/lib/utils";
import { FC } from "react";

export type DetailsTagItem = {
  id: string | number;
  name: string;
};

export const DetailsTagSection: FC<{
  label: string;
  items?: DetailsTagItem[];
  itemClassName: string;
}> = ({ label, items, itemClassName }) => {
  if (!items) return null;

  return (
    <div>
      <p className="text-xs font-medium uppercase text-muted-foreground">{label}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item.id}
            className={cn(
              "inline-flex items-center px-2 py-1 text-xs font-medium ring-1 ring-inset",
              itemClassName
            )}
          >
            {item.name}
          </span>
        ))}
      </div>
    </div>
  );
};
