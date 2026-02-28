import { Card, CardContent } from "@/components/ui/card";
import { Organizer } from "@/features/eventsList/types";
import { getOrganizerByObject } from "@/utils/getOrganizerByObject";
import { useNavigate } from "@tanstack/react-router";
import { PATHS } from "@/paths";
import { getInitials } from "@/components/layout/utils/getInitials";

export const OrganizerCard: React.FC<{organizer: Organizer}> = ({ organizer }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate({ to: PATHS.PROFILE.VIEW(organizer.userId) });
    };

    return (
        <Card 
            className="order-6 lg:order-0 cursor-pointer hover:bg-accent/50 transition-colors border-primary/20 shadow-md" 
            onClick={handleClick}
        >
              <CardContent className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-lg">
                  {getInitials(organizer.firstName + " " + organizer.lastName)}
                </div>
                <div>
                  <p className="text-sm font-medium">Organized by</p>
                  <p className="font-bold">{getOrganizerByObject(organizer)}</p>
                </div>
              </CardContent>
            </Card>
    )
};