import { Badge } from "@/components/ui/badge";
import { ProfileData } from "./ProfilePage";

interface ProfileViewModeProps {
  profileData: ProfileData;
}

export function ProfileViewMode({ profileData }: ProfileViewModeProps) {
  return (
    <>
      <h1 className="text-2xl">
        {profileData.firstName} {profileData.lastName}
      </h1>
      <p className="text-muted-foreground max-w-lg">{profileData.bio}</p>
      <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start">
        {profileData.danceStyles?.map((style) => (
          <Badge
            key={style.id}
            variant="secondary"
            className="px-3 py-1 text-sm font-normal"
          >
            {style.name}
          </Badge>
        ))}
      </div>
    </>
  );
}
