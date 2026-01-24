import { EventMediaItem } from "@/features/newEvent/types";

export const CoverImage: React.FC<{ 
  coverImage?: EventMediaItem | null; 
  eventName: string;
  isCancelled?: boolean;
}> = ({ coverImage, eventName, isCancelled = false }) => {
    return (
        <div className="relative h-64 md:h-full w-full overflow-hidden">
          {coverImage ? (
            <img
              src={coverImage.url}
              alt={eventName}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-rose-200 dark:bg-neutral-800" />
          )}
          <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>
      );
};