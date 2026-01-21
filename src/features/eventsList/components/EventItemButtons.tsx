import { Button } from "@/components/ui/button";
import { useDeleteRegistration } from "@/hooks/useDeleteRegistration";
import { useUpdateRsvp } from "@/hooks/useUpdateRsvp";
import { RsvpData, RsvpStatus } from "@/services/types";
import { Heart, UserPlus } from "lucide-react";
import { useState } from "react";

export const EventItemButtons: React.FC<{ rsvpData: RsvpData }> = ({
  rsvpData,
}) => {
  const [isGoing, setIsGoing] = useState(rsvpData.status === RsvpStatus.Going);
  const [isInterested, setIsInterested] = useState(
    rsvpData.status === RsvpStatus.Interested,
  );
  const updateMutation = useUpdateRsvp();
  const deleteMutation = useDeleteRegistration(rsvpData.eventId);
  const handleJoin = () => {
    if (isGoing) {
      deleteMutation.mutate();
    } else {
      updateMutation.mutate({ ...rsvpData, status: RsvpStatus.Going });
    }
    setIsInterested(false);
    setIsGoing(!isGoing);
  };

  const handleInterested = () => {
    if (!isInterested) {
      updateMutation.mutate({ ...rsvpData, status: RsvpStatus.Interested });
    } else {
      deleteMutation.mutate();
    }
    setIsInterested(!isInterested);
    setIsGoing(false);
  };

  return (
    <div className="grid grid-cols-2 gap-2 w-full md:flex md:w-auto md:justify-start">
      <Button
        variant="ghost"
        size="sm"
        onClick={handleInterested}
        className={`${
          "" + isInterested
            ? "text-rose-600 hover:text-rose-700"
            : "text-gray-600 hover:text-rose-600"
        }`}
      >
        <Heart
          className={`w-4 h-4 mr-1 ${isInterested ? "fill-rose-600" : ""}`}
        />
        {isInterested ? "Interested" : "Interest"}
      </Button>
      <Button
        variant={isGoing ? "default" : "outline"}
        size="sm"
        onClick={handleJoin}
        className={`${
          isGoing ? "bg-green-600 hover:bg-green-700 text-white" : ""
        }`}
      >
        <UserPlus className="w-4 h-4 mr-1" />
        {isGoing ? "Joined" : "Join Event"}
      </Button>
    </div>
  );
};
