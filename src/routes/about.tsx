import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/about")({
  component: RouteComponent,
});

function RouteComponent() {
  const { t } = useTranslation();

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10">
      <Card>
        <CardHeader>
          <CardTitle>{t("about.title")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm leading-6 text-muted-foreground">
          <p>{t("about.thesis")}</p>
          <p>{t("about.motivation")}</p>
          <p>{t("about.focus")}</p>
          <p>{t("about.personal")}</p>
        </CardContent>
      </Card>
    </main>
  );
}
