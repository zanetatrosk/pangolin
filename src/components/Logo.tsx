import { UsersRound } from "lucide-react";

export const Logo = () => (
  <div className="flex items-center cursor-pointer" onClick={() => window.location.href = '/'}>
      <span className="mr-1">
        <UsersRound className="size-5" />
      </span>
    <div>
      <span className="font-bold text-xl">Connect2Dance</span>
      <div className="text-xs text-gray-500 dark:text-gray-400 -mt-1">
        Social Dance Events
      </div>
    </div>
  </div>
);
