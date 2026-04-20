import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Save, X } from "lucide-react";
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
import { useState } from "react";
import type { CodebookItem } from "@/services/types";
import { DanceStylesPicker } from "./components/DanceStylesPicker";
import { ProfileTextFields } from "./components/ProfileTextFields";

const EMPTY_CODEBOOK_ITEMS: CodebookItem[] = [];

interface ProfileEditFormProps {
  profileData: ProfileData;
  onProfileDataChange: (data: ProfileData) => void;
  onSave?: (profile: ProfileData) => void;
  onCancel?: () => void;
}

export function ProfileEditForm({
  profileData,
  onSave,
  onCancel,
}: ProfileEditFormProps) {
  const { t } = useTranslation();
  const [levelId, setLevelId] = useState(profileData.level?.id ?? "");
  const [roleId, setRoleId] = useState(profileData.role?.id ?? "");
  const [usersDanceStyles, setDanceStyles] = useState(
    profileData.danceStyles ?? EMPTY_CODEBOOK_ITEMS,
  );

  const handleToggleDanceStyle = (option: CodebookItem, checked: boolean) => {
    setDanceStyles((prev) => {
      const optionId = option.id;

      if (checked) {
        if (prev.some((s) => s.id === optionId)) {
          return prev;
        }
        return [...prev, option];
      }

      return prev.filter((s) => s.id !== optionId);
    });
  };

  // Fetch dance styles and skill levels from API
  const { data: danceStylesData } = useQuery({
    queryKey: ["danceStyles"],
    queryFn: getDanceStyles,
  });
  const danceStyles = danceStylesData ?? EMPTY_CODEBOOK_ITEMS;

  const { data: levelOptionsData } = useQuery({
    queryKey: ["skillLevels"],
    queryFn: getSkillLevels,
  });
  const levelOptions = levelOptionsData ?? EMPTY_CODEBOOK_ITEMS;

  const { data: roleOptionsData } = useQuery({
    queryKey: ["dancerRoles"],
    queryFn: getDancerRoles,
  });
  const roleOptions = roleOptionsData ?? EMPTY_CODEBOOK_ITEMS;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const firstName = (formData.get("firstName")?.toString() ?? "").trim();
    const lastName = (formData.get("lastName")?.toString() ?? "").trim();
    const bio = (formData.get("bio")?.toString() ?? "").trim();

    const updatedProfile: ProfileData = {
      ...profileData,
      firstName: firstName.length > 0 ? firstName : undefined,
      lastName: lastName.length > 0 ? lastName : undefined,
      bio: bio.length > 0 ? bio : undefined,
      level: levelId
        ? levelOptions.find((lvl) => lvl.id === levelId)
        : undefined,
      role: roleId ? roleOptions.find((r) => r.id === roleId) : undefined,
      danceStyles: usersDanceStyles,
    };

    onSave?.(updatedProfile);
  };

  return (
    <form onSubmit={handleSubmit}>
      {(onSave || onCancel) && (
        <div className="flex justify-center md:justify-end gap-2">
          {onCancel && (
            <Button variant="outline" size="sm" onClick={onCancel}>
              <X className="w-4 h-4 md:mr-2" />
              <span className="hidden md:block">{t("common.cancel")}</span>
            </Button>
          )}
          {onSave && (
            <Button size="sm" type="submit">
              <Save className="w-4 h-4 md:mr-2" />
              <span className="hidden md:block">{t("common.save")}</span>
            </Button>
          )}
        </div>
      )}
      <div className="space-y-4 mt-4 max-w-lg mx-auto md:mx-0">
        <ProfileTextFields
          defaultFirstName={profileData.firstName ?? ""}
          defaultLastName={profileData.lastName ?? ""}
          defaultBio={profileData.bio ?? ""}
        />

        <div className="space-y-2 text-left">
          <Label htmlFor="level">{t("profile.generalLevel")}</Label>
          <Select value={levelId} onValueChange={setLevelId}>
            <SelectTrigger id="level" className="w-full">
              <SelectValue placeholder={t("profile.notSpecified")} />
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
          <Label htmlFor="role">{t("profile.mainRole")}</Label>
          <Select value={roleId} onValueChange={setRoleId}>
            <SelectTrigger id="role" className="w-full">
              <SelectValue placeholder={t("profile.notSpecified")} />
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
          <DanceStylesPicker
            options={danceStyles}
            selectedStyles={usersDanceStyles}
            onToggle={handleToggleDanceStyle}
          />
        </div>
      </div>
    </form>
  );
}
