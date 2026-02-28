import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { clearTokens } from "@/stores/authStore";
import { LogOut } from "lucide-react";

export const Route = createFileRoute("/logout")({
  component: LogoutPage,
});

function LogoutPage() {
  useEffect(() => {
    // Clear local authentication state
    clearTokens();
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen p-4">
      <div className="mt-16">
        <div className="flex justify-center mb-4">
          <div className="rounded-full bg-primary/10 p-4">
            <LogOut className="h-8 w-8 text-primary" />
          </div>
        </div>
        <div className="text-2xl font-bold">You have been logged out</div>
      </div>
    </div>
  );
}
