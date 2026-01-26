import { useState } from "react";
import { Card, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Save, X, Camera } from "lucide-react";
import { useTranslation } from "react-i18next";
import { getInitials } from "@/components/layout/utils/getInitials";
import { MediaGallery } from "../eventDetail/components/MediaGallery";
import { PROFILE } from "@/mocks/profile";
import { EventMediaItem } from "../newEvent/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { postMedia } from "@/services/media-api";
import { ProfileEditForm } from "./ProfileEditForm";
import { ProfileViewMode } from "./ProfileViewMode";
import { CodebookItem } from "@/services/types";
import { getUserById, updateProfileById } from "@/services/user-api";
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

export function ProfilePage({userId, profileDataDefault}: {userId: string, profileDataDefault: ProfileData}) {
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useUser();  
  
  const avatarMutation = useMutation({
    mutationFn: (file: File) => postMedia(file),
    onSuccess: (data) => {
      console.log("Avatar image uploaded successfully:", data);
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
      console.log("Avatar image uploaded successfully:", data);
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

  const mutation = useMutation({
    mutationFn: () => updateProfileById(userId, profileData),
    onSuccess: (data) => {
      console.log("Profile updated successfully:", data);
    },
    onError: (error) => {
      console.error("Error updating profile:", error);
    },
  });
  
  const allowedToEdit = userId === user.userId;

  // Mock data initialization - in a real app, this would come from the backend/store
  const [profileData, setProfileData] = useState<ProfileData>(profileDataDefault);

  console.log("Profile data:", profileData);
  const handleSave = () => {
    mutation.mutate();
    console.log("Profile data saved:", profileData);
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
  };

  return (
    <div className="container mx-auto max-w-4xl p-4 md:p-6 space-y-6">
      {/* Header / Main Profile Info */}
      <Card className="overflow-hidden pt-0 border-0 ">
        <div className="h-32 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20" />
        <CardHeader className="relative pt-0">
          {allowedToEdit && (
            <div className="absolute right-4 md:right-6 z-10">
              {isEditing ? (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(false)}
                  >
                    <X className="w-4 h-4 md:mr-2" />
                    <span className="hidden md:block">{t("Cancel")}</span>
                  </Button>
                  <Button size="sm" onClick={handleSave}>
                    <Save className="w-4 h-4 md:mr-2" />
                    <span className="hidden md:block">{t("Save")}</span>
                  </Button>
                </div>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                >
                  <Edit className="w-4 h-4 md:mr-2" />
                  <span className="hidden md:block">{t("Edit Profile")}</span>
                </Button>
              )}
            </div>
          )}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 -mt-16">
            <div className="relative group">
              <Avatar className="w-32 h-32 border-4 border-background shadow-xl bg-background">
                <AvatarImage
                  src={profileData.avatar?.url}
                  alt={"Avatar"}
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
            <div className="text-center md:text-left space-y-2 flex-1 w-full md:mt-16">
              <div className="flex items-center justify-center md:justify-start gap-3">
                <Badge
                  variant={
                    profileData.role?.name === "Leader"
                      ? "default"
                      : "secondary"
                  }
                  className="text-sm"
                >
                  {profileData.role?.name}
                </Badge>
                {profileData.level && (
                  <Badge
                    variant="outline"
                    className="text-sm border-primary text-primary"
                  >
                    {profileData.level?.name}
                  </Badge>
                )}
              </div>

              {isEditing ? (
                <ProfileEditForm
                  profileData={profileData}
                  onProfileDataChange={setProfileData}
                />
              ) : (
                <ProfileViewMode profileData={profileData} />
              )}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Gallery Section - Instagram Vibe */}
      <MediaGallery
        mediaFiles={profileData.media}
        handleMediaUpload={handlePhotoUpload}
        allowEdit={allowedToEdit}
        onDelete={handlePhotoDelete}
      />
    </div>
  );
}
