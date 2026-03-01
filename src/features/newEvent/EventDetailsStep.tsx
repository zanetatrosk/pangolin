import { Users } from "lucide-react";
import { withForm } from "@/lib/form";
import { FormSection } from "@/components/form";
import { eventFormOpts } from "./FormOptions";
import { useQuery } from "@tanstack/react-query";
import { getEventTypes } from "@/services/events-types-api";
import { getSkillLevels } from "@/services/skill-levels-api";
import { getDanceStyles } from "@/services/dance-styles-api";
import { useTranslation } from "react-i18next";

interface EventDetailsProps {
  className?: string;
}

export const EventDetailsStep = withForm({
  ...eventFormOpts,
  props: {} as EventDetailsProps,
  render: ({ form, className }) => {
    const { t } = useTranslation();
    const danceStyleOptions = useQuery({
      queryKey: ['danceStyles'],
      queryFn: getDanceStyles,
    }).data || [];
    
    const skillLevelOptions = useQuery({
      queryKey: ['skillLevels'],
      queryFn: getSkillLevels,
    }).data || [];
    
    const eventTypeOptions = useQuery({
      queryKey: ['eventTypes'],
      queryFn: getEventTypes,
    }).data || [];

    return (
      <div className={`p-4 md:p-6 ${className}`}>
        <div className="space-y-6">
          {/* Dance Information */}
          <FormSection title={t("newEvent.details.danceInfo")}>
            <div className="space-y-4">
              {/* Dance Styles */}
              <form.AppField name="additionalDetails.danceStyles">
                {(field) => (
                  <field.MultiSelectField
                    label={t("newEvent.details.danceStyles")}
                    placeholder={t("newEvent.details.danceStylesPlaceholder")}
                    options={danceStyleOptions}
                  />
                )}
              </form.AppField>

              {/* Skill Level */}
              <form.AppField name="additionalDetails.skillLevel">
                {(field) => (
                  <field.MultiSelectField
                    label={t("newEvent.details.skillLevel")}
                    placeholder={t("newEvent.details.skillLevelPlaceholder")}
                    options={skillLevelOptions}
                  />
                )}
              </form.AppField>

              {/* Type of Event */}
              <form.AppField name="additionalDetails.typeOfEvent">
                {(field) => (
                  <field.MultiSelectField
                    label={t("newEvent.details.eventType")}
                    placeholder={t("newEvent.details.eventTypePlaceholder")}
                    options={eventTypeOptions}
                  />
                )}
              </form.AppField>
            </div>
          </FormSection>

          {/* Attendee Management */}
          <FormSection title={t("newEvent.details.attendeeManagement")}>
            <div className="space-y-4">
              {/* Max Attendees */}
              <form.AppField name="additionalDetails.maxAttendees">
                {(field) => (
                  <field.NumberField
                    label={t("newEvent.details.maxAttendees")}
                    placeholder={t("newEvent.details.maxAttendeesPlaceholder")}
                    min="1"
                    step="1"
                    icon={Users}
                  />
                )}
              </form.AppField>
            </div>
          </FormSection>
        </div>
      </div>
    );
  },
});
