import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { eventFormOpts } from "./FormOptions";
import { withForm } from "@/lib/form";
import { EventMediaItem } from "./types";
import { FormSection } from "@/components/form/FormSection";
import { Media } from "../events/components/Media";

export const EventMediaStep = withForm({
  ...eventFormOpts,
  render: ({ form }) => {
    return (
      <div className="p-4 md:p-6 space-y-8">
        <FormSection title="Cover Image">
          {/* ---------------- Cover Image ---------------- */}
          <form.Field name="coverImage">
            {(field) => {
              const preview = field.state.value
                ? URL.createObjectURL(field.state.value)
                : null;

              return (
                <div className="space-y-3">
                  <Label>Cover image</Label>

                  {preview && (
                    <div className="relative w-full max-w-md">
                      <img
                        src={preview}
                        alt="Cover preview"
                        className="rounded-lg border object-cover"
                      />
                      <Button
                        size="icon"
                        variant="destructive"
                        className="absolute top-2 right-2"
                        onClick={() => field.handleChange(undefined)}
                        type="button"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}

                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => field.handleChange(e.target.files?.[0])}
                  />
                </div>
              );
            }}
          </form.Field>
        </FormSection>
        {/* ---------------- Gallery Images ---------------- */}
        <FormSection title="Gallery & Videos">
          <form.Field name="media">
            {(field) => {
              const media = field.state.value ?? [];
              const addMedia = (files: FileList | null) => {
                if (!files) return;

                const newItems: EventMediaItem[] = Array.from(files).map(
                  (file) => ({
                    url: URL.createObjectURL(file),
                    type: file.type.startsWith("video") ? "video" : "image",
                  })
                );

                field.handleChange([...media, ...newItems]);
              };

              const removeMedia = (item: EventMediaItem) => {
                field.handleChange(media.filter((m) => m.url !== item.url));
              };

              const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
                e.preventDefault();
                e.stopPropagation();
                addMedia(e.dataTransfer.files);
              };

              const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
                e.preventDefault();
                e.stopPropagation();
              };

              return (
                <div className="space-y-4">
                  <Label>Event media</Label>

                  {/* -------- Dropzone -------- */}
                  <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    className="flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted/20 p-8 text-center cursor-pointer hover:bg-muted/40 transition"
                    onClick={() =>
                      document.getElementById("media-upload")?.click()
                    }
                  >
                    <p className="text-sm font-medium">
                      Drag & drop images or videos here
                    </p>
                    <p className="text-xs text-muted-foreground">
                      or click to browse
                    </p>

                    <input
                      id="media-upload"
                      type="file"
                      accept="image/*,video/*"
                      multiple
                      className="hidden"
                      onChange={(e) => addMedia(e.target.files)}
                    />
                  </div>

                  {/* -------- Media Grid -------- */}
                  <Media mediaFiles={media} allowEdit onDelete={removeMedia} />
                </div>
              );
            }}
          </form.Field>
        </FormSection>
      </div>
    );
  },
});
