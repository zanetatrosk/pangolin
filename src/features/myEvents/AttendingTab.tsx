import { Calendar } from "lucide-react";
import { TabCard } from "./components/TabCard";
import { NoEvents } from "./components/NoEvents";

export const AttendingTab: React.FC = () => {
  return (
    <TabCard
      value="attending"
      title="Events You're Attending"
      noItemComponent={
        <NoEvents
          title="No Registered Events"
          description="Browse events and register to join the fun!"
          buttonText="Browse Events"
          buttonVariant="outline"
          icon={<Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />}
        />
      }
      numberOfItems={0}
    >
        
    </TabCard>
  );
};
