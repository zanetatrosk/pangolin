import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar, MapPin, Clock, DollarSign } from "lucide-react";
import { useState } from "react";
import { withForm } from "@/lib/form";

export interface BasicDetailsData {
  eventName: string;
  location: string;
  date: string;
  time: string;
  isRecurring: boolean;
  endDate?: string;
  priceRange: string;
  priceExact?: string;
}

interface BasicDetailsProps {
  className?: string;
  initialData?: BasicDetailsData;
}

export const BasicDetails = withForm({
  defaultValues: {
    eventName: "",
    location: "",
    date: "",
    time: "",
    isRecurring: false,
    endDate: "",
    priceRange: "",
    priceExact: "",
  },
  props: {} as BasicDetailsProps,
  render: ({ form, className, initialData }) => {
    const [showExactPrice, setShowExactPrice] = useState(
      initialData?.priceRange === "exact"
    );

    return (
      <div className={`p-4 md:p-6 ${className}`}>
        <div className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Basic Information
            </h3>

            <div className="space-y-4">
              {/* Event Name */}
              <form.AppField
                name="eventName"
                validators={{
                  onChange: ({ value }) =>
                    !value || value.length < 3
                      ? "Event name must be at least 3 characters"
                      : undefined,
                }}
              >
                {(field) => (
                  <div className="space-y-2">
                    <Label
                      htmlFor="eventName"
                      className="flex items-center gap-1"
                    >
                      Event Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="eventName"
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="e.g., Salsa Night at Downtown Studio"
                      className={
                        field.state.meta.errors.length > 0
                          ? "border-destructive"
                          : ""
                      }
                    />
                    {field.state.meta.errors.length > 0 && (
                      <p className="text-sm text-destructive">
                        {field.state.meta.errors[0]}
                      </p>
                    )}
                  </div>
                )}
              </form.AppField>

              {/* Location */}
              <form.AppField
                name="location"
                validators={{
                  onChange: ({ value }) =>
                    !value || value.length < 3
                      ? "Location is required"
                      : undefined,
                }}
              >
                {(field) => (
                  <div className="space-y-2">
                    <Label
                      htmlFor="location"
                      className="flex items-center gap-1"
                    >
                      Location <span className="text-destructive">*</span>
                    </Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="location"
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Venue name and address"
                        className={`pl-10 ${
                          field.state.meta.errors.length > 0
                            ? "border-destructive"
                            : ""
                        }`}
                      />
                    </div>
                    {field.state.meta.errors.length > 0 && (
                      <p className="text-sm text-destructive">
                        {field.state.meta.errors[0]}
                      </p>
                    )}
                  </div>
                )}
              </form.AppField>
            </div>
          </div>

          {/* Date & Time */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Date & Time
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <form.AppField
                name="date"
                validators={{
                  onChange: ({ value }) =>
                    !value ? "Date is required" : undefined,
                }}
              >
                {(field) => (
                  <div className="space-y-2">
                    <Label htmlFor="date" className="flex items-center gap-1">
                      Date <span className="text-destructive">*</span>
                    </Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground pointer-events-none" />
                      <Input
                        id="date"
                        type="date"
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className={`pl-10 ${
                          field.state.meta.errors.length > 0
                            ? "border-destructive"
                            : ""
                        }`}
                      />
                    </div>
                    {field.state.meta.errors.length > 0 && (
                      <p className="text-sm text-destructive">
                        {field.state.meta.errors[0]}
                      </p>
                    )}
                  </div>
                )}
              </form.AppField>

              <form.AppField
                name="time"
                validators={{
                  onChange: ({ value }) =>
                    !value ? "Time is required" : undefined,
                }}
              >
                {(field) => (
                  <div className="space-y-2">
                    <Label htmlFor="time" className="flex items-center gap-1">
                      Time <span className="text-destructive">*</span>
                    </Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground pointer-events-none" />
                      <Input
                        id="time"
                        type="time"
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className={`pl-10 ${
                          field.state.meta.errors.length > 0
                            ? "border-destructive"
                            : ""
                        }`}
                      />
                    </div>
                    {field.state.meta.errors.length > 0 && (
                      <p className="text-sm text-destructive">
                        {field.state.meta.errors[0]}
                      </p>
                    )}
                  </div>
                )}
              </form.AppField>
            </div>

            {/* Recurring Event Checkbox */}
            <form.AppField name="isRecurring">
              {(field) => (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isRecurring"
                    checked={field.state.value}
                    onCheckedChange={(checked) =>
                      field.handleChange(checked as boolean)
                    }
                  />
                  <Label
                    htmlFor="isRecurring"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    This is a recurring event
                  </Label>
                </div>
              )}
            </form.AppField>

            {/* End Date - shown when recurring is checked */}
            <form.AppField name="isRecurring">
              {(recurringField) =>
                recurringField.state.value && (
                  <form.AppField
                    name="endDate"
                    validators={{
                      onChange: ({ value }) => {
                        const startDate = form.getFieldValue("date");
                        if (!value)
                          return "End date is required for recurring events";
                        if (
                          startDate &&
                          value &&
                          new Date(value) <= new Date(startDate)
                        ) {
                          return "End date must be after start date";
                        }
                        return undefined;
                      },
                    }}
                  >
                    {(field) => (
                      <div className="space-y-2">
                        <Label
                          htmlFor="endDate"
                          className="flex items-center gap-1"
                        >
                          End Date <span className="text-destructive">*</span>
                        </Label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground pointer-events-none" />
                          <Input
                            id="endDate"
                            type="date"
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            className={`pl-10 ${
                              field.state.meta.errors.length > 0
                                ? "border-destructive"
                                : ""
                            }`}
                          />
                        </div>
                        {field.state.meta.errors.length > 0 && (
                          <p className="text-sm text-destructive">
                            {field.state.meta.errors[0]}
                          </p>
                        )}
                      </div>
                    )}
                  </form.AppField>
                )
              }
            </form.AppField>
          </div>

          {/* Pricing */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Pricing
            </h3>

            <div
              className={`grid ${
                showExactPrice
                  ? "grid-cols-1 md:grid-cols-2 gap-4"
                  : "grid-cols-1"
              }`}
            >
              <form.AppField name="priceRange">
                {(field) => (
                  <div className="space-y-2">
                    <Label htmlFor="priceRange">Price Range</Label>
                    <Select
                      value={field.state.value}
                      onValueChange={(value) => {
                        field.handleChange(value);
                        setShowExactPrice(value === "exact");
                      }}
                    >
                      <SelectTrigger id="priceRange" className="w-full">
                        <SelectValue placeholder="Select price range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="free">Free</SelectItem>
                        <SelectItem value="0-10">$0 - $10</SelectItem>
                        <SelectItem value="10-20">$10 - $20</SelectItem>
                        <SelectItem value="20-50">$20 - $50</SelectItem>
                        <SelectItem value="50-100">$50 - $100</SelectItem>
                        <SelectItem value="100+">$100+</SelectItem>
                        <SelectItem value="exact">Exact amount</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </form.AppField>

              {/* Exact Price Input - shown when "exact" is selected */}
              {showExactPrice && (
                <form.AppField name="priceExact">
                  {(field) => (
                    <div className="space-y-2">
                      <Label htmlFor="priceExact">Exact Price</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="priceExact"
                          type="number"
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="Enter exact price"
                          className="pl-10 "
                          min="0"
                          step="0.01"
                        />
                      </div>
                    </div>
                  )}
                </form.AppField>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  },
});
