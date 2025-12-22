import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";

export const TabCard: React.FC<{
  value: string;  
  title: string;
  noItemComponent: React.ReactNode;
  numberOfItems?: number;
  children?: React.ReactNode;
}> = ({ value, title, noItemComponent, numberOfItems, children }) => {
  return (
    <TabsContent value={value} className="mt-6">
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          {numberOfItems === 0 ? noItemComponent : children}
        </CardContent>
      </Card>
    </TabsContent>
  );
};
