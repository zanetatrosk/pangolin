import { Button } from "@/components/ui/button"
import { Heart, UserPlus } from "lucide-react"
import { useState } from "react";

export const EventItemButtons: React.FC<{isInterestedDefault: boolean, isJoinedDefault: boolean}> = ({isInterestedDefault, isJoinedDefault}) => {
    const [isInterested, setIsInterested] = useState(isInterestedDefault);
    const [isJoined, setIsJoined] = useState(isJoinedDefault);
    function handleInterestClick() {
        setIsInterested(!isInterested);
    }
    function handleJoinClick() {
        setIsJoined(!isJoined);
    }
    return (
        <div className="grid grid-cols-2 gap-2 w-full md:flex md:w-auto md:justify-start">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleInterestClick}
                className={`${
                  "" + isInterested
                    ? "text-rose-600 hover:text-rose-700"
                    : "text-gray-600 hover:text-rose-600"
                }`}
              >
                <Heart
                  className={`w-4 h-4 mr-1 ${
                    isInterested ? "fill-rose-600" : ""
                  }`}
                />
                {isInterested ? "Interested" : "Interest"}
              </Button>
              <Button 
                variant={isJoined ? "default" : "outline"} 
                size="sm" 
                onClick={handleJoinClick}
                className={`${
                  isJoined
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : ""
                }`}
              >
                <UserPlus className="w-4 h-4 mr-1" />
                {isJoined ? "Joined" : "Join Event"}
              </Button>
            </div>
    )
}