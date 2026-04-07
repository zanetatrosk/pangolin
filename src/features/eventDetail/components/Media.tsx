import { Button } from "@/components/ui/button";
import { EventMediaItem } from "@/features/newEvent/types";
import { Play, X, Trash2 } from "lucide-react";
import { FC, useState } from "react";

export const Media: FC<{
  mediaFiles: EventMediaItem[];
  allowEdit?: boolean;
  onDelete?: (item: EventMediaItem) => void;
}> = ({ mediaFiles, allowEdit, onDelete }) => {
  const [selectedMedia, setSelectedMedia] = useState<EventMediaItem | null>(
    null
  );
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {mediaFiles.map((item) => (
          <div
            key={item.id}
            className="aspect-square rounded-xl overflow-hidden bg-muted relative group cursor-pointer"
            onClick={() => setSelectedMedia(item)}
          >
            {item.type === "image" ? (
              <img
                src={item.url}
                alt={`Gallery ${item.id}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <>
                <video
                  src={`${item.url}#t=0.5`}
                  className="w-full h-full object-cover"
                  preload="metadata"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-colors">
                  <Play className="w-12 h-12 text-white/80" />
                </div>
              </>
            )}
            {allowEdit && onDelete && (
              <Button
                variant={"ghost"}
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(item);
                }}
                className="absolute top-2 right-2 p-2 bg-black/50 hover:bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 z-10"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </div>
        ))}
      </div>

      {selectedMedia && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm"
          onClick={() => setSelectedMedia(null)}
        >
          <Button
            variant={"ghost"}
            onClick={() => setSelectedMedia(null)}
            className="absolute top-4 right-4 p-2 text-white/70 hover:text-white transition-colors"
          >
            <X className="w-8 h-8" />
          </Button>

          <div
            className="relative max-w-5xl max-h-[90vh] w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedMedia.type === "image" ? (
              <img
                src={selectedMedia.url}
                alt="Full screen view"
                className="max-w-full max-h-full object-contain rounded-md shadow-2xl"
              />
            ) : (
              <video
                src={selectedMedia.url}
                controls
                autoPlay
                playsInline
                className="max-w-full max-h-full rounded-md shadow-2xl"
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};
