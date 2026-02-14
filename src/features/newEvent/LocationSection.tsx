import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import { getPlaces, PlaceOption } from "@/services/get-places-api";
import { FormGrid } from "@/components/form";
import { withForm } from "@/lib/form";
import { eventFormOpts } from "./FormOptions";

interface LocationSectionProps {
  className?: string;
}

export const LocationSection = withForm({
  ...eventFormOpts,
  props: {} as LocationSectionProps,
  render: ({ form, className }) => {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [city, setCity] = useState<string>(() => 
      form.getFieldValue("basicInfo.location.city") || ""
    );
    const [country, setCountry] = useState<string>(() => 
      form.getFieldValue("basicInfo.location.country") || ""
    );

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
    const { data: locationOptions = [], isLoading } = useQuery({
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

    const debouncedCityQuery = useDebounce(city, 800);
    const { data: cities = [], isLoading: isLoadingCities } = useQuery({
      queryKey: ["locations", debouncedCityQuery],
      queryFn: () =>
        getPlaces(debouncedCityQuery, ["city"], (props) => [
          props.name,
          props.country,
        ]),
      enabled: debouncedCityQuery.length > 2,
      staleTime: 5 * 60 * 1000,
    });

    const debouncedCountryQuery = useDebounce(country, 800);
    const { data: countries = [], isLoading: isLoadingCountries } = useQuery({
      queryKey: ["locations", debouncedCountryQuery],
      queryFn: () =>
        getPlaces(debouncedCountryQuery, ["country"], (props) => [
          props.name,
        ]),
      enabled: debouncedCountryQuery.length > 2,
      staleTime: 5 * 60 * 1000,
    });

    return (
      <div className={className}>
        {/* Location Search */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Location <span className="text-red-500">*</span>
          </label>
          <form.AppField name="basicInfo.location.name">
            {(field) => (
              <field.ComboboxField
                placeholder="Search for a venue..."
                options={locationOptions}
                isLoading={isLoading}
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
                    // Update local state to display in city/country inputs
                    setCity(placeOption.locationData.city || "");
                    setCountry(placeOption.locationData.country || "");
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
            <h4 className="text-sm font-medium mb-2">Location Details</h4>
            <FormGrid columns={2}>
              <form.AppField name="basicInfo.location.name">
                {(field) => (
                  <field.TextField
                    label="Place Name"
                    placeholder="e.g., Pekelnej Bar"
                  />
                )}
              </form.AppField>

              <form.AppField name="basicInfo.location.street">
                {(field) => (
                  <field.TextField
                    label="Street"
                    placeholder="e.g., Na Bělidle"
                  />
                )}
              </form.AppField>

              <form.AppField name="basicInfo.location.houseNumber">
                {(field) => (
                  <field.TextField
                    label="House Number"
                    placeholder="e.g., 929/19"
                  />
                )}
              </form.AppField>

              <form.AppField name="basicInfo.location.city">
                {(field) => (
                  <field.ComboboxField
                    label="City"
                    placeholder="e.g., Praha 5"
                    options={cities}
                    required
                    isLoading={isLoadingCities}
                    value={field.state.value}
                    searchValue={city}
                    onChange={(value) => {
                      const placeOption = value as PlaceOption;
                      if (placeOption?.locationData) {
                        form.setFieldValue(
                          "basicInfo.location.city",
                          placeOption.locationData.city
                        );
                        if (placeOption.locationData.country) {
                          form.setFieldValue(
                            "basicInfo.location.country",
                            placeOption.locationData.country
                          );
                        }
                      }
                      setCity(placeOption?.label || "");
                    }}
                    onSearchChange={(search) => setCity(search)}
                  />
                )}
              </form.AppField>

              <form.AppField name="basicInfo.location.county">
                {(field) => (
                  <field.TextField label="County" placeholder="e.g., Prague" />
                )}
              </form.AppField>

              <form.AppField name="basicInfo.location.postalCode">
                {(field) => (
                  <field.TextField
                    label="Postal Code"
                    placeholder="e.g., 15000"
                  />
                )}
              </form.AppField>

              <form.AppField name="basicInfo.location.state">
                {(field) => (
                  <field.TextField
                    label="State/Region"
                    placeholder="e.g., Capital City of Prague"
                  />
                )}
              </form.AppField>

              <form.AppField name="basicInfo.location.country">
                {(field) => (
                  <field.ComboboxField
                    label="Country"
                    placeholder="e.g., Czechia"
                    options={countries}
                    isLoading={isLoadingCountries}
                    value={field.state.value}
                    required
                    searchValue={country}
                    onChange={(value) => {
                      const placeOption = value as PlaceOption;
                      if (placeOption?.locationData) {
                        form.setFieldValue(
                          "basicInfo.location.country",
                          placeOption.locationData.country
                        );
                      }
                      setCountry(placeOption?.label || "");
                    }}
                    onSearchChange={(search) => setCountry(search)}
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
