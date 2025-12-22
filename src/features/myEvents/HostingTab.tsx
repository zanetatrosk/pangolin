import { CalendarPlus, Users } from "lucide-react";
import { NoEvents } from "./components/NoEvents";
import { TabCard } from "./components/TabCard";

export const HostingTab: React.FC = () => {
    return (
        <TabCard
            value="hosting"
            title="Events You're Hosting"
            noItemComponent={
                <NoEvents
                    title="No Hosted Events Yet"
                    description="Create your first event and start building your dance community!"
                    buttonText="Create Event"
                    icon={<Users className="h-12 w-12 mx-auto text-muted-foreground mb-4"/>}
                    buttonIcon={<CalendarPlus className="h-4 w-4 mr-2" />}
                />
            }
            numberOfItems={0}
        ></TabCard>
    );
}
