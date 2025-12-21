import { useState } from "react";
import { X, Play, Plus } from "lucide-react";
import { EventMediaItem } from "@/features/newEvent/types";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";

export const MediaGallery: React.FC<{
  mediaFiles?: EventMediaItem[];
  handleMediaUpload?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ mediaFiles, handleMediaUpload }) => {
  const [selectedMedia, setSelectedMedia] = useState<EventMediaItem | null>(
    null
  );
  const { t } = useTranslation();

  if (!mediaFiles || mediaFiles.length === 0) return null;

  return (
    <>
      <div className="order-4 lg:order-0">
        <div className="flex items-center justify-between pt-4 w-full mb-4">
          <h2 className="text-2xl font-semibold">Gallery</h2>
          {handleMediaUpload && (
            <>
            <Input
                id="media-upload"
                type="file"
                accept="image/*,video/*"
                className="hidden"
                onChange={handleMediaUpload}
              />
            <Button variant="secondary" size="sm" onClick={() => document.getElementById('media-upload')?.click()}>
              <Plus className="w-4 h-4 md:mr-2" />
              <span className="hidden md:block">{t("Add Media")}</span>
              
            </Button>
            </>
          )}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {mediaFiles.map((item, idx) => (
            <div
              key={idx}
              className="aspect-square rounded-xl overflow-hidden bg-muted relative group cursor-pointer"
              onClick={() => setSelectedMedia(item)}
            >
              {item.type === "image" ? (
                <img
                  src={item.url}
                  alt={`Gallery ${idx}`}
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
            </div>
          ))}
        </div>
      </div>

      {selectedMedia && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm"
          onClick={() => setSelectedMedia(null)}
        >
          <button
            onClick={() => setSelectedMedia(null)}
            className="absolute top-4 right-4 p-2 text-white/70 hover:text-white transition-colors"
          >
            <X className="w-8 h-8" />
          </button>

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
