import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";

export const FeatureCard: React.FC<{
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  bgColorClass: string;
}> = ({ title, description, icon: Icon, bgColorClass }) => (
  <Card className="border-0 shadow-xl bg-pink-100 dark:bg-gray-900/80 backdrop-blur">
    <CardHeader className="text-center">
      <div
        className={`w-16 h-16 bg-linear-to-br ${bgColorClass} rounded-full flex items-center justify-center mx-auto mb-4`}
      >
        <Icon className="w-8 h-8 text-white" />
      </div>
      <CardTitle className="text-xl">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <CardDescription className="text-center text-base">
        {description}
      </CardDescription>
    </CardContent>
  </Card>
);