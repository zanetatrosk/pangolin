import { Calendar, MapPin, Clock, DollarSign } from "lucide-react";
import { useState } from "react";
import { withForm } from "@/lib/form";
import { FormSection, FormGrid } from "@/components/form";
import type { SelectOption } from "@/components/form";
import { eventFormOpts } from "./FormOptions";
import { PRICE_TYPE } from "../eventsList/components/EventCard";

interface BasicDetailsProps {
  className?: string;
}

export const BasicDetails = withForm({
  ...eventFormOpts,
  props: {} as BasicDetailsProps,
  render: ({ form, className }) => {
    const [priceType, setPriceType] = useState<"range" | "exact" | "free" | null>(null);

    const priceTypeOptions: SelectOption[] = [
      { value: PRICE_TYPE.RANGE, label: "Price Range" },
      { value: PRICE_TYPE.EXACT, label: "Exact Price" },
      { value: PRICE_TYPE.FREE, label: "Free" },
    ];

    const currencyOptions: SelectOption[] = [
      { value: "CZK", label: "CZK (Czech Koruna)" },
      { value: "EUR", label: "EUR (Euro)" },
      { value: "USD", label: "USD (US Dollar)" },
      { value: "GBP", label: "GBP (British Pound)" },
    ];

    const locationOptions: SelectOption[] = [
      { value: "dance-studio-prague", label: "Dance Studio Prague - Václavské náměstí 1, Prague" },
      { value: "salsa-club-brno", label: "Salsa Club Brno - Masarykova 15, Brno" },
      { value: "bachata-lounge", label: "Bachata Lounge - Národní 25, Prague" },
      { value: "tango-hall-ostrava", label: "Tango Hall Ostrava - Stodolní 8, Ostrava" },
      { value: "kizomba-studio", label: "Kizomba Studio - Wenceslas Square 10, Prague" },
      { value: "dance-arena-plzen", label: "Dance Arena - Americká 23, Plzeň" },
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
                <field.ComboboxField
                  label="Location"
                  placeholder="Search for a venue..."
                  emptyText="No venues found."
                  options={locationOptions}
                  required
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
              {/* Price Type Selection */}
              <form.AppField name="basicInfo.price.priceType">
                {(field) => (
                  <field.SelectField
                    label="Price Type"
                    placeholder="Select price type"
                    options={priceTypeOptions}
                    onValueChange={(value) =>
                      setPriceType(value as "range" | "exact")
                    }
                  />
                )}
              </form.AppField>

              {/* Currency Selection */}
              {priceType && priceType !== PRICE_TYPE.FREE && (
                <form.AppField name="basicInfo.price.currency">
                  {(field) => (
                    <field.SelectField
                      label="Currency"
                      placeholder="Select currency"
                      options={currencyOptions}
                    />
                  )}
                </form.AppField>
              )}
            </FormGrid>

            {/* Price Range Inputs - shown when "range" is selected */}
            {priceType === "range" && (
              <FormGrid columns={2}>
                <form.AppField name="basicInfo.price.priceMin">
                  {(field) => (
                    <field.NumberField
                      label="Minimum Price"
                      placeholder="0"
                      min="0"
                      step="0.01"
                      icon={DollarSign}
                    />
                  )}
                </form.AppField>

                <form.AppField name="basicInfo.price.priceMax">
                  {(field) => (
                    <field.NumberField
                      label="Maximum Price"
                      placeholder="100"
                      min="0"
                      step="0.01"
                      icon={DollarSign}
                    />
                  )}
                </form.AppField>
              </FormGrid>
            )}

            {/* Exact Price Input - shown when "exact" is selected */}
            {priceType === "exact" && (
              <form.AppField name="basicInfo.price.priceExact">
                {(field) => (
                  <field.NumberField
                    label="Exact Price"
                    placeholder="Enter exact price"
                    min="0"
                    step="0.01"
                    icon={DollarSign}
                  />
                )}
              </form.AppField>
            )}
          </FormSection>
        </div>
      </div>
    );
  },
});
