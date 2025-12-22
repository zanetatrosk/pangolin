import { BasicDetailsData } from "@/features/newEvent/types";
import { useNavigate } from "@tanstack/react-router";
import {
    Calendar,
    Clock,
    Banknote,
    MapPin,
    ExternalLink,
    Facebook,
    ChevronDown,
} from "lucide-react";
import { FC } from "react";

interface HeroInfoItem {
  icon: React.ReactNode;
  text: React.ReactNode;
}
export const HeroInfo: FC<{ icon: React.ReactNode; text: React.ReactNode; isLast?: boolean }> = ({ icon, text }) => {
  return (
    <>
    <div className="flex items-center gap-2">
      {icon}
      <span>{text}</span>
    </div>
    <div className="hidden lg:block w-1 h-1 rounded-full bg-foreground/20" />
    </>
  );
};

export const HeroInformations: FC<{
  basicInfo: BasicDetailsData;
  facebookEventUrl?: string;
}> = ({ basicInfo, facebookEventUrl }) => {
  const navigate = useNavigate();
  const {
    recurringDates,
    location,
    date,
    time,
    isRecurring,
    endDate,
    priceRange,
    priceExact,
  } = basicInfo;
  let data: HeroInfoItem[] = [
    {
      icon: <Calendar className="w-4 h-4" />,
      text:
        recurringDates && recurringDates.length > 0 ? (
          <div className="relative flex items-center gap-1 group cursor-pointer hover:text-primary transition-colors">
            <span>{date}</span>
            <ChevronDown className="w-4 h-4 opacity-50" />
            <select
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={(e) => navigate({ to: `/events/${e.target.value}` })}
              value=""
            >
              <option value="" disabled>Select other date</option>
              {recurringDates.map((rd) => (
                <option key={rd.id} value={rd.id}>{rd.date}</option>
              ))}
            </select>
          </div>
        ) : isRecurring && endDate ? (
          `${date} until ${endDate}`
        ) : (
          date
        ),
    },
    {
      icon: <Clock className="w-4 h-4" />,
      text: time,
    },
    {
      icon: <Banknote className="w-4 h-4" />,
      text: priceExact ? `$${priceExact}` : priceRange,
    },
  ];

  return (
    <div className="relative md:absolute md:bottom-0 md:left-0 w-full bg-background md:bg-transparent p-6 md:p-10">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-2">
          {basicInfo.eventName}
        </h1>
        <div className="flex flex-col md:flex-row md:flex-wrap items-start md:items-center gap-y-2 gap-x-6 text-foreground/90 font-medium text-sm md:text-base mt-4">
          {data.map((item, index) => (
            <HeroInfo key={index} icon={item.icon} text={item.text} />
          ))}
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              basicInfo.location
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-primary hover:underline transition-colors cursor-pointer"
            title="View on Google Maps"
          >
            <MapPin className="w-4 h-4" />
            <span>{location}</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <div className="hidden lg:block w-1 h-1 rounded-full bg-foreground/20" />

          {facebookEventUrl && (
            <a
              href={facebookEventUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-[#1877F2] hover:underline transition-colors cursor-pointer"
              title="View on Facebook"
            >
              <Facebook className="w-4 h-4" />
              <span>Facebook Event</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};