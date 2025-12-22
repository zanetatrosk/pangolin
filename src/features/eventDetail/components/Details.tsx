import { AdditionalDetailsData } from "@/features/newEvent/types";
import { Info } from "lucide-react";

export const Details: React.FC<{
  additionalDetails?: AdditionalDetailsData;
}> = ({ additionalDetails }) => {
    return (
        <div className="rounded-xl bg-white dark:bg-card p-6 shadow-sm ring-1 ring-gray-900/5 dark:ring-white/10">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <Info className="w-5 h-5 text-primary" />
                Details
              </h3>
              <div className="mt-4 space-y-4">
                

                {additionalDetails?.typeOfEvent && (
                  <div>
                    <p className="text-xs font-medium uppercase text-muted-foreground">
                      Event Type
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {additionalDetails.typeOfEvent.map((type) => (
                        <span
                          key={type}
                          className="inline-flex items-center rounded-md bg-blue-50 dark:bg-blue-400/10 px-2 py-1 text-xs font-medium text-blue-700 dark:text-blue-400 ring-1 ring-inset ring-blue-700/10 dark:ring-blue-400/20"
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {additionalDetails?.danceStyles && (
                  <div>
                    <p className="text-xs font-medium uppercase text-muted-foreground">
                      Styles
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {additionalDetails.danceStyles.map((style) => (
                        <span
                          key={style}
                          className="inline-flex items-center rounded-full bg-rose-50 dark:bg-rose-400/10 px-2 py-1 text-xs font-medium text-rose-700 dark:text-rose-400 ring-1 ring-inset ring-rose-700/10 dark:ring-rose-400/20"
                        >
                          {style}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {additionalDetails?.skillLevel && (
                  <div>
                    <p className="text-xs font-medium uppercase text-muted-foreground">
                      Level
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {additionalDetails.skillLevel.map((level) => (
                        <span
                          key={level}
                          className="inline-flex items-center rounded-md bg-gray-50 dark:bg-gray-400/10 px-2 py-1 text-xs font-medium text-gray-600 dark:text-gray-400 ring-1 ring-inset ring-gray-500/10 dark:ring-gray-400/20"
                        >
                          {level}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
    )
}