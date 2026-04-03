import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import { getPlaces, PlaceOption } from "@/services/get-places-api";
import { FormGrid } from "@/components/form";
import { withForm } from "@/lib/form";
import { eventFormOpts } from "./FormOptions";
import { useTranslation } from "react-i18next";

interface LocationSectionProps {
  className?: string;
}

export const LocationSection = withForm({
  ...eventFormOpts,
  props: {} as LocationSectionProps,
  render: ({ form, className }) => {
    const { t } = useTranslation();
    const [searchQuery, setSearchQuery] = useState<string>("");

    // Check if any location field has a value to determine initial state
    const locationValues = form.getFieldValue("basicInfo.location");
    const hasLocationData =
      locationValues &&
      Object.values(locationValues).some(
        (value) => value !== "" && value !== undefined && value !== null
      );
    const [showLocationFields, setShowLocationFields] =
      useState<boolean>(hasLocationData);

    // Debounce the search query
    const debouncedQuery = useDebounce(searchQuery, 800);
    const { data: locationOptions = [], isLoading, isSuccess } = useQuery({
      queryKey: ["locations", debouncedQuery],
      queryFn: () =>
        getPlaces(debouncedQuery, ["house"], (props) => [
          props.name,
          props.street,
          props.city,
          props.county,
          props.country,
        ]),
      enabled: debouncedQuery.length > 2,
      staleTime: 10 * 1000, // 10 seconds
    });

    return (
      <div className={className}>
        {/* Location Search */}
        <div>
          <label className="block text-sm font-medium mb-2">
            {t("newEvent.location.label")} <span className="text-red-500">*</span>
          </label>
          <form.AppField name="basicInfo.location.name">
            {(field) => (
              <field.ComboboxField
                placeholder={t("newEvent.location.searchPlaceholder")}
                options={locationOptions}
                isLoading={isLoading}
                isSuccess={isSuccess}
                value={field.state.value}
                searchValue={searchQuery}
                onChange={(value) => {
                  const placeOption = value as PlaceOption;
                  if (placeOption?.locationData) {
                    // Update all location fields
                    form.setFieldValue(
                      "basicInfo.location",
                      placeOption.locationData
                    );
                    setShowLocationFields(true);
                  }
                  setSearchQuery(placeOption?.label || "");
                }}
                onSearchChange={(search) => setSearchQuery(search)}
              />
            )}
          </form.AppField>
        </div>

        {/* Location Details - shown after selecting from search */}
        {showLocationFields && (
          <div className="space-y-4 p-4 border rounded-lg bg-muted/20">
            <h4 className="text-sm font-medium mb-2">{t("newEvent.location.detailsTitle")}</h4>
            <FormGrid columns={2}>
              <form.AppField name="basicInfo.location.name">
                {(field) => (
                  <field.TextField
                    label={t("newEvent.location.placeName")}
                    placeholder={t("newEvent.location.placeNamePlaceholder")}
                  />
                )}
              </form.AppField>

              <form.AppField name="basicInfo.location.street">
                {(field) => (
                  <field.TextField
                    label={t("newEvent.location.street")}
                    placeholder={t("newEvent.location.streetPlaceholder")}
                  />
                )}
              </form.AppField>

              <form.AppField name="basicInfo.location.houseNumber">
                {(field) => (
                  <field.TextField
                    label={t("newEvent.location.houseNumber")}
                    placeholder={t("newEvent.location.houseNumberPlaceholder")}
                  />
                )}
              </form.AppField>

              <form.AppField name="basicInfo.location.city">
                {(field) => (
                  <field.TextField
                    label={t("newEvent.location.city")}
                    placeholder={t("newEvent.location.cityPlaceholder")}
                    required
                  />
                )}
              </form.AppField>

              <form.AppField name="basicInfo.location.county">
                {(field) => (
                  <field.TextField label={t("newEvent.location.county")} placeholder={t("newEvent.location.countyPlaceholder")} />
                )}
              </form.AppField>

              <form.AppField name="basicInfo.location.postalCode">
                {(field) => (
                  <field.TextField
                    label={t("newEvent.location.postalCode")}
                    placeholder={t("newEvent.location.postalCodePlaceholder")}
                  />
                )}
              </form.AppField>

              <form.AppField name="basicInfo.location.state">
                {(field) => (
                  <field.TextField
                    label={t("newEvent.location.state")}
                    placeholder={t("newEvent.location.statePlaceholder")}
                  />
                )}
              </form.AppField>

              <form.AppField name="basicInfo.location.country">
                {(field) => (
                  <field.TextField
                    label={t("newEvent.location.country")}
                    placeholder={t("newEvent.location.countryPlaceholder")}
                    required
                  />
                )}
              </form.AppField>
            </FormGrid>
          </div>
        )}
      </div>
    );
  },
});
