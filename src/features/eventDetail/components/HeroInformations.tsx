import { renderAddress } from "@/utils/renderAdress";
import {
  Calendar,
  Clock,
  Banknote,
  MapPin,
  ExternalLink,
  Facebook,
} from "lucide-react";
import { FC } from "react";
import { BasicDetailsData } from "../types";
import { getLabelFromPrice } from "@/utils/getLabelFromPrice";
import { EventDateDisplay } from "./EventDateDisplay";

interface HeroInfoItem {
  icon: React.ReactNode;
  text: React.ReactNode;
}
export const HeroInfo: FC<{
  icon: React.ReactNode;
  text: React.ReactNode;
  isLast?: boolean;
}> = ({ icon, text }) => {
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
  const {
    recurringDates,
    date,
    time,
    endDate,
    location,
    price,

  } = basicInfo;
  let data: HeroInfoItem[] = [
    {
      icon: <Calendar className="w-4 h-4" />,
      text: (
        <EventDateDisplay
          date={date}
          endDate={endDate}
          recurringDates={recurringDates}
        />
      ),
    },
    {
      icon: <Clock className="w-4 h-4" />,
      text: time,
    },
    {
      icon: <Banknote className="w-4 h-4" />,
      text: getLabelFromPrice(price, basicInfo.currency),
    },
  ];

  data = data.filter((item) => item.text !== undefined && item.text !== null);

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
              renderAddress(location)
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-primary hover:underline transition-colors cursor-pointer"
            title="View on Google Maps"
          >
            <MapPin className="w-4 h-4" />
            <span>{renderAddress(location)}</span>
            <ExternalLink className="w-3 h-3" />
          </a>

          {facebookEventUrl && (
            <>
              <div className="hidden lg:block w-1 h-1 rounded-full bg-foreground/20" />
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};
