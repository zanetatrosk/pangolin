import { Calendar, MapPin, Clock, DollarSign } from "lucide-react";
import { useState } from "react";
import { withForm } from "@/lib/form";
import { FormSection, FormGrid } from "@/components/form";
import type { SelectOption } from "@/components/form";
import { eventFormOpts } from "./FormOptions";

interface BasicDetailsProps {
  className?: string;
}

export const BasicDetails = withForm({
  ...eventFormOpts,
  props: {} as BasicDetailsProps,
  render: ({ form, className }) => {
    const [showExactPrice, setShowExactPrice] = useState(false);

    const priceRangeOptions: SelectOption[] = [
      { value: "free", label: "Free" },
      { value: "0-10", label: "$0 - $10" },
      { value: "10-20", label: "$10 - $20" },
      { value: "20-50", label: "$20 - $50" },
      { value: "50-100", label: "$50 - $100" },
      { value: "100+", label: "$100+" },
      { value: "exact", label: "Exact amount" },
    ];

    return (
      <div className={`p-4 md:p-6 ${className}`}>
        <div className="space-y-6">
          {/* Basic Information */}
          <FormSection title="Basic Information">
            {/* Event Name */}
            <form.AppField
              name="basicInfo.eventName"
              validators={{
                onChange: ({ value }) =>
                  !value || value.length < 3
                    ? "Event name must be at least 3 characters"
                    : undefined,
              }}
            >
              {(field) => (
                <field.TextField
                  label="Event Name"
                  placeholder="e.g., Salsa Night at Downtown Studio"
                  required
                />
              )}
            </form.AppField>

            {/* Location */}
            <form.AppField
              name="basicInfo.location"
              validators={{
                onChange: ({ value }) =>
                  !value || value.length < 3
                    ? "Location is required"
                    : undefined,
              }}
            >
              {(field) => (
                <field.TextField
                  label="Location"
                  placeholder="Venue name and address"
                  required
                  icon={MapPin}
                />
              )}
            </form.AppField>
          </FormSection>

          {/* Date & Time */}
          <FormSection title="Date & Time">
            <FormGrid columns={2}>
              <form.AppField
                name="basicInfo.date"
                validators={{
                  onChange: ({ value }) =>
                    !value ? "Date is required" : undefined,
                }}
              >
                {(field) => (
                  <field.TextField
                    label="Date"
                    type="date"
                    required
                    icon={Calendar}
                  />
                )}
              </form.AppField>

              <form.AppField
                name="basicInfo.time"
                validators={{
                  onChange: ({ value }) =>
                    !value ? "Time is required" : undefined,
                }}
              >
                {(field) => (
                  <field.TextField
                    label="Time"
                    type="time"
                    required
                    icon={Clock}
                  />
                )}
              </form.AppField>
            </FormGrid>

            {/* Recurring Event Checkbox */}
            <form.AppField name="basicInfo.isRecurring">
              {(field) => (
                <field.CheckboxField label="This is a recurring event" />
              )}
            </form.AppField>

            {/* End Date - shown when recurring is checked */}
            <form.AppField name="basicInfo.isRecurring">
              {(recurringField) =>
                recurringField.state.value && (
                  <form.AppField name="basicInfo.endDate">
                    {(field) => (
                      <field.TextField
                        label="End Date"
                        type="date"
                        required
                        icon={Calendar}
                      />
                    )}
                  </form.AppField>
                )
              }
            </form.AppField>
          </FormSection>

          {/* Pricing */}
          <FormSection title="Pricing">
            <div
              className={`grid ${
                showExactPrice
                  ? "grid-cols-1 md:grid-cols-2 gap-4"
                  : "grid-cols-1"
              }`}
            >
              <form.AppField name="basicInfo.priceRange">
                {(field) => (
                  <field.SelectField
                    label="Price Range"
                    placeholder="Select price range"
                    options={priceRangeOptions}
                    onValueChange={(value) =>
                      setShowExactPrice(value === "exact")
                    }
                  />
                )}
              </form.AppField>

              {/* Exact Price Input - shown when "exact" is selected */}
              {showExactPrice && (
                <form.AppField name="basicInfo.priceExact">
                  {(field) => (
                    <field.NumberField
                      placeholder="Enter exact price"
                      min="0"
                      step="0.01"
                      label="Exact Price"
                      icon={DollarSign}
                    />
                  )}
                </form.AppField>
              )}
            </div>
          </FormSection>
        </div>
      </div>
    );
  },
});
