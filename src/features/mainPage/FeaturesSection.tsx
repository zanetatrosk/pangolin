import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UserPlus, TrendingUp, Star } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { FeatureCard } from "./FeatureCard";
import { t } from "i18next";
import { useTranslation } from "react-i18next";

export function FeaturesSection() {
  const { t } = useTranslation();
  const featuresCards = [
    {
      title: t("home.feature1Title"),
      description: t("home.feature1Text"),
      icon: UserPlus,
      bgColorClass: "from-purple-500 to-purple-600",
    },
    {
      title: t("home.feature2Title"),
      description: t("home.feature2Text"),
      icon: TrendingUp,
      bgColorClass: "from-pink-500 to-pink-600",
    },
    {
      title: t("home.feature3Title"),
      description: t("home.feature3Text"),
      icon: Star,
      bgColorClass: "from-orange-500 to-orange-600",
    },
  ];
  return (
    <section className="px-4 py-16">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title={t("home.whyConnect2Dance")}
          subtitle={t("home.whyConnect2DanceText")}
        />

        <div className="grid md:grid-cols-3 gap-8">
          {featuresCards.map((card) => (
            <FeatureCard
              key={card.title}
              title={card.title}
              description={card.description}
              icon={card.icon}
              bgColorClass={card.bgColorClass}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
