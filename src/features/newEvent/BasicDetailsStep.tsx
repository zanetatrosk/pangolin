import { Calendar, Clock, DollarSign } from "lucide-react";
import { withForm } from "@/lib/form";
import { FormSection, FormGrid } from "@/components/form";
import { eventFormOpts } from "./FormOptions";
import { useQuery } from "@tanstack/react-query";
import { Currency, getCurrencies } from "@/services/currencies-api";
import { LocationSection } from "./LocationSection";
import { getOccurrenceOptions } from "./utils/getOccuranceOptions";

interface BasicDetailsProps {
  className?: string;
  isEditing?: boolean;
}

export const BasicDetails = withForm({
  ...eventFormOpts,
  props: {} as BasicDetailsProps,
  render: ({ form, className, isEditing }) => {
    const { data: currencyOptions = [] } = useQuery<Currency[]>({
      queryKey: ["currencies"],
      queryFn: getCurrencies,
    });

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
            <LocationSection form={form} />
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
                    label="Start Date"
                    type="date"
                    required
                    icon={Calendar}
                  />
                )}
              </form.AppField>

              {!isEditing && (
                <form.AppField name="basicInfo.endDate">
                  {(field) => (
                    <field.TextField
                      label="End Date"
                      type="date"
                      icon={Calendar}
                    />
                  )}
                </form.AppField>
              )}

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
            {!isEditing && (
              <form.AppField name="basicInfo.isRecurring">
                {(field) => (
                  <field.CheckboxField label="This is a recurring event" />
                )}
              </form.AppField>
            )}

            {/* Occurrence Type - shown when recurring is checked */}
            <form.AppField name="basicInfo.isRecurring">
              {(recurringField) =>
                recurringField.state.value &&
                !isEditing && (
                  <form.AppField
                    name="basicInfo.recurrenceType"
                    validators={{
                      onChange: ({ value }) =>
                        !value
                          ? "Occurrence type is required for recurring events"
                          : undefined,
                    }}
                  >
                    {(field) => (
                      <field.SelectField
                        label="Occurrence Type"
                        placeholder="Select frequency"
                        required
                        options={getOccurrenceOptions()}
                        getValue={(item) => item.value}
                        getLabel={(item) => item.label}
                      />
                    )}
                  </form.AppField>
                )
              }
            </form.AppField>
          </FormSection>

          {/* Pricing */}
          <FormSection title="Pricing">
            <FormGrid columns={2}>
              {/* Price Input */}
              <form.AppField name="basicInfo.price">
                {(field) => (
                  <field.NumberField
                    label="Price"
                    placeholder="Leave empty for free events"
                    min="0"
                    step="0.01"
                    icon={DollarSign}
                  />
                )}
              </form.AppField>

              {/* Currency Selection */}
              <form.AppField name="basicInfo.currency">
                {(field) => (
                  <field.SelectField
                    label="Currency"
                    placeholder="Select currency"
                    options={currencyOptions}
                    getValue={(item) => item.code}
                    getLabel={(item) => `${item.code} - ${item.name}`}
                  />
                )}
              </form.AppField>
            </FormGrid>
          </FormSection>
        </div>
      </div>
    );
  },
});
