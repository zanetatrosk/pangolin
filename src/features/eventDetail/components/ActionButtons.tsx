import { Button } from "@/components/ui/button";
import { Check, Heart, Share2 } from "lucide-react";
import { useState } from "react";

export const ActionButtons: React.FC = () => {
  const [isGoing, setIsGoing] = useState(false);
  const [isInterested, setIsInterested] = useState(false);
  const handleJoin = () => {
    setIsGoing(!isGoing);
    if (isInterested) setIsInterested(false);
  };

  const handleInterested = () => {
    setIsInterested(!isInterested);
    if (isGoing) setIsGoing(false);
  };
  return (
    <div className="flex flex-wrap gap-3 order-1 lg:order-none">
      <Button
        size="lg"
        className={`flex-1 md:flex-none gap-2 ${
          isGoing ? "bg-green-600 hover:bg-green-700" : ""
        }`}
        onClick={handleJoin}
      >
        {isGoing ? <Check className="w-4 h-4" /> : null}
        {isGoing ? "Going" : "Join Event"}
      </Button>

      <Button
        variant={isInterested ? "secondary" : "outline"}
        size="lg"
        className={`flex-1 md:flex-none gap-2 ${
          isInterested ? "text-primary" : ""
        }`}
        onClick={handleInterested}
      >
        <Heart className={`w-4 h-4 ${isInterested ? "fill-current" : ""}`} />
        Interested
      </Button>

      <Button variant="ghost" size="icon">
        <Share2 className="w-5 h-5" />
      </Button>
    </div>
  );
};
