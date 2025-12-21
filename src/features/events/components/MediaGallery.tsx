import { Plus } from "lucide-react";
import { EventMediaItem } from "@/features/newEvent/types";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { Media } from "./Media";

export const MediaGallery: React.FC<{
  mediaFiles?: EventMediaItem[];
  handleMediaUpload?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  allowEdit?: boolean;
  onDelete?: (item: EventMediaItem) => void;
}> = ({ mediaFiles, handleMediaUpload, allowEdit, onDelete }) => {
  const { t } = useTranslation();

  if (!mediaFiles || mediaFiles.length === 0) return null;

  return (
    <>
      <div className="order-4 lg:order-0">
        <div className="flex items-center justify-between pt-4 w-full mb-4">
          <h2 className="text-2xl font-semibold">Gallery</h2>
          {handleMediaUpload && allowEdit && (
            <>
              <Input
                id="media-upload"
                type="file"
                accept="image/*,video/*"
                className="hidden"
                onChange={handleMediaUpload}
              />
              <Button
                variant="secondary"
                size="sm"
                onClick={() => document.getElementById("media-upload")?.click()}
              >
                <Plus className="w-4 h-4 md:mr-2" />
                <span className="hidden md:block">{t("Add Media")}</span>
              </Button>
            </>
          )}
        </div>
      </div>
      <Media mediaFiles={mediaFiles} allowEdit={allowEdit} onDelete={onDelete} />
    </>
  );
};
