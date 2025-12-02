import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MultiSelect } from "@/components/ui/multi-select";
import {
  Search,
  MapPin,
  Calendar,
  Music,
  Settings2,
  DollarSign,
  Users,
  Filter,
} from "lucide-react";

export function EventSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [eventTypes, setEventTypes] = useState<string[]>([]);
  const [danceStyles, setDanceStyles] = useState<string[]>([]);
  const [advancedOpen, setAdvancedOpen] = useState(false);

  // Advanced search filters
  const [dateRange, setDateRange] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [skillLevel, setSkillLevel] = useState("");
  const [maxAttendees, setMaxAttendees] = useState("");
  const [minRating, setMinRating] = useState("");

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

  const dateRanges = [
    { value: "today", label: "Today" },
    { value: "tomorrow", label: "Tomorrow" },
    { value: "this-week", label: "This Week" },
    { value: "next-week", label: "Next Week" },
    { value: "this-month", label: "This Month" },
    { value: "custom", label: "Custom Date" },
  ];

  const timeSlots = [
    { value: "morning", label: "Morning (6AM - 12PM)" },
    { value: "afternoon", label: "Afternoon (12PM - 6PM)" },
    { value: "evening", label: "Evening (6PM - 10PM)" },
    { value: "night", label: "Night (10PM - 2AM)" },
    { value: "late-night", label: "Late Night (2AM - 6AM)" },
  ];

  const priceRanges = [
    { value: "free", label: "Free" },
    { value: "0-20", label: "$0 - $20" },
    { value: "20-50", label: "$20 - $50" },
    { value: "50-100", label: "$50 - $100" },
    { value: "100+", label: "$100+" },
  ];

  const skillLevels = [
    { value: "beginner", label: "Beginner" },
    { value: "intermediate", label: "Intermediate" },
    { value: "advanced", label: "Advanced" },
    { value: "all-levels", label: "All Levels" },
  ];

  const handleSearch = () => {
    console.log("Search initiated with:", {
      searchTerm,
      location,
      eventTypes,
      danceStyles,
      dateRange,
      timeSlot,
      priceRange,
      skillLevel,
      maxAttendees,
      minRating,
    });
    // Implement search logic here
  };

  const clearFilters = () => {
    setSearchTerm("");
    setLocation("");
    setEventTypes([]);
    setDanceStyles([]);
    setDateRange("");
    setTimeSlot("");
    setPriceRange("");
    setSkillLevel("");
    setMaxAttendees("");
    setMinRating("");
  };

  const activeFiltersCount = [
    dateRange,
    timeSlot,
    priceRange,
    skillLevel,
    maxAttendees,
    minRating,
  ].filter(Boolean).length;

  return (
    <>
      {/* Main Search Bar */}
      <Card className="mb-8 shadow-xl backdrop-blur-lg border border-purple-200/30 dark:border-purple-700/40 overflow-hidden">
        <div className="absolute inset-0" />
        <CardContent className="relative p-6">
          {/* Main Search Section */}
          <div className="space-y-5">
            {/* Hero Search - Main Input */}
            <div className="relative">
              <Search className="absolute left-5 top-1/2 transform -translate-y-1/2  text-pink-500 h-6 w-6 z-10 pointer-events-none" />
              <Input
                placeholder="What dance event are you looking for?"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-14 pr-6 h-16 border-purple-200/60 dark:border-purple-700/60 focus:border-purple-500 focus:ring-purple-500/30 bg-white/80 dark:bg-gray-800/80 backdrop-blur text-xl rounded-2xl shadow-lg relative z-0 font-medium placeholder:text-gray-400"
              />
            </div>

            {/* Quick Filters Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Location Filter */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-pink-500" />
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Location
                  </label>
                </div>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-400 h-4 w-4 z-10 pointer-events-none" />
                  <Input
                    placeholder="City or venue..."
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="pl-10 h-12 border-pink-200/50 dark:border-pink-700/50 focus:border-pink-500 focus:ring-pink-500/20 bg-white/70 dark:bg-gray-800/70 backdrop-blur rounded-lg shadow-sm relative z-0"
                  />
                </div>
              </div>

              {/* Event Types Filter */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4  text-pink-500" />
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Event Types
                  </label>
                </div>
                <MultiSelect
                  options={eventTypeOptions}
                  onValueChange={setEventTypes}
                  defaultValue={eventTypes}
                  placeholder="Workshop, Social..."
                  maxCount={2}
                  className="h-12 border-purple-200/50 dark:border-purple-700/50 bg-white/70 dark:bg-gray-800/70 backdrop-blur rounded-lg shadow-sm"
                />
              </div>

              {/* Dance Styles Filter */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Music className="h-4 w-4  text-pink-500" />
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Dance Styles
                  </label>
                </div>
                <MultiSelect
                  options={danceStyleOptions}
                  onValueChange={setDanceStyles}
                  defaultValue={danceStyles}
                  placeholder="Salsa, Bachata..."
                  maxCount={2}
                  className="h-12 border-violet-200/50 dark:border-violet-700/50 bg-white/70 dark:bg-gray-800/70 backdrop-blur rounded-lg shadow-sm hover:shadow-md hover:border-violet-300/60 dark:hover:border-violet-600/60 transition-all duration-200"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center pt-3 border-t border-purple-200/20 dark:border-purple-700/20">
              <div className="flex flex-wrap gap-3 items-center">
                <Dialog open={advancedOpen} onOpenChange={setAdvancedOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="relative h-12 px-6 border-purple-200 dark:border-purple-700 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-200 rounded-xl">
                      <Settings2 className="mr-2 h-4 w-4" />
                      Advanced Search
                      {activeFiltersCount > 0 && (
                        <Badge className="ml-3 bg-pink-600 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                          {activeFiltersCount}
                        </Badge>
                      )}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto border-purple-200 dark:border-purple-700">
                    <DialogHeader className="pb-6">
                      <DialogTitle className="flex items-center gap-3 text-2xl font-bold">
                        <div className="w-10 h-10 bg-linear-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                          <Filter className="h-5 w-5 text-white" />
                        </div>
                        Advanced Search Filters
                      </DialogTitle>
                      <DialogDescription className="text-lg text-gray-600 dark:text-gray-300">
                        Refine your search with detailed filters to find the perfect dance events that match your preferences
                      </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-6 py-4">
                      {/* Date & Time Section */}
                      <div className="space-y-3">
                        <h4 className="font-medium text-sm text-gray-900 dark:text-gray-100 flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          Date & Time
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <Select
                            value={dateRange}
                            onValueChange={setDateRange}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select Date Range" />
                            </SelectTrigger>
                            <SelectContent>
                              {dateRanges.map((range) => (
                                <SelectItem
                                  key={range.value}
                                  value={range.value}
                                >
                                  {range.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>

                          <Select value={timeSlot} onValueChange={setTimeSlot}>
                            <SelectTrigger>
                              <SelectValue placeholder="Time Slot" />
                            </SelectTrigger>
                            <SelectContent>
                              {timeSlots.map((slot) => (
                                <SelectItem key={slot.value} value={slot.value}>
                                  {slot.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <Separator />

                      {/* Price & Capacity Section */}
                      <div className="space-y-3">
                        <h4 className="font-medium text-sm text-gray-900 dark:text-gray-100 flex items-center gap-2">
                          <DollarSign className="h-4 w-4" />
                          Price & Capacity
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <Select
                            value={priceRange}
                            onValueChange={setPriceRange}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Price Range" />
                            </SelectTrigger>
                            <SelectContent>
                              {priceRanges.map((range) => (
                                <SelectItem
                                  key={range.value}
                                  value={range.value}
                                >
                                  {range.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>

                          <Input
                            placeholder="Max Attendees"
                            type="number"
                            value={maxAttendees}
                            onChange={(e) => setMaxAttendees(e.target.value)}
                          />
                        </div>
                      </div>

                      <Separator />

                      {/* Experience Level & Rating Section */}
                      <div className="space-y-3">
                        <h4 className="font-medium text-sm text-gray-900 dark:text-gray-100 flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          Experience & Quality
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <Select
                            value={skillLevel}
                            onValueChange={setSkillLevel}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Skill Level" />
                            </SelectTrigger>
                            <SelectContent>
                              {skillLevels.map((level) => (
                                <SelectItem
                                  key={level.value}
                                  value={level.value}
                                >
                                  {level.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>

                          <Select
                            value={minRating}
                            onValueChange={setMinRating}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Minimum Rating" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="4.5">4.5+ Stars</SelectItem>
                              <SelectItem value="4.0">4.0+ Stars</SelectItem>
                              <SelectItem value="3.5">3.5+ Stars</SelectItem>
                              <SelectItem value="3.0">3.0+ Stars</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between pt-6 border-t border-purple-200/30 dark:border-purple-700/30">
                      <Button 
                        variant="outline" 
                        onClick={clearFilters}
                        className="px-6 py-2 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
                      >
                        🗑️ Clear All Filters
                      </Button>
                      <Button
                        onClick={() => setAdvancedOpen(false)}
                        className="btn-gradient-primary px-8 py-2 shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        ✨ Apply Filters
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>

                {activeFiltersCount > 0 && (
                  <Button
                    variant="ghost"
                    onClick={clearFilters}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    Clear All
                  </Button>
                )}
              </div>

              <Button
                onClick={handleSearch}
                size="lg"
                className="btn-gradient-primary px-10 py-3 h-12 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <Search className="mr-3 h-5 w-5" />
                <span className="font-semibold">Search Events</span>
              </Button>
            </div>

            {/* Active Filters Display */}
            {activeFiltersCount > 0 && (
              <div className="flex flex-wrap gap-3 pt-4 border-t border-purple-200/30 dark:border-purple-700/30">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2 flex items-center">
                  <span className="w-2 h-2 bg-pink-500 rounded-full mr-2"></span>
                  Advanced filters:
                </span>
                {dateRange && (
                  <Badge
                    variant="secondary"
                    className="bg-blue-100 text-blue-800 dark:bg-blue-800/50 dark:text-blue-200 px-3 py-1.5 rounded-lg border border-blue-200 dark:border-blue-700"
                  >
                    📅 {dateRanges.find((d) => d.value === dateRange)?.label}
                  </Badge>
                )}
                {priceRange && (
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800 dark:bg-green-800/50 dark:text-green-200 px-3 py-1.5 rounded-lg border border-green-200 dark:border-green-700"
                  >
                    💰 {priceRanges.find((p) => p.value === priceRange)?.label}
                  </Badge>
                )}
                {skillLevel && (
                  <Badge
                    variant="secondary"
                    className="bg-orange-100 text-orange-800 dark:bg-orange-800/50 dark:text-orange-200 px-3 py-1.5 rounded-lg border border-orange-200 dark:border-orange-700"
                  >
                    🎯 {skillLevels.find((l) => l.value === skillLevel)?.label}
                  </Badge>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
