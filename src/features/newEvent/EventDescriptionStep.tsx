// EventDescriptionStep.tsx
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { withForm } from "@/lib/form";
import { eventFormOpts } from "./FormOptions";
import { FormSection } from "@/components/form/FormSection";

export type EventDescriptionValues = {
  description: string;
  promoVideoUrl?: string;
};

export const EventDescriptionStep = withForm({
  ...eventFormOpts,
  render: ({ form }) => {
    return (
      <div className={"p-4 md:p-6"}>
        <FormSection title="Description">
          <div className="space-y-6">
            <form.Field
              name="description"
              children={(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Event description</Label>
                  <Textarea
                    id={field.name}
                    placeholder="Describe the event, vibe, schedule, instructors..."
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
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
