import { Button } from "@/components/ui/button";
import { Calendar, Users, UserCheck, Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { getAppSummary } from "@/services/app-api";
import { useNavigate } from "@tanstack/react-router";
import { PATHS } from "@/paths";

export const StatItem: React.FC<{
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  bgColorClass: string;
  iconColorClass: string;
}> = ({ icon: Icon, label, bgColorClass, iconColorClass }) => (
  <div className="flex items-center gap-2">
    <div
      className={`w-8 h-8 ${bgColorClass} rounded-full flex items-center justify-center`}
    >
      <Icon className={`w-4 h-4 ${iconColorClass}`} />
    </div>
    <span className="text-gray-600 dark:text-gray-400">{label}</span>
  </div>
);

export function HeroSection() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: appSummary } = useQuery({
    queryKey: ["app-summary"],
    queryFn: getAppSummary,
  });

  const statSections = [
    {
      icon: Users,
      label: t("home.activeDancers", { count: appSummary?.totalDancers || 0 }),
      bgColorClass: "bg-purple-100 dark:bg-purple-900",
      iconColorClass: "text-purple-600 dark:text-purple-400",
    },
    {
      icon: Calendar,
      label: t("home.eventsHosted", { count: appSummary?.totalEvents || 0 }),
      bgColorClass: "bg-pink-100 dark:bg-pink-900",
      iconColorClass: "text-pink-600 dark:text-pink-400",
    },
    {
      icon: UserCheck,
      label: t("home.totalRegistrations", { count: appSummary?.totalRegistrations || 0 }),
      bgColorClass: "bg-orange-100 dark:bg-orange-900",
      iconColorClass: "text-orange-600 dark:text-orange-400",
    },
  ];
  return (
    <section className="px-4 py-20 bg-linear-to-r from-purple-600/20 via-pink-600/20 to-orange-600/20 dark:from-gray-900 dark:via-gray-950 dark:to-black">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-7 text-gray-900 dark:text-white">
          {t("home.heroTitle")}
        </h1>

        <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
          {t("home.heroSubtitle")}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button
            size="lg"
            className="px-8 py-6 text-lg bg-linear-to-r from-rose-500 to-violet-500 dark:from-rose-600 dark:to-violet-600 text-white rounded-xl shadow-lg hover:shadow-xl transition"
            onClick={() => navigate({ to: PATHS.EVENTS.LIST })}
          >
            <Calendar className="mr-2" />
            {t("home.findEvents")}
          </Button>
          <Button 
            size="lg" 
            className="px-8 py-6 text-lg"
            onClick={() => navigate({ to: PATHS.EVENTS.NEW_EVENT })}
          >
            <Plus className="mr-2" />
            {t("home.hostEvent")}
          </Button>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-8 text-center">
          {statSections.map((stat) => (
            <StatItem
              key={stat.label}
              icon={stat.icon}
              label={stat.label}
              bgColorClass={stat.bgColorClass}
              iconColorClass={stat.iconColorClass}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
