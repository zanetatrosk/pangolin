import { TabsContent } from "@/components/ui/tabs";

export const TabCard: React.FC<{
  value: string;  
  noItemComponent: React.ReactNode;
  numberOfItems?: number;
  children?: React.ReactNode;
}> = ({ value,  noItemComponent, numberOfItems, children }) => {
  return (
    <TabsContent value={value} className="mt-6">
          {numberOfItems === 0 ? noItemComponent : children}
    </TabsContent>
  );
};
