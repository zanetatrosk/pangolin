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

const featuresCards = [
  {
    title: "Smart Partner Matching",
    description:
      "Our intelligent matching system pairs you with compatible dance partners based on skill level, style preferences, and availability.",
    icon: UserPlus,
    bgColorClass: "from-purple-500 to-purple-600",
  },
  {
    title: "Event Management",
    description:
      "Easy-to-use tools for creating, managing, and promoting your dance events. Integrated forms, payments, and attendee management.",
    icon: TrendingUp,
    bgColorClass: "from-pink-500 to-pink-600",
  },
  {
    title: "Community Reviews",
    description:
      "Read honest reviews from fellow dancers, rate events, and help build a trusted community of dance enthusiasts.",
    icon: Star,
    bgColorClass: "from-orange-500 to-orange-600",
  },
];

export function FeaturesSection() {
  return (
    <section className="px-4 py-16">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="Why Choose Connect2Dance?"
          subtitle="Everything you need to discover, join, and organize incredible dance events"
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
