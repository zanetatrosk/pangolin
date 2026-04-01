import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BASE_SCOPES, buildGoogleOAuthUrl } from "@/lib/google-auth";
import { LogIn } from "lucide-react";
import { useTranslation } from "react-i18next";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { t } = useTranslation();

  const handleGoogleLogin = () => {
    const basicScopes = BASE_SCOPES.join(' ');
    const url = buildGoogleOAuthUrl({
      scope: basicScopes,
    });
    window.location.href = url;
  };

  return (
    <Card className={cn("flex grow max-w-md h-fit", className)} {...props}>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">{t("auth.login.title")}</CardTitle>
        <CardDescription>
          {t("auth.login.subtitle")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors"
          >
            <LogIn className="h-5 w-5" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
              {t("auth.login.googleButton")}
            </span>
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
