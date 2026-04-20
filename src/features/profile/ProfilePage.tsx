import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera } from "lucide-react";
import { useTranslation } from "react-i18next";
import { getInitials } from "@/components/layout/utils/getInitials";
import { MediaGallery } from "../eventDetail/components/MediaGallery";
import { EventMediaItem } from "../newEvent/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMedia, postMedia } from "@/services/media-api";
import { ProfileEditForm } from "./ProfileEditForm";
import { ProfileViewMode } from "./ProfileViewMode";
import { CodebookItem } from "@/services/types";
import { updateProfileById } from "@/services/user-api";
import { useUser } from "@/hooks/useUser";

export interface ProfileData {
  firstName?: string;
  lastName?: string;
  bio?: string;
  role?: CodebookItem;
  danceStyles?: CodebookItem[];
  media: EventMediaItem[];
  level?: CodebookItem;
  avatar?: EventMediaItem;
}

export function ProfilePage({
  userId,
  profileDataDefault,
}: {
  userId: string;
  profileDataDefault: ProfileData;
}) {
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useUser();
  const queryClient = useQueryClient();

  const avatarMutation = useMutation({
    mutationFn: (file: File) => postMedia(file),
    onSuccess: (data) => {
      setProfileData((prev) => ({
        ...prev,
        avatar: {
          id: data.id.toString(),
          type: data.type,
          url: data.url,
        },
      }));
    },
    onError: (error) => {
      console.error("Error uploading avatar image:", error);
    },
  });

  const imageMutation = useMutation({
    mutationFn: (file: File) => postMedia(file),
    onSuccess: (data) => {
      setProfileData((prev) => ({
        ...prev,
        media: [
          ...prev.media,
          {
            id: data.id.toString(),
            type: data.type,
            url: data.url,
          },
        ],
      }));
    },
    onError: (error) => {
      console.error("Error uploading avatar image:", error);
    },
  });

  const deleteMediaMutation = useMutation({
    mutationFn: (mediaId: string) => deleteMedia(mediaId, userId),
    onError: (error) => {
      console.error("Error deleting media:", error);
    },
  });

  const mutation = useMutation({
    mutationFn: () => updateProfileById(userId, profileData),
    onSuccess: (data) => {
      queryClient.setQueryData(["profile", userId], data);
    },
    onError: (error) => {
      console.error("Error updating profile:", error);
    },
  });

  const allowedToEdit = userId === user?.userId;

  // Mock data initialization - in a real app, this would come from the backend/store
  const [profileData, setProfileData] =
    useState<ProfileData>(profileDataDefault);

  const handleSave = () => {
    mutation.mutate();
    setIsEditing(false);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      imageMutation.mutate(file);
      // Reset the input value to allow selecting the same file again
      e.target.value = "";
    }
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      avatarMutation.mutate(file);
      e.target.value = "";
    }
  };

  const handlePhotoDelete = (item: EventMediaItem) => {
    setProfileData((prev) => ({
      ...prev,
      media: prev.media.filter((m) => m.id !== item.id),
    }));

    if (!item.id.startsWith("blob:")) {
      deleteMediaMutation.mutate(item.id);
    }
  };

  return (
    <div className="container mx-auto max-w-4xl p-4 md:p-6 space-y-6">
      {/* Header / Main Profile Info */}
      <Card className="overflow-hidden pt-0 border-0 ">
        <div className="h-32 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20" />
        <CardHeader className="relative pt-0">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 -mt-16">
            <div className="relative group">
              <Avatar className="w-32 h-32 border-4 border-background shadow-xl bg-background">
                <AvatarImage
                  src={profileData.avatar?.url}
                  alt={t("profile.avatar")}
                  className="object-cover"
                />
                <AvatarFallback className="text-2xl">
                  {getInitials(
                    profileData.firstName + " " + profileData.lastName,
                  )}
                </AvatarFallback>
              </Avatar>
              {isEditing && (
                <label
                  htmlFor="avatar-upload"
                  className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Camera className="w-8 h-8 text-white" />
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarUpload}
                  />
                </label>
              )}
            </div>
            <div className="flex-1 w-full md:mt-16">
              {isEditing ? (
                <ProfileEditForm
                  profileData={profileData}
                  onProfileDataChange={setProfileData}
                  onSave={handleSave}
                  onCancel={() => setIsEditing(false)}
                />
              ) : (
                <ProfileViewMode
                  profileData={profileData}
                  onEdit={() => setIsEditing(true)}
                  allowEdit={allowedToEdit}
                />
              )}
            </div>
          </div>
        </CardHeader>
        {isEditing && (
          <CardContent className="mt-8">
            {/* Gallery Section - Instagram Vibe */}
            <MediaGallery
              mediaFiles={profileData.media}
              handleMediaUpload={handlePhotoUpload}
              allowEdit={isEditing}
              onDelete={handlePhotoDelete}
            />
          </CardContent>
        )}
      </Card>
      {!isEditing && (
        <MediaGallery
          mediaFiles={profileData.media}
          handleMediaUpload={handlePhotoUpload}
          allowEdit={isEditing}
          onDelete={handlePhotoDelete}
        />
      )}
    </div>
  );
}
