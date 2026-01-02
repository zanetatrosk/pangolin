import { Calendar, Clock, DollarSign } from "lucide-react";
import { useState } from "react";
import { withForm } from "@/lib/form";
import { FormSection, FormGrid } from "@/components/form";
import type { SelectOption } from "@/components/form";
import { eventFormOpts } from "./FormOptions";
import { useQuery } from "@tanstack/react-query";
import { getPlaces } from "@/services/get-places-api";
import { useDebounce } from "@uidotdev/usehooks";

interface BasicDetailsProps {
  className?: string;
}

export const BasicDetails = withForm({
  ...eventFormOpts,
  props: {} as BasicDetailsProps,
  render: ({ form, className }) => {
    const [searchQuery, setSearchQuery] = useState<string>("");

    // Debounce the search query
    const debouncedQuery = useDebounce(searchQuery, 800);

    const { data: locationOptions = [], isLoading } = useQuery({
      queryKey:["locations", debouncedQuery],
      queryFn: () => getPlaces(debouncedQuery),
      enabled: debouncedQuery.length > 2,
      staleTime: 10 * 1000, // 10 seconds
    });

    console.log("rerendered", debouncedQuery, searchQuery);

    const currencyOptions: SelectOption[] = [
      { value: "CZK", label: "CZK (Czech Koruna)" },
      { value: "EUR", label: "EUR (Euro)" },
      { value: "USD", label: "USD (US Dollar)" },
      { value: "GBP", label: "GBP (British Pound)" },
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
            <form.AppField name="basicInfo.address">
              {(field) => (
                <field.ComboboxField
                  label="Location"
                  placeholder="Search for a venue..."
                  required
                  options={locationOptions}
                  isLoading={isLoading}
                  value={field.state.value}
                  searchValue={searchQuery}
                  onChange={(value) => {
                    console.log("Location changed to:", value);
                    field.handleChange(value?.label || "");
                    setSearchQuery(value?.label || "");
                  }}
                  onSearchChange={(search) => setSearchQuery(search)}
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
