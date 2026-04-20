import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslation } from "react-i18next";

export function ProfileTextFields({
  defaultFirstName,
  defaultLastName,
  defaultBio,
}: {
  defaultFirstName: string;
  defaultLastName: string;
  defaultBio: string;
}) {
  const { t } = useTranslation();

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2 text-left">
          <Label htmlFor="firstName">{t("profile.firstName")}</Label>
          <Input
            id="firstName"
            name="firstName"
            defaultValue={defaultFirstName}
          />
        </div>
        <div className="space-y-2 text-left">
          <Label htmlFor="lastName">{t("profile.lastName")}</Label>
          <Input
            id="lastName"
            name="lastName"
            defaultValue={defaultLastName}
          />
        </div>
      </div>

      <div className="space-y-2 text-left">
        <Label htmlFor="description">{t("profile.description")}</Label>
        <textarea
          id="description"
          name="bio"
          className="flex min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          defaultValue={defaultBio}
        />
      </div>
    </>
  );
}
