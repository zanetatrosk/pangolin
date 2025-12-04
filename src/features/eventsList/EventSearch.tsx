import { use, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Search, MapPin, Calendar, Music } from "lucide-react";
import { MultiSelectFilter } from "./components/MultiSelectFilter";
import { InputIconAndTitle } from "./components/InputIconAndTitle";
import { useTranslation } from "react-i18next";

export function EventSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [eventTypes, setEventTypes] = useState<string[]>([]);
  const [danceStyles, setDanceStyles] = useState<string[]>([]);

  const eventTypeOptions = [
    { value: "social", label: "Social Night" },
    { value: "workshop", label: "Workshop" },
    { value: "competition", label: "Competition" },
    { value: "festival", label: "Festival" },
    { value: "bootcamp", label: "Bootcamp" },
    { value: "masterclass", label: "Masterclass" },
  ];

  const danceStyleOptions = [
    { value: "salsa", label: "Salsa" },
    { value: "bachata", label: "Bachata" },
    { value: "kizomba", label: "Kizomba" },
    { value: "tango", label: "Tango" },
    { value: "swing", label: "Swing" },
    { value: "latin", label: "Latin Mix" },
    { value: "ballroom", label: "Ballroom" },
    { value: "urban-kiz", label: "Urban Kiz" },
  ];

  const handleSearch = () => {
    console.log("Search initiated with:", {
      searchTerm,
      location,
      eventTypes,
      danceStyles,
    });
    // Implement search logic here
  };
  const { t } = useTranslation();

  return (
    <>
      <Card className="mb-8 shadow-xl backdrop-blur-lg border border-purple-200/30 dark:border-0 overflow-hidden ">
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
                placeholder="What dance event are you looking for?"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-14 py-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur lg:text-xl rounded-xl shadow-lg relative z-0  placeholder:text-gray-400"
              />
            </div>

            {/* Quick Filters Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
              {/* Location Filter */}
              <InputIconAndTitle icon={MapPin} title="Location">
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-400 h-4 w-4 z-10 pointer-events-none" />
                  <Input
                    placeholder="City or venue..."
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="pl-10 h-12 bg-white/70 dark:bg-gray-800/70 backdrop-blur rounded-lg shadow-sm relative z-0 "
                  />
                </div>
              </InputIconAndTitle>

              {/* Event Types Filter */}
              <MultiSelectFilter
                label="Event Types"
                icon={Calendar}
                options={eventTypeOptions}
                selectedValues={eventTypes}
                onValuesChange={setEventTypes}
              />

              {/* Dance Styles Filter */}
              <MultiSelectFilter
                label="Dance Styles"
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
                <span className="font-semibold">Search Events</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
