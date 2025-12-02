import { UsersRound } from "lucide-react";
import { Link } from "@tanstack/react-router";

export const Logo = () => (
  <Link to="/" className="flex items-center cursor-pointer hover:opacity-80 transition-opacity">
      <span className="mr-1">
        <UsersRound className="size-5" />
      </span>
    <div>
      <span className="font-bold text-xl">Connect2Dance</span>
      <div className="text-xs text-gray-500 dark:text-gray-400 -mt-1">
        Social Dance Events
      </div>
    </div>
  </Link>
);
