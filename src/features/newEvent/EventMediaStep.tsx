import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { eventFormOpts } from "./FormOptions";
import { withForm } from "@/lib/form";
import { EventMediaItem } from "./types";
import { FormSection } from "@/components/form/FormSection";

export type EventMediaValues = {
  coverImage?: File;
  images?: File[];
};

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
                    file,
                    type: file.type.startsWith("video") ? "video" : "image",
                  })
                );

                field.handleChange([...media, ...newItems]);
              };

              const removeMedia = (index: number) => {
                field.handleChange(media.filter((_, i) => i !== index));
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
                  {media.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {media.map((item, index) => {
                        const preview =
                          item.type === "image"
                            ? URL.createObjectURL(item.file)
                            : null;

                        return (
                          <div
                            key={index}
                            className="relative group aspect-square rounded-lg border overflow-hidden"
                          >
                            {item.type === "image" ? (
                              <img
                                src={preview!}
                                alt="Media preview"
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="flex items-center justify-center w-full h-full bg-muted text-sm font-medium px-2 text-center">
                                🎥 {item.file.name}
                              </div>
                            )}

                            <Button
                              type="button"
                              size="icon"
                              variant="destructive"
                              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition"
                              onClick={() => removeMedia(index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }}
          </form.Field>
        </FormSection>
      </div>
    );
  },
});
