import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AutoComplete } from "@/components/ui/autocomplete";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Search, MapPin, Calendar, Music } from "lucide-react";
import { ResponsiveMultiSelectFilter } from "./components/ResponsiveMultiSelectFilter";
import { InputIconAndTitle } from "./components/InputIconAndTitle";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { getEventTypes } from "@/services/events-types-api";
import { getDanceStyles } from "@/services/dance-styles-api";
import { getPlaces, PlaceOption } from "@/services/get-places-api";
import { SearchProps } from "@/routes/events.index";
import { useDebounce } from "@uidotdev/usehooks";

export function EventSearch({onSearch}: {onSearch: (params: SearchProps) => void}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState<PlaceOption | undefined>();
  const [locationSearchValue, setLocationSearchValue] = useState("");
  const [eventTypes, setEventTypes] = useState<string[]>([]);
  const [danceStyles, setDanceStyles] = useState<string[]>([]);
  const { t } = useTranslation();

  const { data : eventTypeOptions } = useQuery({
    queryKey: ["eventTypeOptions"],
    queryFn: getEventTypes,
    staleTime: 5 * 60 * 1000,
  })

  const { data : danceStyleOptions } = useQuery({
    queryKey: ["danceStyleOptions"],
    queryFn: getDanceStyles,
    staleTime: 5 * 60 * 1000,
  })

  const debouncedQuery = useDebounce(locationSearchValue, 800);
  const { data: locationOptions = [], isLoading: isLoadingLocations } = useQuery({
    queryKey: ["locations", debouncedQuery],
    queryFn: () => getPlaces(debouncedQuery, ["city", "country"], (props) => [props.name, props.country]),
    enabled: debouncedQuery.length > 2,
    staleTime: 5 * 60 * 1000,
  })

  const handleSearch = () => {
    console.log("Search initiated with:", {
      searchTerm,
      location: location?.label,
      eventTypes,
      danceStyles,
    });
    if( locationSearchValue !== location?.label ) {
      setLocation(undefined);
      onSearch({
        eventName: searchTerm,
        eventTypes,
        danceStyles,
      });
      return;
    }
    onSearch({
      eventName: searchTerm,
      city: location?.locationData?.city || "",
      country: location?.locationData?.country || "",
      eventTypes,
      danceStyles,
    });
  };

  if(!eventTypeOptions || !danceStyleOptions) {
    return null;
  }

  return (
    <>
      <Card className="mb-8 shadow-xl backdrop-blur-lg border border-purple-200/30 dark:border-0 ">
        <CardHeader className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">
            {t("events.subtitle")}
          </h1>
        </CardHeader>
        <CardContent className="relative p-6">
          <div className="space-y-8">
            <div className="relative">
              <Search className="absolute left-5 top-1/2 transform -translate-y-1/2  text-pink-500 z-10 pointer-events-none" />
              <Input
                placeholder={t("eventsList.search.placeholder")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-14 py-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur lg:text-xl rounded-xl shadow-lg relative z-0  placeholder:text-gray-400"
              />
            </div>

            {/* Quick Filters Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
              {/* Location Filter */}
              <InputIconAndTitle icon={MapPin} title={t("eventsList.search.location")}>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-400 h-4 w-4 z-10 pointer-events-none" />
                  <AutoComplete
                    value={location}
                    onValueChange={(newValue) => setLocation(newValue)}
                    onSearchChange={setLocationSearchValue}
                    options={locationOptions}
                    placeholder={t("eventsList.search.locationPlaceholder")}
                    emptyMessage={t("eventsList.search.noLocations")}
                    isLoading={isLoadingLocations}
                    searchValue={locationSearchValue}
                    className="pl-10 h-12 bg-white/70 dark:bg-gray-800/70 backdrop-blur rounded-lg shadow-sm"
                  />
                </div>
              </InputIconAndTitle>

              {/* Event Types Filter */}
              <ResponsiveMultiSelectFilter
                label={t("eventsList.search.eventTypes")}
                icon={Calendar}
                options={eventTypeOptions}
                selectedValues={eventTypes}
                onValuesChange={setEventTypes}
              />

              {/* Dance Styles Filter */}
              <ResponsiveMultiSelectFilter
                label={t("eventsList.search.danceStyles")}
                icon={Music}
                options={danceStyleOptions}
                selectedValues={danceStyles}
                onValuesChange={setDanceStyles}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-end items-center pt-3">
              <Button
                onClick={handleSearch}
                size="lg"
                className="px-10 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <Search className="mr-3" />
                <span className="font-semibold">{t("eventsList.search.searchButton")}</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
