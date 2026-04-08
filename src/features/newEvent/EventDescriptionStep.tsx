// EventDescriptionStep.tsx
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { withForm } from "@/lib/form";
import { eventFormOpts } from "./FormOptions";
import { FormSection } from "@/components/form/FormSection";
import { useTranslation } from "react-i18next";

export type EventDescriptionValues = {
  description: string;
  promoVideoUrl?: string;
};

export const EventDescriptionStep = withForm({
  ...eventFormOpts,
  render: ({ form }) => {
    const { t } = useTranslation();
    return (
      <div className={"p-4 md:p-6"}>
        <FormSection title={t("newEvent.description.title")}>
          <div className="space-y-6">
            <form.Field
              name="description"
              children={(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>{t("newEvent.description.label")}</Label>
                  <Textarea
                    id={field.name}
                    placeholder={t("newEvent.description.placeholder")}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="min-h-36"
                    rows={6}
                  />
                </div>
              )}
            />
          </div>
        </FormSection>
      </div>
    );
  },
});
