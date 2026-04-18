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
import { deleteMedia, postMedia } from "@/services/media-api";
import { useTranslation } from "react-i18next";
import { useUser } from "@/hooks/useUser";
import { useRef } from "react";
import { toast } from "sonner";
import { getRequestErrorMessage } from "@/utils/getRequestErrorMessage";

export const EventMediaStep = withForm({
  ...eventFormOpts,
  render: ({ form }) => {
    const { t } = useTranslation();
    const { user } = useUser();
    const coverInputRef = useRef<HTMLInputElement | null>(null);

    const toastRequestError = (error: unknown, fallbackMessage: string) => {
      toast.error(getRequestErrorMessage(error) ?? fallbackMessage);
    };

    const coverImageMutation = useMutation({
        mutationFn: (file: File) => postMedia(file),
        onSuccess: (data) => {
          console.log("Cover media uploaded successfully:", data);
          form.setFieldValue("coverImage", {
            id: data.id.toString(),
            type: "image",
            url: data.url,
          });
        },
        onError: (error) => {
          console.error("Error uploading cover image:", error);
          toastRequestError(
            error,
            t("newEvent.media.coverUploadFailed", {
              defaultValue: "Failed to upload cover media",
            }),
          );
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
          toastRequestError(
            error,
            t("newEvent.media.galleryUploadFailed", {
              defaultValue: "Failed to upload gallery media",
            }),
          );
        },
      });

    const deleteMediaMutation = useMutation({
      mutationFn: (mediaId: string) => {
        if (!user?.userId) {
          throw new Error("User is not available for media deletion");
        }

        return deleteMedia(mediaId, user.userId);
      },
      onError: (error) => {
        console.error("Error deleting media:", error);
        toastRequestError(
          error,
          t("newEvent.media.deleteFailed", {
            defaultValue: "Failed to delete media",
          }),
        );
      },
    });

    return (
      <div className="p-4 md:p-6 space-y-8">
        <FormSection title={t("newEvent.media.coverImage")}>
          {/* ---------------- Cover Image ---------------- */}
          <form.Field name="coverImage">
            {(field) => {
              const preview = field.state.value?.url;
              return (
                <div className="space-y-3">
                  <Label>{t("newEvent.media.coverImageLabel")}</Label>

                  {preview && (
                    <div className="relative w-full max-w-lg">
                      {field.state.value?.type === "video" ? (
                        <video
                          src={preview}
                          className="rounded-lg border object-cover w-full"
                          controls
                        />
                      ) : (
                        <img
                          src={preview}
                          alt={t("newEvent.media.coverPreview")}
                          className="rounded-lg border object-cover"
                        />
                      )}
                      <Button
                        size="icon"
                        variant="destructive"
                        className="absolute top-2 right-2"
                        onClick={() => {
                          const currentCover = field.state.value;
                          field.handleChange(undefined);
                          if (coverInputRef.current) {
                            coverInputRef.current.value = "";
                          }

                          if (
                            currentCover?.id &&
                            !currentCover.id.startsWith("blob:") &&
                            user?.userId
                          ) {
                            deleteMediaMutation.mutate(currentCover.id);
                          }
                        }}
                        type="button"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}

                  <Input
                    ref={coverInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        if (!file.type.startsWith("image/")) {
                          toast.error(
                            t("newEvent.media.coverOnlyImage", {
                              defaultValue: "Cover must be an image",
                            }),
                          );
                          if (coverInputRef.current) {
                            coverInputRef.current.value = "";
                          }
                          return;
                        }
                        const blobUrl = URL.createObjectURL(file);
                        // Show preview immediately with blob URL
                        field.handleChange({
                          id: blobUrl,
                          type: "image",
                          url: blobUrl,
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
        <FormSection title={t("newEvent.media.gallery")}>
          <form.Field name="media">
            {(field) => {
              const media: EventMediaItem[] = field.state.value || [];
              
              const addMedia = (files: FileList | null) => {
                if (!files) return;
                
                // Upload to server (will update field in onSuccess)
                galleryMutation.mutate(Array.from(files));
              };

              const removeMedia = (item: EventMediaItem) => {
                field.handleChange(media.filter((m) => m.id !== item.id));

                if (!item.id.startsWith("blob:") && user?.userId) {
                  deleteMediaMutation.mutate(item.id);
                }
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
                  <Label>{t("newEvent.media.galleryLabel")}</Label>

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
                      {t("newEvent.media.dropzoneText")}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t("newEvent.media.dropzoneBrowse")}
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
