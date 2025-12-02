import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/events/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50/30 dark:bg-gray-900/30">
      <div className="relative px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Event Details
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Event ID: {id}
            </p>
            
            {/* Add your event details component here */}
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  Event Title
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  This is where you'll display the event details for event {id}
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                  Description
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Event description will go here...
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                  Date & Time
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Event date and time information...
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                  Location
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Event location details...
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}