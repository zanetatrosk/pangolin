import { useState } from "react";
import { useStore } from "@tanstack/react-store";
import { authStore } from "@/stores/authStore";
import { Card, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Edit, Save, X, Grid3X3, Plus, Camera } from "lucide-react";
import { useTranslation } from "react-i18next";
import { getInitials } from "@/components/layout/utils/getInitials";
import { MediaGallery } from "../eventDetail/components/MediaGallery";
import { PROFILE } from "@/mocks/profile";
import { EventMediaItem } from "../newEvent/types";
import { fileToMediaItem } from "@/utils/fileToMediaItem";

const DANCE_STYLE_OPTIONS = [
  { value: "Salsa", label: "Salsa" },
  { value: "Bachata", label: "Bachata" },
  { value: "Kizomba", label: "Kizomba" },
  { value: "Zouk", label: "Zouk" },
  { value: "West Coast Swing", label: "West Coast Swing" },
  { value: "Tango", label: "Tango" },
  { value: "Hip Hop", label: "Hip Hop" },
  { value: "Ballroom", label: "Ballroom" },
  { value: "Contemporary", label: "Contemporary" },
];

const LEVEL_OPTIONS = [
  "Beginner",
  "Improver",
  "Intermediate",
  "Advanced",
  "Professional",
];

interface ProfileData {
  firstName: string;
  lastName: string;
  description: string;
  role: string;
  danceStyles: string[];
  media: any[];
  level?: string;
  danceLevels?: Record<string, string>;
  avatarUrl?: string;
}

export function ProfilePage() {
  const { user } = useStore(authStore);
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const allowedToEdit = true;

  // Mock data initialization - in a real app, this would come from the backend/store
  const [profileData, setProfileData] = useState<ProfileData>({
    ...PROFILE,
    level: "",
    danceLevels: {},
    avatarUrl: user?.avatarUrl,
  });

  const handleSave = () => {
    // Implement save logic here
    setIsEditing(false);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileData((prev) => ({
        ...prev,
        media: [fileToMediaItem(file), ...(prev.media || [])],
      }));
      // Reset the input value to allow selecting the same file again
      e.target.value = "";
    }
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setProfileData((prev) => ({ ...prev, avatarUrl: objectUrl }));
      e.target.value = "";
    }
  };

  const handlePhotoDelete = (item: EventMediaItem) => {
    setProfileData((prev) => ({
      ...prev,
      media: prev.media.filter((m) => m.url !== item.url),
    }));
  };

  return (
    <div className="container mx-auto max-w-4xl p-4 md:p-6 space-y-6">
      {/* Header / Main Profile Info */}
      <Card className="overflow-hidden pt-0 border-0 ">
        <div className="h-32 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20" />
        <CardHeader className="relative pt-0">
          {allowedToEdit && <div className="absolute top-4 right-4 md:top-6 md:right-6 z-10">
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
          </div>}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 -mt-16">
            <div className="relative group">
              <Avatar className="w-32 h-32 border-4 border-background shadow-xl bg-background">
                <AvatarImage
                  src={profileData.avatarUrl || user?.avatarUrl}
                  alt={user?.username}
                  className="object-cover"
                />
                <AvatarFallback className="text-2xl">
                  {getInitials(profileData.firstName, profileData.lastName)}
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
                <h1 className="text-3xl font-bold">
                  {user?.username || "username"}
                </h1>
                <Badge
                  variant={
                    profileData.role === "Leader" ? "default" : "secondary"
                  }
                  className="text-sm"
                >
                  {profileData.role}
                </Badge>
                {profileData.level && (
                  <Badge
                    variant="outline"
                    className="text-sm border-primary text-primary"
                  >
                    {profileData.level}
                  </Badge>
                )}
              </div>

              {isEditing ? (
                <div className="space-y-4 mt-4 max-w-lg mx-auto md:mx-0">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2 text-left">
                      <Label htmlFor="firstName">{t("First Name")}</Label>
                      <Input
                        id="firstName"
                        value={profileData.firstName}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            firstName: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2 text-left">
                      <Label htmlFor="lastName">{t("Last Name")}</Label>
                      <Input
                        id="lastName"
                        value={profileData.lastName}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            lastName: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-2 text-left">
                    <Label htmlFor="description">{t("Description")}</Label>
                    <textarea
                      id="description"
                      className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={profileData.description}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="space-y-2 text-left">
                    <Label htmlFor="level">{t("General Level")}</Label>
                    <select
                      id="level"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={profileData.level || ""}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          level: e.target.value,
                        })
                      }
                    >
                      <option value="">{t("Not Specified")}</option>
                      {LEVEL_OPTIONS.map((lvl) => (
                        <option key={lvl} value={lvl}>
                          {lvl}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2 text-left">
                    <Label>{t("Dance Styles")}</Label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 border rounded-md bg-background/50 max-h-80 overflow-y-auto">
                      {DANCE_STYLE_OPTIONS.map((option) => (
                        <div
                          key={option.value}
                          className="flex flex-col space-y-2 p-2 rounded hover:bg-accent/50 transition-colors"
                        >
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id={`style-${option.value}`}
                              checked={profileData.danceStyles.includes(
                                option.value
                              )}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setProfileData({
                                    ...profileData,
                                    danceStyles: [
                                      ...profileData.danceStyles,
                                      option.value,
                                    ],
                                  });
                                } else {
                                  const newDanceLevels = {
                                    ...profileData.danceLevels,
                                  };
                                  delete newDanceLevels[option.value];
                                  setProfileData({
                                    ...profileData,
                                    danceStyles: profileData.danceStyles.filter(
                                      (s) => s !== option.value
                                    ),
                                    danceLevels: newDanceLevels,
                                  });
                                }
                              }}
                              className="h-4 w-4 rounded border-primary text-primary focus:ring-primary accent-primary cursor-pointer"
                            />
                            <Label
                              htmlFor={`style-${option.value}`}
                              className="text-sm font-normal cursor-pointer flex-1"
                            >
                              {option.label}
                            </Label>
                          </div>
                          {profileData.danceStyles.includes(option.value) && (
                            <select
                              className="h-8 w-full rounded-md border border-input bg-background px-2 text-xs shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                              value={
                                profileData.danceLevels?.[option.value] || ""
                              }
                              onChange={(e) => {
                                const newLevels = {
                                  ...profileData.danceLevels,
                                };
                                if (e.target.value) {
                                  newLevels[option.value] = e.target.value;
                                } else {
                                  delete newLevels[option.value];
                                }
                                setProfileData({
                                  ...profileData,
                                  danceLevels: newLevels,
                                });
                              }}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <option value="">{t("Not Specified")}</option>
                              {LEVEL_OPTIONS.map((lvl) => (
                                <option key={lvl} value={lvl}>
                                  {lvl}
                                </option>
                              ))}
                            </select>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-xl text-muted-foreground">
                    {profileData.firstName} {profileData.lastName}
                  </h2>
                  <p className="text-muted-foreground max-w-lg">
                    {profileData.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start">
                    {profileData.danceStyles.map((style) => (
                      <Badge
                        key={style}
                        variant="secondary"
                        className="px-3 py-1 text-sm font-normal"
                      >
                        {style}{" "}
                        {profileData.danceLevels?.[style]
                          ? `• ${profileData.danceLevels[style]}`
                          : ""}
                      </Badge>
                    ))}
                  </div>
                </>
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
