import { Card, CardContent } from "@/components/ui/card";

export const OrganizerCard: React.FC<{organizerName: string}> = ({ organizerName }) => {
    return (
        <Card className="order-6 lg:order-none">
              <CardContent className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-lg">
                  DS
                </div>
                <div>
                  <p className="text-sm font-medium">Organized by</p>
                  <p className="font-bold">{organizerName}</p>
                </div>
              </CardContent>
            </Card>
    )
};