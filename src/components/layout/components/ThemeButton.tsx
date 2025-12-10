import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";
import { FC, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export const ThemeButton: FC = () => {
  const { t } = useTranslation();
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const hasDark = document.documentElement.classList.contains("dark");
    setDarkMode(hasDark);
  }, []);

  const toggleTheme = () => {
    const el = document.documentElement;
    el.classList.toggle("dark");
    setDarkMode(el.classList.contains("dark"));
  };
  return (
    <Button
      variant="ghost"
      onClick={toggleTheme}
      aria-label={t("header.toggleTheme")}
      size="icon-lg"
      className="hover:bg-accent/50 transition"
    >
      {darkMode ? (
        <Sun className="text-gray-600 dark:text-foreground" />
      ) : (
        <Moon className="text-gray-600 dark:text-foreground" />
      )}
    </Button>
  );
};
