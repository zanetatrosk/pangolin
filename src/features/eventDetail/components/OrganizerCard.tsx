import { Card, CardContent } from "@/components/ui/card";
import { Organizer } from "@/features/eventsList/types";
import { getOrganizerByObject } from "@/utils/getOrganizerByObject";

export const OrganizerCard: React.FC<{organizer: Organizer}> = ({ organizer }) => {
    return (
        <Card className="order-6 lg:order-0">
              <CardContent className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-lg">
                  DS
                </div>
                <div>
                  <p className="text-sm font-medium">Organized by</p>
                  <p className="font-bold">{getOrganizerByObject(organizer)}</p>
                </div>
              </CardContent>
            </Card>
    )
};