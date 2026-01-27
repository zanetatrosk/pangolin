import { FC } from "react";
import { Users, Heart } from "lucide-react";
import { AttendeeStats } from "../eventDetail/types";

export const AttendeeStatsDisplay: FC<{ stats: AttendeeStats }> = ({ stats }) => {
    return (
        <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span className="font-medium text-foreground">{stats.going.total}</span>
                <span>going</span>
            </div>
            <div className="flex items-center gap-2">
                <span className="font-medium text-foreground">{stats.going.leaders}</span>
                <span>leaders</span>
            </div>
            <div className="flex items-center gap-2">
                <span className="font-medium text-foreground">{stats.going.followers}</span>
                <span>followers</span>
            </div>
            <div className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                <span className="font-medium text-foreground">{stats.interested}</span>
                <span>interested</span>
            </div>
        </div>
    );
};
