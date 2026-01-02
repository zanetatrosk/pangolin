import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { eventFormOpts } from "./FormOptions";
import { withForm } from "@/lib/form";
import { EventMediaItem } from "./types";
import { FormSection } from "@/components/form/FormSection";
import { Media } from "../eventDetail/components/Media";
import { useMutation } from "@tanstack/react-query";
import { postMedia } from "@/services/media-api";

export const EventMediaStep = withForm({
  ...eventFormOpts,
  render: ({ form }) => {
    const coverImageMutation = useMutation({
        mutationFn: (file: File) => postMedia(file),
        onSuccess: (data) => {
          console.log("Cover image uploaded successfully:", data);
          form.setFieldValue("coverImage", {
            id: data.id.toString(),
            type: "image",
            url: data.url,
          });
        },
        onError: (error) => {
          console.error("Error uploading cover image:", error);
        },
      });

    const galleryMutation = useMutation({
        mutationFn: async (files: File[]) => {
          const uploadPromises = files.map((file) => postMedia(file));
          return Promise.all(uploadPromises);
        },
        onSuccess: (uploadedMedia) => {
          console.log("Gallery media uploaded successfully:", uploadedMedia);
          const currentMedia = form.getFieldValue("media") ?? [];
          const newItems: EventMediaItem[] = uploadedMedia.map((media) => ({
            id: media.id.toString(),
            type: media.type.startsWith("video") ? "video" : "image",
            url: media.url,
          }));
          form.setFieldValue("media", [...currentMedia, ...newItems]);
        },
        onError: (error) => {
          console.error("Error uploading gallery media:", error);
        },
      });

    return (
      <div className="p-4 md:p-6 space-y-8">
        <FormSection title="Cover Image">
          {/* ---------------- Cover Image ---------------- */}
          <form.Field name="coverImage">
            {(field) => {
              const preview = field.state.value?.url;
              return (
                <div className="space-y-3">
                  <Label>Cover image</Label>

                  {preview && (
                    <div className="relative w-full max-w-lg">
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
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        // Show preview immediately with blob URL
                        field.handleChange({
                          id: URL.createObjectURL(file),
                          type: "image",
                          url: URL.createObjectURL(file),
                        });
                        // Upload to server (will update field in onSuccess)
                        coverImageMutation.mutate(file);
                      }
                    }}
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
              const media: EventMediaItem[] = field.state.value || [];
              
              const addMedia = (files: FileList | null) => {
                if (!files) return;
                
                // Upload to server (will update field in onSuccess)
                galleryMutation.mutate(Array.from(files));
              };

              const removeMedia = (item: EventMediaItem) => {
                //ToDO mutate
                field.handleChange(media.filter((m) => m.id !== item.id));
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
                  <Media mediaFiles={field.state.value || []} allowEdit onDelete={removeMedia} />
                </div>
              );
            }}
          </form.Field>
        </FormSection>
      </div>
    );
  },
});
