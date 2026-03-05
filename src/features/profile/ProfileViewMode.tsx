import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { useTranslation } from "react-i18next";
import { ProfileData } from "./ProfilePage";

interface ProfileViewModeProps {
  profileData: ProfileData;
  onEdit?: () => void;
  allowEdit?: boolean;
}

export function ProfileViewMode({
  profileData,
  onEdit,
  allowEdit = false,
}: ProfileViewModeProps) {
  const { t } = useTranslation();
  return (
    <div className="space-y-3">
      <div className="flex flex-col-reverse md:flex-col md:flex-row items-center md:justify-between gap-3">
        <div className="flex items-center flex-wrap gap-2 justify-center md:justify-start">
          {profileData.role && (
            <Badge
              variant={
                profileData.role?.name === "Leader" ? "default" : "secondary"
              }
              className="md:text-sm px-3 py-1"
            >
              {profileData.role?.name}
            </Badge>
          )}
          {profileData.level && (
            <Badge
              variant="outline"
              className="md:text-sm border-primary text-primary px-3 py-2 md:py-1"
            >
              {profileData.level?.name}
            </Badge>
          )}
        </div>
        {allowEdit && onEdit && (
          <Button variant="outline" size="sm" onClick={onEdit}>
            <Edit className="w-4 h-4 md:mr-2" />
            <span>
              {t("profile.editProfile")}
            </span>
          </Button>
        )}
      </div>
      <h1 className="text-2xl md:text-3xl font-semibold text-center md:text-left">
        {profileData.firstName} {profileData.lastName}
      </h1>
      {profileData.bio && (
        <p className="text-muted-foreground text-sm md:text-base max-w-lg whitespace-pre-line text-center md:text-left mx-auto md:mx-0">
          {profileData.bio}
        </p>
      )}
      {profileData.danceStyles && profileData.danceStyles.length > 0 && (
        <div className="flex flex-wrap gap-2 justify-center md:justify-start pt-1">
          {profileData.danceStyles.map((style) => (
            <Badge
              key={style.id}
              variant="secondary"
              className="md:text-sm px-3 py-1.5 font-normal"
            >
              {style.name}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
