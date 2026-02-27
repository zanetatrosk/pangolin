import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useTranslation } from "react-i18next";
import { ProfileData } from "./ProfilePage";
import { useQuery } from "@tanstack/react-query";
import { getDanceStyles } from "@/services/dance-styles-api";
import { getSkillLevels } from "@/services/skill-levels-api";
import { getDancerRoles } from "@/services/role-api";

interface ProfileEditFormProps {
  profileData: ProfileData;
  onProfileDataChange: (data: ProfileData) => void;
}

export function ProfileEditForm({
  profileData,
  onProfileDataChange,
}: ProfileEditFormProps) {
  const { t } = useTranslation();

  const updateProfileData = (updates: Partial<ProfileData>) => {
    onProfileDataChange({ ...profileData, ...updates });
  };

  // Fetch dance styles and skill levels from API
  const { data: danceStyles = [] } = useQuery({
    queryKey: ["danceStyles"],
    queryFn: getDanceStyles,
  });

  const { data: levelOptions = [] } = useQuery({
    queryKey: ["skillLevels"],
    queryFn: getSkillLevels,
  });

  const { data: roleOptions = [] } = useQuery({
    queryKey: ["dancerRoles"],
    queryFn: getDancerRoles,
  });

  return (
    <div className="space-y-4 mt-4 max-w-lg mx-auto md:mx-0">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2 text-left">
          <Label htmlFor="firstName">{t("First Name")}</Label>
          <Input
            id="firstName"
            value={profileData.firstName}
            onChange={(e) => updateProfileData({ firstName: e.target.value })}
          />
        </div>
        <div className="space-y-2 text-left">
          <Label htmlFor="lastName">{t("Last Name")}</Label>
          <Input
            id="lastName"
            value={profileData.lastName}
            onChange={(e) => updateProfileData({ lastName: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-2 text-left">
        <Label htmlFor="description">{t("Description")}</Label>
        <textarea
          id="description"
          className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          value={profileData.bio}
          onChange={(e) => updateProfileData({ bio: e.target.value })}
        />
      </div>

      <div className="space-y-2 text-left">
        <Label htmlFor="level">{t("General Level")}</Label>
        <Select
          value={profileData.level?.id || undefined}
          onValueChange={(value) =>
            updateProfileData({
              level: levelOptions.find((lvl) => lvl.id === value),
            })
          }
        >
          <SelectTrigger id="level" className="w-full">
            <SelectValue placeholder={t("Not Specified")} />
          </SelectTrigger>
          <SelectContent>
            {levelOptions.map((lvl) => (
              <SelectItem key={lvl.id} value={lvl.id}>
                {lvl.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2 text-left">
        <Label htmlFor="role">{t("Main Role")}</Label>
        <Select
          value={profileData.role?.id || undefined}
          onValueChange={(value) =>
            updateProfileData({
              role: roleOptions.find((r) => r.id === value),
            })
          }
        >
          <SelectTrigger id="role" className="w-full">
            <SelectValue placeholder={t("Not Specified")} />
          </SelectTrigger>
          <SelectContent>
            {roleOptions.map((r) => (
              <SelectItem key={r.id} value={r.id}>
                {r.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2 text-left">
        <Label>{t("Dance Styles")}</Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 border rounded-md bg-background/50 max-h-80 overflow-y-auto">
          {danceStyles.map((option) => (
            <div
              key={option.id}
              className="flex items-center space-x-2 p-2 rounded hover:bg-accent/50 transition-colors"
            >
              <input
                type="checkbox"
                id={`style-${option.id}`}
                checked={profileData.danceStyles?.some((style) => style.id === option.id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    updateProfileData({
                      danceStyles: [...(profileData.danceStyles || []), option],
                    });
                  } else {
                    updateProfileData({
                      danceStyles: (profileData.danceStyles || []).filter(
                        (s) => s.id !== option.id
                      ),
                    });
                  }
                }}
                className="h-4 w-4 rounded border-primary text-primary focus:ring-primary accent-primary cursor-pointer"
              />
              <Label
                htmlFor={`style-${option.id}`}
                className="text-sm font-normal cursor-pointer flex-1"
              >
                {option.name}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
