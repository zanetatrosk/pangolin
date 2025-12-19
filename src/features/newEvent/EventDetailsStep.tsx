import { Users, Music, Award, CalendarDays } from "lucide-react";
import { withForm } from "@/lib/form";
import { FormSection, FormGrid } from "@/components/form";
import { eventFormOpts } from "./FormOptions";
import { ResponsiveMultiSelectFilter } from "@/features/eventsList/components/ResponsiveMultiSelectFilter";

interface EventDetailsProps {
  className?: string;
}

const danceStyleOptions = [
  { value: "salsa", label: "Salsa" },
  { value: "bachata", label: "Bachata" },
  { value: "kizomba", label: "Kizomba" },
  { value: "tango", label: "Tango" },
  { value: "swing", label: "Swing" },
  { value: "ballroom", label: "Ballroom" },
  { value: "latin", label: "Latin" },
  { value: "contemporary", label: "Contemporary" },
  { value: "hip-hop", label: "Hip Hop" },
  { value: "other", label: "Other" },
];

const skillLevelOptions = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
  { value: "all-levels", label: "All Levels" },
];

const eventTypeOptions = [
  { value: "workshop", label: "Workshop" },
  { value: "social", label: "Social Dance" },
  { value: "competition", label: "Competition" },
  { value: "festival", label: "Festival" },
  { value: "class", label: "Class" },
  { value: "performance", label: "Performance" },
  { value: "party", label: "Party" },
  { value: "bootcamp", label: "Bootcamp" },
];

export const EventDetailsStep = withForm({
  ...eventFormOpts,
  props: {} as EventDetailsProps,
  render: ({ form, className }) => {
    return (
      <div className={`p-4 md:p-6 ${className}`}>
        <div className="space-y-6">
          {/* Dance Information */}
          <FormSection title="Dance Information">
            <div className="space-y-4">
              {/* Dance Styles */}
              <form.AppField name="additionalDetails.danceStyles">
                {(field) => (
                  <ResponsiveMultiSelectFilter
                    label="Dance Styles"
                    icon={Music}
                    options={danceStyleOptions}
                    selectedValues={field.state.value}
                    onValuesChange={(values) => field.handleChange(values)}
                  />
                )}
              </form.AppField>

              {/* Skill Level */}
              <form.AppField name="additionalDetails.skillLevel">
                {(field) => (
                  <ResponsiveMultiSelectFilter
                    label="Required Skill Level"
                    icon={Award}
                    options={skillLevelOptions}
                    selectedValues={field.state.value}
                    onValuesChange={(values) => field.handleChange(values)}
                  />
                )}
              </form.AppField>

              {/* Type of Event */}
              <form.AppField name="additionalDetails.typeOfEvent">
                {(field) => (
                  <ResponsiveMultiSelectFilter
                    label="Type of Event"
                    icon={CalendarDays}
                    options={eventTypeOptions}
                    selectedValues={field.state.value}
                    onValuesChange={(values) => field.handleChange(values)}
                  />
                )}
              </form.AppField>
            </div>
          </FormSection>

          {/* Attendee Management */}
          <FormSection title="Attendee Management">
            <div className="space-y-4">
              {/* Max Attendees */}
              <form.AppField name="additionalDetails.maxAttendees">
                {(field) => (
                  <field.NumberField
                    label="Maximum Number of Attendees"
                    placeholder="Leave empty for unlimited"
                    min="1"
                    step="1"
                    icon={Users}
                  />
                )}
              </form.AppField>

              <div className="space-y-3">
                {/* Allow Waitlist */}
                <form.AppField name="additionalDetails.allowWaitlist">
                  {(field) => (
                    <field.CheckboxField
                      label="Allow waitlist when event is full"
                      description="Attendees can join a waitlist if the event reaches maximum capacity"
                    />
                  )}
                </form.AppField>

                {/* Allow Partner Pairing */}
                <form.AppField name="additionalDetails.allowPartnerPairing">
                  {(field) => (
                    <field.CheckboxField
                      label="Enable partner pairing system"
                      description="Help attendees find dance partners for the event"
                    />
                  )}
                </form.AppField>
              </div>
            </div>
          </FormSection>
        </div>
      </div>
    );
  },
});
