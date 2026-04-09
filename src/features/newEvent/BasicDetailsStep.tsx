import { Calendar, Clock, DollarSign } from "lucide-react";
import { withForm } from "@/lib/form";
import { FormSection, FormGrid } from "@/components/form";
import { eventFormOpts } from "./FormOptions";
import { useQuery } from "@tanstack/react-query";
import { Currency, getCurrencies } from "@/services/currencies-api";
import { LocationSection } from "./LocationSection";
import { getOccurrenceOptions } from "./utils/getOccuranceOptions";
import { useTranslation } from "react-i18next";

interface BasicDetailsProps {
  className?: string;
  isEditing?: boolean;
}

export const BasicDetails = withForm({
  ...eventFormOpts,
  props: {} as BasicDetailsProps,
  render: ({ form, className, isEditing }) => {
    const { t } = useTranslation();
    const { data: currencyOptions = [] } = useQuery<Currency[]>({
      queryKey: ["currencies"],
      queryFn: getCurrencies,
    });

    return (
      <div className={`p-4 md:p-6 ${className}`}>
        <div className="space-y-6">
          {/* Basic Information */}
          <FormSection title={t("newEvent.basicInfo.title")}>
            {/* Event Name */}
            <form.AppField name="basicInfo.eventName">
              {(field) => (
                <field.TextField
                  label={t("newEvent.basicInfo.eventName")}
                  placeholder={t("newEvent.basicInfo.eventNamePlaceholder")}
                  required
                />
              )}
            </form.AppField>

            {/* Location */}
            <LocationSection form={form} />
          </FormSection>

          {/* Date & Time */}
          <FormSection title={t("newEvent.basicInfo.dateTime")}>
            <FormGrid columns={2}>
              <form.AppField name="basicInfo.date">
                {(field) => (
                  <field.TextField
                    label={t("newEvent.basicInfo.startDate")}
                    type="date"
                    required
                    icon={Calendar}
                  />
                )}
              </form.AppField>

              {/* Regular End Date - hide when recurring or editing */}
              <form.AppField name="basicInfo.isRecurring">
                {(recurringField) =>
                  !recurringField.state.value &&
                  !isEditing && (
                    <form.AppField name="basicInfo.endDate">
                      {(field) => (
                        <field.TextField
                          label={t("newEvent.basicInfo.endDate")}
                          type="date"
                          icon={Calendar}
                        />
                      )}
                    </form.AppField>
                  )
                }
              </form.AppField>

              <form.AppField name="basicInfo.time">
                {(field) => (
                  <field.TextField
                    label={t("newEvent.basicInfo.time")}
                    type="time"
                    required
                    icon={Clock}
                  />
                )}
              </form.AppField>
            </FormGrid>

            {/* Recurring Event Checkbox */}
            {!isEditing && (
              <form.AppField
                name="basicInfo.isRecurring"
                listeners={{
                  onChange: ({ value }) => {
                    if (value) {
                      form.setFieldValue("basicInfo.endDate", undefined);
                    } else {
                      form.setFieldValue("basicInfo.recurrenceType", undefined);
                      form.setFieldValue("basicInfo.recurrenceEndDate", null);
                    }
                  },
                }}
              >
                {(field) => (
                  <field.CheckboxField
                    label={t("newEvent.basicInfo.isRecurring")}
                  />
                )}
              </form.AppField>
            )}

            {/* Recurrence options - shown when recurring is checked */}
            <form.AppField name="basicInfo.isRecurring">
              {(recurringField) =>
                recurringField.state.value &&
                !isEditing && (
                  <FormGrid columns={2}>
                    <form.AppField name="basicInfo.recurrenceType">
                      {(field) => (
                        <field.SelectField
                          label={t("newEvent.basicInfo.recurrenceType")}
                          placeholder={t(
                            "newEvent.basicInfo.recurrenceTypePlaceholder",
                          )}
                          required
                          options={getOccurrenceOptions()}
                          getValue={(item) => item.value}
                          getLabel={(item) => item.label}
                        />
                      )}
                    </form.AppField>

                    {/* Recurrence End Date */}
                    <form.AppField name="basicInfo.recurrenceEndDate">
                      {(field) => (
                        <field.TextField
                          label={t("newEvent.basicInfo.recurrenceEndDate")}
                          type="date"
                          required
                          icon={Calendar}
                        />
                      )}
                    </form.AppField>
                  </FormGrid>
                )
              }
            </form.AppField>
          </FormSection>

          {/* Pricing */}
          <FormSection title={t("newEvent.basicInfo.pricing")}>
            <FormGrid columns={2}>
              {/* Price Input */}
              <form.AppField name="basicInfo.price">
                {(field) => (
                  <field.NumberField
                    label={t("newEvent.basicInfo.price")}
                    placeholder={t("newEvent.basicInfo.pricePlaceholder")}
                    min="0"
                    step="1"
                    icon={DollarSign}
                  />
                )}
              </form.AppField>

              {/* Currency Selection */}
              <form.AppField name="basicInfo.currency">
                {(field) => (
                  <field.SelectField
                    label={t("newEvent.basicInfo.currency")}
                    placeholder={t("newEvent.basicInfo.currencyPlaceholder")}
                    options={currencyOptions}
                    getValue={(item) => item.code}
                    getLabel={(item) => `${item.code} - ${item.name}`}
                    allowClear
                    clearLabel={t("newEvent.basicInfo.currencyClear", {
                      defaultValue: "No currency",
                    })}
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
